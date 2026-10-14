# Piyush Gujor — 3D Developer Portfolio

React + Vite portfolio with a React Three Fiber hero, Framer Motion animations and live GitHub data.

## Stack
React 18, Vite 5, Three.js + React Three Fiber + Drei, Framer Motion, Lucide React, plain modern CSS (theme variables, dark default plus light toggle). No backend, no environment variables, no secrets.

## Setup
```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # outputs dist/
npm run preview   # serve the production build locally
```
Works on Node 20+ (including Node 22 and 24).

## Before you deploy
1. **Resume:** replace `public/Piyush_Gujor_Resume.pdf` with your real PDF (same filename). The file shipped now is a labeled placeholder.
2. **Project links:** edit `src/data/projects.js`. All three live demos are set. Source buttons point to your GitHub repositories page; set `liveUrl` / `sourceUrl` to real https URLs and the buttons to link each exact repo.
3. **Certificates:** add a real `url` to any item in `src/data/resume.js` to show a "View credential" button.

## Deploy
- **Vercel:** import the repo, preset "Vite", build `npm run build`, output `dist`.
- **Netlify:** build command `npm run build`, publish directory `dist`.

## How the main features work
- **GitHub:** `src/services/githubApi.js` calls the public `/users/{user}` and `/users/{user}/repos?sort=updated&per_page=100` endpoints without a token, validates responses, caches for 5 minutes, handles 403/429 rate limits and network errors, and supports AbortController cancellation (`src/hooks/useGitHub.js`). If the profile reports more public repos than were retrieved, the UI says so.
- **Contact form:** there is no mail service, so it validates input and opens a pre-filled `mailto:` link. It never claims a message was sent.
- **3D hero:** lazy-loaded; falls back to a CSS orb without WebGL or on render failure; honors `prefers-reduced-motion`; lighter settings on small screens.
- **Accessibility:** semantic sections, skip link, labelled form fields, visible focus, keyboard-operable controls.

## Structure
```
src/components  UI sections and helpers
src/services    githubApi.js
src/hooks       useGitHub.js (plus reduced-motion and WebGL hooks)
src/data        resume.js, projects.js
src/styles      global.css
```
