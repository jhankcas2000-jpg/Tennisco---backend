const CACHE = 'tennisco-inv-v2';
const URLS = [
  '/inventario.html',
  '/manifest.json',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(URLS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(ks => Promise.all(
      ks.filter(k => k !== CACHE).map(k => caches.delete(k))
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  // API calls: network first, no cache
  if (url.pathname.startsWith('/api/')) {
    e.respondWith(fetch(e.request).catch(() => new Response(
      JSON.stringify({ ok: false, mensaje: 'Sin conexion' }),
      { headers: { 'Content-Type': 'application/json' } }
    )));
    return;
  }
  // Everything else: cache first, then network
  e.respondWith(
    caches.match(e.request).then(r => {
      if (r) return r;
      return fetch(e.request).then(resp => {
        if (resp.ok) {
          const clone = resp.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return resp;
      }).catch(() => new Response('Sin conexion', { status: 503 }));
    })
  );
});
