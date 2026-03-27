# Husky Student Savings — Deployment & Usage Guide

This document explains how to run the project locally, edit content, build, deploy, and publish the site stably via GitHub Pages.

https://docs.google.com/spreadsheets/d/136aMrqviizP9D_3QsD2lEIFHM2Z_h85T29nureU7Y8A/edit?usp=sharing

---

## 1. Project Overview

This project is a static website built with React + Vite, deployed via GitHub Pages.

**Directory structure:**

- Repository root: the root directory after cloning
- Frontend project directory: `NU_Savings/`
- Deployment workflow: `.github/workflows/deploy.yml`
- Deals data file: `NU_Savings/public/data/deals.json`
- Data sync script: `NU_Savings/scripts/sync-deals.mjs`
- Logo assets directory: `NU_Savings/public/logos/`
- Homepage images directory: `NU_Savings/public/images/`

**Key characteristics:**

- Homepage content loads first; the discounts directory page loads on demand
- Deal data is served from a static JSON file, suitable for GitHub Pages
- Build output goes to `NU_Savings/dist/`

**Repository link:**

- Current development branch: `https://github.com/jialis3-2133498/husky-savings-NUSeattle-hackathon/tree/refactor/site-architecture`

---

## 2. Requirements

Recommended environment:

- Node.js 20 or higher
- npm 10 or higher
- Git
- Write access to the GitHub repository

Check your versions:

```bash
node -v
npm -v
git --version
```

---

## 3. Initial Setup

Clone the repository and install dependencies.

```bash
git clone https://github.com/jialis3-2133498/husky-savings-NUSeattle-hackathon.git
cd husky-savings-NUSeattle-hackathon
```

Install dependencies:

```bash
cd NU_Savings
npm ci
```

For a quick install you can also use:

```bash
npm install
```

`npm ci` is preferred for team collaboration and reproducible builds.

---

## 4. Local Development

Start the local dev server:

```bash
cd NU_Savings
npm run dev
```

The terminal will display a local URL, typically:

```
http://localhost:5173/
```

**Common local editing tasks:**

- Page structure: edit files in `NU_Savings/src/pages/` and `NU_Savings/src/components/`
- Styles: edit `NU_Savings/src/styles/appStyles.js` and `NU_Savings/src/App.css`
- Deal data: edit `NU_Savings/public/data/deals.json` or sync from Google Sheets
- Replace logos: place new images in `NU_Savings/public/logos/`
- Replace homepage images: place new images in `NU_Savings/public/images/`

---

## 5. Common Commands

Run these from inside the `NU_Savings/` directory:

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run lint` | Check code style |
| `npm run build` | Build for production |
| `npm run preview` | Preview the production build locally |

Sync deal data from Google Sheets:

```bash
SHEETS_CSV_URL="https://docs.google.com/spreadsheets/d/136aMrqviizP9D_3QsD2lEIFHM2Z_h85T29nureU7Y8A/export?format=csv&gid=0" npm run sync:deals
```

Before every release, always run at minimum:

```bash
npm run lint
npm run build
```

---

## 6. Editing Deal Data

There are two ways to update deal data:

### Option A: Edit the JSON file directly

Edit `NU_Savings/public/data/deals.json`.

### Option B: Sync from Google Sheets (recommended)

Update the data in Google Sheets, then run from `NU_Savings/`:

```bash
SHEETS_CSV_URL="https://docs.google.com/spreadsheets/d/136aMrqviizP9D_3QsD2lEIFHM2Z_h85T29nureU7Y8A/export?format=csv&gid=0" npm run sync:deals
```

For the full team workflow after each Google Sheets update, see:

- `UPDATE_MANUAL.md`

**Google Sheets field reference:**

| Field | Required | Notes |
|-------|----------|-------|
| `id` | No (auto-generated) | Must be unique |
| `record_type` | No (default: `benefit`) | `benefit` or `resource` |
| `category` | Yes | See category list below |
| `name` | Yes | Name of the deal |
| `url` | Yes | External link |
| `description` | No | Description text |
| `benefit_type` | No (default: `discount`) | See type list below |
| `source_type` | No (default: `official`) | `official` or `third_party` |
| `last_verified` | No (default: today) | Format: `YYYY-MM-DD` |
| `image` | No | Relative path, e.g. `logos/target_logo.jpeg` |

**Available `category` values:**
`campus_life`, `entertainment`, `transportation`, `wellness`, `food`, `retail`, `travel`, `technology`

**Available `benefit_type` values:**
`discount`, `free_access`, `bundle`, `subscription`, `platform`, `reimbursement`, `directory`

**Example entry:**

```json
{
  "id": "retail_amazon_prime",
  "record_type": "benefit",
  "category": "retail",
  "name": "Amazon Prime Student",
  "url": "https://www.amazon.com/joinstudent",
  "description": "Discounted Amazon Prime membership with student-exclusive pricing.",
  "benefit_type": "subscription",
  "source_type": "official",
  "last_verified": "2026-03-21",
  "image": "logos/amazon-160-svgrepo-com.svg"
}
```

**Important notes when editing data:**

- `id` must be unique across all entries
- Use `https://` for all URLs
- The file referenced in `image` must exist in `NU_Savings/public/logos/`
- After editing the JSON, always run `npm run build`
- Malformed JSON will cause build or runtime errors

