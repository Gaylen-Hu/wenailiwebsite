# 闻爱里企业官网

基于 ApostropheCMS 4 的企业官网项目，包含案例、新闻、FAQ、服务页面及后台内容管理。

## 环境要求

- Node.js `>=20.18.1 <23`
- npm `>=10`
- MongoDB 7+

## 本地开发

1. 复制环境变量模板并填写本地配置：

   ```powershell
   Copy-Item .env.example .env.local
   ```

2. 安装依赖并启动：

   ```powershell
   npm ci
   npm run dev
   ```

3. 访问 `http://localhost:3000`。

在 Windows CMD 中切换到项目目录时，应使用：

```bat
cd /d D:\demo\web\naili\wenailiwebsite
```

## GitHub Actions CI/CD

工作流位于 `.github/workflows/ci-cd.yml`。

- Pull Request 到 `master`：安装锁定依赖、检查 JavaScript 语法、连接 MongoDB 7 和 Redis 7、验证数据库迁移并完成 Apostrophe 生产构建。
- 推送到 `master`：CI 全部通过后部署到生产服务器。
- 手动运行：在 GitHub Actions 页面使用 `workflow_dispatch`，仅从 `master` 部署。
- 部署过程：检出本次已经通过 CI 的提交，运行 `npm ci`、生产资源构建、数据库迁移、sitemap 刷新、PM2 重载和 HTTP 健康检查。
- 同一时间只允许一个生产部署，避免并发修改同一服务器目录。

### GitHub 生产环境

在仓库的 `Settings → Environments` 中创建名为 `production` 的 Environment。建议只允许 `master` 部署，并按需要开启人工审批。

在该 Environment 中添加以下 Secrets：

| Secret | 说明 |
| --- | --- |
| `DEPLOY_HOST` | 生产服务器域名或 IP |
| `DEPLOY_PORT` | SSH 端口，通常为 `22` |
| `DEPLOY_USER` | 非 root 部署用户 |
| `DEPLOY_SSH_KEY` | 专用部署私钥，公钥需加入服务器 `authorized_keys` |
| `DEPLOY_KNOWN_HOSTS` | 服务器 SSH 主机公钥记录 |
| `DEPLOY_PATH` | 服务器上的仓库绝对路径，例如 `/var/www/wenailiwebsite` |

可以在可信网络中生成 `DEPLOY_KNOWN_HOSTS` 的值：

```bash
ssh-keyscan -p 22 -H your.server.example.com
```

不要把主机指纹检查关闭，也不要把应用密钥放进工作流文件。

### 生产服务器首次准备

服务器需要安装 Git、Node.js 20、npm 10、PM2、curl，并能够访问生产 MongoDB。部署用户需要拥有项目目录的写权限，同时具备拉取 GitHub 仓库的权限。

```bash
sudo npm install --global pm2
git clone git@github.com:Gaylen-Hu/wenailiwebsite.git /var/www/wenailiwebsite
cd /var/www/wenailiwebsite
cp .env.example .env
chmod 600 .env
```

编辑服务器上的 `.env`，至少配置以下生产值：

```dotenv
APOS_BASE_URL=https://www.wenaili.com
APOS_MONGODB_URI=mongodb://user:password@host:27017/wenaili
APOS_SECRET=生成的长随机值
APOSTROPHE_SESSION_SECRET=另一个长随机值
NEWS_API_KEY=生成的长随机值
APOS_S3_BUCKET=your-bucket
APOS_S3_KEY=your-access-key
APOS_S3_SECRET=your-access-secret
APOS_S3_REGION=oss-cn-hangzhou
APOS_S3_ENDPOINT=https://oss-cn-hangzhou.aliyuncs.com
```

生产密钥只保存在服务器的 `.env` 中。PM2 配置文件不包含密钥，部署时会保留服务器上的 `.env`。

如果服务器目录中已有未被 Git 跟踪的 `package-lock.json` 或 `ecosystem.config.cjs`，首次启用该工作流前请先将它们备份到项目目录之外，否则 Git 会为避免覆盖本地文件而停止部署。

服务器首次准备完成后，推送 `master` 或在 Actions 页面手动运行工作流即可。PM2 会使用 `ecosystem.config.cjs` 启动或无停机重载应用，并将日志写入 `logs/`。

### 常用生产命令

```bash
pm2 status
pm2 logs wenaili-app
pm2 restart wenaili-app --update-env
pm2 save
```

## 手动生产构建

如果需要在服务器上手动发布：

```bash
export NODE_ENV=production
export APOS_RELEASE_ID="$(git rev-parse HEAD)"
npm ci
npm run build
node app @apostrophecms/migration:migrate
npm run sitemap:refresh
mkdir -p logs
pm2 startOrReload ecosystem.config.cjs --env production --update-env
pm2 save
```

ApostropheCMS 的生产部署说明见：[Hosting Apostrophe in production](https://apostrophecms.com/docs/guide/hosting.html)。
