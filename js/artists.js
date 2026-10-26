// Artists Data
const artists = [
    {
        id: "dead-girls",
        slug: "dead-girls",
        name: "dead girls",
        type: "band",
        genre: "Alternative / Heavy Emo Rock",
        tagline: "raw, snarling, cathartic",
        bio: "dead girls is a band-based alternative heavy emo rock outfit that channels raw emotion through distorted guitars, haunting melodies, and unflinching lyrical honesty. Born from late-night jam sessions and fueled by cathartic expression, their sound walks the line between aggression and vulnerability.",
        cover: "assets/images/covers/cover2.svg",
        heroImage: "assets/images/artists/placeholder.svg",
        theme: {
            primary: "#bf47ff",
            secondary: "#ffa502",
            accentGlow: "rgba(86, 255, 71, 0.6)",
            fontDisplay: "'Reenie Beanie', cursive",
            bgOverlay: "radial-gradient(circle at 30% 50%, rgba(255, 71, 87, 0.15) 0%, transparent 60%)"
        },
        social: { 
            bandcamp: "#", 
            spotify: "#", 
            instagram: "#" 
        },
        tracks: [
            { id: "dg-1", title: "rotted promises", duration: "3:12", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", cover: "assets/images/covers/cover2.svg" },
            { id: "dg-2", title: "black lace", duration: "3:28", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3", cover: "assets/images/covers/cover2.svg" }
        ]
    },
    {
        id: "arthur-rexxxon",
        slug: "arthur-rexxxon",
        name: "Arthur Rexxxon",
        type: "solo",
        genre: "Acoustic Folk Punk",
        tagline: "scuffed strings & snarled verses",
        bio: "Arthur Rexxxon is a solo artist wielding acoustic folk punk with equal parts charm and defiance. With a well-worn guitar and a voice full of grit, their songs tell tales of misfits, dive bars, and defiant hope. Raw and unpolished in the best possible way.",
        cover: "assets/images/covers/cover3.svg",
        heroImage: "assets/images/artists/placeholder.svg",
        theme: {
            primary: "#ff6b6b",
            secondary: "#feca57",
            accentGlow: "rgba(255, 107, 107, 0.5)",
            fontDisplay: "'Fontdiner Swanky', 'Pirata One', cursive",
            bgOverlay: "radial-gradient(circle at 70% 50%, rgba(254, 202, 87, 0.12) 0%, transparent 60%)"
        },
        social: { 
            bandcamp: "#", 
            spotify: "#", 
            instagram: "#" 
        },
        tracks: [
            { id: "ar-1", title: "bus stop blues", duration: "2:48", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", cover: "assets/images/covers/cover3.svg" },
            { id: "ar-2", title: "railroad romance", duration: "3:05", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3", cover: "assets/images/covers/cover3.svg" }
        ]
    },
    {
        id: "aurelia",
        slug: "aurelia",
        name: "AURELIA",
        type: "solo",
        genre: "Electronic & Ambient",
        tagline: "ethereal soundscapes",
        bio: "AURELIA crafts ethereal electronic and ambient soundscapes that blur the boundaries between reality and dreams. Drawing inspiration from cosmic phenomena and natural environments, each track is a journey through atmospheric textures and hypnotic rhythms.",
        cover: "assets/images/covers/cover1.svg",
        heroImage: "assets/images/artists/placeholder.svg",
        theme: {
            primary: "#6366f1",
            secondary: "#22d3ee",
            accentGlow: "rgba(99, 102, 241, 0.6)",
            fontDisplay: "'Pirata One', cursive",
            bgOverlay: "radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.12) 0%, transparent 60%)"
        },
        social: { 
            bandcamp: "#", 
            spotify: "#", 
            instagram: "#" 
        },
        tracks: [
            { id: "au-1", title: "Nebula Dreams", duration: "4:23", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", cover: "assets/images/covers/cover1.svg" },
            { id: "au-2", title: "Ethereal Echoes", duration: "3:56", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", cover: "assets/images/covers/cover1.svg" },
            { id: "au-3", title: "Midnight Pulse", duration: "4:12", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3", cover: "assets/images/covers/cover1.svg" },
            { id: "au-4", title: "Starlit Path", duration: "5:01", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3", cover: "assets/images/covers/cover1.svg" }
        ]
    }
];

// Get all tracks with artist info
function getAllTracks() {
    const allTracks = [];
    artists.forEach(artist => {
        artist.tracks.forEach(track => {
            allTracks.push({
                ...track,
                artistId: artist.id,
                artistName: artist.name
            });
        });
    });
    return allTracks;
}

// Get artist by slug
function getArtistBySlug(slug) {
    return artists.find(a => a.slug === slug);
}

// Get artist by id
function getArtistById(id) {
    return artists.find(a => a.id === id);
}
