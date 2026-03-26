# Husky Student Savings

<<<<<<< Updated upstream
Husky Student Savings is a static discount aggregation website built for the Northeastern University Seattle Emerald Forge Hackathon. The site is inspired by university discount portals and aims to provide NU Seattle students with a centralized place to browse verified deals, student benefits, and local savings opportunities.

## Repository Structure

- `NU_Savings/`: the Vite + React frontend application
- `DEPLOYMENT.md`: deployment, release, and daily-use instructions for teammates
- `.github/workflows/deploy.yml`: GitHub Pages deployment workflow

## Deployment

See [DEPLOYMENT.md](/Users/yuhaos/Desktop/husky-savings-NUSeattle-hackathon/DEPLOYMENT.md) for the full setup, release flow, and GitHub Pages deployment instructions.

=======
Husky Student Savings is a lightweight system that helps students discover and use existing benefits more effectively.

Built for the Northeastern University Seattle Emerald Forge Hackathon, the project organizes discounts, perks, and campus resources into a structured and centralized experience.

## Repository Structure

- `NU_Savings/`: Vite + React frontend
- `docs/`: supporting project documentation
- `DEPLOYMENT.md`: deployment and release instructions
- `.github/workflows/deploy.yml`: GitHub Pages deployment workflow

>>>>>>> Stashed changes
## Tech Stack

- React
- Vite
- JavaScript
- GitHub Pages

## Data and Assets

<<<<<<< Updated upstream
- Discount data: `NU_Savings/public/data/deals.json`
- Site content config: `NU_Savings/src/data/siteContent.json`
- Logos: `NU_Savings/public/logos/`
- Homepage images: `NU_Savings/public/images/`

Assets are organized so teammates can add, remove, or replace files without editing component imports one by one.
=======
- Data: `NU_Savings/public/data/deals.json`
- Content config: `NU_Savings/src/data/siteContent.json`
- Logos: `NU_Savings/public/logos/`
- Images: `NU_Savings/public/images/`

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
>>>>>>> Stashed changes

## Local Development

```bash
cd NU_Savings
npm ci
<<<<<<< Updated upstream
npm run dev
```

## Build and Verification

```bash
cd NU_Savings
npm run lint
npm run build
```
=======
npm run dev
>>>>>>> Stashed changes
