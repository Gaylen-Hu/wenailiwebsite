/*
 * @Author: xinyuHu hxyrkcy@outlook.com
 * @Date: 2025-12-18 22:50:22
 * @LastEditors: xinyuHu hxyrkcy@outlook.com
 * @LastEditTime: 2025-12-18 22:50:26
 * @FilePath: \wenaili\lib\modules\scheduled-publisher\index.js
 * @Description: 定时发布器模块 - 自动发布到期的新闻文章
 */
import schedule from 'node-schedule';

export default {
  extend: 'apostrophe-module',
  
  construct(self, options) {
    self.scheduleChecker = function() {
      // 每分钟运行一次检查
      schedule.scheduleJob('* * * * *', async () => {
        const req = self.apos.tasks.getReq();
        const now = new Date();
        
        try {
          // 查找需要发布的文章
          // 注意：ApostropheCMS 的 find 方法默认只返回已发布的文章
          // 需要使用 .draft(true) 或 .published(null) 来查找未发布的文章
          const newsModule = self.apos.modules.news;
          
          // 查找启用定时发布且发布时间已到的未发布文章
          const news = await newsModule
            .find(req, {
              scheduledPublish: true,
              publishedAt: { $lte: now },
              trash: false
            })
            .published(null) // 查找未发布的文章（包括草稿）
            .toArray();
            
          if (news.length > 0) {
            self.apos.util.info(`[定时发布器] 找到 ${news.length} 篇待发布文章`);
          }
          
          for (const article of news) {
            try {
              self.apos.util.info(`[定时发布器] 正在发布文章: ${article.title} (ID: ${article._id})`);
              
              // 使用 ApostropheCMS 的 update 方法发布文章
              // 设置 published: true 会将文章从草稿状态转为已发布状态
              await newsModule.update(req, {
                _id: article._id
              }, {
                $set: {
                  published: true,
                  publishedAt: article.publishedAt || now
                },
                $unset: {
                  scheduledPublish: ''
                }
              });
              
              // 触发发布事件（使用 apos.bus 或直接 emit）
              if (self.apos.bus) {
                self.apos.bus.emit('articlePublished', {
                  article,
                  publishedAt: article.publishedAt || now
                });
              }
              
              self.apos.util.info(`[定时发布器] 成功发布文章: ${article.title}`);
            } catch (articleError) {
              self.apos.util.error(`[定时发布器] 发布文章失败 (${article.title}):`, articleError);
            }
          }
        } catch (error) {
          self.apos.util.error('[定时发布器] 检查定时发布任务时出错:', error);
        }
      });
    };
    
    self.on('apostrophe:modulesReady', 'scheduleChecker');
  }
};