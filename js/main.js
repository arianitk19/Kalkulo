/**
 * KALKULO X — pika hyrëse.
 * Router me hash (#/calc/paga), delegim eventesh, përditësim live i tregut, PWA.
 */
import { $, $$, toast, vibrate, shareText, eur, fmt, pct } from './core/dom.js';
import { icon } from './core/icons.js';
import { cfg, setCfg, resetAll, getInputs, saveInputs, getHistory, addHistory, removeHistory, clearHistory, exportData } from './core/store.js';
import { market, onMarket, refreshMarket, COINS } from './core/market.js';
import { byId } from './calculators/index.js';
import * as V from './views.js';
import * as Panels from './panels.js';
import { AssistantUI, reply } from './assistant.js';

// Navigimi: menuja e poshtme (telefon) dhe navigimi lart (tablet/desktop)
const NAV = [
  { id: 'overview', href: '#/', icon: 'overview', label: 'Ballina' },
  { id: 'calc', href: '#/calc', icon: 'calc', label: 'Kalkulo' },
  { id: 'assistant', href: '#/assistant', icon: 'assistant', label: 'Asistenti', center: true },
  { id: 'markets', href: '#/markets', icon: 'markets', label: 'Tregjet' },
  { id: 'history', href: '#/history', icon: 'history', label: 'Historiku' },
];
const TITLES = { overview: 'Platforma financiare', hub: 'Kalkulatorët', markets: 'Tregjet live', history: 'Historiku', assistant: 'Asistenti' };
const SHEETS = { settings: Panels.settings, 'settings/guide': Panels.guide, 'settings/faq': Panels.faq };

const state = { base: null, baseHash: '#/', overlay: null, depth: 0, calc: null, activeNav: null };

