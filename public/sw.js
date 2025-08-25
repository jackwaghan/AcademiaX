self.addEventListener("install", function () {
  self.skipWaiting();
});

self.addEventListener("activate", function () {
  self.registration
    .unregister()
    .then(() => {
      return self.clients.matchAll();
    })
    .then((clients) => {
      clients.forEach((client) => client.navigate(client.url));
    });
});
