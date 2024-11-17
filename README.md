# Fast Media Downloader

A simple and lightweight JavaScript plugin that adds a download button to media elements (images and videos) on hover.

## Features

- 🚀 Lightweight and fast
- 🖼️ Supports both images and videos
- 🎯 Easy to integrate
- 🎨 Smooth animations
- 📱 Responsive design
- ⚡ No external dependencies

## Installation

1. Download the `MediaDownloader.js` file
2. Include it in your project

```javascript
const MediaDownloader = require('./MediaDownloader.js');
```

## Usage

```javascript
// Initialize the plugin
const downloader = new MediaDownloader();

// Start the plugin
downloader.start();

// Stop the plugin (if needed)
downloader.stop();
```

## How it works

The plugin automatically detects media elements (images and videos) on your page and adds a download button when you hover over them. The button appears in the top-left corner with a smooth animation and allows users to download the media file directly.

## Customization

You can customize the appearance of the download button by modifying the CSS in the `media-downloader-style` block:

```css
.download-button {
    background-color: #5865F2; /* Change button color */
    color: white; /* Change text color */
    padding: 5px 10px; /* Adjust padding */
    /* Add more custom styles */
}
```

## Browser Support

Works with all modern browsers that support:
- ES6+ JavaScript
- Fetch API
- CSS Transitions

## License

MIT License - feel free to use this in your projects

## Contributing

Feel free to submit issues and pull requests. All contributions are welcome!

## Author

Wyltre

## Version

1.0.2
