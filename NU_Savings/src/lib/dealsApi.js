import { resolvePublicAsset } from "./assets";

const baseUrl = import.meta.env.BASE_URL;
const dealsUrl = `${baseUrl}data/deals.json`;
const fallbackImage = `${baseUrl}default-deal.svg`;

let dealsCache = null;

function withBaseUrl(assetPath) {
  if (!assetPath) return fallbackImage;
  return resolvePublicAsset(assetPath);
}

function normalizeDeal(deal) {
  const fallbackId = String(deal.name ?? "deal")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  return {
    id: deal.id ?? fallbackId ?? "deal",
    name: deal.name ?? "Untitled deal",
    description: deal.description ?? "Student discount available",
    category: deal.category ?? "other",
    benefit_type: deal.benefit_type ?? "Offer",
    last_verified: deal.last_verified ?? "Unverified",
    url: deal.url ?? "#",
    image: withBaseUrl(deal.image),
  };
}

export async function loadDeals({ signal } = {}) {
  if (dealsCache) {
    return dealsCache;
  }

  const response = await fetch(dealsUrl, {
    signal,
    cache: "force-cache",
  });

  if (!response.ok) {
    throw new Error(`Failed to load deals data (${response.status})`);
  }

  const rawDeals = await response.json();

  if (!Array.isArray(rawDeals)) {
    throw new Error("Deals data is not an array");
  }

  dealsCache = rawDeals.map(normalizeDeal);
  return dealsCache;
}

export function getFallbackDealImage() {
  return fallbackImage;
}
