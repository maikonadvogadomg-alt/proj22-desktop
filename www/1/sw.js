const CACHE_NAME = 'suite-juridica-v1';
const URLS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/chat/index.html',
  '/playground/index.html',
  '/editor/index.html',
  '/comparador/index.html',
  '/outros/index.html'
  '/novo/index.html',
];

// Instalar
self.addEventListener('install', event => {
  console.log('Service Worker instalando...');
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Cache aberto');
      return cache.addAll(URLS_TO_CACHE).catch(err => {
        console.log('Alguns arquivos não puderam ser cacheados:', err);
      });
    })
  );
  self.skipWaiting();
});

// Ativar
self.addEventListener('activate', event => {
  console.log('Service Worker ativando...');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deletando cache antigo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch - Network first, fallback to cache
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Ignorar requisições externas
  if (url.origin !== location.origin) {
    return;
  }

  // Estratégia: Network first, cache fallback
  event.respondWith(
    fetch(request)
      .then(response => {
        // Se sucesso, atualizar cache
        if (response.ok) {
          const cache = caches.open(CACHE_NAME);
          cache.then(c => c.put(request, response.clone()));
        }
        return response;
      })
      .catch(() => {
        // Se falhar, usar cache
        return caches.match(request).then(response => {
          return response || new Response('Offline - Página não disponível', {
            status: 503,
            statusText: 'Service Unavailable',
            headers: new Headers({
              'Content-Type': 'text/plain'
            })
          });
        });
      })
  );
});
