/**
 * Asistenti — përgjigje lokale (pa server) mbi modulet e platformës.
 * reply() është funksion i pastër (i testuar); UI-ja menaxhohet nga AssistantUI.
 */
import { salary, vehicleCustoms, energyBill, parseAmount, RATES } from './core/finance.js';
import { market } from './core/market.js';
import { $, eur, fmt, esc, toast } from './core/dom.js';
import { cfg } from './core/store.js';
import { icon } from './core/icons.js';

const has = (x, re) => re.test(x);
const W = (words) => new RegExp(`(^|[^\\p{L}])(${words})`, 'iu'); // fillim fjale

const RULES = [
  {
    re: W('paga|pagë|neto|bruto|rrog|salar'),
    fn: (n) => {
      if (n) {
        const r = salary(n);
        return {
          sq: `Për pagë bruto <b>${eur(n)}</b>:<br>· Trust (5%): ${eur(r.trust)}<br>· Tatim ATK: ${eur(r.tax)}<br>· <b>Neto: ${eur(r.net)}</b><br><br>Hapni modulin <a href="#/calc/paga">Paga</a> për pasqyrën e plotë.`,
          en: `For a gross salary of ${fmt(n)} euros, the net pay is ${fmt(r.net)} euros, after ${fmt(r.tax)} euros income tax and ${fmt(r.trust)} euros pension contribution.`,
        };
      }
      return { sq: 'Më jepni shumën bruto (p.sh. “paga 850”) dhe e llogaris menjëherë netën, tatimin dhe Trustin.', en: 'Give me a gross amount, for example salary 850.' };
    },
  },
  {
    re: W('trust|pension'),
    fn: () => ({
      sq: 'Trusti pensional financohet me <b>5% nga punëtori dhe 5% nga punëdhënësi</b>, gjithsej 10% e pagës bruto në muaj. Për pagë 800 € → 80 €/muaj. <a href="#/calc/trusti">Hap Trustin</a>.',
      en: 'The pension Trust is funded with five percent from the employee and five percent from the employer.',
    }),
  },
  {
    re: W('dogan|vetur|makin|automjet|custom'),
    fn: (n) => {
      if (n) {
        const r = vehicleCustoms(n, 2000);
        return {
          sq: `Për veturë <b>${eur(n)}</b> (2000 cm³): doganë ${eur(r.duty)}, akcizë ${eur(r.excise)}, TVSH ${eur(r.vat)} → <b>${eur(r.taxes)}</b> detyrime. <a href="#/calc/dogana">Ndrysho kubikazhin</a>.`,
          en: `For a ${fmt(n)} euro car with a two litre engine, total import duties are about ${fmt(r.taxes)} euros.`,
        };
      }
      return { sq: 'Dogana = <b>10% doganë + akcizë (sipas cm³) + 18% TVSH</b> mbi vlerën me doganë e akcizë. Hapni <a href="#/calc/dogana">Doganën</a>.', en: 'Vehicle customs are ten percent duty, plus excise, plus eighteen percent VAT.' };
    },
  },
  {
    re: W('kurs|valut|këmbim|kembim|dollar|franga|exchange|currenc'),
    fn: () => ({
      sq: `Kurset ${market.fxLive ? '(live)' : '(referente)'}: 1 € = ${fmt(market.fx.USD, 3)} USD · ${fmt(market.fx.CHF, 3)} CHF · ${fmt(market.fx.ALL)} ALL · ${fmt(market.fx.GBP, 3)} GBP. <a href="#/calc/valuta">Konverto</a>.`,
      en: `One euro equals ${market.fx.USD.toFixed(3)} dollars and ${market.fx.CHF.toFixed(3)} Swiss francs.`,
    }),
  },
  {
    re: W('crypto|kripto|bitcoin|btc|ethereum|eth|solana|invest'),
    fn: () => ({
      sq: `Bitcoin: ${eur(market.crypto.bitcoin.eur, 0)} (${fmt(market.crypto.bitcoin.chg, 1)}%) · Ethereum: ${eur(market.crypto.ethereum.eur, 0)}. Kriptovalutat janë me rrezik të lartë — kjo nuk është këshillë financiare.`,
      en: `Bitcoin is at ${fmt(market.crypto.bitcoin.eur, 0)} euros. Crypto carries high risk; this is not financial advice.`,
    }),
  },
  {
    re: W('energ|kesco|rrym|fatur|kwh|electric'),
    fn: (n) => {
      const E = RATES.energy;
      if (n) {
        const r = energyBill(n, 0);
        return { sq: `${fmt(n, 0)} kWh me tarifë dite → <b>${eur(r.total)}</b> me TVSH dhe tarifë fikse. <a href="#/calc/kesco">Shto konsumin e natës</a>.`, en: `${fmt(n, 0)} kilowatt hours cost about ${fmt(r.total)} euros.` };
      }
      return { sq: `Fatura: ${fmt(E.day)} €/kWh ditë + ${fmt(E.night)} €/kWh natë + ${fmt(E.fixed)} € fikse + ${E.vat * 100}% TVSH. Konsumi natën është më i lirë.`, en: 'Night electricity is cheaper than day electricity.' };
    },
  },
  {
    re: W('subvenc|bujq|ferm|tok|grur|hardhi|subsid|farm'),
    fn: () => ({ sq: `Subvencionet ${RATES.year} jepen për hektar sipas kulturës (grurë 216 €, hardhi 500 €/ha…), plus 36 €/ha për naftë. <a href="#/calc/subvencione">Llogarit</a>.`, en: 'Agricultural subsidies are paid per hectare based on the crop.' }),
  },
  {
    re: W('karburant|naft|benzin|dizel|diesel|udh[eë]tim|fuel|trip'),
    fn: () => ({ sq: `Kosto = (km ÷ 100) × L/100km × çmimi. Diesel tani: ${eur(market.fuel.diesel)}/L. <a href="#/calc/karburanti">Llogarit udhëtimin</a>.`, en: 'Trip cost equals distance over one hundred, times consumption, times fuel price.' }),
  },
  {
    re: W('pron|tatim|shtëpi|shtepi|banim|banes|propert'),
    fn: () => ({ sq: 'Tatimi në pronë = (vlera − 15.000 € për rezidencë primare) × norma (banim 0,15%). Paguhet në dy këste. <a href="#/calc/prona">Llogarit</a>.', en: 'Property tax is the market value minus a primary residence deduction, times the rate.' }),
  },
  { re: W('faleminderit|flm|falemnderit|thank'), fn: () => ({ sq: 'Me kënaqësi. Jam këtu për çdo llogaritje tjetër.', en: 'My pleasure.' }) },
  { re: W('përshëndetje|pershendetje|tung|hello|hi\\b|hey|mirëdita|miredita'), fn: () => ({ sq: 'Mirë se vini! Si mund t’ju ndihmoj — pagë, doganë, tatim apo tregje?', en: 'Welcome! How can I help?' }) },
];

