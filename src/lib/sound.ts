import { audio } from "@/data/site";

let ctx: AudioContext | null = null;
const buffers = new Map<string, AudioBuffer>();
const listeners = new Set<() => void>();
let enabled = true;
let music: HTMLAudioElement | null = null;

try {
  if (typeof window !== "undefined") {
    enabled = localStorage.getItem("bf-sound") !== "off";
  }
} catch {
  /* noop */
}

const cache: Record<string, boolean> = {
  hover: true,
  scramble: true,
  secondary: true,
  card: true,
  close: true,
};

function resolveUrl(url: string): string {
  const lower = url.toLowerCase();
  if (lower.includes("button hover") || lower.includes("button%20hover")) return audio.hover;
  if (lower.includes("buttons scramble") || lower.includes("buttons%20scramble")) return audio.scramble;
  if (lower.includes("secondary hover") || lower.includes("secondary%20hover")) return audio.secondaryHover;
  if (lower.includes("card hover") || lower.includes("card%20hover")) return audio.cardHover;
  if (lower.includes("close menu") || lower.includes("close-menu") || lower.includes("close%20menu")) return audio.closeMenu;
  return url;
}

export function isSoundEnabled() {
  return enabled;
}

function updateEnabled(value: boolean) {
  if (enabled === value) return;
  enabled = value;
  listeners.forEach((listener) => listener());
}

export function subscribeSound(callback: () => void) {
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
}

export function getSoundSnapshot() {
  return enabled;
}

export function getSoundServerSnapshot() {
  return true;
}

export function setSoundEnabled(value: boolean) {
  updateEnabled(value);
  try {
    localStorage.setItem("bf-sound", value ? "on" : "off");
  } catch {
    /* noop */
  }
}

export function initSound() {
  try {
    updateEnabled(localStorage.getItem("bf-sound") !== "off");
  } catch {
    /* noop */
  }
}

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

export function ensureMusic() {
  if (typeof window === "undefined") return;
  if (!music) {
    music = new Audio(audio.backgroundMusic);
    music.loop = true;
    music.volume = 0.4;
  }
}

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

export function stopMusic() {
  if (music) music.pause();
}

export { cache };
