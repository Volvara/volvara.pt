# Volvara Studio · Deployment Package

Generated: 2026-04-24T13:51:04.736Z

## Contents

`studio/index.html` — Editorial landing page (21 KB)
`studio/robots.txt` — noindex instructions for crawlers

## Deployment · 3 steps

### 1. Upload to GitHub

Option A · via GitHub web:
  1. Go to github.com/Volvara/volvara.pt
  2. Add file → Upload files
  3. Drag the `studio` folder from this zip into the upload area
  4. Commit: "feat: add /studio editorial landing + robots"
  5. Commit directly to main

Option B · via Git CLI:
  unzip volvara-studio.zip
  mv studio/ /path/to/volvara.pt/
  cd /path/to/volvara.pt
  git add studio/
  git commit -m "feat: add /studio editorial landing + robots"
  git push origin main

### 2. Wait for GitHub Pages rebuild (1-2 minutes)

### 3. Verify live
  - https://volvara.pt/studio/ → loads editorial landing
  - https://volvara.pt/studio/robots.txt → shows Disallow: /
  - volvara.pt homepage → "Visitar o Studio →" link works (no more 404)
  - volvara.pt footer → "Para projectos mais cuidados..." link works

## Technical notes

- Self-contained HTML (no external dependencies except Google Fonts)
- Form posts to Formspree endpoint xkgwpqzr (same as main site)
- noindex,nofollow meta tag prevents indexing
- robots.txt reinforces noindex at crawler level
- Schema.org ProfessionalService markup included
- Responsive (tested down to 380px)
- Email studio@volvara.pt referenced — create mailbox on amen.pt (~€3/mo)

## Design tokens

- Background: #F9F7F2 (off-white warm)
- Ink: #1A1A1A (near-black)
- Accent: #8B5E3C (ochre/mocha)
- Display font: Fraunces (serif, Google Fonts)
- Body font: Inter (sans-serif, Google Fonts)
- Editorial tone, 6rem section padding, generous whitespace

## Different from volvara.pt main

volvara.pt = brutalist dark (Bebas Neue + amber)
volvara.pt/studio = editorial light (Fraunces + ochre)

Same brand, two tones. Like Aesop regular vs Aesop perfume store.

---
Volvara · 2026
