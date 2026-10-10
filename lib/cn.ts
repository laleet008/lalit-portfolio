import { clsx, type ClassValue } from "clsx";

/*
 * Joins class names. Deliberately not tailwind-merge (8.7 KB gzipped on every
 * page): components never pass conflicting utilities, so ordering suffices.
 */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}
