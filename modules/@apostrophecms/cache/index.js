export default {
  options: {
    prefix: process.env.REDIS_CACHE_PREFIX || 'wenaili:core',
    redis: {
      url: process.env.REDIS_URL || 'redis://127.0.0.1:6379',
      disableOfflineQueue: true,
      socket: {
        connectTimeout: 3000,
        // Fail startup clearly instead of waiting forever for an absent Redis.
        reconnectStrategy: retries => retries < 5 ? Math.min(200 * (retries + 1), 1000) : false
      }
    }
  },
  tasks(self) {
    return {
      'verify-redis': {
        usage: 'Verify Redis cache read/write, expiry and business cache isolation.',
        async task() {
          if (!self.client?.isReady) {
            throw new Error('Redis cache is not enabled or connected. Check REDIS_URL and DISABLE_REDIS.');
          }
          const namespace = `verify-${process.pid}-${Date.now()}`;
          const business = self.apos.modules['cache-layer'];
          try {
            await self.set(namespace, 'probe', { ok: true }, 60);
            if (!(await self.get(namespace, 'probe'))?.ok ||
              await self.client.ttl(self.getRedisKey(namespace, 'probe')) <= 0) {
              throw new Error('Redis JSON cache or TTL verification failed.');
            }
            if (!business?.isConnected || !await business.set(`${namespace}:probe`, 'ok', 60)) {
              throw new Error('Business Redis cache is not connected.');
            }
            if (await business.get(`${namespace}:probe`) !== 'ok') {
              throw new Error('Business cache read verification failed.');
            }
            await business.delPattern(`${namespace}:*`);
            if (await business.get(`${namespace}:probe`) !== null || !(await self.get(namespace, 'probe'))?.ok) {
              throw new Error('Business cache namespace isolation failed.');
            }
            if (business.canCache({ user: {}, mode: 'published' }) || business.canCache({ mode: 'draft' })) {
              throw new Error('Admin/draft cache bypass failed.');
            }
            self.apos.util.info('Redis verified: core cache, TTL, business cache isolation and preview bypass.');
          } finally {
            await self.delete(namespace, 'probe');
            await business?.delPattern(`${namespace}:*`);
          }
        }
      }
    };
  }
};
