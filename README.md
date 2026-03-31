# Husky Student Savings

🔗 Live Demo: https://jialis3-2133498.github.io/husky-savings-NUSeattle-hackathon/
📦 Repository: https://github.com/jialis3-2133498/husky-savings-NUSeattle-hackathon
✨ Built for Northeastern University Seattle Emerald Forge Hackathon

A structured discount aggregation platform for Northeastern University Seattle students.

Instead of listing scattered deals, this project transforms fragmented information into a structured, queryable system — making student benefits easier to discover and maintain.

---

## Problem

Students are often unaware of the full range of discounts and benefits available to them.

Existing information is:

* fragmented across multiple platforms
* inconsistent in format
* difficult to maintain and update

---

## Solution

We built a structured and centralized system that:

* Curates verified student discounts and resources
* Normalizes different types of offers (discounts, bundles, platforms)
* Provides a consistent schema for organization and scalability

This shifts the experience from a static list → to a maintainable data system.

---

## Key Features

* Centralized discount aggregation
* Structured data schema for consistency
* Scalable dataset design for future expansion
* Lightweight update pipeline (no heavy backend required)

---

## Tech Stack

* React
* Vite
* JavaScript
* GitHub Pages

---

## Project Structure

```
husky-savings-NUSeattle-hackathon/
├── NU_Savings/        # Vite + React frontend
├── docs/              # schema and project documentation
├── scripts/           # reserved for project-level scripts
├── DEPLOYMENT.md      # deployment instructions
└── README.md
```

---

## Data & Assets

* Data: `NU_Savings/public/data/deals.json`
* Content config: `NU_Savings/src/data/siteContent.json`
* Logos: `NU_Savings/public/logos/`
* Images: `NU_Savings/public/images/`

Assets are organized to allow easy updates without modifying component-level imports.

---

## Data Design

Each entry includes:

* **type** (benefit vs resource)
* **category** (e.g. food, travel, technology)
* **value type** (discount, platform, reimbursement)
* **source type & verification timestamp**

This structured schema makes the dataset:

* easier to query
* easier to maintain
* scalable beyond a static hackathon project

See `docs/schema-adaption-instruction.md` for details.

---

## Data Pipeline

Google Sheets → Apps Script → JSON → Frontend

This lightweight pipeline enables:

* fast iteration
* manual curation
* no backend dependency

---

## Local Development

```
cd NU_Savings
npm ci
npm run dev
```

---

## Build

```
cd NU_Savings
npm run lint
npm run build
```

---

## Deployment

See `DEPLOYMENT.md` for full deployment and GitHub Pages setup.

---

## Team Contributions

* **Data & Product**

  * Led data collection and curation of student benefits
  * Designed the structured schema for normalizing different types of offers
  * Defined data standards to ensure consistency and scalability

* **Frontend Engineering**

  * Developed the React-based user interface
  * Implemented data rendering and user interaction flows
  * Ensured responsive and user-friendly design

* **Backend & Data Integration**

  * Built and maintained data synchronization logic
  * Designed the update pipeline (Google Sheets → JSON)
  * Supported data consistency and system maintainability
