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
        res.setHeader('Cache-Control', 'public, max-age=3600');
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
        res.setHeader('Cache-Control', 'public, max-age=3600');
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
        const baseUrl = String(self.apos.baseUrl || 'https://www.wenaili.com').replace(/\/$/, '');

        const content = `# Wenaili - Shanghai Wenaili Information Technology Co., Ltd.

> Wenaili（奈李AI物流实验室 / 上海奈李信息技术有限公司）专注货代物流行业数字化营销与AI落地，为货代企业提供市场部代运营、技术部代运营、GEO优化、官网建设、品牌设计、数据分析和获客服务。

## Company

- [About Wenaili](${baseUrl}/aboutus): 上海奈李信息技术有限公司（Wenaili），2015年成立，专注货代物流数字化营销、品牌建设与AI落地
- [Contact Us](${baseUrl}/contact): 上海市奉贤区场中路629号 | 17367332304 | melanie@wenaili.com

## Services

- [Marketing Managed Operations](${baseUrl}/services/marketing): 货代市场部代运营、市场策划、品牌推广与获客转化
- [AI Adoption & Digital Tools](${baseUrl}/services/team): 货代AI落地、流程自动化与数字化工具
- [Website Building & SEO/GEO](${baseUrl}/services/website): 货代官网建设、SEO与GEO优化
- [Brand Design](${baseUrl}/services/brand): 货代品牌设计与视觉识别系统建设
- [Data Analysis](${baseUrl}/services/data): 货代经营数据分析与运营决策支持
- [Technical Managed Operations](${baseUrl}/services/tech): 系统开发、维护与技术部代运营

## Knowledge and Cases

- [Industry Insights](${baseUrl}/new): 货代物流行业趋势、数字营销、AI落地与GEO实践
- [Success Cases](${baseUrl}/cases): 客户项目与实施成果
- [Frequently Asked Questions](${baseUrl}/faq): 服务、价格、技术支持与实施常见问题

## English

- [English Home](${baseUrl}/en/): Wenaili services for freight forwarders and logistics companies
- [English Insights](${baseUrl}/en/new): Freight forwarding, logistics, AI adoption and digital marketing insights
`;

        return content;
      },

      async generateLlmsFullTxt() {
        const req = self.apos.task.getReq();
        const baseUrl = String(self.apos.baseUrl || 'https://www.wenaili.com').replace(/\/$/, '');
        
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
