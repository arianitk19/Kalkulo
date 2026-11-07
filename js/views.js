/** Faqet kryesore: Ballina, Modulet, Tregjet dhe faqja e një moduli. */
import { CALCULATORS } from './calculators/index.js';
import { market, COINS, FX_NAMES, statusLabel, updatedLabel } from './core/market.js';
import { RATES } from './core/finance.js';
import { icon } from './core/icons.js';
import { fmt, eur, pct, esc } from './core/dom.js';
import { getHistory } from './core/store.js';

const muted = 'style="color:var(--muted)"';
const hasData = () => !!market.updated;

export const liveBadge = () => {
  const on = market.status === 'live';
  return `<span data-live-badge class="badge ${on ? 'badge-on' : ''}">${market.status === 'loading' ? '<i class="spin"></i>' : on ? '●' : '○'} ${statusLabel()}</span>`;
};

function moduleCard(c, big = false) {
  return `<a href="#/calc/${c.id}" data-module="${c.id}" data-search="${(c.title + ' ' + c.desc + ' ' + c.short).toLowerCase()}"
    class="press card rounded-2xl ${big ? 'p-5' : 'p-4'} relative overflow-hidden block">
    <div class="absolute -right-5 -top-5 w-16 h-16 rounded-full blur-2xl opacity-20" style="background:${c.color}"></div>
    <div class="${big ? 'w-11 h-11 mb-4' : 'w-10 h-10 mb-3'} rounded-xl flex items-center justify-center" style="background:${c.color}1a;color:${c.color}">${icon(c.icon, big ? 'w-[22px] h-[22px]' : 'w-5 h-5')}</div>
    <p class="${big ? 'text-sm' : 'text-[13px]'} font-semibold leading-tight">${c.title}</p>
    <p class="text-[10px] mt-1 leading-snug" ${muted}>${c.desc}</p>
  </a>`;
}

const marketCard = (labelTxt, val, sub, chg) => `<div class="card rounded-2xl p-4">
  <div class="flex items-center justify-between mb-3"><span class="text-[10px] font-semibold uppercase tracking-wider" ${muted}>${labelTxt}</span>
  ${chg !== undefined ? `<span class="text-[10px] font-bold ${chg >= 0 ? 'up' : 'dn'}">${pct(chg)}</span>` : ''}</div>
  <p class="dsp text-xl font-bold tnum">${val}</p><p class="text-[10px] mt-1" ${muted}>${sub}</p></div>`;

export function overview() {
  const c = market.crypto;
  const recent = getHistory().slice(0, 3);
  return `<div class="page stg">
    <section class="relative rounded-3xl p-6 md:p-10 mb-5 overflow-hidden hair hero-bg">
      <div class="absolute -right-10 -top-10 w-44 h-44 rounded-full bg-emerald-500/15 blur-3xl"></div>
      <div class="relative">
        <div class="inline-flex items-center gap-2 px-2.5 py-1 rounded-full hair bg-white/5 mb-4"><span class="w-1.5 h-1.5 rounded-full bg-emerald-500 pg"></span><span class="text-[9px] font-semibold uppercase tracking-[0.18em]" ${muted}>Normat ${RATES.year} · Kosovë</span></div>
        <h1 class="dsp text-[1.6rem] md:text-4xl font-extrabold leading-tight">Llogaritje financiare<br><span class="grad-text">të sakta, në sekonda.</span></h1>
        <p class="text-sm mt-3 leading-relaxed" ${muted}>Paga, dogana, tatimet, energjia dhe tregjet live — gjithçka offline-first, pa llogari dhe pa server.</p>
        <div class="flex gap-2 mt-5">
          <a href="#/calc" class="btn-primary press">Hap modulet</a>
          <a href="#/assistant" class="btn-ghost press">${icon('assistant', 'w-4 h-4 text-emerald-500')} Asistenti</a>
        </div>
      </div>
    </section>

    <div class="flex items-center justify-between mb-3"><h2 class="dsp text-sm font-bold">Qasje e shpejtë</h2></div>
    <div class="flex gap-2 overflow-x-auto nosb -mx-5 px-5 md:mx-0 md:px-0 md:flex-wrap mb-6">
      ${CALCULATORS.map((m) => `<a href="#/calc/${m.id}" class="press shrink-0 card rounded-2xl px-3.5 py-2.5 flex items-center gap-2"><span style="color:${m.color}">${icon(m.icon, 'w-4 h-4')}</span><span class="text-xs font-semibold">${m.short}</span></a>`).join('')}
    </div>

    <div class="flex items-center justify-between mb-3">
      <h2 class="dsp text-sm font-bold flex items-center gap-2">Tregjet ${liveBadge()}</h2>
      <a href="#/markets" class="text-[10px] font-bold text-emerald-500 uppercase tracking-wider flex items-center gap-1">Të gjitha ${icon('chev', 'w-3 h-3')}</a>
    </div>
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
      ${marketCard('Bitcoin', eur(c.bitcoin.eur, 0), 'BTC / EUR', hasData() ? c.bitcoin.chg : undefined)}
      ${marketCard('Ethereum', eur(c.ethereum.eur, 0), 'ETH / EUR', hasData() ? c.ethereum.chg : undefined)}
      ${marketCard('EUR / USD', fmt(market.fx.USD, 4), 'Kursi i këmbimit')}
      ${marketCard('Diesel', eur(market.fuel.diesel), 'Çmimi për litër')}
    </div>

    ${recent.length ? `<div class="flex items-center justify-between mb-3"><h2 class="dsp text-sm font-bold">Llogaritjet e fundit</h2>
      <a href="#/history" class="text-[10px] font-bold text-emerald-500 uppercase tracking-wider flex items-center gap-1">Historiku ${icon('chev', 'w-3 h-3')}</a></div>
      <div class="grid md:grid-cols-3 gap-2 mb-6">${recent.map(historyRow).join('')}</div>` : ''}

    <h2 class="dsp text-sm font-bold mb-3">Të gjitha modulet</h2>
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">${CALCULATORS.map((m) => moduleCard(m)).join('')}</div>

    <div class="grid grid-cols-2 lg:grid-cols-4 gap-3">
      ${[['shield', 'Norma të përditësuara', `Pragjet ${RATES.year}`], ['trend', 'Të dhëna live', 'Valuta & kripto'], ['wifiOff', 'Punon offline', 'Instalohet si aplikacion'], ['lock', 'Privatësi', 'Asgjë nuk dërgohet në server']]
        .map(([i, a, b]) => `<div class="card rounded-2xl p-4 flex items-start gap-3"><div class="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">${icon(i, 'w-4 h-4')}</div><div><p class="text-xs font-semibold">${a}</p><p class="text-[10px] mt-0.5" ${muted}>${b}</p></div></div>`).join('')}
    </div>
  </div>`;
}

