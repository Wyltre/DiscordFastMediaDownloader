/**
 * @name FastMediaDownloader
 * @author Wyltre
 * @description Adds a "Download" button to downloadable media files
 * @version 1.0.2
 */

 module.exports = class MediaDownloader {
    start() {
        document.head.insertAdjacentHTML('beforeend', `
            <style id="media-downloader-style">
                .media-container {
                    position: relative;
                }
                .download-button {
                    position: absolute;     /* Position absolutely within container */
                    top: 8px;              /* Top spacing */
                    right: 8px;            /* Right spacing */
                    background-color: #5865F2;
                    color: white;
                    padding: 5px 10px;
                    border-radius: 4px;
                    cursor: pointer;
                    z-index: 999;          /* Ensure button appears above other elements */
                }
                .download-button:hover {
                    background-color: #4752C4;
                }
                .media-container:hover .download-button {
                    opacity: 1;
                }
            </style>
        `);
        document.addEventListener('mouseover', this.handleMouseOver.bind(this));
    }

    stop() {
        document.removeEventListener('mouseover', this.handleMouseOver.bind(this));
        document.getElementById('media-downloader-style')?.remove();
    }

    shouldShowButton(element) {
        // Excluded classes and attributes
        const excludedClasses = [
            'avatar',         // Profile pictures/avatars
            'user-avatar',    // User avatars
            'emoji',         // Emojis
            'icon',          // Icons
            'profile-pic',   // Profile pictures
            'banner',        // Banners
            'thumbnail'      // Thumbnails
        ];

        // Check element and parent classes
        const hasExcludedClass = [...element.classList].some(className => 
            excludedClasses.some(excluded => className.toLowerCase().includes(excluded))
        );

        // Check parent elements up to 3 levels
        let parent = element.parentElement;
        for (let i = 0; i < 3 && parent; i++) {
            if ([...parent.classList].some(className => 
                excludedClasses.some(excluded => className.toLowerCase().includes(excluded)))) {
                return false;
            }
            parent = parent.parentElement;
        }

        // Check if image is too small (likely an icon or emoji)
        const minSize = 50; // Minimum size in pixels
        if (element.offsetWidth < minSize || element.offsetHeight < minSize) {
            return false;
        }

        return !hasExcludedClass;
    }

    async handleMouseOver({ target }) {
        const mediaElement = target.closest('img, video');
        if (!mediaElement || mediaElement.parentElement.querySelector('.download-button')) return;

        // Check if we should show the download button
        if (!this.shouldShowButton(mediaElement)) return;

        const container = mediaElement.parentElement;
        container.classList.add('media-container');
        
        const downloadButton = document.createElement('div');
        downloadButton.className = 'download-button';
        downloadButton.textContent = 'Download';
        container.appendChild(downloadButton);

        const handleDownload = async (e) => {
            e.stopPropagation();
            const url = mediaElement.tagName === 'VIDEO' ? 
                       (mediaElement.src || mediaElement.querySelector('source')?.src) : 
                       mediaElement.src;
            
            if (!url) return;
            
            try {
                const blob = await (await fetch(url)).blob();
                const blobUrl = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = blobUrl;
                link.download = `media_${Date.now()}.${url.split('.').pop().split('?')[0] || 'png'}`;
                link.click();
                URL.revokeObjectURL(blobUrl);
            } catch (error) {
                console.error('Download error:', error);
            }
        };

        downloadButton.addEventListener('click', handleDownload);
        container.addEventListener('mouseleave', () => downloadButton.remove());
    }
};