---

## 7. Replacing Image Assets

### 7.1 Replace a logo

Place the logo file in:

```
NU_Savings/public/logos/
```

Then update the `image` field in `NU_Savings/public/data/deals.json`:

```json
"image": "logos/new_logo.png"
```

### 7.2 Replace homepage images

The homepage currently uses these three files:

- `NU_Savings/public/images/home_top.jpg`
- `NU_Savings/public/images/home_middle.jpg`
- `NU_Savings/public/images/home_foot.jpg`

Recommendations when replacing:

- Prefer `.jpg` format
- Compress file sizes where possible
- Keep the same filenames to avoid code changes

If you change the filenames, update the references in:

```
NU_Savings/src/pages/HomePage.jsx
```

---

## 8. Pre-Release Checklist

Before every official release, run through these steps:

```bash
cd husky-savings-NUSeattle-hackathon
git pull
cd NU_Savings
npm ci
npm run lint
npm run build
npm run preview
```

**Things to verify in preview:**

- Homepage loads correctly
- Clicking "Browse Discounts" navigates to the directory page
- Search and category filters work
- Each card's "Learn More" link is clickable
- GitHub Pages paths are correct
- All images display properly

---

## 9. GitHub Pages Deployment

The project deploys automatically via GitHub Actions.

**Workflow file:** `.github/workflows/deploy.yml`

Pushes to these branches trigger auto-deployment:
- `main`
- `master`

**To trigger deployment manually:**

1. Open the GitHub repository
2. Go to **Actions**
3. Select **Deploy Vite site to GitHub Pages**
4. Click **Run workflow**

---

## 10. Recommended Release Workflows

### Option A: Recommended for stable releases

```bash
cd husky-savings-NUSeattle-hackathon
git checkout main
git pull
cd NU_Savings
npm ci
npm run lint
npm run build
cd ..
git status
git add .
git commit -m "Prepare presentation release"
git push origin main
```

Pushing to `main` triggers GitHub Actions to build and deploy automatically.

### Option B: Merge feature branch then release

If you're currently on a feature branch (e.g. `refactor/site-architecture`):

```bash
cd husky-savings-NUSeattle-hackathon
git checkout refactor/site-architecture
git pull
cd NU_Savings
npm run lint
npm run build
cd ..
git add .
git commit -m "Optimize site for presentation"
git push origin refactor/site-architecture
git checkout main
git pull
git merge refactor/site-architecture
git push origin main
```

This ensures `main` triggers the GitHub Pages deployment.

---

## 11. Confirming a Successful Deployment

### 11.1 Check GitHub Actions

Open the **Actions** tab in the repository and verify the latest workflow run shows:

- `build` ✅
- `deploy` ✅

### 11.2 Check Pages settings

Go to **Settings → Pages** and confirm:

