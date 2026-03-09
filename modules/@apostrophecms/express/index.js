export default {
  options: {
    session: {
      secret: process.env.APOSTROPHE_SESSION_SECRET || 'f3a7b9c8e5d2f1a0b4c6e8d9f2a1b3c5e7f9a8b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6',
      csrf: false
    },
    apiKeys: {
      [process.env.NEWS_API_KEY || 'changeme']: {
        role: 'admin'
      }
    }
  }
};
