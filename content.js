// Dark Mode Toggle - Content Script

// Inject dark mode styles immediately to prevent flash
const darkModeStyleId = 'dark-mode-toggle-style';
const darkModeFilterId = 'dark-mode-toggle-filter';

function applyDarkMode(settings) {
  removeDarkMode();

  if (!settings.enabled) return;

  // Main dark mode CSS (inverted colors)
  const style = document.createElement('style');
  style.id = darkModeStyleId;
  style.textContent = `
    html.dark-mode-toggle-active {
      filter: invert(1) hue-rotate(180deg) brightness(${settings.brightness}%) contrast(${settings.contrast}%) sepia(${settings.sepia}%) !important;
      background: #1a1a1a !important;
    }
    html.dark-mode-toggle-active img,
    html.dark-mode-toggle-active video,
    html.dark-mode-toggle-active canvas,
    html.dark-mode-toggle-active iframe,
    html.dark-mode-toggle-active svg,
    html.dark-mode-toggle-active embed,
    html.dark-mode-toggle-active object {
      filter: invert(1) hue-rotate(180deg) !important;
    }
    html.dark-mode-toggle-active img[src*=".png"],
    html.dark-mode-toggle-active img[src*=".jpg"],
    html.dark-mode-toggle-active img[src*=".jpeg"],
    html.dark-mode-toggle-active img[src*=".gif"],
    html.dark-mode-toggle-active img[src*=".webp"],
    html.dark-mode-toggle-active img[src*=".svg"] {
      filter: invert(1) hue-rotate(180deg) !important;
    }
  `;
  document.documentElement.appendChild(style);
  document.documentElement.classList.add('dark-mode-toggle-active');
}

function removeDarkMode() {
  const style = document.getElementById(darkModeStyleId);
  if (style) style.remove();
  document.documentElement.classList.remove('dark-mode-toggle-active');
}

// Listen for messages from popup
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.action === 'applyDarkMode') {
    applyDarkMode(message.settings);
    sendResponse({ success: true });
  }
  return true;
});

// On page load, check stored settings and apply
chrome.storage.local.get(['global'], function(result) {
  if (result.global && result.global.enabled) {
    applyDarkMode(result.global);
  }
});

// Also check site-specific settings
chrome.storage.local.get(null, function(items) {
  const hostname = location.hostname;
  const siteKey = `site_${hostname}`;
  if (items[siteKey] && items[siteKey].enabled) {
    applyDarkMode(items[siteKey]);
  }
});