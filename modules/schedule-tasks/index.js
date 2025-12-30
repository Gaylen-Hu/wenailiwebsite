export default {
    improve: '@apostrophecms/module',
    options: {
      alias: 'scheduleTasks'
    },
    init(self) {
      // 确保定时任务在服务器启动时注册
      self.publishScheduledNews = self.publishScheduledNews.bind(self);
    },
    handlers(self) {
      return {
        '@apostrophecms/apostrophe:run': {
          async start() {
            // 每5分钟执行一次定时发布检查
            self.apos.cron.addJob('publish-scheduled-news', '*/5 * * * *', async () => {
              await self.publishScheduledNews();
            });
            
            console.log('定时任务模块已启动，定时发布检查已安排');
          }
        }
      };
    },
    methods(self) {
      return {
        async publishScheduledNews() {
          try {
            // 获取新闻模块
            const newsModule = self.apos.modules['news'];
            
            if (!newsModule) {
              console.error('新闻模块未找到');
              return;
            }
            
            // 调用新闻模块的发布方法
            await newsModule.publishScheduledNews();
            
          } catch (error) {
            console.error('定时发布任务执行失败:', error);
          }
        }
      };
    },
    tasks(self) {
      return {
        testCron: {
          usage: '测试定时任务系统\n用法: node app schedule-tasks:testCron',
          async task(argv) {
            console.log('测试定时任务系统...');
            
            // 立即执行一次定时发布检查
            await self.publishScheduledNews();
            
            console.log('定时任务测试完成');
          }
        },
        
        forcePublish: {
          usage: '强制发布所有到期的定时文章\n用法: node app schedule-tasks:forcePublish',
          async task(argv) {
            console.log('强制发布所有到期的定时文章...');
            
            // 获取新闻模块
            const newsModule = self.apos.modules['news'];
            
            if (!newsModule) {
              console.error('新闻模块未找到');
              return;
            }
            
            const req = self.apos.task.getReq();
            const now = new Date();
            
            // 查找所有到期的定时文章
            const overduePieces = await newsModule.find(req, {
              scheduledPublish: true,
              publishedAt: { $lte: now },
              aposMode: 'draft',
              archived: { $ne: true }
            }).toArray();
            
            console.log(`找到 ${overduePieces.length} 篇到期的文章`);
            
            let publishedCount = 0;
            
            for (const piece of overduePieces) {
              try {
                console.log(`强制发布: ${piece.title}`);
                
                // 获取完整的文章数据
                const fullPiece = await newsModule.find(req, { _id: piece._id }).toObject();
                
                if (!fullPiece) {
                  console.error(`文章不存在: ${piece._id}`);
                  continue;
                }
                
                // 更新文章状态为已发布
                fullPiece.aposMode = 'published';
                
                // 保存更新
                await newsModule.update(req, fullPiece);
                
                publishedCount++;
                console.log(`✓ 已发布: ${piece.title}`);
                
              } catch (error) {
                console.error(`发布文章失败: ${piece.title}`, error.message);
              }
            }
            
            console.log(`强制发布完成，共发布 ${publishedCount} 篇文章`);
          }
        }
      };
    }
  };