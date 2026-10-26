// Theme Management
function applyStudioTheme() {
    document.documentElement.style.setProperty('--player-primary', 'var(--studio-red)');
    document.documentElement.style.setProperty('--player-secondary', 'var(--studio-yellow)');
    document.documentElement.style.setProperty('--player-glow', 'var(--studio-red-glow)');
    
    // Reset any artist-specific styles
    document.body.removeAttribute('data-artist-theme');
    document.body.style.removeProperty('--artist-primary');
    document.body.style.removeProperty('--artist-secondary');
    document.body.style.removeProperty('--artist-glow');
    document.body.style.removeProperty('--artist-font');
}

function applyArtistTheme(artist) {
    if (!artist || !artist.theme) {
        applyStudioTheme();
        return;
    }
    
    document.body.setAttribute('data-artist-theme', artist.id);
    document.body.style.setProperty('--artist-primary', artist.theme.primary);
    document.body.style.setProperty('--artist-secondary', artist.theme.secondary);
    document.body.style.setProperty('--artist-glow', artist.theme.accentGlow || artist.theme.primary + '66');
    if (artist.theme.fontDisplay) {
        document.body.style.setProperty('--artist-font', artist.theme.fontDisplay);
    }
    
    // Apply to player
    document.documentElement.style.setProperty('--player-primary', artist.theme.primary);
    document.documentElement.style.setProperty('--player-secondary', artist.theme.secondary);
    document.documentElement.style.setProperty('--player-glow', artist.theme.accentGlow || artist.theme.primary + '66');
}
