import { audio } from "@/data/site";

/**
 * Client-side sound manager for UI feedback and background music.
 *
 * Three concerns live here, kept in module scope so every component shares
 * one source of truth:
 *  - Web Audio (`AudioContext`) for short UI clicks/hover blips
 *  - `HTMLAudioElement` for looping background music
 *  - A subscription store (React 18 `useSyncExternalStore` compatible) that
 *    reflects whether sound is enabled, persisted in `localStorage`.
 */

let ctx: AudioContext | null = null;
const buffers = new Map<string, AudioBuffer>();
const listeners = new Set<() => void>();
let enabled = true;
let music: HTMLAudioElement | null = null;

// Restore the user's sound preference on first load. Defaults to ON when no
// preference has been saved yet ("off" is the only value that mutes).
try {
  if (typeof window !== "undefined") {
    enabled = localStorage.getItem("bf-sound") !== "off";
  }
} catch {
  /* noop */
}

// Bookkeeping for which UI sounds have been loaded, keyed by sound name.
const cache: Record<string, boolean> = {
  hover: true,
  scramble: true,
  secondary: true,
  card: true,
  close: true,
};

/**
 * Maps a "logical" sound URL to the real asset URL from site config.
 *
 * Design note: Webflow-exported markup references human-readable asset names
 * (e.g. "buttons scramble.mp3"); when the site was ported to Next.js those
 * assets were consolidated into a single set of files, so lookups must be
 * translated here. Unknown URLs pass through unchanged.
 */
function resolveUrl(url: string): string {
  const lower = url.toLowerCase();
  if (lower.includes("button hover") || lower.includes("button%20hover")) return audio.hover;
  if (lower.includes("buttons scramble") || lower.includes("buttons%20scramble")) return audio.scramble;
  if (lower.includes("secondary hover") || lower.includes("secondary%20hover")) return audio.secondaryHover;
  if (lower.includes("card hover") || lower.includes("card%20hover")) return audio.cardHover;
  if (lower.includes("close menu") || lower.includes("close-menu") || lower.includes("close%20menu")) return audio.closeMenu;
  return url;
}

/** Whether sound is currently enabled (non-reactive read). */
export function isSoundEnabled() {
  return enabled;
}

// Mutates the shared flag and notifies subscribers. Kept private so every
// write path goes through the same notification logic.
function updateEnabled(value: boolean) {
  if (enabled === value) return;
  enabled = value;
  listeners.forEach((listener) => listener());
}

/** Subscribes to sound toggle changes. Returns an unsubscribe function. */
export function subscribeSound(callback: () => void) {
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
}

/**
 * Snapshot read for `useSyncExternalStore` on the client.
 * (See {@link subscribeSound} / {@link getSoundServerSnapshot}.)
 */
export function getSoundSnapshot() {
  return enabled;
}

/**
 * Server/SSR snapshot for `useSyncExternalStore` to avoid hydration mismatch —
 * the server has no localStorage, so it always reports sound as enabled.
 */
export function getSoundServerSnapshot() {
  return true;
}

/** Enables/disables sound and persists the choice to localStorage. */
export function setSoundEnabled(value: boolean) {
  updateEnabled(value);
  try {
    localStorage.setItem("bf-sound", value ? "on" : "off");
  } catch {
    /* noop */
  }
}

/** Re-reads the persisted sound preference (used on mount). */
export function initSound() {
  try {
    updateEnabled(localStorage.getItem("bf-sound") !== "off");
  } catch {
    /* noop */
  }
}

/**
 * Lazily creates (and resumes) the shared AudioContext.
 * Browsers only allow audio to start after a user gesture, so `resume()` is
 * called here to unlock the context the first time a sound is played.
 */
function ensureContext() {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  if (ctx.state === "suspended") ctx.resume();
  return ctx;
}

// Fetches and decodes an audio file once, then caches the decoded buffer so
// repeated UI sounds don't hit the network again.
async function getBuffer(url: string): Promise<AudioBuffer | undefined> {
  const c = ensureContext();
  if (!c) return undefined;
  if (buffers.has(url)) return buffers.get(url);
  try {
    const res = await fetch(url);
    const arrayBuffer = await res.arrayBuffer();
    const buffer = await c.decodeAudioData(arrayBuffer);
    buffers.set(url, buffer);
    return buffer;
  } catch {
    return undefined;
  }
}

/**
 * Plays a one-shot UI sound (hover/click) at the given volume.
 * Silently no-ops if sound is disabled, the URL can't be decoded, or the
 * AudioContext is unavailable — UI sounds must never break interactions.
 */
export async function playSound(url: string, volume = 1) {
  if (!enabled) return;
  const resolved = resolveUrl(url);
  const c = ensureContext();
  if (!c) return;
  const buffer = await getBuffer(resolved);
  if (!buffer) return;
  const source = c.createBufferSource();
  source.buffer = buffer;
  const gain = c.createGain();
  gain.gain.value = volume;
  source.connect(gain);
  gain.connect(c.destination);
  source.start(0);
}

/** Lazily creates the looping background music element (low volume by design). */
export function ensureMusic() {
  if (typeof window === "undefined") return;
  if (!music) {
    music = new Audio(audio.backgroundMusic);
    music.loop = true;
    music.volume = 0.4;
  }
}

/** Toggles background music. Returns whether music is now playing. */
export function toggleMusic(): boolean {
  ensureMusic();
  if (!music) return enabled;
  if (music.paused) {
    music.play().catch(() => undefined);
    return true;
  }
  music.pause();
  return false;
}

/** Pauses background music (e.g. when navigating away). */
export function stopMusic() {
  if (music) music.pause();
}

export { cache };
