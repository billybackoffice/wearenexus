# Nexus — Professional Trading Terminal

A minimal, high-signal trading workspace built with Next.js.

## Features

- **Professional charting** — TradingView advanced charts with indicators
- **Watchlist** — Multi-asset (crypto, FX, indices, commodities)
- **Paper trading** — Simulated order ticket (market / limit + leverage)
- **AI Research assistant** — Ask market questions (demo responses)
- **Signals & News feed**
- **Account bar** — Equity, available balance, day P&L
- **Auth** — Email/password + Google OAuth
- **Protected dashboard**

## Design

Clean, dark, typography-first interface using:
- **Inter** for UI
- **JetBrains Mono** for prices and numbers
- Minimal borders, high information density, no visual noise

## Quick Start

```bash
npm install
cp .env.example .env.local   # already has a dev AUTH_SECRET
npm run dev
```

Open http://localhost:3000

1. Create an account (or sign in)
2. You land on the full trading terminal

## Environment

```env
AUTH_SECRET=long-random-string

# Optional Google OAuth
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

## Deploy to Vercel

```bash
npx vercel
```

Add the same env vars in the Vercel project settings.

## Notes

- User data is stored in `data/users.json` (local file). For production, switch to a real database.
- AI chat currently returns simulated research replies. Wire it to an LLM API when ready.
- All trading is **simulation only**.

## Stack

- Next.js 15 (App Router)
- NextAuth.js v5
- Tailwind CSS v4
- TradingView Charting Library (widget)
- TypeScript
