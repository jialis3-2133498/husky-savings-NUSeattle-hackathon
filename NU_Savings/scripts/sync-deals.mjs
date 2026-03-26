import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const outputPath = path.join(projectRoot, "public", "data", "deals.json");

const HEADER_ALIASES = {
  id: "id",
  "record type": "record_type",
  record_type: "record_type",
  category: "category",
  name: "name",
  url: "url",
  description: "description",
  "benefit type": "benefit_type",
  benefit_type: "benefit_type",
  "source type": "source_type",
  source_type: "source_type",
  "last verified": "last_verified",
  last_verified: "last_verified",
  image: "image",
};

function log(message) {
  console.log(`[sync:deals] ${message}`);
}

function warn(message) {
  console.warn(`[sync:deals] ${message}`);
}

function normalizeHeader(value) {
  return String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
}

function normalizeValue(value) {
  return String(value ?? "").trim();
}

function parseCsvLine(line) {
  const values = [];
  let current = "";
  let insideQuotes = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    const nextChar = line[index + 1];

    if (char === '"') {
      if (insideQuotes && nextChar === '"') {
        current += '"';
        index += 1;
      } else {
        insideQuotes = !insideQuotes;
      }

      continue;
    }

    if (char === "," && !insideQuotes) {
      values.push(current);
      current = "";
      continue;
    }

    current += char;
  }

  values.push(current);
  return values;
}

function parseCsv(text) {
  const lines = [];
  let currentLine = "";
  let insideQuotes = false;

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    const nextChar = text[index + 1];

    currentLine += char;

    if (char === '"') {
      if (insideQuotes && nextChar === '"') {
        currentLine += nextChar;
        index += 1;
      } else {
        insideQuotes = !insideQuotes;
      }
    }

    if ((char === "\n" || char === "\r") && !insideQuotes) {
      if (char === "\r" && nextChar === "\n") {
        currentLine += nextChar;
        index += 1;
      }

      lines.push(currentLine.replace(/\r?\n$/, ""));
      currentLine = "";
    }
  }

  if (currentLine.length > 0) {
    lines.push(currentLine);
  }

  return lines.filter((line) => line.trim().length > 0).map(parseCsvLine);
}

function mapRow(headers, values) {
  const mapped = {};

  headers.forEach((header, index) => {
    const canonicalHeader = HEADER_ALIASES[normalizeHeader(header)];

    if (!canonicalHeader) {
      return;
    }

    mapped[canonicalHeader] = normalizeValue(values[index]);
  });

  return mapped;
}

function normalizeDeal(row, index) {
  const name = normalizeValue(row.name);
  const category = normalizeValue(row.category);
  const url = normalizeValue(row.url);

  if (!name || !category || !url) {
    warn(`Skipping row ${index + 2} because name/category/url is missing.`);
    return null;
  }

  return {
    id: normalizeValue(row.id) || name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
    record_type: normalizeValue(row.record_type) || "benefit",
    category,
    name,
    url,
    description: normalizeValue(row.description),
    benefit_type: normalizeValue(row.benefit_type) || "discount",
    source_type: normalizeValue(row.source_type) || "official",
    last_verified: normalizeValue(row.last_verified),
    image: normalizeValue(row.image),
  };
}

async function readExistingDealsJson() {
  const existingFile = await readFile(outputPath, "utf8");
  const parsed = JSON.parse(existingFile);

  if (!Array.isArray(parsed)) {
    throw new Error("Existing deals.json is not an array.");
  }

  return parsed;
}

async function main() {
  const csvUrl = process.env.SHEETS_CSV_URL;

  if (!csvUrl) {
    warn("SHEETS_CSV_URL is not set. Keeping existing deals.json.");
    return;
  }

  const existingDeals = await readExistingDealsJson();
  log(`Loaded ${existingDeals.length} existing deals as fallback.`);

  const response = await fetch(csvUrl, {
    headers: {
      Accept: "text/csv",
    },
  });

  if (!response.ok) {
    throw new Error(`Google Sheets request failed with status ${response.status}.`);
  }

  const csvText = await response.text();
  const rows = parseCsv(csvText);

  if (rows.length < 2) {
    throw new Error("CSV did not contain a valid header row and data rows.");
  }

  const [headers, ...valueRows] = rows;
  const mappedDeals = valueRows
    .map((values) => mapRow(headers, values))
    .map(normalizeDeal)
    .filter(Boolean);

  if (mappedDeals.length === 0) {
    throw new Error("No valid rows were produced from the CSV.");
  }

  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, `${JSON.stringify(mappedDeals, null, 2)}\n`, "utf8");
  log(`Synced ${mappedDeals.length} deals into public/data/deals.json.`);
}

main().catch((error) => {
  warn(`Sync failed: ${error.message}`);
  warn("Keeping existing deals.json and continuing the build.");
  process.exit(0);
});
