# Update Manual

This document explains the current data update workflow for the project.

## Current Data Flow

The website does not read Google Sheets directly at runtime.

The current flow is:

1. Update the Google Sheet.
2. The sync script pulls the sheet data and writes it into `NU_Savings/public/data/deals.json`.
3. The project is rebuilt and pushed to GitHub.
4. GitHub Actions deploys the latest static site to GitHub Pages.
5. Users see the updated content after the new deployment is live.

## Required Fields

Each valid deal row should include at least:

- `name`
- `category`
- `url`

If a row is missing any of these fields, it will be skipped during sync.

If a logo is available, fill in:

- `image`

Recommended image value format:

```text
logos/example_logo.png
```

## Step-by-Step Update Workflow

1. Open the shared Google Sheet and update the deal data.
2. Make sure the required fields are filled correctly.
3. In the project directory, run the sync command:

```bash
cd NU_Savings
SHEETS_CSV_URL="https://docs.google.com/spreadsheets/d/136aMrqviizP9D_3QsD2lEIFHM2Z_h85T29nureU7Y8A/export?format=csv&gid=0" npm run sync:deals
```

4. Check the terminal output.

Expected success output looks similar to:

```text
[sync:deals] Loaded 23 existing deals as fallback.
[sync:deals] Synced 22 deals into public/data/deals.json.
```

If some rows are skipped, that usually means they are missing required fields.

5. Open `NU_Savings/public/data/deals.json` and confirm the latest Google Sheet changes are present.
6. Run the app locally if needed and verify that the updated deals render correctly.
7. Commit the updated files and push to GitHub.
8. Wait for GitHub Actions to finish deploying.
9. Refresh the live site and confirm the changes are visible.

## Important Notes

- Updating Google Sheets alone does not immediately update the live website.
- The website only updates after a new sync and deployment.
- If Google Sheets sync fails, the existing `deals.json` remains in place as a fallback.
- If the page still shows old content after deployment, try a hard refresh or open the site in an incognito window.

## Summary

Google Sheets is the editable upstream source, but `deals.json` is still the actual static data file used by the deployed site.
