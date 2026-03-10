# Backend deployment analysis – separate repo for Vercel

## 1) Backend folder

**There is no dedicated backend subfolder.**

The backend lives at the **repository root** (.). Backend pieces at root:

- `api/` (index.js, health.js, stripe-webhook.js)
- `src/` (app.js, server.js, config/, db/, middleware/, routes/, services/, utils/)
- `db/` (schema.sql, migrations/)
- `package.json` (Node/Express, name: ascend-backend)
- `vercel.json`
- `.env.example`
- `.gitignore`

Also at root (not backend): `app/` (frontend), `ascend-website/` (if present).

**Full relative path of the folder that contains the backend:**  
`.` (the repo root)

---

## 2) Git and remote

- **.git:** Yes. `.git` is at the repo root (same level as `package.json`, `src/`, `api/`).
- **Current remote origin:**  
  `https://github.com/epalmer859-source/BAckend-server.git`

So the backend is inside this single Git repo (monorepo with backend at root and frontend in `app/`).

---

## 3) Splitting backend into its own repo

**Safe to split:** Yes.

- **No shared imports from frontend:** Checked. No `require(...)` or `from` in `src/` that reference `app/` or any frontend path. All backend imports are within `src/`, or to `./config`, `../db`, `../config/env`, etc.
- **No broken relative paths:** If you put only the backend files in a new folder (same layout: `api/`, `src/`, `db/`, `package.json` at root of that folder), paths stay the same. `api/index.js` uses `require('../src/app')`; `src/` uses `./config`, `../db`, etc. All remain valid in a backend-only repo.

---

## 4) Preparing the backend as its own repo

Because the backend is at the **current repo root** (not in a subfolder), you have two ways to get a backend-only repo:

**Option A – New folder with only backend (recommended)**  
Create a new directory, copy only backend files into it, init a new Git repo there, add remote `backend-new.git`, commit and push. Frontend is never touched.

**Option B – Use current repo and untrack frontend**  
In the current repo: remove `app/` and `ascend-website/` from Git (e.g. `git rm -r --cached app ascend-website`), add them to `.gitignore`, add remote `backend-new.git`, push. Frontend stays on disk but is no longer in the repo.

Below, only **Option A** is spelled out step-by-step so that you “prepare ONLY the backend” and “Do NOT touch frontend files.”

---

## 5) Exact commands (Option A – new backend-only repo)

Run these in order. Use a **new** terminal and a **parent** directory where you want the new repo (e.g. your usual projects folder). Replace `C:\path\to\parent` with your real path (parent of the current repo).

```batch
cd C:\path\to\parent
```

```batch
git clone https://github.com/epalmer859-source/BAckend-server.git backend-new
```

```batch
cd backend-new
```

```batch
rmdir /s /q app
```

```batch
if exist ascend-website rmdir /s /q ascend-website
```

```batch
rd /s /q .git
```

```batch
git init
```

```batch
git remote add origin https://github.com/epalmer859-source/backend-new.git
```

```batch
git add .
```

```batch
git commit -m "Backend for Vercel"
```

```batch
git push -u origin main --force
```

```batch
git status
```

Notes:

- If `ascend-website` does not exist, the `if exist` line will do nothing (safe).
- `rd /s /q .git` removes the old Git history so the new repo has a single clean commit.
- Create the empty repo `backend-new` on GitHub first (no README, no .gitignore) so `git push -u origin main --force` works.

---

## 6) Final backend file structure (after Option A)

After cloning, deleting `app/` and `ascend-website/`, and re-initing Git, the backend folder (e.g. `backend-new`) will look like this (conceptually):

```
backend-new/
├── .env.example
├── .gitignore
├── api/
│   ├── health.js
│   ├── index.js
│   └── stripe-webhook.js
├── db/
│   ├── migrations/
│   │   ├── 001_orders_type_and_stripe.sql
│   │   ├── 002_unique_stripe_invoice_id.sql
│   │   ├── 003_product_catalog_and_idempotency.sql
│   │   └── 004_invariant_checks.sql
│   └── schema.sql
├── package.json
├── SECURITY_AUDIT.md
├── SECURITY_PATCHES_SUMMARY.md
├── src/
│   ├── app.js
│   ├── config/
│   │   ├── cookies.js
│   │   ├── cors.js
│   │   └── env.js
│   ├── db/
│   │   └── index.js
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── errorHandler.js
│   │   ├── rateLimit.js
│   │   ├── requestId.js
│   │   └── validate.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── billing.routes.js
│   │   ├── checkout.routes.js
│   │   ├── order.routes.js
│   │   ├── stripe-webhook.routes.js
│   │   ├── user.routes.js
│   │   └── webhook.routes.js
│   ├── server.js
│   ├── services/
│   │   ├── auth.service.js
│   │   ├── order.service.js
│   │   ├── priceAllowlist.service.js
│   │   ├── stripe.service.js
│   │   └── subscription.service.js
│   └── utils/
│       ├── crypto.js
│       ├── idempotency.js
│       └── logger.js
└── vercel.json
```

**Checks:**

| Check | Status |
|-------|--------|
| `package.json` at root of backend | Yes – `backend-new/package.json` (ascend-backend) |
| `api/index.js` exists for Vercel | Yes – `api/index.js` exports Express app |
| `app.listen()` removed | Yes – `src/server.js` only `require('./app')` and `module.exports = app`; no `app.listen()` |
| Webhook route uses `express.raw` | Yes – `src/routes/stripe-webhook.routes.js`: `router.post('/webhook', express.raw({ type: 'application/json' }), ...)` |

---

**Summary**

- Backend path: **`.`** (repo root).
- Remote: **https://github.com/epalmer859-source/BAckend-server.git**
- Safe to split: **yes**; no frontend imports; paths stay valid.
- Use the commands in section 5 in a new clone, then remove `app/` and `ascend-website/`, re-init Git, and push to **https://github.com/epalmer859-source/backend-new.git** for a backend-only Vercel deploy.
