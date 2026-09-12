# AURA — Guardian of Voices

A college machine-test project: a superhero help portal featuring an original
superhero named **AURA**, a conversational chatbot, a visitor help-request flow
with automatic email notification, and public deployment.

> **Status:** UI (navbar, hero, powers, mission, get-help), the conversational
> chatbot, backend validation, and email notification are implemented and
> working locally. Deployment is prepared via environment-driven configuration.

## Overview

AURA ("Guardian of Voices") is an attractive, responsive portal where visitors
chat with AURA, share their name, age, location, email, and help request, and
trigger an automatic email notification to the configured recipient.

## Stack

- **Frontend:** React + Vite, Tailwind CSS v4, Lucide React, Framer Motion
- **Backend:** Node.js + Express, CORS, dotenv, Resend HTTP email API

## Repository structure

```
aura-superhero-portal/
├── .gitignore
├── README.md
├── frontend/                  # React + Vite web app
│   ├── .env.example           # VITE_API_URL example (optional)
│   ├── .env.production.example
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js         # dev proxy /api -> :5000
│   └── src/
│       ├── App.jsx            # page composition
│       ├── main.jsx
│       ├── index.css          # composed design-system modules
│       ├── config/env.js      # API_BASE_URL (deploy-ready)
│       ├── data/              # aura.js, chat.js (content + copy)
│       ├── components/
│       │   ├── Navbar.jsx
│       │   ├── HeroSection.jsx
│       │   ├── ui/            # AuraButton, AuraCard, SectionTitle
│       │   ├── sections/      # Powers, Mission, GetHelp
│       │   └── chat/          # chatbot components
│       ├── hooks/useAuraChat.js
│       ├── styles/            # tokens, base, utilities, animations
│       └── utils/             # api.js, validation.js
└── backend/                   # Node.js + Express API
    ├── .env.example
    └── src/
        ├── server.js          # entry point
        ├── app.js             # express app (CORS, routes, error handling)
## Getting started (local)

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env   # then fill in real values (RESEND_API_KEY + mail addresses)
npm run dev            # or npm start
```

- Runs on <http://localhost:5000>
- Health check: <http://localhost:5000/api/health>

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

- Runs on <http://localhost:5173>
- Vite proxies `/api` requests to the backend at `http://localhost:5000`.

Open <http://localhost:5173>. Submit a help request through the chatbot in the
"Get Help" section; the backend emails it to `MAIL_TO`.

## Environment variables

Real credentials are **never committed**. Copy the `.env.example` files to the
corresponding `.env` files and fill in real values; all `.env*` are git-ignored.

### Backend (`backend/.env`)

| Variable | Purpose | Example |
|----------|---------|---------|
| `PORT` | Express port | `5000` |
| `FRONTEND_URL` | Allowed CORS origin(s), comma-separated | `http://localhost:5173` |
| `RESEND_API_KEY` | Resend HTTP API key (create free at resend.com/api-keys). Sent only as a server-side `Authorization: Bearer` header; never in frontend code. | *(your secret — not committed)* |
| `MAIL_FROM` | From address on notifications. Free Resend accounts must use `AURA Portal <onboarding@resend.dev>` until a domain is verified. | `AURA Portal <onboarding@resend.dev>` |
## Deployment (Render)

The app is two deployable units, defined in [`render.yaml`](./render.yaml)
(Render Blueprint — no secrets inside):

- **`aura-backend`** — Node/Express web service (`rootDir: backend`).
  Build: `npm install` · Start: `npm start` · Health check: `/api/health`.
- **`aura-frontend`** — Vite static site (`rootDir: frontend`).
  Build: `npm install && npm run build` · Publish dir: `dist`.

### How to deploy

1. Push this repo to GitHub/GitLab (do NOT commit any `.env` file).
2. In the Render Dashboard: **New → Blueprint**, select the repo/branch,
   and approve the two services from `render.yaml`.
3. When prompted, enter the private values in the Dashboard only:
   backend `FRONTEND_URL`, `RESEND_API_KEY`, `MAIL_TO`;
   frontend `VITE_API_URL`.
   - Deploy order matters: create the backend first, copy its public URL
     (e.g. `https://aura-backend.onrender.com`), then set the frontend's
     `VITE_API_URL` to `<backend-url>/api` and redeploy the frontend
     (clear build cache) so Vite bakes it in.
   - Then set the backend's `FRONTEND_URL` to the frontend's public URL
     (e.g. `https://aura-frontend.onrender.com`) so CORS allows it.

### Notes

- Keep `FRONTEND_URL` explicit (not `*`) and allow only the methods you use.
- Keep secrets in the host's environment, never in the repo (`.env*` ignored).
- After deploying, confirm `GET <backend-url>/api/health` works before
  relying on email delivery.

## Roadmap

- [x] Project foundation
- [x] Design system & global styling
- [x] Navbar + hero
- [x] Powers / mission / get-help sections
- [x] Conversational chatbot + help-request submission
- [x] Automatic email notification (Resend HTTP API)
- [x] Deployment preparation (env-driven API URL, docs)
- [ ] Public deployment + live verification

## Disclaimer

This project is for educational purposes. No real secret keys or email
credentials are stored in this repository.
| `MAIL_FROM` | From address on notifications. Free Resend accounts must use the test sender until a domain is verified. | `AURA Portal <onboarding@resend.dev>` |
| `MAIL_TO` | Recipient of help-request notifications | `notifications@example.com` |

### Frontend (`frontend/.env.local` or at build time)

| Variable | Purpose | Example |
|----------|---------|---------|
| `VITE_API_URL` | Public API origin for a deployed build. Leave unset locally to use the Vite `/api` proxy. | `https://your-api.example.com/api` |

## Email notification

`POST /api/requests` validates the payload, then `sendHelpRequestEmail` builds a
sanitized HTML/text email and sends it via the Resend HTTP API (outbound HTTPS
on port 443, which works on Render Free where SMTP ports 25/465/587 are
blocked). The endpoint returns **HTTP 201 only after** Resend confirms
acceptance; otherwise it returns a generic **500** (API keys and provider
details are never sent to the client).
        ├── routes/            # health, request routes
        ├── controllers/       # request.controller.js
        ├── services/          # email.service.js (Resend HTTP API)
        └── validators/        # request.validator.js
```

## Requirements

- Node.js 18+ (tested on v22)
- npm