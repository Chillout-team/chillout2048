const APP_VERSION = "0.1";

const ASSETS_URLS = ["/", "/index.html"];

const CACHE_NAME = `2048game-cache-${APP_VERSION}`;

self.addEventListener("install", event => {
    console.log("service worker: install");

    event.waitUntil(
        caches
            .open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(ASSETS_URLS);
            })
            .catch(error => {
                console.error(error);
            }),
    );
});

self.addEventListener("activate", event => {
    console.log("service worker: activate");

    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames
                    .filter(name => !ASSETS_URLS.includes(name))
                    .map(name => caches.delete(name)),
            );
        }),
    );
});

self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            if (response) {
                return response;
            }

            const fetchRequest = event.request.clone();
            return fetch(fetchRequest).then(response => {
                if (
                    !response ||
                    response.status !== 200 ||
                    response.type !== "basic" ||
                    !event.request.url.startsWith("http")
                ) {
                    return response;
                }

                const responseToCache = response.clone();
                caches.open(CACHE_NAME).then(cache => {
                    cache.put(event.request, responseToCache);
                });
                return response;
            });
        }),
    );
});
