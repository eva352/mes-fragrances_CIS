# AuroraStack Frontend (Next.js)

## Prerequisites
- Node.js 20+ (LTS recommended)

## Setup
```bash
cd frontend
npm install
npm run dev -- -H 0.0.0.0 -p 3000   # http://localhost:3000
```

## Scripts
- `npm run dev` – start dev server
- `npm run build` – production build
- `npm run start` – serve production build
- `npm run lint` – lint with ESLint

## Notes
- UI/thème (ex : “Northern Light”) via tokens HSL dans `app/globals.css`.
- Tailwind CSS v3 est activé via `@tailwind base/components/utilities`.
- En dev, l’app consomme l’API via `/api/v1/...` (proxy Next.js défini dans `next.config.js`).
