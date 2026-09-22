# API 全流程

本文件是给具备 HTTP/文件工具的代理的请求契约，不要求运营手工拼接命令。没有工具或授权时交付稿件并走后台，不假报接口成功。真实凭据禁止写入请求示例文件。

## 0. 连接与查重

从受控环境读 WENAILI_BASE_URL 和 WENAILI_API_KEY。确认前者是负责人指定的 HTTPS origin，无用户信息或额外路径；本地 HTTP 仅限明确指定的开发环境。目标内容默认为 zh，只有明确要求英文时用 en。

认证头：`Authorization: ApiKey <环境变量中的值>`，**不是 Bearer**。JSON 请求使用 `Content-Type: application/json`。超时设有限值；禁止关闭 TLS 校验，禁止跨域转发认证头。不把 key 放 URL、命令历史或输出日志。

所有下列路径相对已确认 BASE；示例 `?aposLocale=zh&aposMode=draft` 中 `&` 是普通 URL 参数分隔符（不是 HTML 实体）。英文将 zh 替换为 en。URL 路径中的文档 ID 必须整体 URL 编码，保留服务端实际 ID，不手工改冒号后缀。

先 `GET /api/v1/news?aposLocale=zh&aposMode=draft&search=URL编码后的标题`（案例换 case）。列表从 `results` 中核对标题、slug、语言、已有状态；必要时翻页。搜索命中不等于同一篇，编辑旧文用负责人指定 ID。记录本次目标标题/slug/返回 ID；POST 超时结果不明时先查询确认，不能直接重试创建。

## 1. 上传附件

`POST /api/v1/@apostrophecms/attachment/upload?aposLocale=zh&aposMode=draft`

- multipart/form-data，仅 1 个文件，字段名 `file`。
- 让 HTTP 库生成 boundary，不手写 JSON Content-Type。
- 本项目整个 multipart 请求上限 10 MiB，参见图片规范。
- 返回是附件对象本身，常见有 `_id`、`name`、`extension`、`width`、`height`、`_urls`；不要臆造 `response.data.attachment` 包装。
- 记录 attachment ID 和真实 `_urls`，从实际存在的尺寸 URL 选择合适正文版本；若没有 `_urls`，继续读取图片文档或后台查看，不拼接 OSS 地址。

## 2. 建立图片库记录

`POST /api/v1/@apostrophecms/image?aposLocale=zh&aposMode=draft`

```json
{
  "title": "描述该图的短名称",
  "attachment": "此处必须替换为上一步返回的完整附件对象，不能保留字符串",
  "alt": "客观说明图片主体及用途",
  "credit": "实际署名；无需署名时留空",
  "creditUrl": "实际来源链接；没有时留空"
}
```

这段仅说明映射，attachment 的真实类型是对象。图片模块 autopublish=true，图片库记录/附件可能立刻公开，不能上传尚不允许公开的素材。保存返回图片文档的 `_id`。

文章封面关系为：`"_coverImage": [{"_id":"真实图片文档ID"}]`。不是文件路径、URL 或 attachment ID。图片库已存在则直接复用其图片文档 ID，不重复上传。

## 3. 创建或修改草稿

新建：`POST /api/v1/news?aposLocale=zh&aposMode=draft`，案例换 case。内容参考 assets 下 JSON，替换全部 `__...__` 占位符，填入真正正文 HTML 后执行离线 preflight。

不要发送 `_publish`，不要用 `published:true`、`aposMode:published` 等自创字段发布，也不要把服务端系统字段整包回传。省略 scheduledPublish 表示此次不设排期；模板不包含排期。服务端返回记录对象，保存其 `_id`、slug、实际状态及 `_url`（如有）。

回读：`GET /api/v1/news/{URL编码的ID}?aposLocale=zh&aposMode=draft`。检查图片关系确实非空、正文存入、TDK 未丢失。HTML 清洗发生在渲染层，数据库里存在 HTML 不代表页面一定显示，必须看预览。

更新已有草稿：先 GET 并保留变更前快照，再 `PATCH /api/v1/news/{ID}?aposLocale=zh&aposMode=draft` 只传必要字段。不要用 PUT 发送零散字段。替换 body、tags、results、_coverImage 前必须合并保留不在修改范围内的数据，保留已有组件 ID。先检查编辑锁/其他人修改，不绕过锁或强制覆盖。

## 4. 预览与授权

以后台提供的草稿预览入口为准。`_url` 可能只是公开地址；未发布时无痕 404 不代表草稿失败，不能为了测试擅自发布。缺少浏览器能力就提供草稿 ID 和人工预览清单，明确等待视觉验收。

## 5A. 立即发布

确认该篇当前版本获发布授权、验收通过后：

`POST /api/v1/news/{ID}/publish?aposLocale=zh&aposMode=draft`，JSON body `{}`，案例换 case。

检查 HTTP 状态及响应，而非仅请求已发出。再查询同一记录的 published 版本，可用服务端返回的 aposDocId 配 `aposMode=published`，避免把明确带 :draft 后缀的 ID 当 published 版本。也从未登录详情 URL 验证实际内容。公开 URL 来自服务端或真实列表链接；不要猜路径。

## 5B. 定时发布

用户给出日期、时间和时区后，核实未来时间。例：2026-10-01 09:00 Asia/Shanghai 对应 `2026-10-01T01:00:00.000Z`（例子不能直接用作真实排期）。

在同一草稿 PATCH `{"scheduledPublish":"实际UTC ISO时间"}`，保存后 GET 确认精确时间。**不要同时调用 publish。** `publishedAt` 按文章希望展示的业务日期另填。scheduledUnpublish 仅在用户要求时设置，须晚于发布时间。

部署基线的调度脚本每 5 分钟运行，受任务时长/服务器状态影响，不承诺秒级上线。排期成功不是已经发布。让负责人确认生产 cron 正常；如果没有持续检查能力，把到期复核时间交给运营，不承诺自行长期监控。

若旧文已经上线，不能假设设置排期会将它隐藏；先回读现有状态，向用户说明“更新上线文”和“首发新草稿”的区别。下架需单独授权。

## 6. 验收与错误处理

- 401/403：停止写入，核对认证方案、目标域名与授权，不换用其他用户凭据猜测。
- 400：按错误字段核对类型和枚举；不为通过验证删除必需事实/封面/摘要。
- 404：检查 API 路径、ID 编码、语言和模式；不盲目重新创建。
- 409/编辑锁：停下请编辑者确认，不能强制解锁。
- 413：减小图片/请求体；不能自动放开上传安全限制。
- 429/5xx/超时：读请求可有限退避重试；写请求先回读确认结果，仍不明确则停止并报告，避免重复上传、建文和发布。
- 列表未出现：检查 published 状态、语言、分类、分页与缓存。项目部分列表有缓存；不要据此重复创建或清空全站 Redis。公开详情正常但列表延迟时如实记录并交维护者。
- 内容有严重问题：先报告并保留证据；只有获准才对准确 ID 调用 `POST /api/v1/{news或case}/{ID}/unpublish`。不以删除文档/附件作为撤回方法。重新发布旧备份同样需要授权及核验。

验收必须覆盖：未登录详情正确、封面/正文图可访问、列表缩略图不裁关键信息、HTML head 的 title/description/keywords 与本篇一致。不要携带凭据抓取外部来源或 CDN。
