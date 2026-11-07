import { subsidy, RATES } from '../core/finance.js';
import { eur, fmt } from '../core/dom.js';
import { select, segmented, toggle, hero, label } from '../ui/components.js';

const S = RATES.subsidy;
export default {
  id: 'subvencione',
  title: 'Subvencionet Bujqësore',
  short: 'Subvencionet',
  desc: `Pagesa direkte ${RATES.year}`,
  color: '#22c55e',
  icon: 'subvencione',
  sub: `Pagesa direkte ${RATES.year}`,
  defaults: { crop: S.crops[0].id, unit: 'ha', area: '', fuel: false },
  render() {
    return `
      ${select({ name: 'crop', label: 'Kultura e mbjellë', color: '#22c55e', options: S.crops.map((c) => ({ value: c.id, label: `${c.name} — ${c.rate} €/ha` })) })}
      <div class="card rounded-2xl p-4">
        <div class="flex items-center justify-between mb-3">${label('Sipërfaqja')}<div class="w-40">${segmented({ name: 'unit', value: 'ha', options: [{ value: 'ha', label: 'HEKTAR' }, { value: 'ari', label: 'ARI' }] })}</div></div>
        <input name="area" type="number" inputmode="decimal" min="0" step="any" placeholder="0" class="bare w-full text-5xl font-bold text-center tnum">
        <p class="text-[9px] text-center uppercase tracking-wider font-semibold mt-1" style="color:var(--muted)" data-out="unitLabel"></p>
      </div>
      ${toggle({ name: 'fuel', title: 'Subvencionim i naftës', sub: `Shtesë +${S.fuelBonusPerHa} €/ha`, color: '#22c55e' })}
      ${hero({ out: 'total', title: 'Shuma totale e përfituar', gradient: 'bg-gradient-to-br from-emerald-600 to-emerald-900',
        extra: '<p class="relative text-[10px] font-bold text-emerald-100/80 mt-2 uppercase tracking-wider" data-out="detail"></p>' })}`;
  },
  compute(v) {
    const crop = S.crops.find((c) => c.id === v.crop) || S.crops[0];
    const r = subsidy(crop.rate, v.area, v.unit, v.fuel);
    return {
      out: {
        total: eur(r.total),
        unitLabel: v.unit === 'ari' ? `Në ari · ${fmt(r.ha, 2)} ha` : 'Sipërfaqja në hektarë (ha)',
        detail: v.fuel ? `Baza ${eur(r.base)} + Nafta ${eur(r.fuel)}` : 'Vetëm baza e kulturës',
      },
      summary: r.ha ? `${fmt(r.ha)} ha ${crop.name} (${crop.rate} €/ha)${v.fuel ? ' + naftë' : ''} → ${eur(r.total)}` : '',
    };
  },
};
