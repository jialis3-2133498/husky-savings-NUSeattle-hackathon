const baseUrl = import.meta.env.BASE_URL;

export function resolvePublicAsset(assetPath) {
  if (!assetPath) {
    return "";
  }

  if (/^https?:\/\//i.test(assetPath)) {
    return assetPath;
  }

  return `${baseUrl}${String(assetPath).replace(/^\/+/, "")}`;
}
