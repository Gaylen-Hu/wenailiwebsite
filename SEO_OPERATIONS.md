# SEO operations

The release command now rebuilds Apostrophe's cached sitemap before deployment completes:

```sh
npm run release
```

When content changes outside a release, refresh the sitemap cache from one production application instance:

```sh
npm run sitemap:refresh
```

Schedule that command once per day (or immediately after a bulk content import). The `/sitemap.xml` request then returns the cached XML instead of building it while a crawler waits.