- Source is set to **GitHub Actions**
- The page URL is generated correctly

### 11.3 Visit the live site

The live URL will look like:

```
https://<github-username>.github.io/husky-savings-NUSeattle-hackathon/
```

Check:

- Homepage displays correctly
- Images display correctly
- Clicking "Perks and Benefits" navigates to the directory page
- Direct hash links work:

```
https://<github-username>.github.io/husky-savings-NUSeattle-hackathon/#discounts
```

---

## 12. Critical Configuration

### 12.1 Vite base path

**File:** `NU_Savings/vite.config.js`

Current setting:

```js
base: '/husky-savings-NUSeattle-hackathon/'
```

If the GitHub repository name ever changes, this value must be updated to match, otherwise static assets will fail to load.

Example — if the repo is renamed to `husky-savings-site`:

```js
base: '/husky-savings-site/'
```

### 12.2 GitHub Actions trigger branches

**File:** `.github/workflows/deploy.yml`

Currently only these branches trigger auto-deployment:
- `main`
- `master`

If the team adopts a different release branch, update this file accordingly.

---

## 13. Troubleshooting

### 13.1 Page loads but images are missing

Check in order:

1. Confirm the image file exists in `public/logos/` or `public/images/`
2. Confirm the `image` path in `deals.json` is correct
3. Check if the repo was renamed but `vite.config.js` `base` was not updated
4. Re-run `npm run build`

### 13.2 Works locally but returns 404 in production

Check:

- GitHub Pages is enabled for the repo
- The GitHub Actions workflow completed successfully
- `base` in `vite.config.js` matches the repository name
- The URL you're visiting matches the repo name exactly

### 13.3 Push didn't trigger auto-deployment

Check:

- You pushed to `main` or `master`, not a feature branch
- GitHub Actions isn't restricted by repository permissions

If not on an auto-deploy branch, manually trigger via **Actions → Run workflow**.

### 13.4 `npm run build` fails

Run `npm ci` first, then retry:

```bash
npm ci
npm run build
```

If it still fails, check:

- `deals.json` for formatting errors
- Image paths for typos
- Source code for syntax errors

### 13.5 `npm run lint` fails

This means the code has style issues or violates ESLint/React Hooks rules. Fix the issues shown in the terminal before releasing.

### 13.6 `npm run sync:deals` fails

Check:

- `SHEETS_CSV_URL` is set correctly
- The Google Sheet is set to "Anyone with the link can view"
- The required columns `name`, `category`, and `url` have no empty values

---

## 14. Pre-Demo Checklist

To ensure a stable demo, complete the following at least one day before:

1. Confirm the final branch to use for the demo
2. Deploy the final version to GitHub Pages
3. Access the live site from multiple devices
4. Test on the campus network
5. Have a local dev fallback ready (`npm run dev`)

**Keep two entry points available:**

- Live URL — for the demo
- Local `npm run dev` — as a fallback if the network is unreliable

---

## 15. Team Collaboration Guidelines

If multiple people are editing content:

- Code and structural changes should go through feature branches
- Deal content changes should be maintained in Google Sheets; commit `deals.json` after syncing
- One person should be responsible for merging to `main` before each release
- Always run before every release:

```bash
npm run lint
npm run build
```

---

## 16. Most Important Files

If you only need to focus on a few key files:

- `.github/workflows/deploy.yml`
- `NU_Savings/vite.config.js`
- `NU_Savings/public/data/deals.json`
- `NU_Savings/scripts/sync-deals.mjs`
- `NU_Savings/src/pages/HomePage.jsx`
- `NU_Savings/src/pages/DiscountsPage.jsx`

---

## 17. Quickstart: Minimal Deploy Flow

If you just want to do a quick deploy right now:

```bash
cd husky-savings-NUSeattle-hackathon/NU_Savings
npm ci
npm run lint
npm run build
cd ..
git add .
git commit -m "Deploy latest version"
git push origin main
```

Then go to the **Actions** tab on GitHub to confirm the deployment succeeded, and open the live URL to verify the page looks correct.
