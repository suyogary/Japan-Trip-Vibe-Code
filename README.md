# Waypoint

A personal trip-planning tool: a day-by-day itinerary, lodging shortlists, transit
options, and a per-city excursion checklist, all in one page. Built as a local-only
Tier-2-lite implementation of the [Waypoint architecture plan](https://claude.ai/code/artifact/357f9bed-b603-435d-9400-ef65acb16f4e) —
real application logic for the interactive parts (refresh, reject reasons, value
scores, refundability, checklist state), seeded with real research from an actual
Japan trip instead of a live backend/API.

## Running it

```bash
npm install
npm run dev
```

Then open the printed `localhost` URL. Everything is a static Vite + React app —
no server, no API key, no account. State (checked-off excursions, rejected lodging
options, refresh counts, override notes) lives in your browser's `localStorage`, so
it survives a refresh but stays entirely on your machine.

## How it's organized

- `src/data/*.json` — the trip's actual content: brief, itinerary, lodging pools,
  transit legs, excursions. This is what a live backend would generate per-trip;
  here it's the seed data from one real planning session.
- `src/components/` — the four table/section views (itinerary, lodging, transit,
  excursions), each implementing the interaction rules from the architecture plan
  (reject-reason chips, refresh-with-exhaustion, value-score writeups, checklist
  state tied to item identity, not day slot).
- `src/lib/storage.ts` — the `localStorage` layer standing in for a real backend's
  persisted state.

## Refreshing the data for a new trip

There's no live research pipeline wired in — that's the part of the real
architecture that needs an LLM + real transit/lodging APIs. To reuse this for a
different trip, the fastest path is to ask Claude to regenerate `src/data/*.json`
for the new destination, following the same schema (`src/types.ts`), then
`npm run dev` again. Everything else — the UI, the refresh/reject logic, the
guardrail behaviors — is destination-agnostic and just works.

## Showing it off

For a portfolio: `npm run build` produces a static `dist/` you can screenshot or
deploy anywhere static files are served (it's not wired to book anything or call
any paid API, so there's nothing sensitive in it). The lodging section is the best
screenshot — it's where the refresh/reject/value-score/refundability interactions
are all visible at once.