/* ---------------- routing ---------------- */
function parse(hash) {
  const [path, query] = (hash.replace(/^#\/?/, '') || '').split('?');
  const params = new URLSearchParams(query || '');
  const parts = path.split('/').filter(Boolean);
  if (!parts.length) return { view: 'overview' };
  if (parts[0] === 'calc') return parts[1] && byId[parts[1]] ? { view: 'calc', id: parts[1], h: params.get('h') } : { view: 'hub' };
  if (parts[0] === 'markets') return { view: 'markets' };
  if (parts[0] === 'history') return { view: 'history' };
  if (parts[0] === 'assistant') return { overlay: 'assistant' };
  const sheet = parts.join('/');
  if (SHEETS[sheet]) return { overlay: 'sheet', sheet };
  return { view: 'overview' };
}

function route() {
  const r = parse(location.hash);
  if (r.overlay) {
    if (state.base) state.depth += 1;
    else { state.depth = 0; renderBase({ view: 'overview' }, '#/'); }
    openOverlay(r);
  } else {
    state.depth = 0;
    closeOverlays();
    renderBase(r, location.hash || '#/');
  }
}

function renderBase(r, hash) {
  state.base = r;
  state.baseHash = hash;
  state.calc = null;
  const view = $('#view');
  if (r.view === 'calc') {
    const c = byId[r.id];
    view.innerHTML = V.calculatorPage(c);
    mountCalculator(c, r.h);
    document.title = `${c.title} · KALKULO X`;
  } else {
    view.innerHTML = renderView(r.view);
    document.title = r.view === 'overview' ? 'KALKULO X — Platforma financiare' : `${TITLES[r.view]} · KALKULO X`;
  }
  view.scrollTo({ top: 0, behavior: 'instant' });
  $('#top').classList.remove('scrolled');
  $('#crumb').textContent = r.view === 'calc' ? byId[r.id].short : TITLES[r.view];
  setActiveNav(r.view === 'calc' || r.view === 'hub' ? 'calc' : r.view);
}

const renderView = (v) => (v === 'hub' ? V.hub() : v === 'markets' ? V.markets() : v === 'history' ? V.historyPage() : V.overview());

/** Shënon faqen aktive në të dy menutë dhe lëviz treguesin. */
function setActiveNav(id) {
  state.activeNav = id;
  $$('[data-nav]').forEach((a) => {
    const on = a.dataset.nav === id;
    a.classList.toggle('on', on);
    on ? a.setAttribute('aria-current', 'page') : a.removeAttribute('aria-current');
  });
  const dock = $('#dock');
  const idx = NAV.findIndex((n) => n.id === id);
  const onCenter = NAV[idx]?.center;
  dock.style.setProperty('--i', String(Math.max(0, idx)));
  dock.style.setProperty('--ind-o', idx < 0 || onCenter ? '0' : '1');
  moveTopIndicator();
}

function moveTopIndicator() {
  const ind = $('#topnav .topnav-ind');
  const on = $('#topnav a.on');
  if (!ind) return;
  if (!on || !on.offsetWidth) { ind.style.opacity = '0'; return; }
  ind.style.opacity = '1';
  ind.style.width = `${on.offsetWidth}px`;
  ind.style.transform = `translateX(${on.offsetLeft}px)`;
}

function updateHistoryBadge() {
  const n = getHistory().length;
  $$('[data-badge="history"]').forEach((b) => { b.textContent = n > 99 ? '99+' : String(n); b.hidden = !n; });
}

function openOverlay(r) {
  state.overlay = r;
  $('#scrim').classList.add('on');
  if (r.overlay === 'assistant') {
    $('#sheet').classList.remove('open');
    AssistantUI.open();
    setActiveNav('assistant');
    return;
  }
  AssistantUI.close();
  const sheet = $('#sheet');
  sheet.innerHTML = `<div class="sheet-inner">${SHEETS[r.sheet]()}</div>`;
  sheet.scrollTop = 0;
  sheet.classList.add('open');
  sheet.setAttribute('aria-hidden', 'false');
  if (deferredInstall) $('[data-install-row]', sheet)?.classList.remove('hidden');
}

function closeOverlays() {
  if (!state.overlay) return;
  state.overlay = null;
  $('#scrim').classList.remove('on');
  AssistantUI.close();
  const sheet = $('#sheet');
  sheet.classList.remove('open');
  sheet.setAttribute('aria-hidden', 'true');
}

function dismissOverlay() {
  if (state.depth > 0) history.go(-state.depth);
  else location.replace(state.baseHash);
}

/* ---------------- calculators ---------------- */
function readForm(form, defaults) {
  const v = { ...defaults };
  for (const el of form.elements) {
    if (!el.name) continue;
    if (el.type === 'checkbox') v[el.name] = el.checked;
    else if (el.type === 'radio') { if (el.checked) v[el.name] = el.value; }
    else v[el.name] = el.value;
  }
  return v;
}

function fillForm(form, values) {
  for (const el of form.elements) {
    if (!el.name || !(el.name in values)) continue;
    const val = values[el.name];
    if (el.type === 'checkbox') el.checked = !!val;
    else if (el.type === 'radio') el.checked = el.value === String(val);
    else el.value = val ?? '';
  }
}

function applyResult(root, res) {
  for (const [k, val] of Object.entries(res.out || {})) $$(`[data-out="${k}"]`, root).forEach((e) => { e.textContent = val; });
  for (const [k, cls] of Object.entries(res.classes || {})) $$(`[data-out="${k}"]`, root).forEach((e) => { e.classList.remove('up', 'dn'); e.classList.add(cls); });
  for (const [k, f] of Object.entries(res.bars || {})) {
    const el = $(`[data-bar="${k}"]`, root);
    if (el) el.style.width = `${Math.max(0, Math.min(1, f || 0)) * 100}%`;
  }
}

let saveTimer;
function mountCalculator(c, historyId) {
  const form = $('#calcForm');
  const fromHistory = historyId ? getHistory().find((h) => h.id === historyId) : null;
  fillForm(form, { ...c.defaults, ...(fromHistory?.values || getInputs(c.id) || {}) });
  const run = () => {
    const values = readForm(form, c.defaults);
    const res = c.compute(values);
    applyResult(form, res);
    state.calc = { c, values, res };
    return values;
  };
  form.addEventListener('input', () => {
    const values = run();
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => saveInputs(c.id, values), 300);
  });
  form.addEventListener('reset', () => setTimeout(() => {
    fillForm(form, c.defaults);
    saveInputs(c.id, run());
    $('input[type=number]', form)?.focus();
  }));
  run();
  if (!fromHistory && matchMedia('(hover: hover)').matches) $('input[type=number]', form)?.focus({ preventScroll: true });
}

function rerunCalculator() {
  const form = $('#calcForm');
  if (!form || !state.calc) return;
  const res = state.calc.c.compute(readForm(form, state.calc.c.defaults));
  applyResult(form, res);
  state.calc.res = res;
}

/* ---------------- actions (delegim) ---------------- */
const ACTIONS = {
  save() {
    const s = state.calc;
    if (!s?.res.summary) { toast('Plotësoni vlerat para se ta ruani'); return; }
    addHistory({ calc: s.c.id, summary: s.res.summary, values: s.values });
    updateHistoryBadge();
    vibrate();
    toast('U ruajt në historik');
  },
  share() {
    const s = state.calc;
    if (!s?.res.summary) { toast('Asgjë për të ndarë ende'); return; }
    shareText(s.c.title, `${s.c.title}\n${s.res.summary}\n\n— KALKULO X`);
  },
  refresh() { refreshMarket(); },
  'close-sheet'() { dismissOverlay(); },
  'del-history'(btn) {
    removeHistory(btn.dataset.id);
    updateHistoryBadge();
    btn.closest('.card')?.remove();
    if (state.base?.view === 'history' && !getHistory().length) rerenderBase();
  },
  'clear-history'() {
    if (!confirm('Të fshihet i gjithë historiku?')) return;
    clearHistory();
    updateHistoryBadge();
    rerenderBase();
    toast('Historiku u fshi');
  },
  export() {
    const blob = new Blob([JSON.stringify(exportData(), null, 2)], { type: 'application/json' });
    const a = Object.assign(document.createElement('a'), { href: URL.createObjectURL(blob), download: `kalkulo-x-${new Date().toISOString().slice(0, 10)}.json` });
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    toast('Të dhënat u shkarkuan');
  },
  reset() {
    if (!confirm('Të rivendosen cilësimet dhe të fshihet historiku?')) return;
    resetAll();
    applyPrefs();
    updateHistoryBadge();
    openOverlay(state.overlay);
    toast('Gjithçka u rivendos');
  },
  async install() {
    if (!deferredInstall) return;
    deferredInstall.prompt();
    await deferredInstall.userChoice;
    deferredInstall = null;
    $('[data-install-row]')?.classList.add('hidden');
  },
};

function bindEvents() {
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-action]');
    if (btn && ACTIONS[btn.dataset.action]) { e.preventDefault(); ACTIONS[btn.dataset.action](btn); }
  });

  document.addEventListener('change', (e) => {
    const s = e.target.closest('[data-setting]');
    if (!s) return;
    setCfg({ [s.dataset.setting]: s.checked });
    applyPrefs();
    toast(s.checked ? 'U aktivizua' : 'U çaktivizua');
  });

  document.addEventListener('input', (e) => {
    if (e.target.id === 'hubSearch') {
      const q = e.target.value.trim().toLowerCase();
      let shown = 0;
      $$('#hubGrid [data-module]').forEach((el) => { const ok = !q || el.dataset.search.includes(q); el.hidden = !ok; shown += ok; });
      $('#hubEmpty').classList.toggle('hidden', shown > 0);
    }
    if (e.target.id === 'faqSearch') {
      const q = e.target.value.trim().toLowerCase();
      $$('#faqList .acc').forEach((el) => { el.hidden = !!q && !el.textContent.toLowerCase().includes(q); });
    }
  });

  // Enter në kërkim → hap modulin e parë
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && state.overlay) dismissOverlay();
    if (e.key === 'Enter' && e.target.id === 'hubSearch') {
      const first = $$('#hubGrid [data-module]').find((el) => !el.hidden);
      if (first) location.hash = first.getAttribute('href');
    }
    if (e.key === '/' && !/INPUT|TEXTAREA|SELECT/.test(document.activeElement?.tagName) && !state.overlay) {
      e.preventDefault();
      location.hash = '#/calc';
      setTimeout(() => $('#hubSearch')?.focus(), 50);
    }
  });

  $('#aiClose').addEventListener('click', dismissOverlay);
  $('#scrim').addEventListener('click', dismissOverlay);
  window.addEventListener('hashchange', route);

  // Header: bëhet kompakt kur faqja lëviz
  const top = $('#top');
  $('#view').addEventListener('scroll', (e) => top.classList.toggle('scrolled', e.target.scrollTop > 6), { passive: true });

  // Prekja e faqes aktive në menu → kthehu në krye
  document.addEventListener('click', (e) => {
    const a = e.target.closest('[data-nav]');
    if (!a) return;
    vibrate(6);
    if (a.getAttribute('href') === location.hash || (a.dataset.nav === 'overview' && !location.hash.replace('#/', ''))) {
      e.preventDefault();
      $('#view').scrollTo({ top: 0, behavior: 'smooth' });
    }
  });

  window.addEventListener('resize', moveTopIndicator, { passive: true });
  watchKeyboard();
}

