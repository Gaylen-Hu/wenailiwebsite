# Redis cache

The official `@apostrophecms/cache-redis` extension stores Apostrophe's cache in
Redis. The existing `cache-layer` stores public business data in a separate
`business:` namespace. Sessions and primary content remain in MongoDB.

Configure the server's `/home/wenailiwebsite/.env.production` (never commit credentials):

```dotenv
REDIS_URL=redis://127.0.0.1:6379
REDIS_CACHE_PREFIX=wenaili:core
DISABLE_REDIS=0
```

With `NODE_ENV=production`, the app loads `.env.production` first, then `.env`
for missing values. It never loads `.env.local` in production. Explicit process
environment variables take precedence. The production build, PM2 configuration
and scheduled-publishing runner already set `NODE_ENV=production`.

Use a different prefix for staging or another site sharing Redis. Keep Redis on
loopback or a private network; do not expose port 6379 publicly. On Ubuntu, if
Redis is not already installed:

```sh
sudo apt-get update
sudo apt-get install -y redis-server
sudo systemctl enable --now redis-server
redis-cli ping
```

`PONG` confirms the local service is reachable. For a remote service use its
authenticated `redis://` or TLS `rediss://` URL. When enabled, Redis must be
reachable at app startup; connection retries are bounded so configuration errors
fail visibly. Use `DISABLE_REDIS=1` for development without Redis: core caching
then uses MongoDB and business caching is bypassed.

Deploy through the existing workflow. Build may bypass Redis, but migration,
sitemap refresh, scheduled publishing and the website use the same cache backend.
Both clients close during Apostrophe shutdown so CLI tasks exit normally.

Verify application-level connectivity with
`NODE_ENV=production node app @apostrophecms/cache:verify-redis`. This creates
short-lived, uniquely named probes and removes only those probes. CI runs this
check against its Redis service.

Logged-in users and draft previews bypass business caches. News tags and FAQ
categories have locale-specific keys. Business cache clearing only removes this
project's business namespace, not other sites or Apostrophe core cache.

This extension accelerates core cache access; it does not cache full admin pages
or reduce the administrator interface's JavaScript bundle size.
