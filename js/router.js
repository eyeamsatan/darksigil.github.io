// Router
const app = document.getElementById('app');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNav(route) {
    navLinks.forEach(link => {
        if (link.getAttribute('data-route') === route) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

function renderView() {
    const hash = window.location.hash || '#/';
    const route = hash.replace('#', '') || '/';
    
    updateActiveNav(route);
    
    // Apply studio theme for most pages, artist theme only on artist profile
    if (!route.startsWith('/artists/')) {
        if (typeof applyStudioTheme === 'function') {
            applyStudioTheme();
        }
    }
    
    // Close mobile nav
    const navMenu = document.getElementById('navMenu');
    if (navMenu) {
        navMenu.classList.remove('active');
    }
    
    if (route === '/' || route === '') {
        renderHome();
    } else if (route === '/artists') {
        renderArtists();
    } else if (route.startsWith('/artists/')) {
        const slug = route.split('/artists/')[1];
        renderArtistProfile(slug);
    } else if (route === '/music') {
        renderMusic();
    } else if (route === '/about') {
        renderAbout();
    } else if (route === '/contact') {
        renderContact();
    } else {
        renderHome();
    }
}

function renderHome() {
    app.innerHTML = `
        <!-- Studio Hero -->
        <header class="studio-hero">
            <div class="studio-hero-bg"></div>
            <svg class="sigil-decoration top-left" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="40" fill="none" stroke="var(--studio-red)" stroke-width="1" opacity="0.5"/>
                <path d="M50 10 L50 90 M10 50 L90 50" stroke="var(--studio-yellow)" stroke-width="1" opacity="0.5"/>
                <circle cx="50" cy="50" r="10" fill="none" stroke="var(--studio-red)" stroke-width="1" opacity="0.7"/>
            </svg>
            <svg class="sigil-decoration bottom-right" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <polygon points="50,10 90,90 10,90" fill="none" stroke="var(--studio-red)" stroke-width="1" opacity="0.5"/>
                <circle cx="50" cy="70" r="15" fill="none" stroke="var(--studio-yellow)" stroke-width="1" opacity="0.5"/>
            </svg>
            <div class="studio-hero-content">
                <h1 class="studio-title display-brand">DARK SIGIL STUDIOS</h1>
                <p class="studio-subtitle">A Collective of Sonic Outcasts</p>
                <p class="studio-description">Raw, unfiltered, and unapologetically dark. A label for artists who walk the fringe.</p>
                <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                    <a href="#/artists" class="btn-primary">Explore Artists</a>
                    <a href="#/music" class="btn-secondary">Listen Now</a>
                </div>
            </div>
        </header>

        <!-- Artists Section -->
        <section class="section">
            <div class="container">
                <div class="section-header">
                    <h2 class="section-title display-brand">Artists</h2>
                    <p class="section-subtitle">Featured Equally</p>
                </div>
                <div class="artists-grid">
                    ${artists.map(artist => `
                        <a href="#/artists/${artist.slug}" class="artist-card glass-panel" style="--artist-primary: ${artist.theme.primary}; --artist-glow: ${artist.theme.accentGlow};">
                            <img src="${artist.cover}" alt="${artist.name}" class="artist-card-cover">
                            <h3 class="artist-card-name" style="font-family: ${artist.theme.fontDisplay};">${artist.name}</h3>
                            <p class="artist-card-genre">${artist.genre}</p>
                            <p class="artist-card-tagline">${artist.tagline}</p>
                        </a>
                    `).join('')}
                </div>
            </div>
        </section>

        <!-- Footer -->
        <footer class="footer">
            <div class="container">
                <div class="footer-content">
                    <div class="footer-section">
                        <h3 class="footer-logo-text display-brand">DARK SIGIL STUDIOS</h3>
                        <p class="footer-tagline">A Collective of Sonic Outcasts</p>
                    </div>
                    <div class="footer-section">
                        <h4>Navigate</h4>
                        <ul class="footer-links">
                            <li><a href="#/">Home</a></li>
                            <li><a href="#/artists">Artists</a></li>
                            <li><a href="#/music">Music</a></li>
                            <li><a href="#/about">About</a></li>
                            <li><a href="#/contact">Contact</a></li>
                        </ul>
                    </div>
                    <div class="footer-section">
                        <h4>Connect</h4>
                        <ul class="footer-links">
                            <li><a href="#">Bandcamp</a></li>
                            <li><a href="#">Spotify</a></li>
                            <li><a href="#">Instagram</a></li>
                        </ul>
                    </div>
                </div>
                <div class="footer-bottom">
                    <p>&copy; 2024 Dark Sigil Studios. All rights reserved.</p>
                </div>
            </div>
        </footer>
    `;
}

function renderArtists() {
    app.innerHTML = `
        <div class="view-container">
            <div class="page-header">
                <h1 class="page-title display-brand">Artists</h1>
                <p class="page-subtitle">The Collective</p>
            </div>
            <section class="section">
                <div class="artists-grid">
                    ${artists.map(artist => `
                        <a href="#/artists/${artist.slug}" class="artist-card glass-panel" style="--artist-primary: ${artist.theme.primary}; --artist-glow: ${artist.theme.accentGlow};">
                            <img src="${artist.cover}" alt="${artist.name}" class="artist-card-cover">
                            <h3 class="artist-card-name" style="font-family: ${artist.theme.fontDisplay};">${artist.name}</h3>
                            <p class="artist-card-genre">${artist.genre}</p>
                            <p class="artist-card-tagline">${artist.tagline}</p>
                        </a>
                    `).join('')}
                </div>
            </section>
        </div>
        <footer class="footer">
            <div class="container">
                <div class="footer-bottom">
                    <p>&copy; 2024 Dark Sigil Studios. All rights reserved.</p>
                </div>
            </div>
        </footer>
    `;
}

function renderArtistProfile(slug) {
    const artist = getArtistBySlug(slug);
    if (!artist) {
        app.innerHTML = `<div class="view-container"><h1>Artist not found</h1></div>`;
        return;
    }
    
    if (typeof applyArtistTheme === 'function') {
        applyArtistTheme(artist);
    }
    
    app.innerHTML = `
        <header class="artist-profile-header" style="background: ${artist.theme.bgOverlay || 'radial-gradient(ellipse at top, rgba(255,71,87,0.1) 0%, transparent 70%)'};">
            <div class="artist-profile-content">
                <img src="${artist.cover}" alt="${artist.name}" class="artist-profile-cover" style="border-color: ${artist.theme.primary}; box-shadow: 0 0 40px ${artist.theme.accentGlow};">
                <h1 class="artist-profile-name" style="font-family: ${artist.theme.fontDisplay}; color: ${artist.theme.primary};">${artist.name}</h1>
                <p class="artist-profile-genre">${artist.genre}</p>
                <p class="artist-profile-tagline">${artist.tagline}</p>
                <p class="artist-profile-bio">${artist.bio}</p>
                <div class="artist-social">
                    ${artist.social.bandcamp ? `<a href="${artist.social.bandcamp}" class="artist-social-link" style="border-color: ${artist.theme.primary}; color: ${artist.theme.primary};">Bandcamp</a>` : ''}
                    ${artist.social.spotify ? `<a href="${artist.social.spotify}" class="artist-social-link" style="border-color: ${artist.theme.primary}; color: ${artist.theme.primary};">Spotify</a>` : ''}
                    ${artist.social.instagram ? `<a href="${artist.social.instagram}" class="artist-social-link" style="border-color: ${artist.theme.primary}; color: ${artist.theme.primary};">Instagram</a>` : ''}
                </div>
            </div>
        </header>
        
        <section class="section">
            <div class="container">
                <div class="section-header">
                    <h2 class="section-title display-brand">Discography</h2>
                </div>
                <div class="tracks-list">
                    ${artist.tracks.map((track, idx) => {
                        const globalIdx = playlist.findIndex(t => t.id === track.id);
                        return `
                            <div class="track-item glass-panel" onclick="loadAndPlayTrack(${globalIdx})" style="--artist-primary: ${artist.theme.primary};">
                                <img src="${track.cover}" alt="${track.title}" class="track-item-cover">
                                <div class="track-item-info">
                                    <div class="track-item-title">${track.title}</div>
                                    <div class="track-item-artist">${artist.name}</div>
                                </div>
                                <div class="track-item-duration">${track.duration || ''}</div>
                                <button class="track-item-play" aria-label="Play ${track.title}">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M8 5v14l11-7z"/>
                                    </svg>
                                </button>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        </section>
        
        <footer class="footer">
            <div class="container">
                <div class="footer-bottom">
                    <p>&copy; 2024 Dark Sigil Studios. All rights reserved.</p>
                </div>
            </div>
        </footer>
    `;
}

function renderMusic() {
    if (typeof applyStudioTheme === 'function') {
        applyStudioTheme();
    }
    
    app.innerHTML = `
        <div class="view-container">
            <div class="page-header">
                <h1 class="page-title display-brand">Music</h1>
                <p class="page-subtitle">All Releases</p>
            </div>
            <section class="section">
                <div class="music-grid">
                    ${playlist.map((track, idx) => {
                        const artist = getArtistById(track.artistId);
                        return `
                            <div class="music-card glass-panel">
                                <img src="${track.cover}" alt="${track.title}" class="music-card-cover">
                                <h3 class="music-card-title">${track.title}</h3>
                                <p class="music-card-artist" style="color: ${artist ? artist.theme.primary : 'var(--studio-red)'};">${track.artistName}</p>
                                <p class="music-card-genre">${artist ? artist.genre : ''}</p>
                                <button class="btn-play-small" onclick="loadAndPlayTrack(${idx})">Play</button>
                            </div>
                        `;
                    }).join('')}
                </div>
            </section>
        </div>
        <footer class="footer">
            <div class="container">
                <div class="footer-bottom">
                    <p>&copy; 2024 Dark Sigil Studios. All rights reserved.</p>
                </div>
            </div>
        </footer>
    `;
}

function renderAbout() {
    if (typeof applyStudioTheme === 'function') {
        applyStudioTheme();
    }
    
    app.innerHTML = `
        <div class="view-container">
            <div class="page-header">
                <h1 class="page-title display-brand">About</h1>
                <p class="page-subtitle">Dark Sigil Studios</p>
            </div>
            <section class="section">
                <div class="about-content glass-panel">
                    <h2 style="color: var(--studio-red); margin-bottom: 1rem; font-family: 'Pirata One', cursive;">The Collective</h2>
                    <p class="about-text">Dark Sigil Studios is a label and collective of sonic outcasts united by a shared reverence for the raw, the real, and the relentlessly dark. We exist in the spaces between genres - where heavy emo rock snarls beside acoustic folk punk, and electronic soundscapes bleed into the shadows.</p>
                    <p class="about-text">Founded on the principle that artists should be featured equally, Dark Sigil Studios provides a home for misfits, outcasts, and dreamers who refuse to conform. Our roster spans the spectrum of darkness, united by authenticity and unflinching honesty.</p>
                    <p class="about-text">Raw. Unfiltered. Unapologetically dark. This is Dark Sigil Studios.</p>
                </div>
            </section>
        </div>
        <footer class="footer">
            <div class="container">
                <div class="footer-bottom">
                    <p>&copy; 2024 Dark Sigil Studios. All rights reserved.</p>
                </div>
            </div>
        </footer>
    `;
}

function renderContact() {
    if (typeof applyStudioTheme === 'function') {
        applyStudioTheme();
    }
    
    app.innerHTML = `
        <div class="view-container">
            <div class="page-header">
                <h1 class="page-title display-brand">Contact</h1>
                <p class="page-subtitle">Get In Touch</p>
            </div>
            <section class="section">
                <div class="contact-content glass-panel">
                    <h2 style="color: var(--studio-red); margin-bottom: 1rem; font-family: 'Pirata One', cursive;">Bookings & Inquiries</h2>
                    <p class="contact-text">For booking inquiries, press, or general contact with Dark Sigil Studios and our artists:</p>
                    <div style="margin: 1.5rem 0;">
                        <p style="color: var(--studio-yellow); font-weight: 600; margin-bottom: 0.5rem;">General Inquiries</p>
                        <a href="mailto:info@darksigil.studios" style="color: var(--text-primary); text-decoration: none;">info@darksigil.studios</a>
                    </div>
                    <div style="margin: 1.5rem 0;">
                        <p style="color: var(--studio-yellow); font-weight: 600; margin-bottom: 0.5rem;">Bookings</p>
                        <a href="mailto:booking@darksigil.studios" style="color: var(--text-primary); text-decoration: none;">booking@darksigil.studios</a>
                    </div>
                    <p class="contact-text" style="margin-top: 2rem;">Follow the collective on social media for updates and new releases.</p>
                </div>
            </section>
        </div>
        <footer class="footer">
            <div class="container">
                <div class="footer-bottom">
                    <p>&copy; 2024 Dark Sigil Studios. All rights reserved.</p>
                </div>
            </div>
        </footer>
    `;
}

// Navigation toggle
document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
        
        const navLinksEl = document.querySelectorAll('.nav-link');
        navLinksEl.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }
    
    // Initial render
    renderView();
});

// Listen for hash changes
window.addEventListener('hashchange', renderView);
