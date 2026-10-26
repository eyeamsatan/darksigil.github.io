// Player JavaScript - SPA Version with Continuous Playback
const audioPlayer = document.getElementById('audioPlayer');
const playBtn = document.getElementById('playBtn');
const playIcon = document.getElementById('playIcon');
const pauseIcon = document.getElementById('pauseIcon');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const progressBar = document.getElementById('progressBar');
const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');
const volumeBar = document.getElementById('volumeBar');
const playerCover = document.getElementById('playerCover');
const playerTitle = document.getElementById('playerTitle');
const playerArtist = document.getElementById('playerArtist');
const globalPlayer = document.getElementById('globalPlayer');

let playlist = [];
let currentTrackIndex = -1;
let isPlaying = false;
let currentArtistId = null;

// Save player state to localStorage
function savePlayerState() {
    const state = {
        trackIndex: currentTrackIndex,
        currentTime: audioPlayer ? audioPlayer.currentTime : 0,
        isPlaying: isPlaying,
        volume: audioPlayer ? audioPlayer.volume : 0.7
    };
    try {
        localStorage.setItem('darkSigilPlayerState', JSON.stringify(state));
    } catch (e) {
        // Ignore localStorage errors
    }
}

// Load player state from localStorage
function loadPlayerState() {
    try {
        const saved = localStorage.getItem('darkSigilPlayerState');
        if (saved) {
            return JSON.parse(saved);
        }
    } catch (e) {
        // Ignore localStorage errors
    }
    return null;
}

// Initialize playlist
function initializePlaylist() {
    playlist = getAllTracks();
}

// Load track
function loadTrack(index, autoplay = false) {
    if (index < 0 || index >= playlist.length) return;
    
    currentTrackIndex = index;
    const track = playlist[index];
    
    if (audioPlayer) {
        audioPlayer.src = track.src;
    }
    
    if (playerCover) {
        playerCover.src = track.cover || 'assets/images/covers/cover1.svg';
    }
    if (playerTitle) {
        playerTitle.textContent = track.title;
    }
    if (playerArtist) {
        playerArtist.textContent = track.artistName || 'Unknown Artist';
    }
    
    // Apply artist theme if track has artist
    if (track.artistId) {
        const artist = getArtistById(track.artistId);
        if (artist) {
            currentArtistId = artist.id;
            if (typeof applyArtistTheme === 'function') {
                applyArtistTheme(artist);
            }
        }
    }
    
    // Reset progress
    if (progressBar) progressBar.value = 0;
    if (currentTimeEl) currentTimeEl.textContent = '0:00';
    
    // Show player
    if (globalPlayer) {
        globalPlayer.style.display = 'block';
    }
    
    if (autoplay) {
        playTrack();
    }
}

// Play track
function playTrack() {
    if (audioPlayer && audioPlayer.src) {
        audioPlayer.play().then(() => {
            isPlaying = true;
            if (playIcon) playIcon.style.display = 'none';
            if (pauseIcon) pauseIcon.style.display = 'block';
            savePlayerState();
        }).catch(error => {
            console.log('Playback failed:', error);
        });
    }
}

// Pause track
function pauseTrack() {
    if (audioPlayer) {
        audioPlayer.pause();
        isPlaying = false;
        if (playIcon) playIcon.style.display = 'block';
        if (pauseIcon) pauseIcon.style.display = 'none';
        savePlayerState();
    }
}

// Toggle play/pause
function togglePlay() {
    if (isPlaying) {
        pauseTrack();
    } else {
        if (currentTrackIndex === -1 && playlist.length > 0) {
            loadTrack(0, true);
        } else {
            playTrack();
        }
    }
}

// Load and play specific track
function loadAndPlayTrack(index) {
    loadTrack(index, true);
}

// Next track
function nextTrack() {
    if (playlist.length === 0) return;
    const nextIndex = (currentTrackIndex + 1) % playlist.length;
    loadTrack(nextIndex, isPlaying);
}

// Previous track
function prevTrack() {
    if (playlist.length === 0) return;
    const prevIndex = currentTrackIndex <= 0 ? playlist.length - 1 : currentTrackIndex - 1;
    loadTrack(prevIndex, isPlaying);
}

