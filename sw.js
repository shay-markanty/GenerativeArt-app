// Generated from the production build. A new asset changes this version.
const SCOPE = self.registration.scope;
const PREFIX = 'fractal-lab:' + SCOPE + ':';
const CACHE = PREFIX + "1db9522aaa0b100e";
const ASSETS = ["assets/fractal-worker-D8ffHVeO.js","assets/index-BWIgulho.css","assets/index-sQYzquAX.js","icons/icon-180.png","icons/icon-192.png","icons/icon-512.png","icons/icon.svg","index.html","manifest.webmanifest","refresh.html"].map(path => new URL(path, SCOPE).href);
const INDEX = new URL('index.html', SCOPE).href;
const BUILD = "1db9522aaa0b100e";

self.addEventListener('install', event => {
  // Only a complete download can become the next offline app.
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    // A fresh worker must not precache HTML from the browser's older HTTP cache.
    await cache.addAll(ASSETS.map(url => new Request(url, { cache: 'reload' })));
    const entry = await cache.match(INDEX, { ignoreVary: true });
    if (!entry || !(await entry.text()).includes('data-fractal-build="' + BUILD + '"')) {
      throw new Error('The downloaded app does not match this update. Try again online.');
    }
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(names.filter(name => name.startsWith(PREFIX) && name !== CACHE)
      .map(name => caches.delete(name)));
    await self.clients.claim();
  })());
});

self.addEventListener('message', event => {
  // Only an explicit update request switches versions while app windows are open.
  // The browser cannot put this worker in waiting until precaching has succeeded.
  if (event.data?.type === 'ACTIVATE_UPDATE') event.waitUntil(self.skipWaiting());
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
// Normal updates wait. The refresh page can explicitly request activation.
