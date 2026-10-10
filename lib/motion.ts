/*
 * Shared motion values for script. The CSS side of the motion language
 * (cubic-bezier(0.16, 1, 0.3, 1), 0.8s reveals, 0.2s UI feedback) lives in
 * app/globals.css next to the keyframes that use it.
 */

export const STAGGER = { words: 0.06, chars: 0.025, items: 0.08 } as const;

export type RevealVariant = "fadeUp" | "fade" | "maskUp";
