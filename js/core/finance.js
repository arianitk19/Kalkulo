/**
 * Logjika financiare — funksione të pastra (pa DOM), të testuara në tests/.
 * Të gjitha normat ligjore janë në një vend: RATES.
 */

export const RATES = Object.freeze({
  year: 2026,
  salary: {
    trustEmployee: 0.05,
    trustEmployer: 0.05,
    taxFree: 250,          // € / muaj
    band1Limit: 200,       // 250–450 € → 8 %
    band1Rate: 0.08,
    band2Rate: 0.10,       // mbi 450 € → 10 %
  },
  vat: { standard: 0.18, reduced: 0.08 },
  energy: { day: 0.07, night: 0.03, fixed: 2.5, vat: 0.08 },
  customs: { duty: 0.10, excisePerCm3: 0.5, vat: 0.18 },
  fuel: { co2PerLitre: { diesel: 2.64, petrol: 2.31, lpg: 1.66 } },
  subsidy: {
    fuelBonusPerHa: 36,
    crops: [
      { id: 'grure', name: 'Grurë', rate: 216 },
      { id: 'miser', name: 'Misër', rate: 162 },
      { id: 'hardhi', name: 'Hardhi rrushi', rate: 500 },
      { id: 'pemetore', name: 'Pemëtore', rate: 400 },
      { id: 'perime', name: 'Perime', rate: 150 },
      { id: 'luledielli', name: 'Luledielli', rate: 288 },
    ],
  },
  property: {
    primaryDeduction: 15000,
    types: [
      { id: 'banim', name: 'Objekt banimi', rate: 0.0015 },
      { id: 'komercial', name: 'Objekt komercial', rate: 0.0020 },
      { id: 'bujqesore', name: 'Tokë bujqësore', rate: 0.0010 },
      { id: 'toke-kom', name: 'Tokë komerciale', rate: 0.0015 },
    ],
  },
});

const num = (v) => {
  const n = typeof v === 'number' ? v : parseFloat(v);
  return Number.isFinite(n) && n > 0 ? n : 0;
};
const round2 = (n) => Math.round((n + Number.EPSILON) * 100) / 100;

/** Paga bruto → neto (Kosovë). */
export function salary(grossIn) {
  const s = RATES.salary;
  const gross = num(grossIn);
  const trust = gross * s.trustEmployee;
  const employerTrust = gross * s.trustEmployer;
  const taxable = Math.max(0, gross - trust - s.taxFree);
  const tax = taxable <= s.band1Limit
    ? taxable * s.band1Rate
    : s.band1Limit * s.band1Rate + (taxable - s.band1Limit) * s.band2Rate;
  const net = gross - trust - tax;
  return {
    gross, trust, employerTrust, tax, net,
    employerCost: gross + employerTrust,
    annualNet: net * 12,
    effectiveRate: gross ? (trust + tax) / gross : 0,
  };
}

/** Paga neto → bruto (kërkim binar, saktësi në cent). */
export function grossFromNet(netIn) {
  const target = num(netIn);
  if (!target) return salary(0);
  let lo = target, hi = target * 2 + 100;
  for (let i = 0; i < 60; i++) {
    const mid = (lo + hi) / 2;
    if (salary(mid).net < target) lo = mid; else hi = mid;
  }
  return salary(round2(hi));
}

export function pension(grossIn) {
  const gross = num(grossIn);
  const employee = gross * RATES.salary.trustEmployee;
  const employer = gross * RATES.salary.trustEmployer;
  return { employee, employer, monthly: employee + employer, yearly: (employee + employer) * 12 };
}

export function energyBill(dayKwh, nightKwh) {
  const e = RATES.energy;
  const day = num(dayKwh) * e.day;
  const night = num(nightKwh) * e.night;
  const net = day + night + e.fixed;
  const vat = net * e.vat;
  return { day, night, fixed: e.fixed, vat, total: net + vat };
}

/**
 * Dogana e veturës. TVSH llogaritet mbi (vlera + doganë + akcizë),
 * siç kërkon baza e importit — versioni i vjetër e llogariste vetëm mbi vlerën.
 */
export function vehicleCustoms(priceIn, cm3In) {
  const c = RATES.customs;
  const price = num(priceIn);
  const duty = price * c.duty;
  const excise = num(cm3In) * c.excisePerCm3;
  const vat = (price + duty + excise) * c.vat;
  const taxes = duty + excise + vat;
  return { price, duty, excise, vat, taxes, landed: price + taxes };
}

export function subsidy(rateIn, areaIn, unit = 'ha', fuelBonus = false) {
  const area = num(areaIn);
  const ha = unit === 'ari' ? area / 100 : area;
  const base = ha * num(rateIn);
  const fuel = fuelBonus ? ha * RATES.subsidy.fuelBonusPerHa : 0;
  return { ha, base, fuel, total: base + fuel };
}

export function tripCost(distanceIn, consumptionIn, priceIn, fuelType = 'diesel') {
  const litres = (num(distanceIn) / 100) * num(consumptionIn);
  const cost = litres * num(priceIn);
  const co2 = litres * (RATES.fuel.co2PerLitre[fuelType] ?? RATES.fuel.co2PerLitre.diesel);
  const distance = num(distanceIn);
  return { litres, cost, co2, perKm: distance ? cost / distance : 0 };
}

export function propertyTax(m2In, valuePerM2In, rateIn, primary = false) {
  const value = num(m2In) * num(valuePerM2In);
  const taxable = Math.max(0, value - (primary ? RATES.property.primaryDeduction : 0));
  const tax = taxable * num(rateIn);
  return { value, taxable, tax, installment: tax / 2 };
}

export function convert(amount, rate) {
  return num(amount) * num(rate);
}

/**
 * Lexon një shumë nga teksti i lirë: "1.200,50", "1,200.50", "1200.5", "850€".
 */
export function parseAmount(text) {
  const m = String(text).match(/\d[\d.,\s]*/);
  if (!m) return null;
  let s = m[0].replace(/\s/g, '').replace(/[.,]$/, '');
  const lastDot = s.lastIndexOf('.'), lastComma = s.lastIndexOf(',');
  if (lastDot > -1 && lastComma > -1) {
    const dec = lastDot > lastComma ? '.' : ',';
    const thou = dec === '.' ? ',' : '.';
    s = s.split(thou).join('').replace(dec, '.');
  } else if (lastComma > -1) {
    s = /^\d{1,3}(,\d{3})+$/.test(s) ? s.replace(/,/g, '') : s.replace(',', '.');
  } else if (lastDot > -1) {
    if (/^\d{1,3}(\.\d{3})+$/.test(s)) s = s.replace(/\./g, '');
  }
  const n = parseFloat(s);
  return Number.isFinite(n) ? n : null;
}
