const ONE_DAY_MS = 24 * 60 * 60 * 1000;

/**
 * Returns the first `wordLimit` words of `content`, followed by "…"
 * if the text was cut short.
 */
export function getPreview(content: string, wordLimit = 20): string {
  const words = content.trim().split(/\s+/);
  if (words.length <= wordLimit) {
    return words.join(' ');
  }
  return `${words.slice(0, wordLimit).join(' ')}…`;
}

/**
 * True when `isoDate` is within the last 24 hours of `now`.
 * `now` can be passed in so tests don't depend on the real clock.
 */
export function isWithinLast24Hours(isoDate: string, now: number = Date.now()): boolean {
  const age = now - new Date(isoDate).getTime();
  return age >= 0 && age < ONE_DAY_MS;
}

/** Formats an ISO date for display, e.g. "18 Sep 2026". */
export function formatDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

/** Two-letter initials for an avatar, e.g. "Amina Uwase" -> "AU". */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('');
}

/**
 * Picks a consistent colour for a name, so each author always gets
 * the same avatar colour. Used with an inline style because the value
 * is computed at runtime.
 */
export function getAvatarColor(name: string): string {
  let hash = 0;
  for (const char of name) {
    hash = (hash * 31 + char.charCodeAt(0)) % 360;
  }
  return `hsl(${hash}, 60%, 45%)`;
}