export function hub() {
  return `<div class="page fu">
    <h1 class="dsp text-xl md:text-2xl font-extrabold mb-1">Qendra e Kalkulatorëve</h1>
    <p class="text-xs mb-4" ${muted}>${CALCULATORS.length} module financiare · normat ${RATES.year}</p>
    <label class="relative block mb-4 md:max-w-md">
      <span class="absolute left-3.5 top-1/2 -translate-y-1/2" ${muted}>${icon('search', 'w-4 h-4')}</span>
      <input id="hubSearch" type="search" placeholder="Kërko modul… (p.sh. doganë)" class="field w-full rounded-xl pl-10 pr-4 py-3 text-sm" autocomplete="off">
    </label>
    <div id="hubGrid" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 stg">${CALCULATORS.map((m) => moduleCard(m, true)).join('')}</div>
    <p id="hubEmpty" class="hidden text-center text-xs py-10" ${muted}>Asnjë modul nuk u gjet.</p>
  </div>`;
}

export function markets() {
  const f = market.fx;
  return `<div class="page fu">
    <div class="flex items-center justify-between mb-1"><h1 class="dsp text-xl md:text-2xl font-extrabold">Qendra e Tregjeve</h1>${liveBadge()}</div>
    <div class="flex items-center justify-between mb-5">
      <p class="text-xs" ${muted}>${updatedLabel()}</p>
      <button type="button" data-action="refresh" class="text-[10px] font-bold text-emerald-500 uppercase tracking-wider flex items-center gap-1 press">${icon('refresh', 'w-3.5 h-3.5')} Rifresko</button>
    </div>

    <div class="lg:grid lg:grid-cols-2 lg:gap-6"><div>
    <h3 class="section-label">Kriptovaluta · 24h</h3>
    <div class="space-y-2 mb-6">
      ${COINS.map((c) => {
        const d = market.crypto[c.id];
        return `<div class="card rounded-2xl p-4 flex items-center justify-between"><div class="flex items-center gap-3"><div class="w-9 h-9 rounded-lg flex items-center justify-center font-bold" style="background:${c.color}1f;color:${c.color}">${c.glyph}</div><div><p class="text-sm font-semibold">${c.name}</p><p class="text-[10px]" ${muted}>${c.sym} / EUR</p></div></div><div class="text-right"><p class="text-sm font-bold tnum">${eur(d.eur, d.eur < 10 ? 2 : 0)}</p>${hasData() ? `<p class="text-[10px] font-bold ${d.chg >= 0 ? 'up' : 'dn'}">${pct(d.chg)}</p>` : ''}</div></div>`;
      }).join('')}
    </div>

    </div><div>
    <h3 class="section-label">Këmbimi valutor · 1 EUR</h3>
    <div class="card rounded-2xl divide-y divide-white/5 mb-6 overflow-hidden">
      ${Object.keys(FX_NAMES).map((k) => `<div class="flex items-center justify-between px-4 py-3"><div class="flex items-center gap-3"><span class="text-[10px] font-bold w-10 text-center py-1 rounded-md bg-white/5">${k}</span><span class="text-xs" ${muted}>${FX_NAMES[k]}</span></div><span class="text-sm font-bold tnum">${fmt(f[k], f[k] > 10 ? 2 : 4)}</span></div>`).join('')}
    </div>

    <h3 class="section-label">Karburanti · Kosovë (referencë)</h3>
    <div class="grid grid-cols-3 gap-3 mb-6">
      ${[['Diesel', market.fuel.diesel, '#f97316'], ['Super 95', market.fuel.petrol, '#3b82f6'], ['Autogas', market.fuel.lpg, '#9ca3af']].map(([n, v, col]) => `<div class="card rounded-2xl p-4 text-center"><div class="w-1.5 h-1.5 rounded-full mx-auto mb-2" style="background:${col}"></div><p class="text-[9px] uppercase font-bold tracking-wider" ${muted}>${n}</p><p class="dsp text-lg font-bold tnum mt-1">${fmt(v)} €</p></div>`).join('')}
    </div>

    </div></div>
    <h3 class="section-label">Normat referente · ${RATES.year}</h3>
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
      ${[['TVSH standard', '18%'], ['TVSH e reduktuar', '8%'], ['Doganë veturash', '10%'], ['Kontribut Trust', '5% + 5%'], ['Tatim banimi', '0,15%'], ['Prag jotatueshëm', '250 €']].map(([a, b]) => `<div class="card rounded-2xl p-4"><p class="text-[10px] uppercase font-semibold tracking-wider" ${muted}>${a}</p><p class="dsp text-lg font-bold mt-1">${b}</p></div>`).join('')}
    </div>
  </div>`;
}

