import { energyBill, RATES } from '../core/finance.js';
import { eur, fmt } from '../core/dom.js';
import { input, hero, stat } from '../ui/components.js';

const E = RATES.energy;
export default {
  id: 'kesco',
  title: 'Energjia KESCO',
  short: 'Energjia',
  desc: 'Faturë me tarifa ditë/natë & TVSH',
  color: '#eab308',
  icon: 'kesco',
  sub: 'Sistemi i faturimit',
  defaults: { day: '', night: '' },
  render() {
    return `
      <div class="grid grid-cols-2 gap-3">
        ${input({ name: 'day', label: `Ditë (A1) · ${fmt(E.day)} €`, color: '#eab308', suffix: 'kWh' })}
        ${input({ name: 'night', label: `Natë (A2) · ${fmt(E.night)} €`, color: '#60a5fa', suffix: 'kWh' })}
      </div>
      ${hero({ out: 'total', title: 'Vlera totale e faturës', gradient: 'bg-gradient-to-br from-yellow-400 to-amber-600', dark: true })}
      <div class="grid grid-cols-2 gap-3">
        ${stat({ out: 'day', title: 'Tarifa e lartë', color: 'rgba(234,179,8,.5)' })}
        ${stat({ out: 'night', title: 'Tarifa e ulët', color: 'rgba(96,165,250,.5)' })}
        ${stat({ out: 'fixed', title: 'Tarifë fikse' })}
        ${stat({ out: 'vat', title: `TVSH ${E.vat * 100}%` })}
      </div>`;
  },
  compute(v) {
    const r = energyBill(v.day, v.night);
    return {
      out: { total: eur(r.total), day: eur(r.day), night: eur(r.night), fixed: eur(r.fixed), vat: eur(r.vat) },
      summary: (+v.day || +v.night) ? `${+v.day || 0} kWh ditë + ${+v.night || 0} kWh natë → ${eur(r.total)}` : '',
    };
  },
};
