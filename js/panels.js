/** Panelet anësore: Cilësimet, Historiku, Udhëzuesi dhe FAQ. */
import { icon } from './core/icons.js';
import { cfg, getHistory } from './core/store.js';
import { RATES } from './core/finance.js';

const muted = 'style="color:var(--muted)"';

function head(title, sub, back = false) {
  return `<div class="flex items-center justify-between mb-6 gap-3">
    <div class="flex items-center gap-3">
      ${back ? `<a href="#/settings" class="icon-btn press" aria-label="Kthehu">${icon('back', 'w-5 h-5')}</a>` : ''}
      <div><h2 class="dsp text-xl font-extrabold">${title}</h2><p class="text-[9px] text-emerald-500 font-bold uppercase tracking-[0.18em] mt-0.5">${sub}</p></div>
    </div>
    <button type="button" data-action="close-sheet" class="icon-btn press" aria-label="Mbyll">${icon('close', 'w-5 h-5')}</button>
  </div>`;
}

const row = (i, title, sub, right) => `<div class="flex items-center justify-between gap-3 p-4 card rounded-2xl">
  <div class="flex items-center gap-3 min-w-0"><div class="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center shrink-0" style="color:var(--fg-2)">${icon(i, 'w-[18px] h-[18px]')}</div>
  <div class="min-w-0"><p class="text-xs font-semibold">${title}</p><p class="text-[10px]" ${muted}>${sub}</p></div></div>${right}</div>`;

const link = (i, title, sub, href) => `<a href="${href}" class="block press">${row(i, title, sub, icon('chev', 'w-4 h-4 opacity-50'))}</a>`;
const btn = (i, title, sub, action) => `<button type="button" data-action="${action}" class="w-full text-left press">${row(i, title, sub, icon('chev', 'w-4 h-4 opacity-50'))}</button>`;
const sw = (key, on) => `<input type="checkbox" class="switch" data-setting="${key}" ${on ? 'checked' : ''} aria-label="${key}">`;

export function settings() {
  return `${head('Cilësimet', 'Qendra e konfigurimit')}
    <div class="card rounded-2xl p-4 mb-5 flex items-center gap-3"><div class="w-11 h-11 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">${icon('lock', 'w-5 h-5')}</div>
      <div><p class="text-sm font-semibold">Privatësi e plotë</p><p class="text-[10px]" ${muted}>Të dhënat ruhen vetëm në këtë pajisje</p></div></div>

    <p class="section-label ml-1">Preferenca</p>
    <div class="space-y-2 mb-5">
      ${row('speaker', 'Zëri i asistentit', 'Lexon përgjigjet me zë', sw('voice', cfg.voice))}
      ${row('palette', 'Lëvizje të reduktuara', 'Pa animacione', sw('reduceMotion', cfg.reduceMotion))}
      <div data-install-row class="hidden">${btn('download', 'Instalo aplikacionin', 'Shto në ekranin kryesor', 'install')}</div>
    </div>

    <p class="section-label ml-1">Ndihma</p>
    <div class="space-y-2 mb-5">
      ${link('book', 'Si të përdoret', 'Udhëzues për çdo modul', '#/settings/guide')}
      ${link('question', 'Pyetjet e shpeshta', 'Përgjigje të menjëhershme', '#/settings/faq')}
    </div>

    <p class="section-label ml-1">Të dhënat</p>
    <div class="space-y-2 mb-6">
      ${link('history', 'Historiku', `${getHistory().length} llogaritje të ruajtura`, '#/history')}
      ${btn('download', 'Eksporto të dhënat', 'Shkarko si JSON', 'export')}
      ${btn('trash', 'Rivendos gjithçka', 'Fshin cilësimet dhe historikun', 'reset')}
    </div>
    <p class="text-center text-[9px] uppercase tracking-[0.35em]" ${muted}>KALKULO X · v2.0 · ${RATES.year}</p>`;
}

