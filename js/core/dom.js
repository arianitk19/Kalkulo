export const $ = (sel, root = document) => root.querySelector(sel);
export const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

const nf = new Map();
export function fmt(n, d = 2) {
  const key = d;
  if (!nf.has(key)) nf.set(key, new Intl.NumberFormat('de-DE', { minimumFractionDigits: d, maximumFractionDigits: d }));
  return nf.get(key).format(Number.isFinite(n) ? n : 0);
}
export const eur = (n, d = 2) => `${fmt(n, d)} €`;
export const pct = (n, d = 2) => `${n >= 0 ? '+' : ''}${fmt(n, d)}%`;

export function esc(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

let toastTimer;
export function toast(msg) {
  const el = $('#toast');
  if (!el) return;
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2400);
}

export function vibrate(ms = 8) {
  try { navigator.vibrate?.(ms); } catch { /* jo i mbështetur */ }
}

export async function shareText(title, text) {
  try {
    if (navigator.share) { await navigator.share({ title, text }); return; }
    await navigator.clipboard.writeText(text);
    toast('U kopjua në clipboard');
  } catch (e) {
    if (e?.name !== 'AbortError') toast('Ndarja nuk u realizua');
  }
}
