# STEP 1 — Deployment structure

## Project folder structure (from repo root)

```
Kimi_Agent_React Site Cart Checkout (6)/
├── package.json              # ascend-backend (Express), "main": "src/server.js"
├── vercel.json               # rewrites only; no rootDirectory
├── api/
│   ├── index.js              # Express app entry (require('../src/app'))
│   ├── health.js             # existing (will be replaced with minimal handler)
│   └── webhook.js             # Stripe webhook serverless function
├── src/
│   ├── app.js
│   ├── server.js
│   └── routes/
├── app/                      # React + Vite frontend
│   ├── package.json          # "my-app", "type": "module", "build": "tsc -b && vite build"
│   ├── vite.config.ts
│   └── src/
├── app/server/               # Dev Express server (port 4242)
├── ascend-website/
└── ...
```

## package.json locations

| Path | Purpose |
|------|--------|
| **Repo root** `package.json` | Backend (ascend-backend): Express, Stripe, pg. No frontend build. |
| **app/package.json** | React + Vite app (my-app). Has `npm run build`. |
| **app/server/package.json** | Dev server (port 4242). |
| **ascend-website/package.json** | Separate package. |

## Vercel Root Directory

- **vercel.json** does **not** set `rootDirectory` (or `buildCommand` / `outputDirectory`).
- So **by default Vercel uses the repo root** as the project root.
- If in Vercel Project Settings you set **Root Directory** to `app`, then the build runs from `app/` and **serverless functions must live under `app/`**, e.g. `app/api/health.js`, `app/api/stripe/webhook.js`. The files created below are at **repo root** `api/`; if your Root Directory is `app`, move or duplicate them to `app/api/`.

## What Vercel builds

- With **root = repo root**: Vercel may detect the root `package.json` (no `build` script that outputs static assets). The rewrites point to `/api/health` and `/api`; serverless functions in **repo root** `api/` are used.
- With **root = app**: Build runs `npm run build` in `app/` (Vite). Serverless functions must be under `app/api/` to be deployed.

## Current rewrites (vercel.json)

1. `"/"` → `"/api/health"` (homepage to health)
2. `"/api/webhook"` → `"/api/webhook"` (webhook to serverless function)
3. `"/api/(.*)"` → `"/api"` (all other /api/* go to Express via `api/index.js`)

So **/api/health** and **/api/stripe/webhook** are currently matched by the catch-all and sent to `/api` (Express), which returns 404 for those paths. Adding explicit rewrites for `/api/health` and `/api/stripe/webhook` before the catch-all fixes this.
