// Only here so the phone can install the page as an app. Nothing is cached: every request goes to the PC.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', () => {});
