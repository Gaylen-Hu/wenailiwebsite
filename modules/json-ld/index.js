/** JSON-LD helpers for Nunjucks templates. */
export default {
  init(self) {
    self.apos.template.addFilter({
      jsonLd: self.jsonLd,
      absoluteUrl: self.absoluteUrl,
      canonicalUrl: self.canonicalUrl
    });
  },
  methods(self) {
    return {
      jsonLd(value) {
        return JSON.stringify(value === undefined ? null : value)
          .replace(/[<>&\u2028\u2029]/g, character => ({
            '<': '\\u003c',
            '>': '\\u003e',
            '&': '\\u0026',
            '\u2028': '\\u2028',
            '\u2029': '\\u2029'
          })[character]);
      },
      absoluteUrl(url, baseUrl) {
        if (!url) return null;
        try {
          return new URL(url, baseUrl).toString();
        } catch (error) {
          return url;
        }
      },
      canonicalUrl(url, baseUrl) {
        if (!url) return null;
        try {
          const canonical = new URL(url, baseUrl);
          canonical.search = '';
          canonical.hash = '';
          return canonical.toString();
        } catch (error) {
          return url;
        }
      }
    };
  }
};
