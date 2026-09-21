const isProduction = process.env.NODE_ENV === 'production';
const sessionSecret = process.env.APOSTROPHE_SESSION_SECRET || (
  isProduction ? undefined : 'development-only-session-secret'
);

if (!sessionSecret) {
  throw new Error('APOSTROPHE_SESSION_SECRET must be set in production.');
}

const apiKeys = {};

if (process.env.NEWS_API_KEY) {
  apiKeys[process.env.NEWS_API_KEY] = {
    role: 'admin'
  };
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
