const cacheName="exam-system-v1";

const files=[
"index.html",
"style.css",
"app.min.js"
];


self.addEventListener("install",event=>{

event.waitUntil(

caches.open(cacheName)
.then(cache=>cache.addAll(files))

);

});


self.addEventListener("fetch",event=>{

event.respondWith(

caches.match(event.request)
.then(response=>response || fetch(event.request))

);

});