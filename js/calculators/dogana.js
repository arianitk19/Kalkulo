import { vehicleCustoms, RATES } from '../core/finance.js';
import { eur } from '../core/dom.js';
import { input, hero, stat, breakdown, note } from '../ui/components.js';

const C = RATES.customs;
export default {
  id: 'dogana',
  title: 'Dogana e Veturave',
  short: 'Dogana',
  desc: 'Doganë + akcizë + TVSH',
  color: '#3b82f6',
  icon: 'dogana',
  sub: 'Importi i automjeteve',
  defaults: { price: '', cm3: '' },
  render() {
    return `
      <div class="grid grid-cols-2 gap-3">
        ${input({ name: 'price', label: 'Çmimi i blerjes', color: '#60a5fa', placeholder: '15000', suffix: '€' })}
        ${input({ name: 'cm3', label: 'Motorri', color: '#60a5fa', placeholder: '2000', suffix: 'cm³' })}
      </div>
      ${hero({ out: 'taxes', title: 'Detyrimet doganore', gradient: 'bg-gradient-to-br from-blue-600 to-blue-900',
        extra: '<p class="relative text-[11px] font-semibold text-white/70 mt-2 tnum">Kosto totale me veturë: <span data-out="landed"></span></p>' })}
      ${breakdown([
        { key: 'duty', label: `Doganë ${C.duty * 100}%`, color: '#60a5fa' },
        { key: 'excise', label: 'Akcizë', color: '#a78bfa' },
        { key: 'vat', label: `TVSH ${C.vat * 100}%`, color: '#f472b6' },
      ])}
      <div class="grid grid-cols-3 gap-2">
        ${stat({ out: 'duty', title: 'Doganë', color: 'rgba(96,165,250,.5)', compact: true })}
        ${stat({ out: 'excise', title: 'Akcizë', color: 'rgba(167,139,250,.5)', compact: true })}
        ${stat({ out: 'vat', title: 'TVSH', color: 'rgba(244,114,182,.5)', compact: true })}
      </div>
      ${note(`TVSH llogaritet mbi vlerën + doganën + akcizën. Akciza vlerësohet ${String(C.excisePerCm3).replace('.', ',')} €/cm³ — vlerë orientuese; norma zyrtare varet nga mosha dhe lloji i veturës.`)}`;
  },
  compute(v) {
    const r = vehicleCustoms(v.price, v.cm3);
    const t = r.taxes || 1;
    return {
      out: { taxes: eur(r.taxes), landed: eur(r.landed), duty: eur(r.duty), excise: eur(r.excise), vat: eur(r.vat) },
      bars: r.taxes ? { duty: r.duty / t, excise: r.excise / t, vat: r.vat / t } : { duty: 0, excise: 0, vat: 0 },
      summary: r.price ? `Veturë ${eur(r.price)}, ${+v.cm3 || 0} cm³ → detyrime ${eur(r.taxes)} (totali ${eur(r.landed)})` : '',
    };
  },
};
