/**
 * llms-txt 模块
 * 
 * 为网站生成 llms.txt 文件，帮助 AI/LLM 更好地理解网站内容
 * 参考: https://llmstxt.org/
 */

export default {
  options: {
    enabled: true
  },

  init(self) {
    // 直接在 Express app 上注册路由，避免 API 前缀
    self.apos.app.get('/llms.txt', async (req, res) => {
      if (!self.options.enabled) {
        return res.status(404).send('Not Found');
      }
      try {
        const content = await self.generateLlmsTxt();
        res.type('text/plain; charset=utf-8');
        res.send(content);
      } catch (error) {
        self.apos.util.error('llms-txt error:', error);
        res.status(500).send('Internal Server Error');
      }
    });

    self.apos.app.get('/llms-full.txt', async (req, res) => {
      if (!self.options.enabled) {
        return res.status(404).send('Not Found');
      }
      try {
        const content = await self.generateLlmsFullTxt();
        res.type('text/plain; charset=utf-8');
        res.send(content);
      } catch (error) {
        self.apos.util.error('llms-txt error:', error);
        res.status(500).send('Internal Server Error');
      }
    });
  },

  methods(self) {
    return {
      async generateLlmsTxt() {
        const baseUrl = self.apos.baseUrl || 'https://www.wenaili.com';

        let content = `# 上海奈李信息技术有限公司（Wenaili）

> 10年专注货代物流行业数字化营销与品牌建设，为物流货代公司提供专业的市场部及技术部代运营服务。

## 关于我们

奈李（Wenaili）是一家专注于为物流货代公司提供市场部及技术部代运营服务的专业机构。凭借10年的货代行业经验，服务合作客户50+，覆盖城市30+，客户满意度99.8%。

## 核心服务

- [市场部代运营](${baseUrl}/services/marketing): 市场策划、品牌推广、获客转化
- [技术部代运营](${baseUrl}/services/technology): 系统开发、维护、优化
- [品牌设计与建设](${baseUrl}/services/branding): 品牌设计、视觉识别系统建设
- [网站建设与优化](${baseUrl}/services/website): 官方网站建设、SEO优化
- [数据分析与运营](${baseUrl}/services/data): 运营决策支持、业务流程优化
- [数字化AI工具](${baseUrl}/services/ai): 定制AI智能工具、流程自动化

## 服务优势

- 专业高效: 10年货代行业经验
- 专业团队: 市场和技术专家组成
- 定制方案: 量身定制解决方案
- 全程支持: 7×24小时客户服务
- 技术驱动: 先进技术和工具
- 成本优化: 降低运营成本

## 联系方式

- 公司地址: 上海市奉贤区场中路629号
- 联系电话: 17367332304
- 电子邮箱: melanie@wenaili.com
- 工作时间: 周一至周五 9:00-18:00

## 更多信息

- [最新资讯](${baseUrl}/news): 行业前沿资讯、展会信息
- [案例展示](${baseUrl}/cases): 客户成功案例
`;

        return content;
      },

      async generateLlmsFullTxt() {
        const req = self.apos.task.getReq();
        const baseUrl = self.apos.baseUrl || 'https://www.wenaili.com';
        
        let content = await self.generateLlmsTxt();
        
        // 动态获取新闻
        const news = await self.getPublishedNews(req);
        if (news.length > 0) {
          content += `\n## 最新资讯详情\n\n`;
          for (const item of news.slice(0, 10)) {
            const slug = item.slug || '';
            const url = item._url || `${baseUrl}/news/${slug}`;
            content += `- [${item.title}](${url})\n`;
          }
        }

        // 动态获取案例
        const cases = await self.getPublishedCases(req);
        if (cases.length > 0) {
          content += `\n## 案例展示详情\n\n`;
          for (const item of cases.slice(0, 10)) {
            const slug = item.slug || '';
            const url = item._url || `${baseUrl}/cases/${slug}`;
            content += `- [${item.title}](${url})\n`;
          }
        }

        return content;
      },

      async getPublishedNews(req) {
        try {
          const newsModule = self.apos.modules.news;
          if (!newsModule) {
            self.apos.util.info('llms-txt: news module not found');
            return [];
          }
          const results = await newsModule.find(req)
            .sort({ publishedAt: -1, createdAt: -1 })
            .limit(10)
            .toArray();
          self.apos.util.info(`llms-txt: found ${results.length} news items`);
          return results;
        } catch (error) {
          self.apos.util.error('llms-txt: Error fetching news', error);
          return [];
        }
      },

      async getPublishedCases(req) {
        try {
          const caseModule = self.apos.modules.case;
          if (!caseModule) {
            self.apos.util.info('llms-txt: case module not found');
            return [];
          }
          const results = await caseModule.find(req)
            .sort({ updatedAt: -1, createdAt: -1 })
            .limit(10)
            .toArray();
          self.apos.util.info(`llms-txt: found ${results.length} case items`);
          return results;
        } catch (error) {
          self.apos.util.error('llms-txt: Error fetching cases', error);
          return [];
        }
      }
    };
  }
};
