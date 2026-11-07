/**
 * Të dhënat e tregut: kurset (open.er-api.com) dhe kripto (CoinGecko).
 * Vlerat referente përdoren pa internet; vlerat e fundit ruhen në cache.
 */
import { loadMarketCache, saveMarketCache } from './store.js';

export const FX_NAMES = {
  USD: 'Dollar Amerikan', GBP: 'Funta Britanike', CHF: 'Franga Zvicerane', ALL: 'Lek Shqiptar',
  TRY: 'Lira Turke', JPY: 'Jeni Japonez', CAD: 'Dollar Kanadez', AUD: 'Dollar Australian',
};
export const COINS = [
  { id: 'bitcoin', sym: 'BTC', glyph: '₿', name: 'Bitcoin', color: '#f7931a' },
  { id: 'ethereum', sym: 'ETH', glyph: 'Ξ', name: 'Ethereum', color: '#627eea' },
  { id: 'solana', sym: 'SOL', glyph: '◎', name: 'Solana', color: '#14f195' },
];

const REFERENCE = {
  fx: { USD: 1.08, GBP: 0.85, CHF: 0.94, ALL: 101.2, TRY: 38.6, JPY: 170.2, CAD: 1.49, AUD: 1.63 },
  crypto: { bitcoin: { eur: 62000, chg: 0 }, ethereum: { eur: 3300, chg: 0 }, solana: { eur: 138, chg: 0 } },
  fuel: { diesel: 1.89, petrol: 1.39, lpg: 0.72 },
};

const cached = loadMarketCache();
export const market = {
  fx: { ...REFERENCE.fx, ...(cached?.fx || {}) },
  crypto: { ...REFERENCE.crypto, ...(cached?.crypto || {}) },
  fuel: { ...REFERENCE.fuel },
  fxLive: false,
  cryptoLive: false,
  updated: cached?.updated || null,
  status: 'idle', // idle | loading | live | cached | offline
};

const listeners = new Set();
export const onMarket = (fn) => { listeners.add(fn); return () => listeners.delete(fn); };
const emit = () => listeners.forEach((fn) => { try { fn(market); } catch (e) { console.error(e); } });

async function getJSON(url, ms = 8000) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), ms);
  try {
    const r = await fetch(url, { signal: ctrl.signal, cache: 'no-store' });
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    return await r.json();
  } finally { clearTimeout(t); }
}

let inflight = null;
export function refreshMarket() {
  if (inflight) return inflight;
  market.status = 'loading';
  emit();
  inflight = (async () => {
    const [fx, cr] = await Promise.allSettled([
      getJSON('https://open.er-api.com/v6/latest/EUR'),
      getJSON('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=eur&include_24hr_change=true'),
    ]);
    market.fxLive = fx.status === 'fulfilled' && !!fx.value?.rates;
    if (market.fxLive) {
      for (const k of Object.keys(FX_NAMES)) {
        if (Number.isFinite(fx.value.rates[k])) market.fx[k] = fx.value.rates[k];
      }
    }
    market.cryptoLive = cr.status === 'fulfilled' && !!cr.value?.bitcoin;
    if (market.cryptoLive) {
      for (const c of COINS) {
        const v = cr.value[c.id];
        if (v && Number.isFinite(v.eur)) market.crypto[c.id] = { eur: v.eur, chg: v.eur_24h_change || 0 };
      }
    }
    if (market.fxLive || market.cryptoLive) {
      market.updated = Date.now();
      market.status = 'live';
      saveMarketCache({ fx: market.fx, crypto: market.crypto, updated: market.updated });
    } else {
      market.status = market.updated ? 'cached' : 'offline';
    }
    emit();
  })().finally(() => { inflight = null; });
  return inflight;
}

export function statusLabel() {
  switch (market.status) {
    case 'live': return 'Live';
    case 'loading': return 'Duke u përditësuar';
    case 'cached': return 'Cache';
    default: return 'Referencë';
  }
}

export function updatedLabel() {
  if (!market.updated) return 'Vlera referente';
  const mins = Math.round((Date.now() - market.updated) / 60000);
  if (mins < 1) return 'Përditësuar tani';
  if (mins < 60) return `Përditësuar ${mins} min më parë`;
  return `Përditësuar ${new Date(market.updated).toLocaleString('sq-AL', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })}`;
}
