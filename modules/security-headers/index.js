/** Baseline security headers for public and Apostrophe admin responses. */
export default {
  middleware() {
    return {
      securityHeaders: {
        before: '@apostrophecms/express',
        middleware(req, res, next) {
          res.setHeader('X-Content-Type-Options', 'nosniff');
          res.setHeader('X-Frame-Options', 'SAMEORIGIN');
          res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
          res.setHeader('Permissions-Policy', 'camera=(), geolocation=(), microphone=()');

          const isHttps = req.secure || req.get('x-forwarded-proto') === 'https';
          if (isHttps) {
            res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
          }

          if (process.env.NODE_ENV === 'production') {
            res.setHeader(
              'Content-Security-Policy',
              "default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'self'; form-action 'self'; img-src 'self' data: https:; style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com; font-src 'self' data: https://cdnjs.cloudflare.com; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://hm.baidu.com; connect-src 'self' https:; upgrade-insecure-requests"
            );
          }
          next();
        }
      }
    };
  }
};