# Husky Student Savings Data Schema

## Overview

This schema defines how student benefits and resources are represented in Husky Student Savings.

Each entry is designed to be lightweight, structured, and easy to maintain.

## Fields

- `id`: unique human-readable identifier
- `record_type`: `benefit` or `resource`
- `category`: one of `campus_life`, `entertainment`, `food`, `retail`, `technology`, `transportation`, `travel`, `wellness`
- `name`: display name
- `url`: official or reference link
- `description`: short summary
- `benefit_type`: one of `bundle`, `directory`, `discount`, `free_access`, `platform`, `reimbursement`, `subscription`
- `source_type`: `official` or `third_party`
- `last_verified`: date in `YYYY-MM-DD`

## Example

```json
{
  "id": "food_tgtg",
  "record_type": "resource",
  "category": "food",
  "name": "Too Good To Go",
  "url": "https://www.toogoodtogo.com/en-us",
  "description": "Platform to buy discounted surplus food from local restaurants.",
  "benefit_type": "platform",
  "source_type": "official",
  "last_verified": "2026-03-21"
}