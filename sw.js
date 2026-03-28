// =============================================================================
// Service Worker — erenaraz.com (v4)
// FIXED: Response consumption race condition
// =============================================================================
const CACHE_NAME = 'potential-site-v4';

const PRECACHE_URLS = [
    './',
    'index.html',
    'potential.html',
    'potential-landing.html',
    'styles/main.css',
    'styles/components.css',
    'styles/animations.css',
    'styles/potential.css',
    'styles/landing.css',
    'styles/chessboard-1.0.0.min.css',
    'js/main.js',
    'js/game-manager.js',
    'js/potential.js',
    'js/engine-worker.js',
    'js/jquery-3.7.0.min.js',
    'js/chess-0.10.3.min.js',
    'js/chessboard-1.0.0.min.js'
];

// Helper to inject isolation headers
function withCoiHeaders(response) {
    if (!response || response.status === 0 || response.type === 'opaque') {
        return response;
    }

    const headers = new Headers(response.headers);
    headers.set('Cross-Origin-Embedder-Policy', 'credentialless');
    headers.set('Cross-Origin-Opener-Policy', 'same-origin');

    return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: headers
    });
}

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(PRECACHE_URLS))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
        ).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);

    // Tier 1: Navigation - Network First + COOP/COEP
    if (event.request.mode === 'navigate') {
        event.respondWith(
            fetch(event.request)
                .then(response => {
                    const cacheCopy = response.clone();
                    caches.open(CACHE_NAME).then(cache => cache.put(event.request, cacheCopy));
                    return withCoiHeaders(response);
                })
                .catch(() => caches.match(event.request).then(cached => withCoiHeaders(cached)))
        );
        return;
    }

    // Tier 2: Same-origin static assets - Stale While Revalidate
    if (url.origin === self.location.origin) {
        event.respondWith(
            caches.match(event.request).then(cached => {
                const networkFetch = fetch(event.request).then(response => {
                    if (response && response.status === 200) {
                        const cacheCopy = response.clone();
                        caches.open(CACHE_NAME).then(cache => cache.put(event.request, cacheCopy));
                    }
                    return response;
                }).catch(() => null);

                return cached || networkFetch;
            })
        );
        return;
    }

    // Tier 3: Cross-origin (CDNs, Fonts) - Simple Fetch
    event.respondWith(fetch(event.request));
});
