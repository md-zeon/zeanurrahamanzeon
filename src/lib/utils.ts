/**
 * Dispatched on `window` once the home hero's entrance animation finishes.
 * The navbar listens for it so it can enter after the hero, instead of
 * relying on hardcoded timing across components.
 */
export const HERO_ENTRANCE_COMPLETE = "hero:entrance-complete"
