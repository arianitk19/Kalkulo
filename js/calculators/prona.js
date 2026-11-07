import { propertyTax, RATES } from '../core/finance.js';
import { eur, fmt } from '../core/dom.js';
import { select, input, toggle, hero, stat } from '../ui/components.js';

const P = RATES.property;
export default {
  id: 'prona',
  title: 'Tatimi në Pronë',
  short: 'Prona',
  desc: `Tatim vjetor ${RATES.year} (RKS)`,
  color: '#6366f1',
  icon: 'prona',
  sub: `Tatim vjetor ${RATES.year}`,
  defaults: { type: P.types[0].id, m2: '', perM2: '', primary: true },
  render() {
    return `
      ${select({ name: 'type', label: 'Klasifikimi i pronës', color: '#818cf8', options: P.types.map((t) => ({ value: t.id, label: `${t.name} — ${fmt(t.rate * 100, 2)}%` })) })}
      <div class="grid grid-cols-2 gap-3">
        ${input({ name: 'm2', label: 'Sipërfaqja', color: '#818cf8', placeholder: '100', suffix: 'm²' })}
        ${input({ name: 'perM2', label: 'Vlera për m²', color: '#818cf8', placeholder: '500', suffix: '€' })}
      </div>
      ${toggle({ name: 'primary', title: 'Rezidencë primare', sub: `Zbritje −${fmt(P.primaryDeduction, 0)} €`, color: '#818cf8' })}
      ${hero({ out: 'tax', title: `Fatura vjetore ${RATES.year}`, gradient: 'bg-gradient-to-br from-indigo-500 to-indigo-800',
        extra: '<p class="relative text-[11px] font-semibold text-white/70 mt-2 tnum">2 këste × <span data-out="inst"></span></p>' })}
      <div class="grid grid-cols-2 gap-3">
        ${stat({ out: 'value', title: 'Vlera totale' })}
        ${stat({ out: 'taxable', title: 'Baza tatimore', color: 'rgba(129,140,248,.5)' })}
      </div>`;
  },
  compute(v) {
    const type = P.types.find((t) => t.id === v.type) || P.types[0];
    const r = propertyTax(v.m2, v.perM2, type.rate, v.primary);
    return {
      out: { tax: eur(r.tax), inst: eur(r.installment), value: eur(r.value), taxable: eur(r.taxable) },
      summary: r.value ? `${type.name} ${eur(r.value)}${v.primary ? ' (primare)' : ''} → tatim ${eur(r.tax)}/vit` : '',
    };
  },
};
