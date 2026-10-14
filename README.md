# Piyush Gujor — Premium 3D Developer Portfolio

A responsive React + Vite portfolio with a lightweight Three.js hero, mobile navigation, accessible project cards, and live public GitHub profile/repository integration.

## Requirements
- Node.js 24 (also compatible with current supported Node releases)
- npm

## Run locally
```bash
npm install
npm run dev
```
Open the local URL printed by Vite.

## Production build
```bash
npm run build
npm run preview
```
The production website is generated in `dist/`.

## Deploy to Vercel
1. Push this project to a GitHub repository.
2. Import the repository in Vercel.
3. Framework preset: **Vite**.
4. Build command: `npm run build`.
5. Output directory: `dist`.
6. Deploy. No GitHub token or environment variable is required for public profile/repository data.

## Deploy to Netlify
1. Import the repository in Netlify.
2. Build command: `npm run build`.
3. Publish directory: `dist`.
4. Deploy.

## Why GitHub can disappear after deployment
This implementation requests the public GitHub REST API from the browser, validates HTTP responses, caches successful data in `localStorage` for 30 minutes, shows skeletons while loading, and displays a retry/fallback state when GitHub rate-limits or the network is unavailable. GitHub's unauthenticated API rate limits still apply; the frontend cannot bypass them. The profile link remains available even if API calls fail. No fake repository data is substituted.

## Resume
The **Open resume** button opens `/resume.html` in a new tab. This ZIP did not include the original PDF attachment, so the included HTML resume is a practical print-ready version based only on the supplied portfolio details. On the resume page, use **Print / Save as PDF** to print it or save a PDF. To use your exact original PDF instead, place it at `public/Piyush_Gujor_Resume.pdf` and update the resume link in `src/App.jsx` to `/Piyush_Gujor_Resume.pdf`.

## Project links
- Amazon Clone live demo: https://effortless-melba-bfe4d9.netlify.app/
- FixMate: in development; no unverified live/repository links are fabricated.
- FixMate / Home Services live demo: https://home-serves-zk57.vercel.app/
- Tic-Tac-Toe live demo: https://tic-tac349demo.vercel.app/
- LeetCode button currently opens LeetCode's main site because the exact profile URL was not available in the supplied project brief. Replace `PROFILE.leetcode` in `src/App.jsx` with your exact profile URL to link directly to your account.

## Contact form
The form validates fields in the browser and opens a prefilled `mailto:` message. It does not claim that a message was delivered. Actual delivery requires an email service or backend.

## Notes
- GitHub username is set to `piyushgujor666-glitch` in `src/services/githubApi.js`.
- Uses public API only; do not put a personal access token in client-side code.
- The 3D scene is decorative and the layout includes a graceful fallback if WebGL cannot initialize.
- Four selectable themes (Midnight, Pearl, Aurora, Sunset) persist locally; use the palette button to cycle themes.
- Mobile navigation is fixed to the bottom with a More menu and extra breathing room above the dock.
- The light/dark toggle persists the selected theme locally.
- Motion respects the user's reduced-motion preference.
