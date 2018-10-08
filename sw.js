// Define the Caches (Johnny, June.. JK $$$)
var staticCacheName = 'restaurant-Review-stage1-v';
// Get a rando number to populate the cache id
 var randoNum = Math.floor(Math.random() * 20000);
 var cache_id = randoNum;
 staticCacheName += cache_id;

self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(staticCacheName).then(function(cache) {
    return cache.addAll([
      'index.html',
      'restaurant.html',
      '/css/main.css',
      '/css/responsiveStyles.css',
      '/js/dbhelper.js',
      '/js/main.js',
      '/js/restaurant_info.js',
      '/img/*',
      '/js/register.js',
      '//normalize-css.googlecode.com/svn/trunk/normalize.css',
      'https://fonts.googleapis.com/css?family=Roboto:300,400,500'
    ])
    .catch(error => {
      
    });
  }));
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith('restaurant-Review-stage1-') &&
                 cacheName != staticCacheName;
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});


self.addEventListener('fetch', 
function(event) 
{
  event.respondWith
  (    
    caches.match(event.request)
    .then
    (
      function(response) 
      {
        if (response !== undefined) 
        {
          return response;
        } 
      
        else 
        {        
          return fetch(event.request).then
          (
              function (response) 
              {
                let responseClone = response.clone();
                
                caches.open(staticCacheName)
                .then
                (
                  function (cache) 
                  {
                    cache.put(event.request, responseClone);
                  }
                );
                return response;
              }
          );
        }
      }
    ) // end of promise for cache match
      
  ); // end of respond with

}
);