/** Fsheh menunë e poshtme kur hapet tastiera në telefon. */
function watchKeyboard() {
  const touch = matchMedia('(pointer: coarse)');
  const isField = (el) => el && (/^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName)) && !/^(checkbox|radio|range|button|submit)$/.test(el.type);
  const sync = () => {
    const vv = window.visualViewport;
    const shrunk = vv ? vv.height < window.innerHeight * 0.78 : false;
    document.body.classList.toggle('kb-open', touch.matches && (shrunk || isField(document.activeElement)));
  };
  document.addEventListener('focusin', sync);
  document.addEventListener('focusout', () => setTimeout(sync, 60));
  window.visualViewport?.addEventListener('resize', sync);
}

/* ---------------- market ---------------- */
function buildTicker() {
  const items = [
    ...COINS.map((c) => [c.sym, eur(market.crypto[c.id].eur, 0), market.updated ? market.crypto[c.id].chg : undefined]),
    ['EUR/USD', fmt(market.fx.USD, 4)], ['EUR/CHF', fmt(market.fx.CHF, 4)], ['EUR/GBP', fmt(market.fx.GBP, 4)], ['EUR/ALL', fmt(market.fx.ALL)],
    ['Diesel', eur(market.fuel.diesel)], ['Super 95', eur(market.fuel.petrol)],
  ];
  const one = items.map(([l, v, ch]) => `<span class="inline-flex items-center gap-1.5 px-4"><span class="text-[9px] font-semibold uppercase" style="color:var(--muted)">${l}</span><span class="text-[10px] font-bold tnum">${v}</span>${ch !== undefined ? `<span class="text-[9px] font-bold ${ch >= 0 ? 'up' : 'dn'}">${pct(ch, 1)}</span>` : ''}</span>`).join('');
  $('#tick').innerHTML = one + one;
  $('#tickDot').classList.toggle('off', market.status !== 'live');
}

