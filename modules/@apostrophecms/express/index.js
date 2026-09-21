const isProduction = process.env.NODE_ENV === 'production';
const sessionSecret = process.env.APOSTROPHE_SESSION_SECRET || (
  isProduction ? undefined : 'development-only-session-secret'
);

if (!sessionSecret) {
  throw new Error('APOSTROPHE_SESSION_SECRET must be set in production.');
}

// REST API 密钥：未配置时不注册任何密钥。
// 注意不要用 `|| 'changeme'` 之类的兜底值 —— 那会在 .env 丢失时静默注册一个
// role 为 admin 的固定密钥，等于留了个后门。
const apiKeys = {};

if (process.env.NEWS_API_KEY) {
  apiKeys[process.env.NEWS_API_KEY] = {
    role: 'admin'
  };
} else {
  console.error('[express] 未设置 NEWS_API_KEY，REST API 密钥鉴权已关闭');
}

export default {
  options: {
    session: {
      secret: sessionSecret,
      csrf: false
    },
    apiKeys
  }
};
