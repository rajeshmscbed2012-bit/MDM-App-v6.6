const CACHE_NAME = 'mdm-cache-v6.6';

// Cache செய்ய வேண்டிய முக்கிய கோப்புகள்
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './logo.png',
  './icon-192.png',
  './icon-512.png',
  'https://fonts.googleapis.com/css2?family=Noto+Sans+Tamil:wght@400;500;600;700;800&display=swap',
  'https://cdn.sheetjs.com/xlsx-latest/package/dist/xlsx.full.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js'
];

// Install Event - கோப்புகளை Cache-ல் சேமித்தல்
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch Event - இணையம் இல்லாத போது Cache-ல் இருந்து எடுத்தல்
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache-ல் இருந்தால் அதைக் கொடு, இல்லையென்றால் இணையத்தில் தேடு
        return response || fetch(event.request);
      })
  );
});

// Activate Event - பழைய Cache-களை அழித்து புதியதை அப்டேட் செய்தல்
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
