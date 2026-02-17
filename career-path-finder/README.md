
  # Career Path Finder 

  This is the frontend for Career Path Finder — a React + Vite + TypeScript single-page app that consumes the CareerFinder backend API.

  ## Tech stack
  - Vite
  - React + TypeScript
  - Tailwind CSS
  - ESlint / Prettier 

  ## Quick start
  Prerequisites:
  - Node.js 16+ (or later LTS)
  - npm, yarn, or pnpm

  Install and run locally:

  ```bash
  # from repository root
  cd career-path-finder
  npm install
  npm run dev
  ```

  Open http://localhost:5173 (Vite default) in your browser.

  ## Environment
  Create an environment file `.env.local` (or use your preferred env manager) in `career-path-finder` with the following variable:

  ```env
  VITE_API_BASE_URL=http://localhost:8000/api
  ```

  - `VITE_API_BASE_URL`: base URL for the backend API. The frontend reads this in `src/api.ts` and service modules.

  ## Available scripts
  Run these from the `career-path-finder` folder.

  - `npm run dev` — start the development server (hot reload)
  - `npm run build` — build production static assets into `dist`
  - `npm run preview` — locally preview the built app

  (If your project uses `yarn` or `pnpm`, use the equivalent commands.)

  ## Project structure (important files)
  - `src/` — application source
    - `src/pages/` — route pages (Landing, Login, Profile, Recommendations, etc.)
    - `src/components/` — reusable UI components and primitives
    - `src/services/api.ts` and `src/api.ts` — API helpers and typed endpoints
    - `src/context/` and `src/hooks/` — auth & app state helpers

  ## Development notes
  - Authentication: the app uses protected routes and an `AuthContext` (see `src/context/AuthContext.tsx`). Adjust token handling if your backend changes auth behavior.
  - API surface: keep `VITE_API_BASE_URL` in sync with the backend. CORS must be enabled on the backend during local development.
  - Styling: Tailwind is configured in `tailwind.config.js`; adjust theme tokens there.

  ## Building & Deployment
  - Run `npm run build` to produce the static `dist` folder.
  - Deploy `dist` to any static host (Netlify, Vercel, GitHub Pages) or serve it from a web server. If integrating with the Django backend, copy `dist` files into your static assets pipeline.

  ## Troubleshooting
  - Blank page or 404 on reload: ensure your static host is configured for SPA fallback to `index.html`.
  - API errors: verify `VITE_API_BASE_URL` and backend CORS settings.

  ## Contributing
  - Create a branch for your feature/fix.
  - Keep changes small and focused.

  ## Next steps (optional)
  - Add a `Dockerfile` for the frontend build and serve stage
  - Add GitHub Actions for linting, type checks and deploy
  - Add component-level tests.
