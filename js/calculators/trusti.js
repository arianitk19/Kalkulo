import { pension } from '../core/finance.js';
import { eur } from '../core/dom.js';
import { icon } from '../core/icons.js';
import { bigInput, hero, stat } from '../ui/components.js';

export default {
  id: 'trusti',
  title: 'Trusti Pensional',
  short: 'Trusti',
  desc: 'Kontribut 5% + 5%',
  color: '#34d399',
  icon: 'trusti',
  sub: 'Kontribute pensionale',
  defaults: { gross: '' },
  render() {
    return `
      ${bigInput({ name: 'gross', label: 'Paga bruto mujore', color: '#34d399' })}
      <div class="grid grid-cols-2 gap-3">
        ${stat({ out: 'employee', title: 'Punëtori (5%)', color: 'rgba(16,185,129,.5)' })}
        ${stat({ out: 'employer', title: 'Punëdhënësi (5%)' })}
      </div>
      ${hero({ out: 'monthly', title: 'Totali mujor për kursim', gradient: 'bg-gradient-to-br from-emerald-400 to-emerald-700', dark: true,
        extra: `<p class="relative text-[11px] font-semibold text-black/60 mt-2 tnum flex items-center gap-1.5">${icon('trusti', 'w-4 h-4')}<span data-out="yearly"></span></p>` })}`;
  },
  compute(v) {
    const r = pension(v.gross);
    return {
      out: { employee: eur(r.employee), employer: eur(r.employer), monthly: eur(r.monthly), yearly: `${eur(r.yearly)} në vit` },
      summary: r.monthly ? `Paga ${eur(+v.gross)} → Trust ${eur(r.monthly)}/muaj (${eur(r.yearly)}/vit)` : '',
    };
  },
};