const acc = (q, a) => `<details class="acc card rounded-2xl overflow-hidden"><summary class="p-4 flex justify-between items-center gap-3 cursor-pointer">
  <span class="text-xs font-semibold">${q}</span><span class="acc-x text-emerald-500">${icon('plus', 'w-4 h-4')}</span></summary>
  <div class="px-4 pb-4 text-[11px] leading-relaxed" ${muted}>${a}</div></details>`;

export function guide() {
  const steps = [
    ['Navigimi', 'Shiriti i poshtëm: <b>Ballina</b>, <b>Kalkulo</b>, <b>Tregjet</b> dhe <b>Asistenti</b>. Butoni “mbrapa” i telefonit funksionon kudo.'],
    ['Paga', 'Llogarit bruto → neto ose anasjelltas (neto → bruto). Shfaq tatimin ATK, Trustin, koston e punëdhënësit dhe normën efektive.'],
    ['Trusti', 'Kontributi 5% i punëtorit, 5% i punëdhënësit, totali mujor dhe vjetor.'],
    ['Këmbimi', 'Konvertim nga euro ose në euro për 8 valuta me kurse live.'],
    ['Kripto', 'Sa BTC, ETH dhe SOL blen me një shumë në euro.'],
    ['Energjia', 'kWh ditë/natë → fatura me tarifë fikse dhe TVSH 8%.'],
    ['Dogana', 'Çmimi dhe kubikazhi → doganë, akcizë dhe TVSH me ndarje vizuale.'],
    ['Subvencionet', 'Kultura, sipërfaqja (ha/ari) dhe shtesa për naftë.'],
    ['Karburanti', 'Distanca, harxhimi dhe lloji i karburantit → kosto, €/km dhe CO₂. Opsion vajtje-ardhje.'],
    ['Prona', 'Klasifikimi, m² dhe vlera → tatimi vjetor dhe këstet.'],
    ['Ruaj & Ndaj', 'Çdo modul i mban vlerat e fundit automatikisht. “Ruaj” e shton llogaritjen në Historik, “Ndaj” e dërgon rezultatin.'],
  ];
  return `${head('Si të përdoret', 'Udhëzues hap pas hapi', true)}<div class="space-y-2">${steps.map(([q, a]) => acc(q, a)).join('')}</div>
    <a href="#/assistant" class="btn-primary press w-full justify-center mt-5">${icon('assistant', 'w-4 h-4')} Pyet asistentin</a>`;
}

export function faq() {
  const items = [
    ['A janë të dhënat e tregut reale?', 'Po. Kurset dhe çmimet e kriptovalutave merren nga API publike. Pa internet përdoren vlerat e fundit të ruajtura ose vlera referente.'],
    ['Si llogaritet paga neto?', 'Nga bruto zbritet Trusti 5%. Mbi pjesën që mbetet, pas pragut 250 €, aplikohet 8% deri në 200 € dhe 10% për pjesën mbi to.'],
    ['A ruhen të dhënat e mia diku?', 'Jo. Gjithçka ruhet vetëm në shfletuesin tuaj (localStorage). Mund t’i eksportoni ose fshini kurdo nga Cilësimet.'],
    ['Sa të sakta janë normat?', `Modulet bazohen në normat ${RATES.year} për Kosovën. Akciza e veturave dhe tarifat e energjisë janë orientuese — për vendime zyrtare konsultoni institucionin përkatës.`],
    ['A funksionon pa internet?', 'Po. Pas hapjes së parë aplikacioni ruhet në pajisje dhe të gjitha llogaritjet punojnë offline.'],
    ['Si e instaloj në telefon?', 'Në Chrome/Android: menyja → “Instalo aplikacionin”. Në iPhone (Safari): Ndaj → “Add to Home Screen”.'],
  ];
  return `${head('Pyetjet e shpeshta', 'Ndihmë & FAQ', true)}
    <label class="relative block mb-4"><span class="absolute left-3.5 top-1/2 -translate-y-1/2" ${muted}>${icon('search', 'w-4 h-4')}</span>
      <input id="faqSearch" type="search" placeholder="Kërko në FAQ…" class="field w-full rounded-xl pl-10 pr-4 py-3 text-sm"></label>
    <div id="faqList" class="space-y-2">${items.map(([q, a]) => acc(q, a)).join('')}</div>`;
}
