function extractGoogleDriveFileId(url) {
  if (typeof url !== "string") return null;

  const value = url.trim();
  const patterns = [
    /lh3\.googleusercontent\.com\/d\/([^/?#=]+)/,
    /drive\.google\.com\/file\/d\/([^/?#]+)/,
    /[?&]id=([^&#]+)/,
  ];

  for (const pattern of patterns) {
    const match = value.match(pattern);
    if (match?.[1]) return decodeURIComponent(match[1]);
  }

  return null;
}

export function getImageSources(url) {
  if (typeof url !== "string" || !url.trim()) return [];

  const value = url.trim();
  const fileId = extractGoogleDriveFileId(value);

  // If the API already gives us a direct lh3.googleusercontent.com image URL,
  // always use that exact URL first. Do not rewrite a working direct image URL.
  if (value.includes("lh3.googleusercontent.com/d/")) {
    return [value];
  }

  if (!fileId) return [value];

  const encodedId = encodeURIComponent(fileId);

  return [
    `https://lh3.googleusercontent.com/d/${encodedId}`,
    `https://drive.google.com/thumbnail?id=${encodedId}&sz=w1600`,
    `https://drive.google.com/uc?export=view&id=${encodedId}`,
    value,
  ];
}

export function getPlaceholderImage(title = "Image unavailable") {
  const safeTitle = String(title)
    .replace(/[<>&]/g, "");

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400">
      <rect width="600" height="400" fill="#1e293b"/>
      <text x="300" y="185" font-family="Arial, sans-serif" font-size="22" fill="#cbd5e1" text-anchor="middle">Image unavailable</text>
      <text x="300" y="220" font-family="Arial, sans-serif" font-size="14" fill="#94a3b8" text-anchor="middle">${safeTitle}</text>
    </svg>`
  )}`;
}

export function normalizeImageUrl(url) {
  return getImageSources(url)[0] || null;
}

export function getSafeImageUrl(url, title = "Image unavailable") {
  return getImageSources(url)[0] || getPlaceholderImage(title);
}
