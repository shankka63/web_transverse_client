var CACHE = 'offline-fallback';

// On install, cache the non available resource.
self.addEventListener('install', function(evt) {
    console.log('The service worker is being installed.');
    // Ask the service worker to keep installing until the returning promise
    // resolves.
    evt.waitUntil(precache().then(function () {
        // Skip waiting is necessary because we want the service worker to be active
        // and controlling the clients now, without waiting for them to be reloaded.
        console.log("ServiceWorker now installed");
        return self.skipWaiting();
    }));
});

self.addEventListener('activate', function (evt) {
    // `self.clients.claim()` allows the service worker to start intercepting
    // requests immediately. In addition to `self.skipWaiting()` it's needed to
    // allow serving fallbacks from the beginning.
    evt.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', function(evt) {
    console.log('The service worker is serving the asset.');
    // Use any strategy you want. If it fails, use the fallback.
    evt.respondWith(networkOrCache(evt.request).catch(function () {
        return useFallback();
    }));
});

// Open a cache and use `addAll()` with an array of assets to add all of them
// to the cache. Return a promise resolving when all the assets are added.
function precache() {
    return caches.open(CACHE).then(function (cache) {
        return cache.addAll([
            '/index.html',
            '/offline.html'
        ]);
    });
}

// This is a simplified version of network then cache without timeout to
// illustrate error control.
function networkOrCache(request) {
    return fetch(request).then(function (response) {
        return response.ok ? response : fromCache(request);
    })
        .catch(function () {
            return fromCache(request);
        });
}

// This fallback never fails since it uses embedded fallbacks.
function useFallback() {
    return caches.match('offline.html');
}

// Open the cache where the assets were stored and search for the requested
// resource. Notice that in case of no matching, the promise still resolves
// but it does with `undefined` as value.
function fromCache(request) {
    return caches.open(CACHE).then(function (cache) {
        return cache.match(request).then(function (matching) {
            return matching || Promise.reject('request-not-in-cache');
        });
    });
}


var FALLBACK_PAGE =  './offline.html';