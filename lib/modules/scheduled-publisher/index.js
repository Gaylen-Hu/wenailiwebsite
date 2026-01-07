/*
 * @Author: xinyuHu hxyrkcy@outlook.com
 * @Date: 2025-12-18 22:50:22
 * @LastEditors: xinyuHu hxyrkcy@outlook.com
 * @LastEditTime: 2025-12-23 09:58:57
 * @FilePath: \wenaili\lib\modules\scheduled-publisher\index.js
 * @Description: 定时发布器模块 - 自动发布到期的新闻文章
 */
import schedule from 'node-schedule';

export default {
  extend: 'apostrophe-module',
  
  construct(self, options) {
    // 保存定时任务引用，以便后续清理
    self.scheduledJob = null;
    
    self.scheduleChecker = function() {
      // 每分钟运行一次检查
      self.scheduledJob = schedule.scheduleJob('* * * * *', async () => {
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
          console.log('查找到未发布的news',news);
          if (news.length > 0) {
            self.apos.util.info(`[定时发布器] 找到 ${news.length} 篇待发布文章`);
          }else{
            self.apos.util.info(`[定时发布器] 没有找到待发布文章`);
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
    
    // 清理定时任务的方法
    self.cleanup = function() {
      if (self.scheduledJob) {
        self.scheduledJob.cancel();
        self.scheduledJob = null;
        self.apos.util.info('[定时发布器] 已清理定时任务');
      }
    };
    
    // 监听应用关闭事件
    const cleanupHandler = () => {
      self.cleanup();
    };
    
    // 使用 once 确保只执行一次，避免重复注册
    process.once('SIGTERM', cleanupHandler);
    process.once('SIGINT', cleanupHandler);
    // exit 事件是同步的，不能使用 once，但可以安全地多次注册
    process.on('exit', cleanupHandler);
    
    // 使用 Apostrophe 的事件钩子
    self.on('apostrophe:modulesReady', 'scheduleChecker');
  }
};