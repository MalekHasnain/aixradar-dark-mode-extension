// Dark Mode Toggle - Popup Script

document.addEventListener('DOMContentLoaded', function() {
  const toggle = document.getElementById('darkModeToggle');
  const toggleLabel = document.getElementById('toggleLabel');
  const siteSpecific = document.getElementById('siteSpecific');
  const brightness = document.getElementById('brightness');
  const contrast = document.getElementById('contrast');
  const sepia = document.getElementById('sepia');
  const brightnessValue = document.getElementById('brightnessValue');
  const contrastValue = document.getElementById('contrastValue');
  const sepiaValue = document.getElementById('sepiaValue');
  const applyBtn = document.getElementById('applyBtn');
  const resetBtn = document.getElementById('resetBtn');

  // Get current tab info
  let currentTabUrl = '';

  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    if (tabs[0]) {
      currentTabUrl = new URL(tabs[0].url).hostname;
      loadSettings();
    }
  });

  function loadSettings() {
    const storageKey = siteSpecific.checked ? `site_${currentTabUrl}` : 'global';
    chrome.storage.local.get([storageKey, 'global'], function(result) {
      const settings = result[storageKey] || result['global'] || {
        enabled: false,
        brightness: 100,
        contrast: 100,
        sepia: 0
      };

      toggle.checked = settings.enabled;
      toggleLabel.textContent = `Dark Mode: ${settings.enabled ? 'On' : 'Off'}`;
      brightness.value = settings.brightness;
      contrast.value = settings.contrast;
      sepia.value = settings.sepia;
      brightnessValue.textContent = `${settings.brightness}%`;
      contrastValue.textContent = `${settings.contrast}%`;
      sepiaValue.textContent = `${settings.sepia}%`;
    });
  }

  // Toggle handler — update label AND auto-apply (single listener, no double-fire)
  toggle.addEventListener('change', function() {
    toggleLabel.textContent = `Dark Mode: ${toggle.checked ? 'On' : 'Off'}`;
    applyBtn.click();
  });

  brightness.addEventListener('input', function() {
    brightnessValue.textContent = `${brightness.value}%`;
  });

  contrast.addEventListener('input', function() {
    contrastValue.textContent = `${contrast.value}%`;
  });

  sepia.addEventListener('input', function() {
    sepiaValue.textContent = `${sepia.value}%`;
  });

  applyBtn.addEventListener('click', function() {
    const settings = {
      enabled: toggle.checked,
      brightness: parseInt(brightness.value),
      contrast: parseInt(contrast.value),
      sepia: parseInt(sepia.value)
    };

    const storageKey = siteSpecific.checked ? `site_${currentTabUrl}` : 'global';

    chrome.storage.local.set({ [storageKey]: settings }, function() {
      // Send message to content script
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        if (tabs[0]) {
          chrome.tabs.sendMessage(tabs[0].id, {
            action: 'applyDarkMode',
            settings: settings
          });
        }
      });

      // Visual feedback
      applyBtn.textContent = '✓ Applied';
      setTimeout(() => { applyBtn.textContent = 'Apply'; }, 1500);
    });
  });

  resetBtn.addEventListener('click', function() {
    toggle.checked = false;
    toggleLabel.textContent = 'Dark Mode: Off';
    brightness.value = 100;
    contrast.value = 100;
    sepia.value = 0;
    brightnessValue.textContent = '100%';
    contrastValue.textContent = '100%';
    sepiaValue.textContent = '0%';

    const settings = {
      enabled: false,
      brightness: 100,
      contrast: 100,
      sepia: 0
    };

    const storageKey = siteSpecific.checked ? `site_${currentTabUrl}` : 'global';
    chrome.storage.local.set({ [storageKey]: settings });

    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      if (tabs[0]) {
        chrome.tabs.sendMessage(tabs[0].id, {
          action: 'applyDarkMode',
          settings: settings
        });
      }
    });
  });


});