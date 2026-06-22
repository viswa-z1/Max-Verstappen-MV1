# MV1 · Max Verstappen — A Vertical Drive

An immersive, GSAP-powered tribute site for Max Verstappen — a "vertical drive"
through a champion's career, with a race-engineer pit-wall HUD layered on top.

### ▶ Live site
**https://viswa-z1.github.io/Max-Verstappen-MV1/**

## Highlights
- **Cinematic scroll** — "LOAD VERSTAPPEN" intro gate, SplitText reveals, a
  full-bleed portrait clip-wipe, a horizontal moments reel, and a parallax car banner.
- **Homepage 3D** — the hero is a 3D diorama that dollies and tilts as you scroll,
  with content blocks pivoting in 3D across the viewport.
- **The Helmet** — the real race helmet on a glowing spotlight stage with pointer
  tilt and a drag-to-rotate inspector.
- **Pit-wall HUD** — a dock of instruments using authentic F1 timing semantics:
  hot-lap timer with sector splits, tyre strategy, ERS deployment, telemetry G-trace,
  lights-out countdown, dashboard, reaction game, standings, command palette (`/`),
  DRS easter egg, and more.

## Run locally
No build step — it's static HTML/CSS/JS with GSAP from a CDN.

```bash
node server.js        # serves on http://localhost:4179
# or any static server, e.g. python3 -m http.server
```

## Tech
GSAP 3.13 · ScrollTrigger · ScrollToPlugin · SplitText · vanilla JS.

---
*Unofficial fan concept. Not affiliated with Max Verstappen, Red Bull or Formula 1.
Imagery is used for a personal, non-commercial project.*
