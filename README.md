# Dark Sigil Studios - SPA Multi-Artist Portfolio

A dark glassmorphism multi-artist music label website built with vanilla HTML, CSS, and JavaScript. Features continuous playback across navigation, per-artist theming, and is ready for GitHub Pages hosting.

## Features

- **SPA with Hash Routing** - Continuous music playback as you navigate between pages
- **Multi-Artist Focus** - Support for multiple artists, each with their own profiles and themes
- **Per-Artist Customization** - Unique colors and fonts per artist
- **Dark Sigil Studios Branding** - Red and yellow accented design with Pirata One font
- **Global Audio Player** - Persists across all page navigation with state saved to localStorage
- **Responsive Design** - Mobile-friendly layout
- **GitHub Pages Ready** - Pure static files, no build tools required

## Artists

- **dead girls** - Alternative / Heavy Emo Rock band
- **Arthur Rexxxon** - Acoustic Folk Punk solo artist  
- **AURELIA** - Electronic & Ambient (migrated from previous version)

## File Structure

```
/
├── index.html           # SPA shell with persistent nav and player
├── css/
│   ├── base.css         # Base styles and variables
│   ├── themes.css       # Studio and artist themes
│   ├── layout.css       # Navigation and layout
│   ├── player.css       # Player styles
│   └── views.css        # View-specific styles
├── js/
│   ├── artists.js       # Artist data
│   ├── themes.js        # Theme management
│   ├── player.js        # Audio player with persistence
│   ├── router.js        # Hash-based routing
│   ├── app.js           # App initialization
│   └── views/           # View templates (future)
├── assets/
│   ├── fonts/           # Custom fonts (add mb-thin-worms here)
│   ├── images/          # Images and artwork
│   └── icons/           # SVG icons
└── tracks/              # Add your MP3 files here
```

## Adding the mb-thin-worms Font

For the exact font requested, download it from [DaFont](https://www.dafont.com/mb-thin-worms.font) and add the files to `assets/fonts/`:
- `mb-thin-worms.woff2`
- `mb-thin-worms.woff`

The CSS already includes `@font-face` for it with fallback to `Pirata One`.

## Adding Your Music

### Update Artists
Edit `js/artists.js` to add/modify artists. Each artist needs:
- id, slug, name, genre, tagline, bio
- cover image, theme colors and fonts
- tracks array with id, title, duration, src, cover

### Add Audio Files
Place MP3 files in the `tracks/` folder and update the `src` paths in `js/artists.js`.

### Add Artist Images
Place artist photos in `assets/images/artists/` and update the paths.

## Customization

- **Studio Colors**: Edit CSS variables in `css/base.css` (`--studio-red`, `--studio-yellow`)
- **Artist Themes**: Edit theme objects in `js/artists.js` for each artist
- **Content**: Update bio text, social links, etc. in `js/artists.js` and `js/router.js`

## Deployment to GitHub Pages

1. Push all files to your repository
2. Go to Settings > Pages
3. Set source to "Deploy from a branch"
4. Select branch `main` and folder `/(root)`
5. Your site will be available at `https://yourusername.github.io/repository-name/`

The SPA with hash routing works perfectly on GitHub Pages with no additional configuration needed.

## Browser Support

Works in all modern browsers. Note that autoplay is blocked by browsers until user interaction - the player will work normally after the first play click, and navigation won't stop playback.
