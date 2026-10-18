// Lets the phone install the page as an app, and shows the laptop's alerts (J-89, 19 Oct 2026). Nothing is cached:
// every request goes to the network. An alert is one line; tapping it opens the app.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', () => {});
self.addEventListener('push', e => {
  let d = {};
  try { d = e.data ? e.data.json() : {}; } catch (x) { d = { body: e.data ? e.data.text() : '' }; }
  e.waitUntil(self.registration.showNotification('Claude', {
    body: d.body || 'Something needs you in the app.', tag: d.tag || 'claude', renotify: true, icon: 'icon.svg',
    data: { url: self.registration.scope },
  }));
});
self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(ws => {
    for (const w of ws) if ('focus' in w) return w.focus();
    return self.clients.openWindow((e.notification.data && e.notification.data.url) || './');
  }));
});
