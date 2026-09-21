// The npm package is already the base implementation of this module.
// Repeating its init/bundle configuration here registers every head injection
// twice, producing duplicate title and description meta tags.
module.exports = {
  options: {},
  extendMethods(self) {
    return {
      metaHead(_super, req) {
        // The site layout emits one authoritative TDK set. Keep the SEO
        // package's robots, canonical, pagination, tracking and JSON-LD nodes,
        // while removing its partial/duplicate title and description output.
        return _super(req).filter(node => {
          if (node?.name !== 'meta') {
            return true;
          }
          return ![ 'title', 'description', 'keywords' ].includes(node.attrs?.name);
        });
      }
    };
  }
};