function onMarketChange() {
  buildTicker();
  $$('[data-live-badge]').forEach((b) => { b.outerHTML = V.liveBadge(); });
  $('#topLive').innerHTML = V.liveBadge();
  if (market.status === 'loading' || state.overlay) return;
  const v = state.base?.view;
  if (v === 'overview' || v === 'markets') rerenderBase();
  else if (v === 'calc') rerunCalculator();
}

function rerenderBase() {
  if (!state.base) return;
  const view = $('#view');
  const y = view.scrollTop;
  if (state.base.view === 'calc') return;
  view.innerHTML = renderView(state.base.view);
  view.querySelectorAll('.fu,.stg').forEach((el) => el.classList.remove('fu', 'stg'));
  view.scrollTop = y;
}

/* ---------------- shell ---------------- */
function applyPrefs() {
  document.documentElement.classList.toggle('reduce-motion', !!cfg.reduceMotion);
}

function buildShell() {
  $('#dockItems').innerHTML = NAV.map((n) => (n.center
    ? `<a href="${n.href}" data-nav="${n.id}" class="dock-ai" aria-label="${n.label}"><span class="orb">${icon(n.icon, 'w-[22px] h-[22px]')}</span></a>`
    : `<a href="${n.href}" data-nav="${n.id}" class="dock-i" aria-label="${n.label}"><span class="pill">${icon(n.icon, 'w-[22px] h-[22px]')}${n.id === 'history' ? '<span class="dock-badge" data-badge="history" hidden></span>' : ''}</span><span class="lbl">${n.label}</span></a>`)).join('');
  $('#topnav').innerHTML = `<span class="topnav-ind" aria-hidden="true"></span>${NAV.filter((n) => !n.center)
    .map((n) => `<a href="${n.href}" data-nav="${n.id}">${icon(n.icon, 'w-4 h-4')}${n.label}</a>`).join('')}`;
  $('#aiTopBtn').innerHTML = `${icon('assistant', 'w-4 h-4')}Asistenti`;
  $('#topLive').innerHTML = V.liveBadge();
  updateHistoryBadge();
  $('#gearBtn').innerHTML = icon('settings', 'w-[18px] h-[18px]');
  AssistantUI.icons();
  AssistantUI.mount();
}

let deferredInstall = null;
window.addEventListener('beforeinstallprompt', (e) => { e.preventDefault(); deferredInstall = e; });

function boot() {
  applyPrefs();
  buildShell();
  bindEvents();
  buildTicker();
  onMarket(onMarketChange);
  route();
  refreshMarket();
  setInterval(() => { if (document.visibilityState === 'visible') refreshMarket(); }, 120_000);
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible' && (!market.updated || Date.now() - market.updated > 120_000)) refreshMarket();
  });
  document.fonts?.ready.then(moveTopIndicator);
  requestAnimationFrame(() => {
    document.body.classList.add('ready');
    moveTopIndicator();
    setTimeout(() => $('#intro')?.remove(), 700);
  });
  if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
    navigator.serviceWorker.register('./sw.js').catch(() => { /* jo kritike */ });
  }
}

boot();

// Për debug në konsolë
window.KALKULO = { market, reply, refreshMarket };
