# 项目字段与约定

基于 2026-09-22 本地项目源码，基线提交 d002acd。站点域名由负责人提供，不硬编码服务器 IP。`WENAILI_BASE_URL` 表示确认过的 HTTPS 站点 origin，`WENAILI_API_KEY` 为操作者受控环境中的凭据别名，其值由管理员从服务端 NEWS_API_KEY 配置提供；不要拷贝整个 .env.production。

## 内容字段

以下“运营必填”包含本技能的质量要求，不代表服务端都强制。

| 用途 | 新闻 news | 案例 case |
| --- | --- | --- |
| 标题 | title，运营必填 | title，运营必填 |
| 分类 category | industry 物流资讯；exhibition 展会资讯；company 公司新闻 | market 市场代运营；tech 技术服务；brand 品牌服务；consulting 管理咨询；digital 数字化转型 |
| 摘要 | excerpt，必填 | summary，必填，不是 excerpt |
| 日期 | publishedAt，YYYY-MM-DD，运营必填，显示日期 | projectPeriod，自由文本项目周期；不要照搬 publishedAt |
| 作者/客户 | author，默认奈李资讯团队 | company 必填；公开客户名称或经许可的匿名名称 |
| 封面 | _coverImage，最多 1 个图片文档关系，运营必填 | 同左 |
| 正文 | body，area 对象，运营必填 | 同左 |
| 推荐 | highlight 默认 false，热门资讯 | featured 默认 false，首页推荐 |
| 标签/成果 | tags: [{"tag":"物流"}] | results: [{"label":"指标名称","value":"有证据的结果及口径","icon":"fa-check-circle"}] |
| 其他 | readUrl 留空表示站内文章；非空会跳外链 | industry 行业；ctaLabel/ctaUrl 可选，链接必须确认为真实有效 |

共同 SEO 字段：`seoTitle`、`seoDescription`、`seoKeywords` 均为字符串；关键词用逗号分隔，不是数组。`seoRobots` 是数组，普通公开文章不勾选 noindex/nofollow（新建可空数组）。不随意改旧文 robots/canonical。

共同排期字段：`scheduledPublish`、`scheduledUnpublish` 为 dateAndTime；使用带时区的 ISO 8601 字符串，未使用时新建请求省略，不用 false。取消旧排期通过后台清空并回读，若走 API 先核对当前版本清空值语义，不能盲发 false。

slug 新建可由后台生成；明确要求自定义时使用唯一、稳定、可读值，并接受服务端规范化结果。案例有 `case-` 前缀约定，不重复加前缀。更新不要重新生成 slug。

## 正文数据

```json
{"body":{"items":[{"type":"html-content","styleMode":"semantic","html":"<p class=\"article-lead\">导语</p><h2>小标题</h2><p>正文</p>"}]}}
```

新建 widget 的 ID 由服务端处理；更新先读旧 body 并保留已有 widget ID 和非本次修改的组件，不以模板覆盖整个区域。API 的 body.items、tags、results 是集合，整字段替换可能移除旧条目。

news 允许 rich-text/image/video/columns/html-content。case 还允许 project-background、project-results、brand-upgrade-process、brand-visual-showcase、project-highlights、client-testimonial、case-cta；本包不虚构其数据结构。只有通过当前后台或已核对该组件 schema 才创建这些组件；默认语义化正文已够用。

## 实际代码依据（供维护者复核）

- modules/news/index.js、modules/case/index.js：分类、字段、区域组件。
- modules/html-content-widget/index.js 与 views/widget.html：semantic 清洗；历史无 styleMode 可能回退 legacy。
- modules/asset/ui/src/scss/_article.scss：可用排版类与表格移动端滚动。
- modules/news-page/views/index.html、modules/case-page/views/index.html：object-cover 裁切。
- modules/@apostrophecms/attachment/index.js、modules/upload-limit/index.js：10 MiB 请求限制。
- modules/@apostrophecms/express/index.js：ApiKey 管理员鉴权。
- modules/@apostrophecms/seo/modules/@apostrophecms/seo-fields-doc-type/index.js：TDK 字段。
- node_modules/apostrophe/modules/@apostrophecms/{piece-type,image,attachment,schema,i18n}：REST、图片关系、语言模式。

公开新闻列表 `/new`，案例 `/cases`；英文前缀 `/en`。详情从返回 `_url` 或真实列表链接取得，不拼 `/news/slug`。API 路径 news 与公开列表 new 不同。
