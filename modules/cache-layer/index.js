/*
 * Redis 缓存模块 - 用于缓存频繁访问的数据
 * 作者: Claude
 * 描述: 提供 Redis 缓存功能，用于优化标签、分类等静态数据查询
 */

import { createClient } from 'redis';

export default {
  options: {
    debug: false
  },

  async init(self) {
    // 创建 Redis 客户端
    const redisUrl = process.env.REDIS_URL || 'redis://127.0.0.1:6379';

    self.client = createClient({
      url: redisUrl,
      socket: {
        reconnectStrategy: (retries) => {
          if (retries > 10) {
            console.error('[Cache-Layer] Redis 重连失败，已达到最大重试次数');
            return new Error('重连失败');
          }
          return retries * 100; // 指数退避
        }
      }
    });

    self.client.on('error', (err) => {
      if (self.options.debug) {
        console.error('[Cache-Layer] Redis 错误:', err.message);
      }
    });

    self.client.on('connect', () => {
      self.isConnected = true;
      console.log('[Cache-Layer] Redis 已连接');
    });

    self.client.on('disconnect', () => {
      self.isConnected = false;
      console.warn('[Cache-Layer] Redis 已断开连接');
    });

    try {
      await self.client.connect();
      self.isConnected = true;
      console.log('[Cache-Layer] Redis 缓存服务已启动');
    } catch (error) {
      console.error('[Cache-Layer] Redis 连接失败:', error.message);
      self.isConnected = false;
    }
  },

  methods(self) {
    return {
      /**
       * 获取缓存数据
       * @param {string} key - 缓存键
       * @returns {Promise<string|null>} 缓存值或 null
       */
      async get(key) {
        if (!self.isConnected || !self.client) {
          return null;
        }

        try {
          const value = await self.client.get(key);
          if (self.options.debug && value) {
            console.log(`[Cache-Layer] 命中缓存: ${key}`);
          }
          return value;
        } catch (error) {
          console.error(`[Cache-Layer] 获取缓存失败 (${key}):`, error.message);
          return null;
        }
      },

      /**
       * 设置缓存数据
       * @param {string} key - 缓存键
       * @param {string} value - 缓存值
       * @param {number} ttl - 过期时间（秒），默认 3600 秒（1小时）
       * @returns {Promise<boolean>} 是否设置成功
       */
      async set(key, value, ttl = 3600) {
        if (!self.isConnected || !self.client) {
          return false;
        }

        try {
          await self.client.setEx(key, ttl, value);
          if (self.options.debug) {
            console.log(`[Cache-Layer] 设置缓存: ${key} (TTL: ${ttl}s)`);
          }
          return true;
        } catch (error) {
          console.error(`[Cache-Layer] 设置缓存失败 (${key}):`, error.message);
          return false;
        }
      },

      /**
       * 删除缓存
       * @param {string} key - 缓存键
       * @returns {Promise<boolean>} 是否删除成功
       */
      async del(key) {
        if (!self.isConnected || !self.client) {
          return false;
        }

        try {
          await self.client.del(key);
          if (self.options.debug) {
            console.log(`[Cache-Layer] 删除缓存: ${key}`);
          }
          return true;
        } catch (error) {
          console.error(`[Cache-Layer] 删除缓存失败 (${key}):`, error.message);
          return false;
        }
      },

      /**
       * 删除匹配模式的所有缓存
       * @param {string} pattern - 键模式（如 "news:*"）
       * @returns {Promise<number>} 删除的数量
       */
      async delPattern(pattern) {
        if (!self.isConnected || !self.client) {
          return 0;
        }

        try {
          const keys = await self.client.keys(pattern);
          if (keys.length === 0) {
            return 0;
          }
          const result = await self.client.del(keys);
          if (self.options.debug) {
            console.log(`[Cache-Layer] 删除缓存模式: ${pattern} (${result} 个键)`);
          }
          return result;
        } catch (error) {
          console.error(`[Cache-Layer] 删除缓存模式失败 (${pattern}):`, error.message);
          return 0;
        }
      },

      /**
       * 获取或设置缓存（缓存穿透保护）
       * @param {string} key - 缓存键
       * @param {Function} fetchFn - 获取数据的函数
       * @param {number} ttl - 过期时间（秒）
       * @returns {Promise<any>} 缓存值或函数返回值
       */
      async getOrSet(key, fetchFn, ttl = 3600) {
        // 先尝试从缓存获取
        const cached = await self.get(key);
        if (cached !== null) {
          try {
            return JSON.parse(cached);
          } catch (e) {
            // 缓存数据损坏，删除后重新获取
            await self.del(key);
          }
        }

        // 缓存未命中，执行函数获取数据
        const data = await fetchFn();

        // 将数据存入缓存
        if (data !== null && data !== undefined) {
          try {
            await self.set(key, JSON.stringify(data), ttl);
          } catch (e) {
            console.error(`[Cache-Layer] 序列化缓存失败 (${key}):`, e.message);
          }
        }

        return data;
      },

      /**
       * 清空所有缓存（慎用）
       * @returns {Promise<boolean>} 是否清空成功
       */
      async flushAll() {
        if (!self.isConnected || !self.client) {
          return false;
        }

        try {
          await self.client.flushDb();
          console.log('[Cache-Layer] 已清空所有缓存');
          return true;
        } catch (error) {
          console.error('[Cache-Layer] 清空缓存失败:', error.message);
          return false;
        }
      },

      /**
       * 获取缓存统计信息
       * @returns {Promise<Object>} 统计信息
       */
      async getStats() {
        if (!self.isConnected || !self.client) {
          return { connected: false };
        }

        try {
          const info = await self.client.info('memory');
          const keyCount = await self.client.dbSize();

          // 解析内存使用情况
          const usedMemory = info.match(/used_memory_human:([^\r\n]+)/)?.[1] || 'unknown';
          const usedMemoryRss = info.match(/used_memory_rss_human:([^\r\n]+)/)?.[1] || 'unknown';

          return {
            connected: true,
            keyCount,
            usedMemory,
            usedMemoryRss
          };
        } catch (error) {
          return { connected: false, error: error.message };
        }
      },

      /**
       * 生成缓存键
       * @param {string} prefix - 键前缀
       * @param {...string} parts - 键部分
       * @returns {string} 完整的缓存键
       */
      makeKey(prefix, ...parts) {
        return parts.length > 0
          ? `${prefix}:${parts.join(':')}`
          : prefix;
      }
    };
  }
};