export function calculatorPage(c) {
  return `<div class="page page-narrow fu">
    <div class="flex items-center gap-3 mb-5">
      <a href="#/calc" class="icon-btn press" aria-label="Kthehu te modulet">${icon('back', 'w-5 h-5')}</a>
      <div class="flex-1 min-w-0"><h1 class="dsp text-lg font-bold leading-tight truncate">${c.title}</h1>
        <p class="text-[10px] uppercase tracking-wider font-semibold flex items-center gap-2" ${muted}>${c.sub}${c.live ? ` · ${liveBadge()}` : ''}</p></div>
      <div class="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style="background:${c.color}1a;color:${c.color}">${icon(c.icon, 'w-5 h-5')}</div>
    </div>
    <form id="calcForm" data-calc="${c.id}" class="space-y-3" autocomplete="off" novalidate>
      ${c.render()}
      <div class="grid grid-cols-3 gap-2 pt-1">
        <button type="button" data-action="save" class="act press">${icon('save', 'w-4 h-4')}Ruaj</button>
        <button type="button" data-action="share" class="act press">${icon('share', 'w-4 h-4')}Ndaj</button>
        <button type="reset" class="act press">${icon('trash', 'w-4 h-4')}Pastro</button>
      </div>
    </form>
  </div>`;
}

export function historyRow(h) {
  const c = CALCULATORS.find((x) => x.id === h.calc);
  const when = new Date(h.ts).toLocaleString('sq-AL', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false });
  return `<div class="card rounded-2xl p-3.5 flex items-start gap-3">
    <a href="#/calc/${h.calc}?h=${h.id}" class="flex items-start gap-3 flex-1 min-w-0 press">
      <div class="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style="background:${c?.color || '#10b981'}1a;color:${c?.color || '#10b981'}">${icon(c?.icon || 'calc', 'w-4 h-4')}</div>
      <div class="min-w-0"><p class="text-xs font-semibold">${c?.title || h.calc}</p><p class="text-[11px] leading-snug mt-0.5" ${muted}>${esc(h.summary)}</p><p class="text-[9px] uppercase tracking-wider mt-1" ${muted}>${when}</p></div>
    </a>
    <button type="button" data-action="del-history" data-id="${h.id}" class="p-1.5 rounded-lg press" ${muted} aria-label="Fshi">${icon('close', 'w-4 h-4')}</button>
  </div>`;
}

export function historyPage() {
  const list = getHistory();
  return `<div class="page page-narrow fu">
    <div class="flex items-end justify-between mb-1 gap-3">
      <h1 class="dsp text-xl md:text-2xl font-extrabold">Historiku</h1>
      ${list.length ? `<button type="button" data-action="clear-history" class="text-[10px] font-bold uppercase tracking-wider press flex items-center gap-1 text-red-400">${icon('trash', 'w-3.5 h-3.5')} Fshi të gjitha</button>` : ''}
    </div>
    <p class="text-xs mb-5" ${muted}>${list.length ? `${list.length} llogaritje të ruajtura · prek për t’i rihapur` : 'Llogaritjet e ruajtura shfaqen këtu'}</p>
    ${list.length ? `<div class="space-y-2 stg">${list.map(historyRow).join('')}</div>`
    : `<div class="card rounded-3xl text-center py-14 px-6"><div class="w-14 h-14 rounded-2xl bg-white/5 mx-auto flex items-center justify-center mb-4" ${muted}>${icon('history', 'w-6 h-6')}</div>
       <p class="text-sm font-semibold">Ende pa llogaritje të ruajtura</p><p class="text-xs mt-1" ${muted}>Shtypni “Ruaj” në çdo modul për t’i mbajtur këtu.</p>
       <a href="#/calc" class="btn-primary press mt-5 inline-flex">Hap modulet</a></div>`}
  </div>`;
}
