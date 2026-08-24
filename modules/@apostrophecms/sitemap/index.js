const RETIRED_PATHS = new Set([
  '/about',
  '/news',
  '/server',
  '/aboutme',
  '/aboutme/contact'
]);

export default {
  extendMethods(self) {
    return {
      async output(_super, document) {
        if (self.format === 'text') {
          return _super(document);
        }

        if (self.excludeTypes.includes(document.type) || !document._url) {
          return;
        }

        const robots = Array.isArray(document.seoRobots)
          ? document.seoRobots
          : [];
        if (robots.includes('noindex')) {
          return;
        }

        let pathname;
        try {
          pathname = new URL(document._url, self.baseUrl).pathname.replace(/\/$/, '') || '/';
        } catch (error) {
          return;
        }

        const unprefixedPath = pathname.replace(/^\/en(?=\/|$)/, '') || '/';
        if (RETIRED_PATHS.has(unprefixedPath)) {
          return;
        }

        const locale = (document.aposLocale || self.defaultLocale).split(':')[0];
        const url = {
          id: document.aposDocId,
          locale,
          loc: document._url
        };

        const modifiedAt = document.lastPublishedAt ||
          document.updatedAt ||
          document.publishedAt ||
          document.createdAt;
        if (modifiedAt) {
          const date = new Date(modifiedAt);
          if (!Number.isNaN(date.getTime())) {
            url.lastmod = date.toISOString();
          }
        }

        self.write(locale, { url });
      }
    };
  }
};
