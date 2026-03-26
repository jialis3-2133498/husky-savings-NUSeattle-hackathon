# Husky Student Savings

Husky Student Savings is a static discount aggregation website built for the Northeastern University Seattle Emerald Forge Hackathon. The site organizes discounts, perks, and campus resources into a structured and centralized experience for NU Seattle students.

## Repository Structure

- `NU_Savings/`: Vite + React frontend application
- `docs/`: supporting project documentation
- `DEPLOYMENT.md`: deployment and release instructions
- `.github/workflows/deploy.yml`: GitHub Pages deployment workflow

## Tech Stack

- React
- Vite
- JavaScript
- GitHub Pages

## Data and Assets

- Data: `NU_Savings/public/data/deals.json`
- Content config: `NU_Savings/src/data/siteContent.json`
- Logos: `NU_Savings/public/logos/`
- Images: `NU_Savings/public/images/`

Assets are organized so teammates can add, remove, or replace files without editing component imports one by one.

## Data Design

Each entry includes:

- type (`benefit` vs `resource`)
- category (e.g. food, travel, technology)
- value type (e.g. discount, platform, reimbursement)
- source type and verification timestamp

This makes the dataset easier to search, maintain, and scale.

See [`docs/schema.md`](./docs/schema.md) for the full schema.

## Data Flow

Google Sheet → Apps Script → JSON → Frontend

This lightweight pipeline keeps the project easy to update without requiring a complex backend.

## Local Development

```bash
cd NU_Savings
npm ci
npm run dev
```

## Build and Verification

```bash
cd NU_Savings
npm run lint
npm run build
```

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for the full setup, release flow, and GitHub Pages deployment instructions.