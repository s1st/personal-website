# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static personal website for Simon Stieber (simon-stieber.de), hosted on GitHub Pages. Built using the "Dimension" HTML5 UP template.

## Tech Stack

- **HTML5** - Single-page application in `index.html`
- **SASS/SCSS** - Styles in `assets/sass/`, compiled to `assets/css/main.css`
- **JavaScript** - jQuery-based navigation and animations in `assets/js/main.js`
- **FontAwesome** - Icons via `assets/css/fontawesome-all.min.css`
- **GitHub Pages** - Deployment via `.github/workflows/static.yml`

## Development

No build system or package manager. Edit files directly:
- Content: `index.html`
- Styles: `assets/sass/` (SCSS files) or `assets/css/main.css` (compiled)
- JavaScript: `assets/js/main.js`

### Local Preview

Open `index.html` directly in a browser, or use a local server:
```bash
python3 -m http.server 8000
```

### Deployment

Push to `master` branch triggers automatic deployment to GitHub Pages via the workflow in `.github/workflows/static.yml`.

## Architecture

### Page Structure

Single HTML file with modal-style navigation. Sections are `<article>` elements:
- `#work` - Publications and research
- `#speaking` - Conference talks and presentations
- `#about` - Biography and CV with skill charts
- `#contact` - Contact cards with social links
- `#impress` - Legal pages (Impressum/GDPR)

Navigation shows/hides articles using jQuery animations in `main.js`.

### SASS Organization

```
assets/sass/
├── main.scss          # Entry point, imports all partials
├── libs/              # Variables, mixins, breakpoints
├── base/              # Reset, page, typography
├── components/        # Buttons, forms, icons, images
└── layout/            # Header, footer, main, bg, wrapper
```

### Images

- Store in `images/` directory
- Use WebP format with JPG fallback for photos
- Compressed versions use `_compressed` suffix
- Background: `bg_compressed.jpg`
- Profile photo: `me_compressed.jpg`
