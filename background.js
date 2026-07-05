// Dark Mode Toggle - Background Service Worker

chrome.runtime.onInstalled.addListener(function(details) {
  if (details.reason === 'install') {
    // Set default settings on first install
    chrome.storage.local.set({
      global: {
        enabled: false,
        brightness: 100,
        contrast: 100,
        sepia: 0
      }
    });
  }
});