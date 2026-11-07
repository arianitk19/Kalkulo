/** Regjistri i moduleve. Për të shtuar një modul: krijo skedarin dhe shtoje këtu. */
import paga from './paga.js';
import trusti from './trusti.js';
import valuta from './valuta.js';
import crypto from './crypto.js';
import energjia from './energjia.js';
import dogana from './dogana.js';
import subvencione from './subvencione.js';
import karburanti from './karburanti.js';
import prona from './prona.js';

export const CALCULATORS = [paga, trusti, valuta, crypto, energjia, dogana, subvencione, karburanti, prona];
export const byId = Object.fromEntries(CALCULATORS.map((c) => [c.id, c]));
