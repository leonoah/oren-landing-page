// ─── Utility helpers ──────────────────────────────────────────────────────────

/**
 * Merge class names (simple implementation, add clsx/cn if needed)
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Format price in Israeli Shekel
 */
export function formatILS(amount: number): string {
  return new Intl.NumberFormat("he-IL", {
    style: "currency",
    currency: "ILS",
    minimumFractionDigits: 0,
  }).format(amount);
}
