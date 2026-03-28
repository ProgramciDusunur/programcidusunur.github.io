// =============================================================================
// Service Worker — erenaraz.com
// Handles: Cross-Origin Isolation (COEP/COOP) + Smart Caching
// =============================================================================
const CACHE_NAME = 'potential-site-v3';

const PRECACHE_URLS = [
    '/',
    '/index.html',
    '/potential.html',
    '/potential-landing.html',
    '/styles/main.css',
    '/styles/components.css',
    '/styles/animations.css',
    '/styles/potential.css',
    '/styles/landing.css',
    '/styles/chessboard-1.0.0.min.css',
    '/js/main.js',
    '/js/game-manager.js',
    '/js/potential.js',
    '/js/engine-worker.js',
    '/js/jquery-3.7.0.min.js',
    '/js/chess-0.10.3.min.js',
    '/js/chessboard-1.0.0.min.js'
];

// -----------------------------------------------------------------------------
// Cross-Origin Isolation: Inject COOP/COEP headers
// Required for SharedArrayBuffer on GitHub Pages (which can't set HTTP headers)
// Uses 'credentialless' COEP to allow cross-origin resources (Google Fonts, CDN)
// -----------------------------------------------------------------------------
function withCoiHeaders(response) {
    if (!response) return response;
    const headers = new Headers(response.headers);
    headers.set('Cross-Origin-Embedder-Policy', 'credentialless');
    headers.set('Cross-Origin-Opener-Policy', 'same-origin');
    return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers
    });
}

// Install: Pre-cache UI assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(PRECACHE_URLS))
            .then(() => self.skipWaiting())
    );
});

// Activate: Clean old caches, claim clients immediately
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(
                keys.filter(key => key !== CACHE_NAME)
                    .map(key => caches.delete(key))
            )
        ).then(() => self.clients.claim())
    );
});

// Fetch: COEP injection + smart caching
self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);

    // 1. Navigation (HTML pages) — Network-first + COEP/COOP headers
    if (event.request.mode === 'navigate') {
        event.respondWith(
            fetch(event.request)
                .then(response => {
                    const clone = response.clone();
                    caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
                    return withCoiHeaders(response);
                })
                .catch(() =>
                    caches.match(event.request).then(cached => withCoiHeaders(cached))
                )
        );
        return;
    }

    // 2. Same-origin static assets — Stale-while-revalidate
    if (url.origin === self.location.origin) {
        event.respondWith(
            caches.match(event.request).then(cached => {
                const networkFetch = fetch(event.request).then(response => {
                    caches.open(CACHE_NAME).then(cache => cache.put(event.request, response.clone()));
                    return response;
                });
                return cached || networkFetch;
            })
        );
        return;
    }

    // 3. Cross-origin (CDN, Google Fonts) — Network passthrough
    event.respondWith(fetch(event.request));
});
