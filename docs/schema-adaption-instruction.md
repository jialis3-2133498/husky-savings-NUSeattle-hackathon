# Schema Adaptation Guide

This document is intended to guide the team member responsible for adapting the Google Sheets schema to complete the necessary code changes.

## Goal

Align the Google Sheets CSV schema with the pre-build sync process so that the following requirements are met:

- `npm run sync:deals` successfully generates `NU_Savings/public/data/deals.json`
- The frontend continues to read directly from the generated static JSON
- No changes are needed to the frontend data display logic
- Both `npm run lint` and `npm run build` pass

## Files to Review First

- `NU_Savings/scripts/sync-deals.mjs`
- `NU_Savings/src/lib/dealsApi.js`
- `DEPLOYMENT.md`

## Confirm Before Making Any Changes

Before touching any code, confirm the final schema of the Google Sheet:

- What are the final column names?
- Which fields are required?
- Which fields are optional?
- What format is the date field in?
- What does the image field contain?

## Current Expected Core Fields

The sync logic currently expects these standard fields:

- `id`
- `record_type`
- `category`
- `name`
- `url`
- `description`
- `benefit_type`
- `source_type`
- `last_verified`
- `image`

If the Google Sheets column names don't match these, the field mapping logic will need to be updated.

---

## What to Change

### 1. Header Mapping

**File:** `NU_Savings/scripts/sync-deals.mjs`

**Look for:** `HEADER_ALIASES`

**Purpose:** Maps Google Sheets column names to the standard field names used by the frontend.

For example, if the Google Sheet uses column names like:

- `benefit type`
- `verified date`
- `logo path`

These aliases need to be added to `HEADER_ALIASES`.

---

### 2. Row Data Normalization

**File:** `NU_Savings/scripts/sync-deals.mjs`

**Look for:** `normalizeDeal`

**Purpose:**

- Defines which fields are required
- Defines which fields allow default values
- Transforms each row into the final structure written to `deals.json`

Update this function if the schema has:

- Changed field names
- New fields added
- Changed required/optional rules
- Changed default value logic

---

### 3. CSV Row Mapping

**File:** `NU_Savings/scripts/sync-deals.mjs`

**Look for:** `mapRow`

**Purpose:**

- Parses each CSV row into an object
- Matches column values to column names before normalization

---

### 4. Image Field Adaptation

If the image field in the schema is not already in the recommended relative path format, e.g.:

```
logos/target_logo.jpeg
```

Check the following files:

- `NU_Savings/scripts/sync-deals.mjs`
- `NU_Savings/src/lib/dealsApi.js`

The goal is to ensure that image paths written to `deals.json` can still be correctly resolved by the frontend.

Relative paths are recommended as they are most compatible with the current static asset structure.

---

### 5. Date Field Adaptation

If the date field in Google Sheets is not in `YYYY-MM-DD` format, add date normalization logic in:

- `NU_Savings/scripts/sync-deals.mjs`

This ensures dates display consistently on the frontend.

---

### 6. Update Documentation

If the final schema differs from the current defaults described in the docs, also update:

- `DEPLOYMENT.md`

Sections to update:

- Field descriptions
- Google Sheets data entry guidelines
- Local sync command examples

---

## Commands to Run After Adapting

```bash
cd NU_Savings
SHEETS_CSV_URL="your_google_sheets_csv_url" npm run sync:deals
npm run lint
npm run build
```

---

## Definition of Done

The schema adaptation is complete when all of the following are true:

- `npm run sync:deals` successfully writes Google Sheets data to `public/data/deals.json`
- The generated JSON has the correct field structure
- Image paths resolve and display correctly on the frontend
- `npm run lint` passes
- `npm run build` passes
- The discounts page correctly displays the synced data
