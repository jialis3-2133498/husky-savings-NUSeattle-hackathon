const CACHE_NAME = "husky-savings-v1";
const ASSETS = [
  "/",
  "/index.html",
  "/data/discounts.json",
];

// Install: cache core assets
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// Activate: clean up old caches
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch: cache-first for discounts.json, network-first for everything else
self.addEventListener("fetch", (e) => {
  if (e.request.url.includes("discounts.json")) {
    e.respondWith(
      caches.match(e.request).then((cached) => cached || fetch(e.request))
    );
  } else {
    e.respondWith(
      fetch(e.request).catch(() => caches.match(e.request))
    );
  }
});