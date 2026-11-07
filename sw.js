// Generated from the production build. A new asset changes this version.
const SCOPE = self.registration.scope;
const PREFIX = 'fractal-lab:' + SCOPE + ':';
const CACHE = PREFIX + "433d75a130add442";
const ASSETS = ["assets/fractal-worker-D8ffHVeO.js","assets/index-BmqQsfCo.css","assets/index-WGvoFvdN.js","icons/icon-180.png","icons/icon-192.png","icons/icon-512.png","icons/icon.svg","index.html","manifest.webmanifest"].map(path => new URL(path, SCOPE).href);
const INDEX = new URL('index.html', SCOPE).href;

self.addEventListener('install', event => {
  // Only a complete download can become the next offline app.
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)));
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(names.filter(name => name.startsWith(PREFIX) && name !== CACHE)
      .map(name => caches.delete(name)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  const entry = event.request.mode === 'navigate' &&
    (url.origin + url.pathname === SCOPE || url.origin + url.pathname === INDEX);
  // Leave other sites, unrelated paths, and unknown resources alone.
  if (!entry && !ASSETS.includes(url.href)) return;
  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    // These are fixed app assets. Ignore Vary: Origin from preview/CDN servers,
    // since module requests can send a different Origin header than precaching.
    return await cache.match(entry ? INDEX : url.href, { ignoreVary: true }) || fetch(event.request);
  })());
});
// Do not skip waiting: let open pages finish using their matching asset version.
