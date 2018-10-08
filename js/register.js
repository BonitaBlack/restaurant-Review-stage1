/* Set up service worker */
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
  .register('js/sw.js', {scope: "/"})
    .then(reg => {
      console.log('Service Worker Registration Successful: ' + reg.scope);
    })
    .catch(error => {
      console.log('Service Worker Registration Failed: ' + error);
    });
}