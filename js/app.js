// App Initialization
document.addEventListener('DOMContentLoaded', () => {
    // Initialize playlist if not already done
    if (typeof initializePlaylist === 'function') {
        initializePlaylist();
    }
    
    // Ensure player state is saved on page unload
    window.addEventListener('beforeunload', () => {
        if (typeof savePlayerState === 'function') {
            savePlayerState();
        }
    });
});