// Format time
function formatTime(seconds) {
    if (isNaN(seconds) || seconds < 0) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return mins + ':' + (secs < 10 ? '0' + secs : secs);
}

// Event Listeners
if (playBtn) {
    playBtn.addEventListener('click', togglePlay);
}

if (nextBtn) {
    nextBtn.addEventListener('click', nextTrack);
}

if (prevBtn) {
    prevBtn.addEventListener('click', prevTrack);
}

if (volumeBar) {
    volumeBar.addEventListener('input', (e) => {
        if (audioPlayer) {
            audioPlayer.volume = e.target.value / 100;
            savePlayerState();
        }
    });
}

if (progressBar) {
    progressBar.addEventListener('input', (e) => {
        if (audioPlayer && audioPlayer.duration) {
            const time = (e.target.value / 100) * audioPlayer.duration;
            audioPlayer.currentTime = time;
        }
    });
}

// Audio events
if (audioPlayer) {
    audioPlayer.addEventListener('timeupdate', () => {
        if (audioPlayer.duration) {
            const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
            if (progressBar) progressBar.value = progress;
            if (currentTimeEl) currentTimeEl.textContent = formatTime(audioPlayer.currentTime);
        }
        // Save state periodically
        if (Math.floor(audioPlayer.currentTime) % 5 === 0) {
            savePlayerState();
        }
    });
    
    audioPlayer.addEventListener('loadedmetadata', () => {
        if (durationEl) {
            durationEl.textContent = formatTime(audioPlayer.duration);
        }
    });
    
    audioPlayer.addEventListener('ended', () => {
        nextTrack();
    });
    
    audioPlayer.addEventListener('play', () => {
        isPlaying = true;
        if (playIcon) playIcon.style.display = 'none';
        if (pauseIcon) pauseIcon.style.display = 'block';
        savePlayerState();
    });
    
    audioPlayer.addEventListener('pause', () => {
        isPlaying = false;
        if (playIcon) playIcon.style.display = 'block';
        if (pauseIcon) pauseIcon.style.display = 'none';
        savePlayerState();
    });
}

// Initialize player
document.addEventListener('DOMContentLoaded', () => {
    initializePlaylist();
    
    if (audioPlayer) {
        audioPlayer.volume = 0.7;
    }
    if (volumeBar) {
        volumeBar.value = 70;
    }
    
    if (globalPlayer) {
        globalPlayer.style.display = 'block';
    }
    
    // Restore player state
    const savedState = loadPlayerState();
    if (savedState && playlist.length > 0) {
        if (savedState.trackIndex >= 0 && savedState.trackIndex < playlist.length) {
            currentTrackIndex = savedState.trackIndex;
            const track = playlist[currentTrackIndex];
            if (audioPlayer) {
                audioPlayer.src = track.src;
                audioPlayer.currentTime = savedState.currentTime || 0;
            }
            if (playerCover) playerCover.src = track.cover || 'assets/images/covers/cover1.svg';
            if (playerTitle) playerTitle.textContent = track.title;
            if (playerArtist) playerArtist.textContent = track.artistName || 'Unknown Artist';
            
            if (track.artistId) {
                const artist = getArtistById(track.artistId);
                if (artist && typeof applyArtistTheme === 'function') {
                    applyArtistTheme(artist);
                }
            }
        }
        if (savedState.volume !== undefined) {
            if (audioPlayer) audioPlayer.volume = savedState.volume;
            if (volumeBar) volumeBar.value = savedState.volume * 100;
        }
        if (savedState.isPlaying && audioPlayer && audioPlayer.src) {
            // Don't autoplay on load due to browser policies, just restore state
            isPlaying = false;
            if (playIcon) playIcon.style.display = 'block';
            if (pauseIcon) pauseIcon.style.display = 'none';
        }
    } else {
        // Load first track but don't autoplay
        if (playlist.length > 0) {
            loadTrack(0, false);
            isPlaying = false;
            if (playIcon) playIcon.style.display = 'block';
            if (pauseIcon) pauseIcon.style.display = 'none';
        }
    }
});
