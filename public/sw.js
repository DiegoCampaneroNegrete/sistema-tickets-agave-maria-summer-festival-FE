const CACHE_NAME = 'agave-tickets-v1'
const URLS_TO_CACHE = [
  '/',
  '/styles/globals.css',
  '/manifest.json'
]

// Instalar el Service Worker
self.addEventListener('install', event => {
  console.log('[Service Worker] Instalando...')
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[Service Worker] Cache abierto')
      return cache.addAll(URLS_TO_CACHE).catch(err => {
        console.log('[Service Worker] Error en cache:', err)
      })
    })
  )
  self.skipWaiting()
})

// Activar el Service Worker
self.addEventListener('activate', event => {
  console.log('[Service Worker] Activando...')
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('[Service Worker] Eliminando cache antiguo:', cacheName)
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
  self.clients.claim()
})

// Estrategia de caché: Network First, fallback to Cache
self.addEventListener('fetch', event => {
  // Solo cachear GET requests
  if (event.request.method !== 'GET') {
    return
  }

  event.respondWith(
    fetch(event.request)
      .then(response => {
        // No cachear respuestas inválidas
        if (!response || response.status !== 200 || response.type === 'error') {
          return response
        }

        // Clonar la respuesta
        const responseToCache = response.clone()
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, responseToCache)
        })

        return response
      })
      .catch(() => {
        // Si la red falla, intentar desde el cache
        return caches.match(event.request).then(response => {
          return response || new Response(
            JSON.stringify({ error: 'Sin conexión' }),
            { status: 503, statusText: 'Sin conexión' }
          )
        })
      })
  )
})
