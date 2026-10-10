const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "2025-05" → "May 2025". */
export function formatYearMonth(ym: string): string {
  const [y, m] = ym.split("-").map(Number);
  return `${MONTHS[m - 1]} ${y}`;
}

/** "May 2025 – Present", or "Oct 2022 – May 2025". */
export function formatRange(start: string, end: string | null, present: string): string {
  return `${formatYearMonth(start)} – ${end ? formatYearMonth(end) : present}`;
}

/** Compact year range for timelines: "2025 – Present", "2022 – 2025", or "2022". */
export function formatYears(start: string, end: string | null, present: string): string {
  const a = start.slice(0, 4);
  const b = end ? end.slice(0, 4) : present;
  return a === b ? a : `${a} – ${b}`;
}
