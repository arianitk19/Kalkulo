/* Service worker — e bën aplikacionin të punojë offline. Ndrysho VERSION pas çdo publikimi. */
const VERSION = 'kalkulo-v2.0.0';
const SHELL = [
  './', './index.html', './manifest.webmanifest', './css/styles.css',
  './js/main.js', './js/views.js', './js/panels.js', './js/assistant.js',
  './js/core/dom.js', './js/core/icons.js', './js/core/store.js', './js/core/market.js', './js/core/finance.js',
  './js/ui/components.js', './js/calculators/index.js',
  './js/calculators/paga.js', './js/calculators/trusti.js', './js/calculators/valuta.js', './js/calculators/crypto.js',
  './js/calculators/energjia.js', './js/calculators/dogana.js', './js/calculators/subvencione.js',
  './js/calculators/karburanti.js', './js/calculators/prona.js',
  './assets/icon.svg', './assets/icon-192.png', './assets/icon-512.png',
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (e) => {
  const { request } = e;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);

  // API-të e tregut: gjithmonë nga rrjeti (aplikacioni ka cache-in e vet)
  if (/er-api\.com|coingecko\.com/.test(url.hostname)) return;

  // Fontet: cache-first
  if (/fonts\.(googleapis|gstatic)\.com/.test(url.hostname)) {
    e.respondWith(caches.open(VERSION).then(async (c) => {
      const hit = await c.match(request);
      if (hit) return hit;
      const res = await fetch(request);
      c.put(request, res.clone());
      return res;
    }));
    return;
  }

  if (url.origin !== location.origin) return;

  // Skedarët e aplikacionit: stale-while-revalidate
  e.respondWith(caches.open(VERSION).then(async (c) => {
    const hit = await c.match(request, { ignoreSearch: request.mode === 'navigate' });
    const net = fetch(request).then((res) => {
      if (res.ok) c.put(request, res.clone());
      return res;
    }).catch(() => hit || (request.mode === 'navigate' ? c.match('./index.html') : undefined));
    return hit || net;
  }));
});
