# art-ThreeJs

**Codex Luminara — a portal to the Renaissance.**

A spherical 3D art gallery: you stand at the centre of a sphere whose inner walls are
hung with thirteen masterworks of European painting, from the Book of Kells to Vermeer.
Drag to wander the walls, tap a painting to open its folio.

Built with Three.js + GSAP + TypeScript + Vite.

## Features

- Sphere-interior gallery — tiles are true sphere segments, drawn as gilded manuscript plates on canvas textures
- Drag rotation with lenis-style inertia, wheel scroll, idle drift
- Lens post-processing: barrel distortion, warm binocular vignette, radial edge blur, film grain
- Routes: `/` gallery · `/list` index · `/about` · `/art/{slug}` folio pages
- Era filter (Medieval / Northern / High Renaissance / Baroque), list view with cursor-chasing preview
- Renaissance theme: Cinzel + EB Garamond, gold on dark parchment, Roman-numeral years

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build (tsc + vite)
```

Deploys to Vercel out of the box (`vercel.json` included).
