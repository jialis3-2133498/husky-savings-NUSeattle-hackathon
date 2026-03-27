# Update Log

## 2026.3.25 Update

This update confirmed that the site's data update strategy going forward will prioritize:

- Keeping `Vite + React + GitHub Pages`
- No migration to Next.js
- No adoption of ISR (Incremental Static Regeneration)
- A **scheduled build update** approach for the static site

The core idea of this approach is:

- The frontend remains a static site
- The live site continues to read from static data files
- The data source is decoupled from the frontend repository
- GitHub Actions periodically pulls from the data source and regenerates the static data
- A successful build automatically redeploys to GitHub Pages

Compared to the current fully manual `deals.json` maintenance, the key advantages of this approach are:

### 1. Cleaner Data Update Workflow

- Deal content can be centrally maintained in a separate data source such as Google Sheets
- Team members no longer need to directly edit JSON files in the frontend repo
- Content maintenance and code maintenance are separated, reducing the risk of accidental changes

### 2. No Direct Exposure of the Live Data Source

- The frontend still only reads from a static snapshot
- The browser never connects directly to a live Google Sheet or other real-time source
- Prevents the actual data source URL and live request chain from being exposed to visitors

### 3. Higher Deployment Stability

- Even if the external data source is temporarily unavailable, the live site retains the last successful static build
- Pages won't break due to failed real-time API calls during user visits
- Better suited to GitHub Pages' purely static hosting model

### 4. Preserves Current Static Site Performance

- Homepage and listing pages continue to load from static assets
- No additional server-side real-time computation introduced
- Page load speed and caching behavior remain intact

### 5. Easier to Add Data Validation

- Field format checks can be added before `deals.json` is generated
- Categories, links, dates, and image paths can be automatically validated
- Reduces the chance of bad data making it to production

### 6. Better Suited for Long-Term Content Operations

- The site can gradually transition from a "manually updated demo site" to a "content-source-driven stable site"
- As content volume grows, this model scales far more easily than hand-editing JSON

### 7. No Need to Overhaul the Current Stack

- No migration to Next.js
- No rewriting of existing pages
- No abandoning GitHub Pages
- Significantly lower risk and cost compared to replacing the entire framework

**Current conclusion:**

- This approach is the recommended direction for the next phase of data update architecture
- It improves data sync workflow, update stability, and control over raw data exposure
- It is not a true anti-scraping mechanism, but it is the most appropriate solution given the current project stage and deployment environment

The first implementation of this approach has been completed:

- New pre-build sync script added: `NU_Savings/scripts/sync-deals.mjs`
- New npm command added: `npm run sync:deals`
- GitHub Actions will attempt to sync data from the Google Sheets CSV before building
- If `SHEETS_CSV_URL` is not configured or the fetch fails:
  - The existing `NU_Savings/public/data/deals.json` in the repo is retained
  - The build and deployment are not blocked
- The frontend continues to read from the static `deals.json`
- Deployment documentation and repository docs have been updated accordingly

---

## 2026.3.24 Update

This update focused on load speed, deployment stability, asset maintainability, and team documentation.

### 1. Page Structure & Load Optimization

- Refactored page logic that was previously concentrated in a single `App.jsx` into separate modules:
  - `Navbar`
  - `Footer`
  - `DiscountCard`
  - `HomePage`
  - `DiscountsPage`
- Changed the discounts directory page to lazy-load on demand, reducing initial homepage load pressure
- Deal data is now read from a static JSON file instead of being bundled into the main homepage package
- Added loading and error states to improve page stability when data fails to load

### 2. Data & Asset Management

- Deal data consolidated into: `NU_Savings/public/data/deals.json`
- Logo assets consolidated into: `NU_Savings/public/logos/`
- Homepage images consolidated into: `NU_Savings/public/images/`
- New site content config file added: `NU_Savings/src/data/siteContent.json`
- Footer social logos, homepage hero images, and featured deals are no longer hardcoded in components — they are now read from the unified config
- New asset path resolution utility added: `NU_Savings/src/lib/assets.js`

### 3. Image & Bundle Size Optimization

- Converted the three homepage hero images from PNG to JPEG, significantly reducing file size
- Added `loading="lazy"` and `decoding="async"` to below-the-fold images
- Applied `content-visibility` to optimize rendering of certain page sections
- Overall build output size reduced noticeably; homepage asset load pressure decreased

### 4. Build & Deployment Optimization

- Updated `vite.config.js` with build targets and vendor chunk splitting
- Improved the GitHub Pages deployment workflow:
  - Auto-deploy branches updated to `main` and `master`
  - Added build timeout limit
  - Added artifact output verification
- Confirmed the following commands pass successfully:

```bash
cd NU_Savings
npm run lint
npm run build
```

### 5. Documentation

- New team usage guide added: `DEPLOYMENT.md`
- Rewrote the deployment doc to be team-friendly, removing personal paths and personal information
- Added current development branch GitHub link to the deployment doc
- Rewrote the root `README.md` to serve as the main repository overview
- Cleaned up `NU_Savings/README.md`, replacing the original Vite template content with a concise description

### 6. Repository Structure Cleanup

- Consolidated `.gitignore` rules into the repository root
- Removed duplicate `.gitignore` from subdirectories
- Kept the existing `NU_Savings/` subdirectory structure unchanged to avoid introducing additional build risk before the presentation

### 7. Results

- Homepage initial load is lighter
- Discounts directory page loads more reliably
- Asset replacement process is more consistent
- Deployment workflow is clearer
- Documentation is better suited for team collaboration
