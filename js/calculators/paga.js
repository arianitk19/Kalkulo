import { salary, grossFromNet, RATES } from '../core/finance.js';
import { eur, fmt } from '../core/dom.js';
import { bigInput, segmented, hero, stat, breakdown, note } from '../ui/components.js';

export default {
  id: 'paga',
  title: 'Kalkulatori i Pagës',
  short: 'Paga',
  desc: 'Bruto ⇄ neto, tatim ATK & Trust',
  color: '#10b981',
  icon: 'paga',
  sub: 'Llogaritje neto sipas ligjit',
  defaults: { mode: 'gross', amount: '' },
  render() {
    return `
      ${segmented({ name: 'mode', value: 'gross', options: [{ value: 'gross', label: 'BRUTO → NETO' }, { value: 'net', label: 'NETO → BRUTO' }] })}
      ${bigInput({ name: 'amount', label: '<span data-out="inLabel">Paga bruto mujore</span>', color: '#10b981' })}
      ${hero({ out: 'main', title: '<span data-out="mainLabel">Paga neto</span>', gradient: 'bg-gradient-to-br from-emerald-400 to-emerald-700', dark: true,
        extra: '<p class="relative text-[11px] font-semibold text-black/60 mt-2 tnum" data-out="annual"></p>' })}
      ${breakdown([
        { key: 'net', label: 'Neto', color: '#10b981' },
        { key: 'tax', label: 'Tatim ATK', color: '#f87171' },
        { key: 'trust', label: 'Trust 5%', color: '#60a5fa' },
      ])}
      <div class="grid grid-cols-2 gap-3">
        ${stat({ out: 'tax', title: 'Tatim ATK', color: 'rgba(248,113,113,.45)' })}
        ${stat({ out: 'trust', title: 'Trust punëtori (5%)', color: 'rgba(96,165,250,.45)' })}
        ${stat({ out: 'employer', title: 'Kosto e punëdhënësit' })}
        ${stat({ out: 'rate', title: 'Norma efektive' })}
      </div>
      ${note(`Prag jotatueshëm ${RATES.salary.taxFree} € · 8% për 250–450 € · 10% mbi 450 € (pas Trustit)`)}`;
  },
  compute(v) {
    const r = v.mode === 'net' ? grossFromNet(v.amount) : salary(v.amount);
    const g = r.gross || 1;
    const net = v.mode === 'net';
    return {
      out: {
        inLabel: net ? 'Paga neto e dëshiruar' : 'Paga bruto mujore',
        mainLabel: net ? 'Paga bruto e nevojshme' : 'Paga neto',
        main: eur(net ? r.gross : r.net),
        annual: r.gross ? `${eur(r.annualNet)} neto në vit` : '',
        tax: eur(r.tax), trust: eur(r.trust), employer: eur(r.employerCost),
        rate: `${fmt(r.effectiveRate * 100, 1)}%`,
      },
      bars: r.gross ? { net: r.net / g, tax: r.tax / g, trust: r.trust / g } : { net: 0, tax: 0, trust: 0 },
      summary: r.gross ? `Bruto ${eur(r.gross)} → Neto ${eur(r.net)} (tatim ${eur(r.tax)}, Trust ${eur(r.trust)})` : '',
    };
  },
};
