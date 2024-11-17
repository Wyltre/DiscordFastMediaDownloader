/**
 * @name FastMediaDownloader
 * @author Wyltre
 * @description Adds a "Download" button to media files for direct downloading
 * @version 1.0.1
 */

 module.exports = class MediaDownloader {
    /**
     * Initializes the downloader by adding required styles and event listener
     */
    start() {
        // Add CSS styles for the download button
        document.head.insertAdjacentHTML('beforeend', `
            <style id="media-downloader-style">
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
            </style>
        `);
        // Add mouseover event listener to detect media elements
        document.addEventListener('mouseover', this.handleMouseOver.bind(this));
    }

    /**
     * Cleans up by removing event listener and styles
     */
    stop() {
        document.removeEventListener('mouseover', this.handleMouseOver.bind(this));
        document.getElementById('media-downloader-style')?.remove();
    }

    /**
     * Handles mouse over events on media elements
     * @param {Event} param0 - Mouse event object
     */
    async handleMouseOver({ target }) {
        // Check if mouse is over an image or video element
        const mediaElement = target.closest('img, video');
        // Return if no media element found or button already exists
        if (!mediaElement || mediaElement.parentElement.querySelector('.download-button')) return;

        // Set up the container for positioning
        const container = mediaElement.parentElement;
        container.style.position = 'relative';
        
        // Create and add the download button
        const downloadButton = document.createElement('div');
        downloadButton.className = 'download-button';
        downloadButton.textContent = 'Download';
        container.appendChild(downloadButton);

        /**
         * Handles the download button click
         * @param {Event} e - Click event object
         */
        const handleDownload = async (e) => {
            e.stopPropagation();  // Prevent event bubbling
            
            // Get the media URL based on element type
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

        // Add event listeners
        downloadButton.addEventListener('click', handleDownload);
        // Remove button when mouse leaves the container
        container.addEventListener('mouseleave', () => downloadButton.remove());
    }
};