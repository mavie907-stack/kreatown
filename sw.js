// KreaTown Service Worker
const CACHE = 'kreatown-v1';
const STATIC = [
  '/',
  '/index.html',
  '/member-dashboard.html',
  '/feed.html',
  '/rooms.html',
  '/login.html',
  '/register.html',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(STATIC)).catch(()=>{})
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  // Network first, cache fallback
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});

// Push notifications
self.addEventListener('push', e => {
  const data = e.data?.json() || {};
  e.waitUntil(
    self.registration.showNotification(data.title || 'KreaTown', {
      body: data.body || 'New activity in your town!',
      icon: '/icon-192.png',
      badge: '/icon-192.png',
      data: { url: data.url || '/feed.html' }
    })
  );
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(
    clients.openWindow(e.notification.data?.url || '/feed.html')
  );
});
