/** Preserve legacy links while retired page documents are reviewed. */
const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="Wenaili">
  <defs><linearGradient id="brand" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2563eb"/><stop offset="1" stop-color="#4f46e5"/></linearGradient></defs>
  <rect width="64" height="64" rx="14" fill="url(#brand)"/>
  <path d="M15 17h9l8 19 8-19h9L36 48h-8L15 17Z" fill="#fff"/>
</svg>`;

export default {
  middleware() {
    const redirects = {
      '/aboutme': '/aboutus',
      '/aboutme/contact': '/contact',
      '/about': '/aboutus',
      '/news': '/new',
      '/server': '/services',
      '/faqs': '/faq',
      '/case': '/cases',
      '/favicon.ico': '/favicon.svg',
      '/services/technology': '/services/tech',
      '/services/branding': '/services/brand',
      '/services/ai': '/services/team'
    };
    return {
      legacyRedirects: {
        before: '@apostrophecms/express',
        middleware(req, res, next) {
          const normalizedPath = req.path.replace(/\/+$/, '') || '/';
          const localePrefix = normalizedPath === '/en' || normalizedPath.startsWith('/en/')
            ? '/en'
            : '';
          const localPath = localePrefix
            ? normalizedPath.slice(localePrefix.length) || '/'
            : normalizedPath;

          if (localPath === '/favicon.svg') {
            res.type('image/svg+xml');
            res.set('Cache-Control', 'public, max-age=86400');
            return res.send(favicon);
          }

          const destination = redirects[localPath];

          return destination
            ? res.redirect(301, `${localePrefix}${destination}`)
            : next();
        }
      }
    };
  }
};
