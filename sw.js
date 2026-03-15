const CACHE_NAME = 'mdm-cache-v6.6';

// Cache-ல் சேமிக்க வேண்டிய கோப்புகளின் பட்டியல்
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './logo.png'
];

// 1. Install Event: ஃபைல்களை Cache-ல் சேமிக்க
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// 2. Activate Event: பழைய Cache-களை நீக்க
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// 3. Fetch Event: இன்டர்நெட் இருந்தால் அதிலிருந்து எடுக்கும், இல்லையென்றால் Cache-லிருந்து எடுக்கும் (Offline Support)
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});
