/** Preserve legacy links while retired page documents are reviewed. */
export default {
  middleware() {
    const redirects = {
      '/aboutme': '/about',
      '/aboutme/': '/about',
      '/aboutme/contact': '/contact',
      '/aboutme/contact/': '/contact'
    };
    return {
      legacyRedirects: {
        before: '@apostrophecms/express',
        middleware(req, res, next) {
          const destination = redirects[req.path];
          return destination ? res.redirect(301, destination) : next();
        }
      }
    };
  }
};