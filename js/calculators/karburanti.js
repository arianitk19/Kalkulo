import { tripCost } from '../core/finance.js';
import { eur, fmt } from '../core/dom.js';
import { market } from '../core/market.js';
import { input, segmented, hero, stat } from '../ui/components.js';

const NAMES = { diesel: 'Diesel', petrol: 'Super 95', lpg: 'Autogas' };
export default {
  id: 'karburanti',
  title: 'Kosto e Karburantit',
  short: 'Karburanti',
  desc: 'Kosto udhëtimi & CO₂',
  color: '#f97316',
  icon: 'karburanti',
  sub: 'Llogaritje e udhëtimit',
  defaults: { type: 'diesel', dist: '', cons: '', price: '', round: false },
  render() {
    return `
      ${segmented({ name: 'type', value: 'diesel', options: Object.entries(NAMES).map(([value, l]) => ({ value, label: `${l.toUpperCase()}<small class="block opacity-70 tnum">${fmt(market.fuel[value])} €</small>` })) })}
      <div class="grid grid-cols-2 gap-3">
        ${input({ name: 'dist', label: 'Distanca', color: '#fb923c', suffix: 'km' })}
        ${input({ name: 'cons', label: 'Harxhimi', color: '#fb923c', placeholder: '6.5', suffix: 'L/100' })}
      </div>
      ${input({ name: 'price', label: 'Çmimi për litër (opsional)', placeholder: 'sipas tregut', suffix: '€/L' })}
      <label class="card rounded-2xl p-4 flex items-center justify-between cursor-pointer press">
        <span class="text-[11px] font-bold uppercase">Vajtje-ardhje</span><input type="checkbox" name="round" class="switch">
      </label>
      ${hero({ out: 'cost', title: 'Kosto totale e udhëtimit', gradient: 'bg-gradient-to-br from-orange-400 to-orange-700', dark: true })}
      <div class="grid grid-cols-3 gap-2">
        ${stat({ out: 'litres', title: 'Litra', color: 'rgba(251,146,60,.5)', compact: true })}
        ${stat({ out: 'perKm', title: '€ / km', compact: true })}
        ${stat({ out: 'co2', title: 'CO₂', color: 'rgba(148,163,184,.5)' })}
      </div>`;
  },
  compute(v) {
    const price = +v.price > 0 ? +v.price : market.fuel[v.type] ?? market.fuel.diesel;
    const dist = (+v.dist || 0) * (v.round ? 2 : 1);
    const r = tripCost(dist, v.cons, price, v.type);
    return {
      out: { cost: eur(r.cost), litres: `${fmt(r.litres, 1)} L`, perKm: eur(r.perKm, 3), co2: `${fmt(r.co2, 1)} kg` },
      summary: r.cost ? `${fmt(dist, 0)} km · ${v.cons} L/100 · ${NAMES[v.type]} → ${eur(r.cost)}` : '',
    };
  },
};
