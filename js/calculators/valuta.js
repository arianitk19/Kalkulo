import { convert } from '../core/finance.js';
import { fmt, eur } from '../core/dom.js';
import { market, FX_NAMES } from '../core/market.js';
import { bigInput, segmented } from '../ui/components.js';

export default {
  id: 'valuta',
  title: 'Këmbimi Valutor',
  short: 'Këmbimi',
  desc: 'Konvertim me kurse reale',
  color: '#3b82f6',
  icon: 'valuta',
  sub: 'EUR ⇄ 8 valuta',
  defaults: { dir: 'from', amount: '' },
  live: true,
  render() {
    return `
      ${segmented({ name: 'dir', value: 'from', options: [{ value: 'from', label: 'NGA EURO' }, { value: 'to', label: 'NË EURO' }] })}
      ${bigInput({ name: 'amount', label: '<span data-out="inLabel">Shuma në Euro</span>', color: '#60a5fa', center: true, prefix: '' })}
      <div class="grid grid-cols-2 gap-3">
        ${Object.keys(FX_NAMES).map((c) => `
          <div class="card rounded-2xl p-4">
            <div class="flex items-center justify-between">
              <span class="text-[10px] font-bold text-blue-400 bg-blue-500/10 px-2 py-1 rounded-md">${c}</span>
              <span class="text-[9px] tnum" style="color:var(--muted)" data-out="r-${c}"></span>
            </div>
            <p class="text-[9px] uppercase font-semibold mt-2 truncate" style="color:var(--muted)">${FX_NAMES[c]}</p>
            <p class="text-lg font-bold tnum mt-0.5 truncate" data-out="v-${c}">0,00</p>
          </div>`).join('')}
      </div>`;
  },
  compute(v) {
    const out = { inLabel: v.dir === 'to' ? 'Shuma në valutë të huaj' : 'Shuma në Euro' };
    const amt = +v.amount || 0;
    for (const c of Object.keys(FX_NAMES)) {
      const rate = market.fx[c];
      out[`r-${c}`] = `1 € = ${fmt(rate, rate > 10 ? 2 : 4)}`;
      out[`v-${c}`] = v.dir === 'to' ? eur(amt / rate) : `${fmt(convert(amt, rate))} ${c}`;
    }
    return {
      out,
      summary: amt ? (v.dir === 'to'
        ? `${fmt(amt)} USD = ${eur(amt / market.fx.USD)} · ${fmt(amt)} CHF = ${eur(amt / market.fx.CHF)}`
        : `${eur(amt)} = ${fmt(amt * market.fx.USD)} USD · ${fmt(amt * market.fx.CHF)} CHF · ${fmt(amt * market.fx.ALL)} ALL`) : '',
    };
  },
};
