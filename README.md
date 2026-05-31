# Portfolio

A Vite + React portfolio. Content lives in [`public/content.json`](public/content.json) — adding a project is just adding a JSON entry.

## Develop

```bash
npm install
npm run dev
```

## Adding a project

Edit `public/content.json` and append to the `projects` array:

```json
{
  "slug": "my-thing",
  "title": "my-thing",
  "description": "one-line summary shown on the list",
  "tagline": "A longer summary shown on the project page.",
  "featured": true,
  "status": "active",
  "year": "2026",
  "tech": "rust · python",
  "thumbnail": "images/my-thing.png",
  "hero": "images/my-thing-hero.png",
  "links": [
    { "key": "repo", "label": "repo", "url": "https://github.com/..." }
  ],
  "sections": [
    { "label": "// overview", "paragraphs": ["First paragraph.", "Second paragraph."] },
    { "label": "// how it works", "paragraphs": ["..."] }
  ],
  "gallery": [
    { "src": "images/my-thing-1.png", "alt": "...", "caption": "..." }
  ]
}
```

Rules:

- `featured: true` → appears on the home page under *selected work*.
- `featured: false` → appears only on `/projects`.
- `sections` is an arbitrary-length array — each entry renders as a labeled text block with N paragraphs.
- `thumbnail` / `hero` / `gallery[].src` are relative to `public/` (e.g. `images/foo.png` resolves to `public/images/foo.png`). Absolute `https://...` URLs also work. If omitted, a default SVG placeholder is used.
- Paragraph strings allow inline HTML (links, `<em>`, etc.), so you can write `<a href="...">linked text</a>` inside them.

## Build & deploy to GitHub Pages

Project sites (`https://<user>.github.io/<repo>/`) are served from a subpath, so you need to pass that as `VITE_BASE` at build time.

```bash
# replace <repo> with your repository name
VITE_BASE=/<repo>/ npm run build
npm run deploy
```

`npm run deploy` uses [`gh-pages`](https://www.npmjs.com/package/gh-pages) to push `dist/` to the `gh-pages` branch. On the repo's Pages settings, set source = `gh-pages` branch, `/ (root)`.

User/organization sites (`<user>.github.io`) serve from the root, so `VITE_BASE=/` (the default) is correct.

Routing uses `HashRouter`, so deep links like `/#/projects/sim-arm` work on GitHub Pages without any 404 redirect hacks.

## Layout

```
public/
  content.json        ← edit this to add projects
  images/             ← put project images here (you create this folder)
src/
  App.jsx             ← routes
  main.jsx            ← entry
  styles.css          ← all styles
  content/
    ContentContext.jsx  ← fetches content.json once, exposes via hooks
  components/
    DefaultThumb.jsx    ← SVG placeholder when no image is provided
    ProjectListItem.jsx ← list row used on Home + Projects pages
  pages/
    Home.jsx          ← header, bio, selected (featured) work, links
    Projects.jsx      ← non-featured projects
    Project.jsx       ← single-project view
    NotFound.jsx
```
