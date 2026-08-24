/** Serve a crawler-safe robots.txt independently of legacy Global settings. */
export default {
  middleware(self) {
    return {
      robotsTxt: {
        before: '@apostrophecms/express',
        middleware(req, res, next) {
          if (req.path !== '/robots.txt') {
            return next();
          }
          const baseUrl = String(self.apos.baseUrl || 'https://www.wenaili.com')
            .replace(/\/$/, '');
          res.type('text/plain; charset=utf-8');
          res.setHeader('Cache-Control', 'public, max-age=3600');
          return res.send(
            'User-agent: *\n' +
            'Allow: /\n\n' +
            `Sitemap: ${baseUrl}/sitemap.xml\n`
          );
        }
      }
    };
  }
};
