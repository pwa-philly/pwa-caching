// Installing Service Worker. This is the perfect time to create and populate our local cache!
// Learn more about the Cache Interface:
// https://developer.mozilla.org/en-US/docs/Web/API/Cache
self.addEventListener("install", function(event) {
  // Cache our stuff!
});

// Activation stage -- best to keep lightweight, since it could potentially be blocking!
self.addEventListener("activate", function(event) {
  // What would be a good thing to do here?
});

// Fetch Event listeners -- intercepting network requests!
self.addEventListener("fetch", function(event) {
  // Get the data from our Cache and serve it to the client.
  // Handle unmatched responses.
});