export function reply(q) {
  const x = String(q).toLowerCase();
  const n = parseAmount(q);
  for (const r of RULES) if (has(x, r.re)) return r.fn(n);
  return {
    sq: 'Mund t’ju ndihmoj me: <b>Paga, Trusti, Këmbimi, Kripto, Energjia, Dogana, Subvencionet, Karburanti, Prona</b> dhe të dhëna tregu. Provoni p.sh. “paga 900” ose “doganë 12000”.',
    en: 'I can help with salary, pension, exchange, crypto, energy, customs, subsidies, fuel and property.',
  };
}

const CHIPS = ['Paga neto për 850 €?', 'Doganë për veturë 12000 €', 'Si funksionon Trusti?', 'Kurset e sotme', '300 kWh sa kushton?'];

export const AssistantUI = {
  recog: null,
  listening: false,
  el: null,

  mount() {
    this.el = $('#ai');
    $('#aiChips').innerHTML = CHIPS.map((c) => `<button type="button" data-chip class="chip">${esc(c)}</button>`).join('');
    this.el.addEventListener('click', (e) => {
      const chip = e.target.closest('[data-chip]');
      if (chip) this.ask(chip.textContent);
    });
    $('#aiForm').addEventListener('submit', (e) => { e.preventDefault(); this.ask($('#aiIn').value); });
    $('#aiMic').addEventListener('click', () => this.mic());
  },

  open() {
    this.el.classList.add('open');
    this.el.setAttribute('aria-hidden', 'false');
    const chat = $('#aiChat');
    if (!chat.dataset.init) {
      chat.dataset.init = '1';
      this.bubble('Mirë se vini! Jam asistenti i <b>KALKULO X</b>. Pyetni për pagën, doganën, energjinë, tatimin në pronë ose kurset — ose zgjidhni një sugjerim më poshtë.', false);
    }
    setTimeout(() => $('#aiIn').focus({ preventScroll: true }), 300);
  },

  close() {
    this.el.classList.remove('open');
    this.el.setAttribute('aria-hidden', 'true');
    try { speechSynthesis.cancel(); } catch { /* */ }
    if (this.listening) this.recog?.stop();
  },

  bubble(html, me) {
    const chat = $('#aiChat');
    const row = document.createElement('div');
    row.className = `mi flex ${me ? 'justify-end' : 'justify-start'}`;
    row.innerHTML = `<div class="msg ${me ? 'msg-me' : 'msg-bot'}">${html}</div>`;
    chat.appendChild(row);
    chat.scrollTo({ top: chat.scrollHeight, behavior: 'smooth' });
    return row;
  },

  ask(text) {
    const q = String(text || '').trim();
    if (!q) return;
    $('#aiIn').value = '';
    this.bubble(esc(q), true);
    const typing = this.bubble('<span class="typ"><span></span><span></span><span></span></span>', false);
    setTimeout(() => {
      typing.remove();
      const r = reply(q);
      this.bubble(r.sq, false);
      if (cfg.voice) this.speak(r.en || r.sq.replace(/<[^>]+>/g, ''));
    }, 450 + Math.random() * 300);
  },

  speak(text) {
    try {
      if (!('speechSynthesis' in window)) return;
      const u = new SpeechSynthesisUtterance(text);
      const vs = speechSynthesis.getVoices() || [];
      const v = vs.find((x) => /en-GB/i.test(x.lang) && /Google/i.test(x.name)) || vs.find((x) => /^en/i.test(x.lang)) || vs[0];
      if (v) { u.voice = v; u.lang = v.lang; } else u.lang = 'en-US';
      u.rate = 0.98;
      speechSynthesis.cancel();
      speechSynthesis.speak(u);
    } catch { /* */ }
  },

  mic() {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { toast('Shfletuesi nuk e mbështet hyrjen me zë'); return; }
    if (this.listening) { this.recog?.stop(); return; }
    const r = new SR();
    this.recog = r;
    r.lang = 'sq-AL';
    r.interimResults = false;
    r.onstart = () => { this.listening = true; $('#aiMic').classList.add('mic-live'); $('#aiSt').textContent = 'Po dëgjon…'; };
    r.onend = () => { this.listening = false; $('#aiMic').classList.remove('mic-live'); $('#aiSt').textContent = 'Inteligjencë financiare'; };
    r.onresult = (e) => this.ask(e.results[0][0].transcript);
    r.onerror = () => toast('Zëri nuk u kap, provoni sërish');
    try { r.start(); } catch { /* tashmë aktiv */ }
  },

  icons() {
    $('#aiIco').innerHTML = icon('assistant', 'w-5 h-5 text-black');
    $('#aiClose').innerHTML = icon('close', 'w-5 h-5');
    $('#aiMic').innerHTML = icon('mic', 'w-5 h-5 text-emerald-500');
    $('#aiSend').innerHTML = icon('send', 'w-5 h-5');
  },
};
