# Movie Explorer

Browse and search movies and TV shows powered by the [TMDB API](https://www.themoviedb.org/).

## Stack

| Layer | Technology |
|---|---|
| UI | React 19, Vite, TypeScript, MUI, Apollo Client |
| BFF | Node.js, TypeScript, GraphQL Yoga |
| API | TMDB REST API |
| Types | graphql-codegen (shared schema → TypeScript) |

## Architecture

```
ui (React)  ──GraphQL──▶  bff (Node)  ──REST──▶  TMDB API
```

The UI never calls TMDB directly — all data flows through the BFF, which maps TMDB responses to a clean GraphQL schema.

## Getting started

### 1. Get a TMDB API key

Register at [themoviedb.org](https://www.themoviedb.org/) → Settings → API → Request an API Key (free).

### 2. Configure environment variables

**BFF:**
```bash
cp bff/.env.example bff/.env
# Edit bff/.env and set your TMDB_API_KEY
```

**UI:**
```bash
cp ui/.env.example ui/.env.local
# VITE_GRAPHQL_URL defaults to http://localhost:4000/graphql — no change needed for local dev
```

### 3. Run the BFF

```bash
cd bff
npm install
npm run dev
# GraphQL server running at http://localhost:4000/graphql
```

### 4. Run the UI

```bash
cd ui
npm install
npm run dev
# App running at http://localhost:5173
```

## Environment variables

### BFF (`bff/.env`)

| Variable | Required | Description |
|---|---|---|
| `TMDB_API_KEY` | Yes | Your TMDB v3 API key |
| `PORT` | No | HTTP port (default: `4000`) |

### UI (`ui/.env.local`)

| Variable | Required | Description |
|---|---|---|
| `VITE_GRAPHQL_URL` | No | BFF GraphQL endpoint (default: `http://localhost:4000/graphql`) |

## Generating types

Types are generated from the GraphQL schema using graphql-codegen.

```bash
# BFF — generates resolver types
cd bff && npm run codegen

# UI — generates query/mutation types
cd ui && npm run codegen
```

## Deployment

### BFF → Railway

1. Create a new project on [Railway](https://railway.app/)
2. Connect your GitHub repo, set root directory to `bff`
3. Add environment variable: `TMDB_API_KEY=your_key`
4. Railway uses `railway.json` for build/start configuration

### UI → Vercel

1. Import your repo on [Vercel](https://vercel.com/)
2. Set root directory to `ui`
3. Add environment variable: `VITE_GRAPHQL_URL=https://your-bff.railway.app/graphql`
4. Vercel uses `vercel.json` for SPA routing configuration

## Features

- **Search** — find movies and TV shows as you type (debounced, with request cancellation)
- **Watchlist** — save titles to watch later, persisted in `localStorage`
- **Loading skeletons** — shown while fetching results
- **Empty and error states** — clear feedback for all scenarios
