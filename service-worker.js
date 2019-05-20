const CACHE_NAME = "bola-v01";
var urlsToCache = [
  "/",
  "/manifest.json", 
  "/nav.html",
  "/index.html",
  "/liga.html",
  "/teams.html",
 
  "/images/icons-512.png",
  "/images/icons-192.png",
  "/images/Bundesliga.png",
  "/images/UEFA_Champions_League.png",
  "/images/eredivisie-logo.jpg",
  "/images/la_liga.jpg", 
  "/images/liga-prancis.jpg",
  "/images/logo-liga-inggris.jpg",

  "/pages/home.html",
  "/pages/about.html",
  "/pages/contact.html",
  "/pages/favorite.html",
  
  "/css/materialize.min.css",
  "/js/materialize.min.js",
  "/js/api.js",
  "/js/idb.js",
  "/js/db.js",
  "/js/nav.js"
];
 
self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(cacheNames.map(function(cacheName) {
        if (cacheName !== CACHE_NAME) {
          console.log('[ServiceWorker] Removing old cache', cacheName);
          return caches.delete(cacheName);
        }
      })
	);
    })
  );
});

self.addEventListener('fetch', function(event) {
	var base_url = "https://api.football-data.org/v2/";
 // console.log('[ServiceWorker] Fetch', e.request.url);
  if (event.request.url.indexOf(base_url) > -1) {
    event.respondWith(
      caches.open(CACHE_NAME).then(function(cache) {
        return fetch(event.request).then(function(response) {
          cache.put(event.request.url, response.clone());
          return response;
        })
      })
    );
  } else {
    event.respondWith(
      caches.match(event.request).then(function(response) {
        return response || fetch (event.request);
      })
    )
  }
});

self.addEventListener('sync', function(event){
	if(event.tag==='bola'){
		console.log('[ServiceWorker] sync doSomething');	
		//event.waitUntil(doSomething());
	}
});

self.addEventListener('push', function(event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  var options = {
    body: body,
    icon: '/images/icons-512.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});
