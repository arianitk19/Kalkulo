import { fmt, eur, pct } from '../core/dom.js';
import { market, COINS } from '../core/market.js';
import { bigInput, note } from '../ui/components.js';

export default {
  id: 'crypto',
  title: 'Kriptovalutat',
  short: 'Kripto',
  desc: 'Konvertim me çmime live',
  color: '#f59e0b',
  icon: 'crypto',
  sub: 'BTC · ETH · SOL',
  defaults: { amount: '' },
  live: true,
  render() {
    return `
      ${bigInput({ name: 'amount', label: 'Investimi (€)', color: '#f59e0b', center: true })}
      <div class="space-y-2">
        ${COINS.map((c) => `
          <div class="card rounded-2xl p-4 flex items-center justify-between gap-3">
            <div class="flex items-center gap-3 min-w-0">
              <div class="w-10 h-10 rounded-xl flex items-center justify-center font-bold" style="background:${c.color}1f;color:${c.color}">${c.glyph}</div>
              <div class="min-w-0"><p class="text-sm font-semibold">${c.name}</p><p class="text-[10px] font-bold tnum" data-out="p-${c.id}"></p></div>
            </div>
            <div class="text-right"><p class="text-base font-bold tnum" data-out="q-${c.id}">0</p><p class="text-[9px] uppercase" style="color:var(--muted)">${c.sym}</p></div>
          </div>`).join('')}
      </div>
      ${note('Kriptovalutat janë shumë të paqëndrueshme. Ky informacion nuk përbën këshillë financiare.')}`;
  },
  compute(v) {
    const amt = +v.amount || 0;
    const out = {};
    const classes = {};
    for (const c of COINS) {
      const { eur: price, chg } = market.crypto[c.id];
      out[`p-${c.id}`] = market.updated ? `${eur(price, 0)} · ${pct(chg)}` : `${eur(price, 0)} · referencë`;
      classes[`p-${c.id}`] = chg >= 0 ? 'up' : 'dn';
      out[`q-${c.id}`] = fmt(amt / price, c.id === 'solana' ? 4 : 6);
    }
    const btc = market.crypto.bitcoin.eur;
    return { out, classes, summary: amt ? `${eur(amt)} = ${fmt(amt / btc, 6)} BTC · ${fmt(amt / market.crypto.ethereum.eur, 5)} ETH` : '' };
  },
};
