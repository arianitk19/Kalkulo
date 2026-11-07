/**
 * Ruajtja lokale (localStorage) — preferencat, historiku dhe vlerat e fundit të çdo moduli.
 * Gjithçka mbetet në pajisje; asgjë nuk dërgohet në server.
 */
const KEY = { cfg: 'kalkulo:cfg', history: 'kalkulo:history', inputs: 'kalkulo:inputs', market: 'kalkulo:market' };
const HISTORY_MAX = 50;

const safe = {
  get(k, fallback) {
    try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : fallback; } catch { return fallback; }
  },
  set(k, v) {
    try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* storage i plotë / privat */ }
  },
};

export const DEFAULTS = Object.freeze({ voice: false, reduceMotion: false });

// Migrim nga versioni i vjetër (kalkulox_cfg)
function loadCfg() {
  const cur = safe.get(KEY.cfg, null);
  if (cur) return { ...DEFAULTS, ...cur };
  const old = safe.get('kalkulox_cfg', null);
  return { ...DEFAULTS, ...(old ? { voice: !!old.voice } : {}) };
}

export const cfg = loadCfg();
export function setCfg(patch) { Object.assign(cfg, patch); safe.set(KEY.cfg, cfg); }
export function resetAll() {
  Object.values(KEY).forEach((k) => { try { localStorage.removeItem(k); } catch { /* */ } });
  try { localStorage.removeItem('kalkulox_cfg'); } catch { /* */ }
  Object.assign(cfg, DEFAULTS);
}

/* ---------- vlerat e fundit për çdo modul ---------- */
const inputs = safe.get(KEY.inputs, {});
export const getInputs = (id) => inputs[id] || null;
export function saveInputs(id, values) { inputs[id] = values; safe.set(KEY.inputs, inputs); }

/* ---------- historiku i llogaritjeve ---------- */
let history = safe.get(KEY.history, []);
export const getHistory = () => history;
export function addHistory(entry) {
  history = [{ id: crypto.randomUUID?.() ?? String(Date.now()), ts: Date.now(), ...entry }, ...history].slice(0, HISTORY_MAX);
  safe.set(KEY.history, history);
}
export function removeHistory(id) { history = history.filter((h) => h.id !== id); safe.set(KEY.history, history); }
export function clearHistory() { history = []; safe.set(KEY.history, history); }

/* ---------- cache e tregut (për offline) ---------- */
export const loadMarketCache = () => safe.get(KEY.market, null);
export const saveMarketCache = (m) => safe.set(KEY.market, m);

export function exportData() {
  return { app: 'KALKULO X', version: 2, exported: new Date().toISOString(), settings: cfg, history, inputs };
}
