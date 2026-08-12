// Service Worker do Inspetor Thyago
// Estratégia: cache-first para os arquivos do app-shell (o jogo inteiro é
// single-file, então cacheando o index.html o jogo já funciona 100% offline
// — inclusive gerando novos casos, já que o motor roda no cliente).
// Bump o CACHE_NAME a cada release pra forçar os clientes a buscar de novo.
const CACHE_NAME = "inspetor-thyago-v1.3.2";
const APP_SHELL = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-apple-touch.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(
        names
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      const network = fetch(event.request)
        .then((response) => {
          // só cacheia respostas válidas do mesmo domínio (evita cachear erros/opacas de terceiros)
          if (response && response.status === 200 && response.type === "basic") {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => cached); // offline: cai pro cache se a rede falhar

      // cache-first: responde rápido do cache se existir, atualiza em segundo plano
      return cached || network;
    })
  );
});
