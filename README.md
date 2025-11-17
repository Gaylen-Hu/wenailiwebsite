# ApostropheCMS essentials starter kit

## Getting started

This Starter Kit, also known as a boilerplate project, serves as a template for initiating new projects and is intended for use in two main ways:

1. **Using Our CLI Tool**: Run our [CLI tool](https://github.com/apostrophecms/cli) to clone this template locally, install its dependencies, and set up an initial admin user. You accomplish this using:
   
   `apos create <my-project-name>`
  
2. **Manual Setup**: Manually `git clone` this repository and install its dependencies using `npm install`. Add an initial admin user with `node app @apostrophecms/user:add admin admin`.

For those who need to create multiple projects with additional base modules, consider [forking this repository](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/about-forks) into your organizational or personal GitHub account. Customize it to fit your needs. To use your customized template, run the following CLI command:

  `apos create <project-name> --starter=<repo-name>`

Here, `<repo-name>` should be the URL of your forked repository, excluding the `https://github.com/` part.

**Note: This template is NOT designed to be installed into an existing project.**

## Running the project

Run `npm run dev` to build the Apostrophe UI and start the site up. Remember, this is during alpha development, so we're all in "dev mode." The `dev` script will watch for saves in client-side CSS and Javascript and trigger a build and page refresh if they are detected. It will also restart the app when server-side code is saved.

## Making it your own

This boilerplate is designed so you can install and start running it right away. If you are starting a project that will go into production one day, there are a few things you should be sure to check:

- [ ] **Update the shortname.** You don't need to perform this step if you created your project using the CLI tool. The `shortname` option in `app.js` is used for the database name (unless another is given in the `@apostrophecms/db` module). You should change this to an appropriate project name before you start adding any users or content you would like to keep.
- [ ] **Update the Express.js session secret.** The secret is set to `undefined` initially in the `modules/@apostrophecms/express/index.js` file. You should update this to a unique string.
- [ ] **Decide if you want hot reloading on.** This boilerplate uses nodemon to restart the app when files are changed. In `modules/@apostrophecms/asset/index.js` there is an option enabled to refresh the browser on restart. If you like this, do nothing. If you don't, remove the option or set it to `false`. The option has no effect when the app is in production.
- [ ] **Update the `className` options in `app.js`.** This option is set for core widget types to provide CSS styling hooks. It is namespaced with `bp-` for "boilerplate." You will likely want to update that to match your general CSS class naming practices.

## You really want the docs

Right now, [all the juicy info is in the ApostropheCMS docs](https://docs.apostrophecms.org), so head over there and start reading! This boilerplate project is a fun introduction to the UI, but you'll want to know more to really try it out.


## 启动与部署（PM2）

本项目为 Node.js 服务端应用（ApostropheCMS + Express/Koa），前端静态资源会构建到 `apos-build/` 与 `public/`，但线上进程入口始终为仓库根目录的 `./app.js`。  
已内置 `ecosystem.config.js`，可通过 [PM2](https://pm2.keymetrics.io/) 进行守护与多进程运行。

### 1）安装依赖并构建前端资源

```bash
npm ci          # 或 npm install
# 视项目脚本而定（若有）：
npm run build   # 产出/更新 apos-build 与 public 静态资源
```

> 说明：`apos-build/` 是 Apostrophe 管理端/前端资源的构建产物目录，不是 Node 进程入口。应用的启动文件始终是根目录下的 `app.js`。

### 2）本地开发启动

开发模式（热更新/自动重载）通常使用：

```bash
npm run dev
```

或使用 PM2 的 development 环境：

```bash
pm2 start ecosystem.config.js --env development
pm2 logs
```

### 3）生产部署（PM2）

1. 准备环境变量（建议使用 `.env` / 系统级环境变量，避免把敏感信息写入仓库）  
   例如创建 `.env` 或 `.env.production`（示例字段，仅供参考）：

```bash
NODE_ENV=production
PORT=3000
APOS_BASE_URL=https://your-domain.com
APOS_MONGODB_URI=mongodb://user:pass@host:27017/dbname
APOSTROPHE_SESSION_SECRET=please-change-me
# 如使用对象存储（S3/OSS），请配置相应密钥（示例占位）：
APOS_S3_BUCKET=your-bucket
APOS_S3_KEY=AKIAxxxx
APOS_S3_SECRET=xxxx
APOS_S3_REGION=your-region
APOS_S3_ENDPOINT=https://s3.your-cloud.com
```

> 不建议将真实密钥直接硬编码到 `ecosystem.config.js`；更推荐在服务器环境中通过 `export` 或使用 PM2 的 `--env production` 配合外部环境文件的方式注入。

2. 启动生产进程：

```bash
pm2 start ecosystem.config.js --env production
pm2 status
pm2 logs
```

3. 开机自启动（可选）：

```bash
pm2 save
pm2 startup
```

### 4）常用 PM2 命令

```bash
pm2 start ecosystem.config.js --env production   # 启动
pm2 restart wenaili-app                          # 重启
pm2 stop wenaili-app                             # 停止
pm2 logs                                         # 查看日志
pm2 monit                                        # 监控
pm2 list                                         # 查看列表
pm2 delete wenaili-app                           # 删除进程
```

### 5）生产环境部署步骤

**重要：在生产环境启动前，必须先构建前端资源！**

```bash
# 1. 构建前端静态资源（生成到 apos-build/ 和 public/apos-frontend/）
npm run build

# 2. 启动应用（使用生产环境配置）
pm2 start ecosystem.config.js --env production
```

**为什么需要构建？**

- 开发环境：Vite 提供热模块替换（HMR），资源通过开发服务器提供
- 生产环境：必须构建静态资源，否则会尝试访问 `__vite/@vite/client` 等开发服务器路径
- 构建后：所有前端资源会打包到 `public/apos-frontend/`，通过静态文件服务提供

**验证构建是否成功：**

```bash
# 检查构建产物
ls -la public/apos-frontend/default/
# 应该看到 apos-bundle.css 和 apos-module-bundle.js 等文件
```

### 6）日志位置

`ecosystem.config.js` 中已配置：

- 合并日志：`./logs/combined.log`
- 标准输出：`./logs/out.log`
- 错误日志：`./logs/error.log`
- 时间格式：`YYYY-MM-DD HH:mm Z`

> 注意：生产环境建议配合 logrotate 或外部日志系统（如 ELK、Cloud Logging），避免单文件无限增长。

### 7）故障排查

**问题：访问时出现 `__vite/@vite/client` 404 错误**

- **原因**：生产环境未构建或 Vite HMR 未禁用
- **解决**：
  1. 运行 `npm run build` 构建前端资源
  2. 确认 `app.js` 中 Vite 配置：`hmr: process.env.NODE_ENV === 'production' ? false : 'public'`
  3. 重启应用：`pm2 restart wenaili-app --env production`

**问题：静态资源路径不正确**

- **原因**：`APOS_BASE_URL` 环境变量未设置或设置错误
- **解决**：在 `ecosystem.config.js` 的 `env_production` 中设置正确的 `APOS_BASE_URL`

