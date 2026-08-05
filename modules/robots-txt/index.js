/** Serve a crawler-safe robots.txt independently of legacy Global settings. */
export default {
  middleware() {
    return {
      robotsTxt: {
        before: '@apostrophecms/express',
        middleware(req, res, next) {
          if (req.path !== '/robots.txt') {
            return next();
          }
          res.type('text/plain');
          return res.send('User-agent: *\nDisallow: \n\nSitemap: https://www.wenaili.com/sitemap.xml\n');
        }
      }
    };
  }
};