# Dark Mode Toggle - Night Eye

A lightweight Chrome extension that instantly enables dark mode on any website. Easy toggle, site-specific settings, and smart contrast controls for comfortable browsing day or night.

## Features

- 🌙 **One-click dark mode** — Toggle dark mode on any website instantly
- 🎨 **Adjustable settings** — Control brightness, contrast, and sepia levels
- 💾 **Site-specific memory** — Remember preferences for individual sites
- 🪶 **Lightweight** — Minimal permissions, fast performance, no tracking
- 🔒 **Privacy-first** — All settings stored locally, no data collected

## Installation

### From Chrome Web Store
1. Visit the [Chrome Web Store listing](#) (link coming soon)
2. Click "Add to Chrome"
3. Pin the extension for easy access
4. Click the icon to toggle dark mode on any site

### From Source (Developer Mode)
1. Download or clone this repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" (top right toggle)
4. Click "Load unpacked" and select the extension folder
5. The extension icon should appear in your toolbar

## How It Works

The extension uses CSS filter inversion (`invert(1) hue-rotate(180deg)`) to convert light websites to dark mode. This approach:
- Works on virtually any website
- Preserves images and videos (re-inverted to look natural)
- Allows fine-tuning with brightness, contrast, and sepia controls

## Privacy

This extension does NOT collect, store, or transmit any user data. All preferences are stored locally in your browser using Chrome's storage API. No analytics, no tracking, no external requests.

See [Privacy Policy](PRIVACY.md) for details.

## Development

Built with Manifest V3, vanilla JavaScript, and CSS.

### File Structure
```
├── manifest.json       — Extension configuration
├── popup.html          — Popup UI
├── popup.css           — Popup styles
├── popup.js            — Popup logic
├── content.js          — Content script (applies dark mode)
├── dark-mode.css       — Base dark mode styles
├── background.js       — Service worker
└── icons/              — Extension icons (16, 48, 128px)
```

## Credits

Made by [AIX Radar](https://aixradar.com)

## License

MIT License — free to use, modify, and distribute