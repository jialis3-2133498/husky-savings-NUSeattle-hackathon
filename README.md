# Husky Student Savings

Husky Student Savings is a static discount aggregation website built for the Northeastern University Seattle Emerald Forge Hackathon. The site is inspired by university discount portals and aims to provide NU Seattle students with a centralized place to browse verified deals, student benefits, and local savings opportunities.

## Repository Structure

- `NU_Savings/`: the Vite + React frontend application
- `DEPLOYMENT.md`: deployment, release, and daily-use instructions for teammates
- `.github/workflows/deploy.yml`: GitHub Pages deployment workflow

## Deployment

See [DEPLOYMENT.md](/Users/yuhaos/Desktop/husky-savings-NUSeattle-hackathon/DEPLOYMENT.md) for the full setup, release flow, and GitHub Pages deployment instructions.

## Tech Stack

- React
- Vite
- JavaScript
- GitHub Pages

## Data and Assets

- Discount data: `NU_Savings/public/data/deals.json`
- Site content config: `NU_Savings/src/data/siteContent.json`
- Logos: `NU_Savings/public/logos/`
- Homepage images: `NU_Savings/public/images/`

Assets are organized so teammates can add, remove, or replace files without editing component imports one by one.

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
