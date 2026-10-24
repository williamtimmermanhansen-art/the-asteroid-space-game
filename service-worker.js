const CACHE='the-asteroid-space-game-v16-2-musicfix';
const FILES=[
  './',
  './index.html',
  './manifest.json',
  './deep-space-background.png',
  './README.txt',
  './CHANGELOG.txt'
];

self.addEventListener('install',event=>{
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(FILES)));
});

self.addEventListener('activate',event=>{
  event.waitUntil(
    caches.keys()
      .then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key))))
      .then(()=>self.clients.claim())
  );
});

self.addEventListener('fetch',event=>{
  event.respondWith(
    caches.open(CACHE).then(cache=>
      cache.match(event.request).then(cached=>cached||fetch(event.request))
    )
  );
});
