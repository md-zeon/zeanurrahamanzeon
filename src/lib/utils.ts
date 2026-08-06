import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combines Tailwind class names and resolves conflicts.
 *
 * `clsx` merges conditional class names while `tailwind-merge` deduplicates
 * conflicting Tailwind utilities (e.g. the last `p-*` wins), keeping the
 * final className string predictable.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Dispatched on `window` once the home hero's entrance animation finishes.
 * The navbar listens for it so it can enter after the hero, instead of
 * relying on hardcoded timing across components.
 */
export const HERO_ENTRANCE_COMPLETE = "hero:entrance-complete"
