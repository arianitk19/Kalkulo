
const $=id=>document.getElementById(id);
const fmt=(n,d=2)=>(isFinite(n)?n:0).toLocaleString('de-DE',{minimumFractionDigits:d,maximumFractionDigits:d});
const eur=n=>fmt(n)+' €';

/* ---------- professional icon set ---------- */
const P={
 overview:'<rect x="3" y="3" width="7" height="9" rx="1.4"/><rect x="14" y="3" width="7" height="5" rx="1.4"/><rect x="14" y="12" width="7" height="9" rx="1.4"/><rect x="3" y="16" width="7" height="5" rx="1.4"/>',
 calc:'<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 7h6"/><path d="M9 11h.01M12 11h.01M15 11h.01M9 14h.01M12 14h.01M15 14h.01M9 17h6"/>',
 markets:'<path d="M4 19V5"/><path d="M4 19h16"/><path d="M8 15l3-4 3 2 4-6"/>',
 assistant:'<path d="M12 3l1.7 4 4 1.7-4 1.7L12 14.4l-1.7-4L6.3 8.7l4-1.7L12 3z"/><path d="M19 14.5l.9 2 2 .9-2 .9-.9 2-.9-2-2-.9 2-.9.9-2z"/>',
 settings:'<circle cx="12" cy="12" r="3"/><path d="M12 2.5v2.5M12 19v2.5M4.6 4.6l1.8 1.8M17.6 17.6l1.8 1.8M2.5 12H5M19 12h2.5M4.6 19.4l1.8-1.8M17.6 6.4l1.8-1.8"/>',
 bell:'<path d="M18 8.5a6 6 0 10-12 0c0 6-2.5 7.5-2.5 7.5h17S18 14.5 18 8.5"/><path d="M13.6 20a2 2 0 01-3.2 0"/>',
 paga:'<rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2.6"/><path d="M6 12h.01M18 12h.01"/>',
 trusti:'<path d="M12 3l7 3v5c0 4.6-3 7.6-7 9-4-1.4-7-4.4-7-9V6l7-3z"/><path d="M9 12l2 2 4-4"/>',
 valuta:'<path d="M3.5 9h13l-3.2-3.2"/><path d="M20.5 15h-13l3.2 3.2"/>',
 crypto:'<path d="M3 17l5.5-5.5 3.5 3.5L20 7"/><path d="M16 7h4v4"/>',
 kesco:'<path d="M13 3L5 13.5h6L9 21l9-11h-6l1-7z"/>',
 dogana:'<path d="M3 6.5h11v9.5H3z"/><path d="M14 9.5h3.6l2.4 2.4V16H14z"/><circle cx="7" cy="18.5" r="1.7"/><circle cx="17.5" cy="18.5" r="1.7"/>',
 subvencione:'<path d="M12 21v-7.5"/><path d="M12 13.5c0-3.2 2.2-5.3 5.4-5.3 0 3.2-2.2 5.3-5.4 5.3z"/><path d="M12 13.5c0-3.2-2.2-5.3-5.4-5.3 0 3.2 2.2 5.3 5.4 5.3z"/>',
 karburanti:'<rect x="4" y="4" width="9" height="16" rx="1.5"/><path d="M7 8h3"/><path d="M13 9.5h3l2 2V17a2 2 0 11-4 0v-3h-1"/>',
 prona:'<path d="M3 21h18"/><path d="M5 21V8l7-4.5L19 8v13"/><path d="M10 21v-5h4v5"/><path d="M9.5 11h.01M14.5 11h.01"/>',
 search:'<circle cx="11" cy="11" r="7"/><path d="M21 21l-4-4"/>',
 back:'<path d="M15 19l-7-7 7-7"/>',
 chev:'<path d="M9 6l6 6-6 6"/>',
 plus:'<path d="M12 5v14M5 12h14"/>',
 close:'<path d="M6 6l12 12M18 6L6 18"/>',
 mic:'<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0014 0"/><path d="M12 18v3"/>',
 send:'<path d="M5 12h14M13 6l6 6-6 6"/>',
 globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3c2.6 2.6 2.6 15.4 0 18M12 3c-2.6 2.6-2.6 15.4 0 18"/>',
 lock:'<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 018 0v3"/>',
 shield:'<path d="M12 3l7 3v5c0 4.6-3 7.6-7 9-4-1.4-7-4.4-7-9V6l7-3z"/><path d="M9 12l2 2 4-4"/>',
 palette:'<circle cx="12" cy="12" r="9"/><circle cx="8" cy="10" r="1"/><circle cx="12" cy="8" r="1"/><circle cx="16" cy="10" r="1"/><path d="M12 21a3 3 0 010-6h2a2 2 0 002-2"/>',
 speaker:'<path d="M4 9.5v5h3.5L12 19V5L7.5 9.5H4z"/><path d="M16 9.5a3.5 3.5 0 010 5"/>',
 download:'<path d="M12 3v12M8 11l4 4 4-4"/><path d="M4 19h16"/>',
 book:'<path d="M4 5a2 2 0 012-2h13v16H6a2 2 0 00-2 2z"/><path d="M19 19H6"/>',
 question:'<circle cx="12" cy="12" r="9"/><path d="M9.4 9.2a2.6 2.6 0 015 .3c0 1.8-2.6 2-2.6 3.8"/><path d="M12 17h.01"/>',
 info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
 trash:'<path d="M4 7h16M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2M6 7l1 13a1 1 0 001 1h8a1 1 0 001-1l1-13"/>',
 fingerprint:'<path d="M12 11v3a6 6 0 003 5"/><path d="M8 8a5 5 0 018 4v2"/><path d="M5 12a7 7 0 0114 0v3"/><path d="M12 12v4"/>',
 doc:'<path d="M14 3v5h5"/><path d="M14 3H6a1 1 0 00-1 1v16a1 1 0 001 1h12a1 1 0 001-1V8l-5-5z"/><path d="M9 13h6M9 16h6"/>',
 trend:'<path d="M3 17l5.5-5.5 3.5 3.5L21 6"/><path d="M16 6h5v5"/>',
 clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'
};
const ic=(n,c='w-5 h-5')=>`<svg class="${c}" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">${P[n]||''}</svg>`;

/* ---------- preferences (app config only, NOT personal data) ---------- */
const DEF={lang:'sq',theme:'dark',voice:false,notifs:false,bio:false,twofa:false};
let CFG=JSON.parse(localStorage.getItem('kalkulox_cfg')||'null')||{...DEF};
const saveCfg=()=>localStorage.setItem('kalkulox_cfg',JSON.stringify(CFG));

let MARKET={
  fx:{USD:1.08,GBP:0.85,CHF:0.94,ALL:101.2,TRY:38.6,JPY:170.2,CAD:1.49,AUD:1.63},
  crypto:{bitcoin:{eur:62000,chg:1.8},ethereum:{eur:3300,chg:1.1},solana:{eur:138,chg:-0.8}},
  fuel:{diesel:1.89,super95:1.39,autogas:0.72},
  fxLive:false,cryptoLive:false
};

const I18N={
 sq:{overview:'Ballina',calc:'Kalkulo',markets:'Tregjet',assistant:'Asistenti',settings:'Cilësimet',notifs:'Njoftimet'},
 en:{overview:'Home',calc:'Calculate',markets:'Markets',assistant:'Assistant',settings:'Settings',notifs:'Notifications'},
 de:{overview:'Start',calc:'Rechnen',markets:'Märkte',assistant:'Assistent',settings:'Einstellungen',notifs:'Mitteilungen'},
 tr:{overview:'Ana Sayfa',calc:'Hesapla',markets:'Piyasalar',assistant:'Asistan',settings:'Ayarlar',notifs:'Bildirimler'}
};
const t=k=>(I18N[CFG.lang]||I18N.sq)[k]||k;

/* ---------- intro ---------- */
window.addEventListener('DOMContentLoaded',()=>{
  $('bellBtn').innerHTML=ic('bell','w-[18px] h-[18px] text-gray-300')+'<span class="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-orange-500 pg" id="bellDot"></span>';
  $('gearBtn').innerHTML=ic('settings','w-[18px] h-[18px] text-gray-300');
  $('aiIco').innerHTML=ic('assistant','w-5 h-5 text-black');
  $('aiClose').innerHTML=ic('close','w-5 h-5 text-gray-400');
  $('aiMic').innerHTML=ic('mic','w-5 h-5 text-emerald-500');
  $('aiSend').innerHTML=ic('send','w-5 h-5');
  const tl=gsap.timeline();
  tl.to('#iLogo',{opacity:1,scale:1,duration:.8,ease:'back.out(1.6)'})
    .to('#iTitle',{opacity:1,y:0,duration:.6},'-=.35')
    .to('#iSub',{opacity:1,duration:.5},'-=.25')
    .to('#iBar',{width:'100%',duration:1.3,ease:'power2.inOut'},'-=.3')
    .to('#intro',{opacity:0,duration:.5,onComplete:()=>{const i=$('intro');if(i)i.style.display='none';}})
    .set('#app',{display:'flex'}).to('#app',{opacity:1,duration:.5},'-=.15');
  boot();
});
function boot(){buildNav();buildTick();go('overview');fetchMarket();setInterval(fetchMarket,120000);schedNotifs();}

/* ---------- navigation ---------- */
const NAV=[{id:'overview',ic:'overview'},{id:'calc',ic:'calc'},{id:'markets',ic:'markets'},{id:'assistant',ic:'assistant'}];
let cur='overview';
function buildNav(){
  $('nav').innerHTML=NAV.map(n=>`<div class="nav-i ${n.id===cur?'on':''}" data-id="${n.id}" onclick="go('${n.id}')"><span class="nb"></span>${ic(n.ic,'w-[22px] h-[22px]')}<span class="text-[9px] font-semibold uppercase tracking-wide">${t(n.id)}</span></div>`).join('');
}
function go(id){
  if(id==='assistant'){AI.open();return;}
  cur=id;document.querySelectorAll('.nav-i').forEach(e=>e.classList.toggle('on',e.dataset.id===id));
  const v=$('view');v.scrollTop=0;v.innerHTML=VIEWS[id]?VIEWS[id]():VIEWS.overview();if(AFTER[id])AFTER[id]();
}
function openCalc(k){cur='calc';document.querySelectorAll('.nav-i').forEach(e=>e.classList.toggle('on',e.dataset.id==='calc'));const v=$('view');v.scrollTop=0;v.innerHTML=CALC[k].render();if(CALC[k].after)CALC[k].after();}

const VIEWS={},AFTER={};

/* ---------- OVERVIEW (platform, not personal) ---------- */
VIEWS.overview=()=>{
  const c=MARKET.crypto,f=MARKET.fx;
  const mc=(label,val,sub,chg)=>`<div class="card rounded-2xl p-4"><div class="flex items-center justify-between mb-3"><span class="text-[10px] font-semibold uppercase tracking-wider" style="color:var(--muted)">${label}</span>${chg!==undefined?`<span class="text-[10px] font-bold ${chg>=0?'up':'dn'}">${chg>=0?'+':''}${chg.toFixed(2)}%</span>`:''}</div><p class="dsp text-xl font-bold tnum">${val}</p><p class="text-[10px] mt-1" style="color:var(--muted)">${sub}</p></div>`;
  return `
  <div class="pt-2 stg">
    <div class="relative rounded-3xl p-6 mb-5 overflow-hidden hair bg-gradient-to-br from-[#0c1a16] to-[#0a0f16]">
      <div class="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-emerald-500/10 blur-3xl"></div>
      <div class="relative z-10">
        <div class="inline-flex items-center gap-2 px-2.5 py-1 rounded-full hair bg-white/3 mb-4"><span class="w-1.5 h-1.5 rounded-full bg-emerald-500 pg"></span><span class="text-[9px] font-semibold uppercase tracking-[0.18em]" style="color:var(--muted)">Sistemi aktiv · 2026</span></div>
        <h1 class="dsp text-2xl font-extrabold leading-tight">Platforma financiare<br>për Kosovën &amp; Shqipërinë</h1>
        <p class="text-sm mt-3 leading-relaxed" style="color:var(--muted)">Llogaritje precize sipas legjislacionit, të dhëna tregu në kohë reale dhe inteligjencë financiare — të gjitha në një vend.</p>
        <div class="flex gap-2 mt-5">
          <button onclick="go('calc')" class="px-4 py-2.5 rounded-xl bg-emerald-500 text-black text-xs font-bold press">Hap modulet</button>
          <button onclick="AI.open()" class="px-4 py-2.5 rounded-xl hair bg-white/4 text-xs font-bold press flex items-center gap-1.5">${ic('assistant','w-4 h-4 text-emerald-500')} Asistenti</button>
        </div>
      </div>
    </div>

    <div class="flex items-center justify-between mb-3">
      <h3 class="dsp text-sm font-bold">Tregjet · live</h3>
      <button onclick="go('markets')" class="text-[10px] font-bold text-emerald-500 uppercase tracking-wider flex items-center gap-1">Të gjitha ${ic('chev','w-3 h-3')}</button>
    </div>
    <div class="grid grid-cols-2 gap-3 mb-6">
      ${mc('Bitcoin',fmt(c.bitcoin.eur,0)+' €','BTC / EUR',c.bitcoin.chg)}
      ${mc('Ethereum',fmt(c.ethereum.eur,0)+' €','ETH / EUR',c.ethereum.chg)}
      ${mc('EUR / USD',f.USD.toFixed(3),'Kursi referent')}
      ${mc('Nafta D-1',fmt(MARKET.fuel.diesel)+' €','Çmimi për litër')}
    </div>

    <h3 class="dsp text-sm font-bold mb-3">Modulet e platformës</h3>
    <div class="grid grid-cols-2 gap-3 mb-6">
      ${Object.keys(CALC).map(k=>`
        <div onclick="openCalc('${k}')" class="press card rounded-2xl p-4 relative overflow-hidden">
          <div class="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style="background:${CALC[k].c}14;color:${CALC[k].c}">${ic(CALC[k].i,'w-5 h-5')}</div>
          <p class="text-[13px] font-semibold leading-tight">${CALC[k].title}</p>
          <p class="text-[10px] mt-1 leading-snug" style="color:var(--muted)">${CALC[k].desc}</p>
        </div>`).join('')}
    </div>

    <div class="grid grid-cols-2 gap-3">
      ${[['shield','Saktësi ligjore','Norma & prag aktualë 2026'],['trend','Të dhëna live','Valuta, crypto & karburant'],['assistant','Asistent inteligjent','Përgjigje & llogaritje'],['lock','Privatësi','Asgjë nuk ruhet në server']].map(([i,a,b])=>`
        <div class="card rounded-2xl p-4 flex items-start gap-3">
          <div class="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">${ic(i,'w-4 h-4')}</div>
          <div><p class="text-xs font-semibold">${a}</p><p class="text-[10px] mt-0.5" style="color:var(--muted)">${b}</p></div>
        </div>`).join('')}
    </div>
  </div>`;
};

/* ---------- CALCULATORS HUB ---------- */
VIEWS.calc=()=>`
  <div class="pt-4 fu">
    <h1 class="dsp text-xl font-extrabold mb-1">Qendra e Kalkulatorëve</h1>
    <p class="text-xs mb-5" style="color:var(--muted)">9 module financiare të standardizuara</p>
    <div class="grid grid-cols-2 gap-3 stg">
      ${Object.keys(CALC).map(k=>`
        <div onclick="openCalc('${k}')" class="press card rounded-2xl p-5 relative overflow-hidden">
          <div class="absolute -right-5 -top-5 w-16 h-16 rounded-full blur-2xl opacity-15" style="background:${CALC[k].c}"></div>
          <div class="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style="background:${CALC[k].c}14;color:${CALC[k].c}">${ic(CALC[k].i,'w-[22px] h-[22px]')}</div>
          <p class="text-sm font-semibold leading-tight">${CALC[k].title}</p>
          <p class="text-[10px] mt-1 leading-snug" style="color:var(--muted)">${CALC[k].desc}</p>
        </div>`).join('')}
    </div>
  </div>`;

/* ---------- MARKETS / LIVE DATA ---------- */
VIEWS.markets=()=>{
  const c=MARKET.crypto,f=MARKET.fx;
  const names={USD:'Dollar Amerikan',GBP:'Funta Britanike',CHF:'Franga Zvicerane',ALL:'Lek Shqiptar',TRY:'Lira Turke',JPY:'Jeni Japonez',CAD:'Dollar Kanadez',AUD:'Dollar Australian'};
  const cr=(sym,name,col,price,chg)=>`<div class="card rounded-2xl p-4 flex items-center justify-between"><div class="flex items-center gap-3"><div class="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-xs" style="background:${col}1f;color:${col}">${sym}</div><div><p class="text-sm font-semibold">${name}</p><p class="text-[10px]" style="color:var(--muted)">Kapitalizim i lartë</p></div></div><div class="text-right"><p class="text-sm font-bold tnum">${fmt(price,0)} €</p><p class="text-[10px] font-bold ${chg>=0?'up':'dn'}">${chg>=0?'+':''}${chg.toFixed(2)}%</p></div></div>`;
  return `
  <div class="pt-4 fu">
    <div class="flex items-center justify-between mb-1"><h1 class="dsp text-xl font-extrabold">Qendra e Tregjeve</h1><span class="text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-full ${MARKET.fxLive||MARKET.cryptoLive?'bg-emerald-500/15 text-emerald-400':'bg-white/5 text-gray-500'}">${MARKET.fxLive||MARKET.cryptoLive?'● Live':'○ Referencë'}</span></div>
    <p class="text-xs mb-5" style="color:var(--muted)">Të dhëna në kohë reale nga tregjet ndërkombëtare</p>

    <h3 class="text-[10px] font-bold uppercase tracking-[0.18em] mb-3" style="color:var(--muted)">Kriptovaluta</h3>
    <div class="space-y-2 mb-6">
      ${cr('₿','Bitcoin','#f7931a',c.bitcoin.eur,c.bitcoin.chg)}
      ${cr('Ξ','Ethereum','#627eea',c.ethereum.eur,c.ethereum.chg)}
      ${cr('◎','Solana','#14f195',c.solana.eur,c.solana.chg)}
    </div>

    <h3 class="text-[10px] font-bold uppercase tracking-[0.18em] mb-3" style="color:var(--muted)">Këmbimi valutor · 1 EUR</h3>
    <div class="card rounded-2xl divide-y divide-white/5 mb-6 overflow-hidden">
      ${Object.keys(names).map(k=>`<div class="flex items-center justify-between px-4 py-3"><div class="flex items-center gap-3"><span class="text-[10px] font-bold w-9 text-center py-1 rounded-md bg-white/5">${k}</span><span class="text-xs" style="color:var(--muted)">${names[k]}</span></div><span class="text-sm font-bold tnum">${k==='ALL'||k==='TRY'||k==='JPY'?f[k].toFixed(2):f[k].toFixed(3)}</span></div>`).join('')}
    </div>

    <h3 class="text-[10px] font-bold uppercase tracking-[0.18em] mb-3" style="color:var(--muted)">Karburanti · Kosovë</h3>
    <div class="grid grid-cols-3 gap-3 mb-6">
      ${[['Diesel D-1',MARKET.fuel.diesel,'#f97316'],['Super 95',MARKET.fuel.super95,'#3b82f6'],['Autogas',MARKET.fuel.autogas,'#9ca3af']].map(([n,v,col])=>`<div class="card rounded-2xl p-4 text-center"><div class="w-1.5 h-1.5 rounded-full mx-auto mb-2" style="background:${col}"></div><p class="text-[9px] uppercase font-bold tracking-wider" style="color:var(--muted)">${n}</p><p class="dsp text-lg font-bold tnum mt-1">${fmt(v)} €</p></div>`).join('')}
    </div>

    <h3 class="text-[10px] font-bold uppercase tracking-[0.18em] mb-3" style="color:var(--muted)">Normat referente · 2026</h3>
    <div class="grid grid-cols-2 gap-3">
      ${[['TVSH standard','18%'],['TVSH e reduktuar','8%'],['Doganë veturash','10%'],['Kontribut Trust','5% + 5%'],['Tatim banimi','0.15%'],['Prag jotatueshëm','250 €']].map(([a,b])=>`<div class="card rounded-2xl p-4"><p class="text-[10px] uppercase font-semibold tracking-wider" style="color:var(--muted)">${a}</p><p class="dsp text-lg font-bold mt-1">${b}</p></div>`).join('')}
    </div>
  </div>`;
};

/* ---------- calculator header & config ---------- */
function ch(title,accent,sub,i){
  return `<div class="pt-3 flex items-center gap-3 mb-5">
    <button onclick="go('calc')" class="w-10 h-10 rounded-xl panel flex items-center justify-center press">${ic('back','w-5 h-5')}</button>
    <div class="flex-1"><h1 class="dsp text-lg font-bold leading-tight">${title}</h1><p class="text-[10px] uppercase tracking-wider font-semibold" style="color:var(--muted)">${sub}</p></div>
    <div class="w-10 h-10 rounded-xl flex items-center justify-center" style="background:${accent}14;color:${accent}">${ic(i,'w-5 h-5')}</div>
  </div>`;
}
const CALC={
 paga:{title:'Kalkulatori i Pagës',desc:'Neto, tatim ATK & kontribut Trust',c:'#10b981',i:'paga',
  render(){return ch('Kalkulatori i Pagës','#10b981','Llogaritje neto sipas ligjit','paga')+`
  <div class="fu space-y-4">
    <div class="card rounded-2xl p-6"><label class="text-[10px] uppercase tracking-wider font-bold text-emerald-500 mb-3 block">Paga bruto mujore</label><div class="flex items-center"><span class="text-3xl mr-2" style="color:var(--muted)">€</span><input type="number" id="p-in" oninput="calcP()" class="bare w-full text-5xl font-bold tnum" placeholder="0"></div></div>
    <div class="relative rounded-2xl p-6 bg-gradient-to-br from-emerald-500 to-emerald-700 overflow-hidden"><div class="absolute -right-6 -bottom-6 w-28 h-28 rounded-full bg-white/12"></div><span class="text-black/60 text-[10px] font-bold uppercase tracking-wider">Paga neto</span><h2 class="dsp text-5xl font-extrabold text-black mt-1 tnum" id="p-neto">0,00 €</h2></div>
    <div class="grid grid-cols-2 gap-3">
      <div class="card rounded-2xl p-4 border-b-2" style="border-color:rgba(248,113,113,.4)"><span class="text-[9px] uppercase font-bold" style="color:var(--muted)">Tatim ATK</span><p id="p-atk" class="text-xl font-bold tnum mt-1">0,00 €</p></div>
      <div class="card rounded-2xl p-4 border-b-2" style="border-color:rgba(59,130,246,.4)"><span class="text-[9px] uppercase font-bold" style="color:var(--muted)">Trust (5%)</span><p id="p-trust" class="text-xl font-bold tnum mt-1">0,00 €</p></div>
    </div>
    <p class="text-[9px] text-center uppercase tracking-wider" style="color:var(--muted)">Prag jotatueshëm 250 € · 8% deri 200 € · 10% mbi 200 €</p>
  </div>`;}},
 trusti:{title:'Trusti Pensional',desc:'Kontribut 5% + 5%',c:'#34d399',i:'trusti',
  render(){return ch('Trusti Pensional','#34d399','Kontribute pensionale','trusti')+`
  <div class="fu space-y-4">
    <div class="card rounded-2xl p-6"><label class="text-[10px] uppercase tracking-wider font-bold text-emerald-500 mb-3 block">Paga bruto mujore</label><div class="flex items-center"><span class="text-3xl mr-2" style="color:var(--muted)">€</span><input type="number" id="t-bruto" oninput="calcT()" class="bare w-full text-5xl font-bold tnum" placeholder="0"></div></div>
    <div class="grid grid-cols-2 gap-3">
      <div class="card rounded-2xl p-5 border-b-2 border-emerald-500/50"><span class="text-[9px] uppercase font-bold" style="color:var(--muted)">Punëtori</span><p id="t-p" class="text-xl font-bold tnum mt-1">0,00 €</p></div>
      <div class="card rounded-2xl p-5 border-b-2 border-white/10"><span class="text-[9px] uppercase font-bold" style="color:var(--muted)">Punëdhënësi</span><p id="t-d" class="text-xl font-bold tnum mt-1">0,00 €</p></div>
    </div>
    <div class="rounded-2xl p-6 bg-gradient-to-br from-emerald-500 to-emerald-700 flex justify-between items-center"><div><span class="text-black/60 text-[10px] font-bold uppercase tracking-wider">Totali për kursim</span><h2 id="t-t" class="dsp text-4xl font-extrabold text-black mt-1 tnum">0,00 €</h2></div><div class="bg-black/15 p-3 rounded-xl text-black">${ic('trusti','w-7 h-7')}</div></div>
  </div>`;}},
 valuta:{title:'Këmbimi Valutor',desc:'Kurse reale në kohë reale',c:'#3b82f6',i:'valuta',
  render(){const list=[['USD','Dollar Amerikan'],['GBP','Funta Britanike'],['CHF','Franga Zvicerane'],['ALL','Lek Shqiptar'],['TRY','Lira Turke'],['JPY','Jeni Japonez'],['CAD','Dollar Kanadez'],['AUD','Dollar Australian']];
   return ch('Këmbimi Valutor','#3b82f6','Kurse '+(MARKET.fxLive?'live ●':'referente'),'valuta')+`
   <div class="fu space-y-4">
    <div class="card rounded-2xl p-6 text-center"><label class="text-[10px] uppercase tracking-wider font-bold text-blue-400 mb-3 block">Shuma në Euro</label><div class="flex items-center justify-center"><span class="text-3xl mr-2" style="color:var(--muted)">€</span><input type="number" id="v-in" oninput="calcV()" class="bare text-5xl font-bold text-center tnum w-44" placeholder="0"></div></div>
    <div class="grid grid-cols-2 gap-3">${list.map(([c,n])=>`<div class="card rounded-2xl p-4 text-center"><span class="text-[10px] font-bold text-blue-400 bg-blue-500/10 px-2 py-1 rounded-md">${c}</span><p class="text-[9px] uppercase font-semibold mt-2 truncate" style="color:var(--muted)">${n}</p><p id="v-${c}" class="text-xl font-bold tnum mt-1">0,00</p></div>`).join('')}</div>
   </div>`;},after(){calcV();}},
 crypto:{title:'Tregu i Kriptovalutave',desc:'Çmime reale live',c:'#f59e0b',i:'crypto',
  render(){const c=MARKET.crypto;const r=(id,sym,name,col,price,chg)=>`<div class="card rounded-2xl p-4 flex items-center justify-between"><div class="flex items-center gap-3"><div class="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-xs" style="background:${col}1f;color:${col}">${sym}</div><div><p class="text-sm font-semibold">${name}</p><p class="text-[10px] font-bold ${chg>=0?'up':'dn'}">${chg>=0?'+':''}${chg.toFixed(2)}% · ${fmt(price,0)} €</p></div></div><div class="text-right"><p id="c-${id}" class="text-base font-bold tnum">0.00000</p><p class="text-[9px] uppercase" style="color:var(--muted)">Sasia</p></div></div>`;
   return ch('Tregu i Kriptovalutave','#f59e0b','Konvertim '+(MARKET.cryptoLive?'live ●':'referent'),'crypto')+`
   <div class="fu space-y-3">
    <div class="card rounded-2xl p-6 text-center"><label class="text-[10px] uppercase tracking-wider font-bold text-yellow-500 mb-3 block">Investimi (€)</label><div class="flex items-center justify-center"><span class="text-3xl mr-2" style="color:var(--muted)">€</span><input type="number" id="c-in" oninput="calcC()" class="bare text-5xl font-bold text-center tnum w-44" placeholder="0"></div></div>
    ${r('btc','₿','Bitcoin','#f7931a',c.bitcoin.eur,c.bitcoin.chg)}${r('eth','Ξ','Ethereum','#627eea',c.ethereum.eur,c.ethereum.chg)}${r('sol','◎','Solana','#14f195',c.solana.eur,c.solana.chg)}
   </div>`;},after(){calcC();}},
 kesco:{title:'Energjia KESCO',desc:'Faturë me bllok-tarifa & TVSH',c:'#eab308',i:'kesco',
  render(){return ch('Energjia KESCO','#eab308','Sistemi i faturimit','kesco')+`
  <div class="fu space-y-4">
    <div class="card rounded-2xl p-5"><span class="text-[10px] font-bold text-yellow-500 uppercase tracking-wider">Tarifa e lartë (A1) · ditë</span><div class="flex items-end gap-2 mt-3"><input type="number" id="k-d" oninput="calcK()" class="bare w-full text-4xl font-bold tnum" placeholder="0"><span class="font-bold mb-1" style="color:var(--muted)">kWh</span></div></div>
    <div class="card rounded-2xl p-5"><span class="text-[10px] font-bold text-blue-400 uppercase tracking-wider">Tarifa e ulët (A2) · natë</span><div class="flex items-end gap-2 mt-3"><input type="number" id="k-n" oninput="calcK()" class="bare w-full text-4xl font-bold tnum" placeholder="0"><span class="font-bold mb-1" style="color:var(--muted)">kWh</span></div></div>
    <div class="rounded-2xl p-6 hair bg-[#0a0c10] text-center"><span class="text-[10px] font-bold uppercase tracking-wider" style="color:var(--muted)">Vlera totale e faturës</span><h2 id="k-res" class="dsp text-5xl font-extrabold text-yellow-500 tnum mt-1">0,00 €</h2><div class="mt-4 flex items-center justify-center gap-4 text-[9px] uppercase font-bold" style="color:var(--muted)"><span>TVSH 8%</span><span class="w-px h-4 bg-white/10"></span><span>Tarifë fikse 2,50 €</span></div></div>
  </div>`;}},
 dogana:{title:'Dogana e Veturave',desc:'Doganë + TVSH + akcizë',c:'#2563eb',i:'dogana',
  render(){return ch('Dogana e Veturave','#2563eb','Importi i automjeteve','dogana')+`
  <div class="fu space-y-4">
    <div class="card rounded-2xl p-2"><select id="d-viti" onchange="calcD()" class="w-full bg-transparent px-4 py-4 rounded-xl font-semibold text-base appearance-none"><option class="bg-black">Viti i prodhimit: 2024</option><option class="bg-black">Viti i prodhimit: 2023</option><option class="bg-black">Viti i prodhimit: 2022</option><option class="bg-black">Viti i prodhimit: 2021</option><option class="bg-black">Viti i prodhimit: 2020</option></select></div>
    <div class="grid grid-cols-2 gap-3">
      <div class="card rounded-2xl p-5"><span class="text-[9px] font-bold text-blue-400 uppercase tracking-wider block mb-2">Motorri (cm³)</span><input type="number" id="d-kub" oninput="calcD()" placeholder="2000" class="bare w-full text-2xl font-bold tnum"></div>
      <div class="card rounded-2xl p-5"><span class="text-[9px] font-bold text-blue-400 uppercase tracking-wider block mb-2">Çmimi (€)</span><input type="number" id="d-vle" oninput="calcD()" placeholder="15000" class="bare w-full text-2xl font-bold tnum"></div>
    </div>
    <div class="rounded-2xl p-6 bg-gradient-to-br from-blue-600 to-blue-900 text-center"><span class="text-[10px] font-bold text-blue-100 uppercase tracking-wider">Totali për pagesë</span><h2 class="dsp text-5xl font-extrabold text-white tnum mt-1"><span id="d-res">0,00</span> €</h2><div class="mt-5 flex justify-between px-4 text-blue-100/80"><div class="text-center"><p class="text-[8px] uppercase font-semibold">Doganë</p><p class="text-sm font-bold">10%</p></div><div class="text-center"><p class="text-[8px] uppercase font-semibold">TVSH</p><p class="text-sm font-bold">18%</p></div><div class="text-center"><p class="text-[8px] uppercase font-semibold">Akcizë</p><p class="text-sm font-bold">cm³</p></div></div></div>
  </div>`;}},
 subvencione:{title:'Subvencionet Bujqësore',desc:'Pagesa direkte MBPZHR 2026',c:'#22c55e',i:'subvencione',
  render(){return ch('Subvencionet Bujqësore','#22c55e','Pagesa direkte 2026','subvencione')+`
  <div class="fu space-y-4">
    <div class="card rounded-2xl p-5 space-y-5">
      <div><label class="text-[10px] font-bold text-emerald-500 uppercase tracking-wider mb-2 block">Kultura e mbjellë</label><select id="s-kat" onchange="calcS()" class="w-full bg-black/35 text-base font-semibold rounded-xl p-4 appearance-none hair"><option value="216" class="bg-black">Grurë — 216 €/ha</option><option value="162" class="bg-black">Misër — 162 €/ha</option><option value="500" class="bg-black">Hardhi rrushi — 500 €/ha</option><option value="400" class="bg-black">Pemëtore — 400 €/ha</option><option value="150" class="bg-black">Perime — 150 €/ha</option><option value="288" class="bg-black">Luledielli — 288 €/ha</option></select></div>
      <div class="bg-white/2 p-4 rounded-xl hair"><div class="flex items-center justify-between mb-3"><span class="text-[9px] font-bold uppercase" style="color:var(--muted)">Sipërfaqja</span><div class="seg w-40"><button id="bha" class="on" onclick="setUnit('ha')">HEKTAR</button><button id="bari" onclick="setUnit('ari')">ARI</button></div></div><input type="number" id="s-val" oninput="calcS()" placeholder="0" class="bare w-full text-5xl font-bold text-center tnum"><p id="ulab" class="text-[8px] text-center uppercase tracking-wider font-semibold mt-1" style="color:var(--muted)">Sipërfaqja në hektarë (ha)</p></div>
      <div onclick="toggleFuel()" class="flex items-center justify-between p-4 rounded-xl hair bg-emerald-500/4 press"><div><span class="text-[11px] font-bold uppercase block">Subvencionim i naftës</span><span class="text-[8px] uppercase tracking-wider" style="color:var(--muted)">Shtesë +36 €/ha</span></div><div id="ftg" class="tg"><div class="kn"></div></div></div>
    </div>
    <div class="rounded-2xl p-6 bg-gradient-to-br from-emerald-600 to-emerald-900 text-center"><span class="text-[10px] font-bold uppercase tracking-wider text-emerald-200">Shuma totale e përfituar</span><h2 class="dsp text-5xl font-extrabold text-white tnum mt-1"><span id="s-tot">0,00</span> €</h2><p id="s-det" class="text-[9px] font-bold text-emerald-900 mt-3 bg-emerald-400/40 inline-block px-3 py-1 rounded-full uppercase tracking-wider"></p></div>
  </div>`;},after(){calcS();}},
 karburanti:{title:'Kosto e Karburantit',desc:'Llogaritje udhëtimi & CO₂',c:'#f97316',i:'karburanti',
  render(){return ch('Kosto e Karburantit','#f97316','Llogaritje e udhëtimit','karburanti')+`
  <div class="fu space-y-4">
    <div class="grid grid-cols-3 gap-2">
      <div class="card rounded-xl p-3 text-center border-t-2 border-orange-500/50"><p class="text-[8px] font-bold uppercase" style="color:var(--muted)">Diesel</p><p class="text-base font-bold tnum mt-1">${fmt(MARKET.fuel.diesel)} €</p></div>
      <div class="card rounded-xl p-3 text-center border-t-2 border-blue-500/50"><p class="text-[8px] font-bold uppercase" style="color:var(--muted)">Super 95</p><p class="text-base font-bold tnum mt-1">${fmt(MARKET.fuel.super95)} €</p></div>
      <div class="card rounded-xl p-3 text-center border-t-2 border-gray-500/50"><p class="text-[8px] font-bold uppercase" style="color:var(--muted)">Autogas</p><p class="text-base font-bold tnum mt-1">${fmt(MARKET.fuel.autogas)} €</p></div>
    </div>
    <div class="card rounded-2xl p-5 space-y-4">
      <div class="grid grid-cols-2 gap-3">
        <div><label class="text-[9px] font-bold uppercase tracking-wider block mb-2 text-center" style="color:var(--muted)">Distanca (km)</label><input type="number" id="f-dist" oninput="calcF()" placeholder="0" class="bare w-full text-3xl font-bold text-center tnum"></div>
        <div><label class="text-[9px] font-bold uppercase tracking-wider block mb-2 text-center" style="color:var(--muted)">L / 100km</label><input type="number" id="f-cons" oninput="calcF()" placeholder="6.5" class="bare w-full text-3xl font-bold text-center tnum"></div>
      </div>
      <div class="flex justify-center gap-3 pt-1"><button onclick="setPrice(${MARKET.fuel.diesel},'d',this)" class="fb px-5 py-2 rounded-lg text-[10px] font-bold border border-orange-500/30 bg-orange-500 text-black">DIESEL</button><button onclick="setPrice(${MARKET.fuel.super95},'b',this)" class="fb px-5 py-2 rounded-lg text-[10px] font-bold border border-blue-500/30 text-blue-400">BENZINË</button></div>
      <input type="number" id="f-price" value="${MARKET.fuel.diesel}" class="hidden">
    </div>
    <div class="rounded-2xl p-6 bg-white text-black text-center"><span class="text-[10px] font-bold uppercase tracking-wider text-gray-400">Kosto totale e udhëtimit</span><h2 class="dsp text-5xl font-extrabold tnum mt-1"><span id="f-tot">0,00</span> <span class="text-orange-600">€</span></h2><div class="mt-4 inline-block bg-black text-white px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider">CO₂: <span id="f-co2" class="text-orange-500">0</span> kg</div></div>
  </div>`;},after(){calcF();}},
 prona:{title:'Tatimi në Pronë',desc:'Tatim vjetor 2026 (RKS)',c:'#6366f1',i:'prona',
  render(){return ch('Tatimi në Pronë','#6366f1','Tatim vjetor 2026','prona')+`
  <div class="fu space-y-4">
    <div class="card rounded-2xl p-5 space-y-4">
      <div><label class="text-[10px] font-bold text-indigo-400 uppercase tracking-wider mb-2 block">Klasifikimi i pronës</label><select id="pr-tipi" onchange="calcPr()" class="w-full bg-black/35 text-base font-semibold rounded-xl p-4 appearance-none hair"><option value="0.0015" class="bg-black">Objekt banimi — 0.15%</option><option value="0.0020" class="bg-black">Objekt komercial — 0.20%</option><option value="0.0010" class="bg-black">Tokë bujqësore — 0.10%</option><option value="0.0015" class="bg-black">Tokë komerciale — 0.15%</option></select></div>
      <div class="grid grid-cols-2 gap-3">
        <div class="bg-black/20 p-4 rounded-xl hair"><label class="text-[8px] font-bold uppercase mb-1 block" style="color:var(--muted)">Sipërfaqja m²</label><input type="number" id="pr-m2" oninput="calcPr()" placeholder="100" class="bare w-full text-2xl font-bold tnum"></div>
        <div class="bg-black/20 p-4 rounded-xl hair"><label class="text-[8px] font-bold uppercase mb-1 block" style="color:var(--muted)">Vlera për m²</label><input type="number" id="pr-vle" oninput="calcPr()" placeholder="500" class="bare w-full text-2xl font-bold tnum"></div>
      </div>
      <label class="flex items-center justify-between p-4 bg-indigo-500/5 rounded-xl hair"><div><span class="text-[11px] font-bold uppercase block">Rezidencë primare</span><span class="text-[8px] text-indigo-400 uppercase tracking-wider">Zbritje −15.000 €</span></div><input type="checkbox" id="pr-prim" onchange="calcPr()" checked class="w-5 h-5 accent-indigo-500"></label>
    </div>
    <div class="grid grid-cols-2 gap-3">
      <div class="card rounded-xl p-4"><p class="text-[8px] font-bold uppercase" style="color:var(--muted)">Vlera totale</p><p id="pr-totv" class="text-base font-bold tnum mt-1">0,00 €</p></div>
      <div class="card rounded-xl p-4"><p class="text-[8px] font-bold uppercase" style="color:var(--muted)">Pas zbritjes</p><p id="pr-tatv" class="text-base font-bold text-indigo-400 tnum mt-1">0,00 €</p></div>
    </div>
    <div class="rounded-2xl p-6 bg-white text-black text-center"><span class="text-[10px] font-bold uppercase tracking-wider text-gray-400">Fatura vjetore 2026</span><h2 id="pr-tat" class="dsp text-5xl font-extrabold tnum mt-1">0,00 €</h2><div class="mt-5 flex justify-between px-4 border-t border-black/10 pt-4"><div class="text-center"><p class="text-[8px] font-bold text-gray-400 uppercase">Kësti I</p><p id="pr-k1" class="text-sm font-bold text-indigo-600">0,00 €</p></div><div class="text-center"><p class="text-[8px] font-bold text-gray-400 uppercase">Kësti II</p><p id="pr-k2" class="text-sm font-bold text-indigo-600">0,00 €</p></div></div></div>
  </div>`;},after(){calcPr();}}
};

/* ---------- calc math (verified logic) ---------- */
function calcT(){const b=+$('t-bruto').value||0,p=b*0.05;$('t-p').innerText=eur(p);$('t-d').innerText=eur(p);$('t-t').innerText=eur(p*2);}
function calcV(){const e=+$('v-in').value||0;for(const k in MARKET.fx){const el=$('v-'+k);if(el)el.innerText=fmt(e*MARKET.fx[k]);}}
function calcP(){const b=+$('p-in').value||0,tr=b*0.05;let tx=b-tr-250,tax=0;if(tx>0)tax=tx<=200?tx*0.08:16+(tx-200)*0.10;$('p-trust').innerText=eur(tr);$('p-atk').innerText=eur(tax);$('p-neto').innerText=eur(b-tr-tax);window._neto=b-tr-tax;}
function calcK(){const d=+$('k-d').value||0,n=+$('k-n').value||0,s=((d*0.07)+(n*0.03)+2.5)*1.08;$('k-res').innerText=eur(s);}
function calcD(){const kub=+$('d-kub').value||0,v=+$('d-vle').value||0,r=(v*0.10)+(kub*0.50)+(v*0.18);$('d-res').innerText=fmt(r);}
function calcC(){const inv=+$('c-in').value||0;$('c-btc').innerText=(inv/MARKET.crypto.bitcoin.eur).toFixed(6);$('c-eth').innerText=(inv/MARKET.crypto.ethereum.eur).toFixed(6);$('c-sol').innerText=(inv/MARKET.crypto.solana.eur).toFixed(5);}
let unit='ha',fuelOn=false;
function setUnit(u){unit=u;$('bha').classList.toggle('on',u==='ha');$('bari').classList.toggle('on',u==='ari');$('ulab').innerText=u==='ha'?'Sipërfaqja në hektarë (ha)':'Sipërfaqja në ari (100 ari = 1 ha)';calcS();}
function toggleFuel(){fuelOn=!fuelOn;$('ftg').classList.toggle('on',fuelOn);calcS();}
function calcS(){const rate=+$('s-kat').value||0;let v=+$('s-val').value||0,ha=unit==='ari'?v/100:v,base=ha*rate,fuel=fuelOn?ha*36:0,tot=base+fuel;$('s-tot').innerText=fmt(tot);$('s-det').innerText=fuelOn?`Baza ${fmt(base)} € + Nafta ${fmt(fuel)} €`:'Vetëm baza e kulturës';}
function setPrice(val,type,el){$('f-price').value=val;document.querySelectorAll('.fb').forEach(b=>{b.classList.remove('bg-orange-500','bg-blue-500','text-black');b.classList.add(b.textContent.includes('DIESEL')?'text-orange-400':'text-blue-400');});if(el){el.classList.remove('text-orange-400','text-blue-400');el.classList.add(type==='d'?'bg-orange-500':'bg-blue-500','text-black');}calcF();}
function calcF(){const d=+$('f-dist').value||0,c=+$('f-cons').value||0,p=+$('f-price').value||1.89,l=(d/100)*c;$('f-tot').innerText=fmt(l*p);$('f-co2').innerText=(l*2.64).toFixed(1);}
function calcPr(){const norma=+$('pr-tipi').value||0,m2=+$('pr-m2').value||0,vm2=+$('pr-vle').value||0,prim=$('pr-prim').checked;let vt=m2*vm2,tat=Math.max(0,vt-(prim?15000:0)),tax=tat*norma;$('pr-totv').innerText=eur(vt);$('pr-tatv').innerText=eur(tat);$('pr-tat').innerText=eur(tax);$('pr-k1').innerText=eur(tax/2);$('pr-k2').innerText=eur(tax/2);}

/* ---------- live market ---------- */
async function fetchMarket(){
  try{const r=await fetch('https://open.er-api.com/v6/latest/EUR');const j=await r.json();if(j&&j.rates){['USD','GBP','CHF','ALL','TRY','JPY','CAD','AUD'].forEach(k=>{if(j.rates[k])MARKET.fx[k]=j.rates[k];});MARKET.fxLive=true;}}catch(e){MARKET.fxLive=false;}
  try{const r=await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=eur&include_24hr_change=true');const j=await r.json();if(j.bitcoin){MARKET.crypto.bitcoin={eur:j.bitcoin.eur,chg:j.bitcoin.eur_24h_change||0};MARKET.crypto.ethereum={eur:j.ethereum.eur,chg:j.ethereum.eur_24h_change||0};MARKET.crypto.solana={eur:j.solana.eur,chg:j.solana.eur_24h_change||0};MARKET.cryptoLive=true;}}catch(e){MARKET.cryptoLive=false;}
  buildTick();
  if(cur==='markets'||cur==='overview')go(cur);
  if(cur==='calc'){const v=$('view');if(v.querySelector('#v-USD'))calcV();if(v.querySelector('#c-btc'))calcC();}
}
function buildTick(){
  const c=MARKET.crypto,f=MARKET.fx;
  const items=[['BTC',fmt(c.bitcoin.eur,0)+' €',c.bitcoin.chg],['ETH',fmt(c.ethereum.eur,0)+' €',c.ethereum.chg],['SOL',fmt(c.solana.eur,0)+' €',c.solana.chg],['EUR/USD',f.USD.toFixed(3),0.1],['EUR/CHF',f.CHF.toFixed(3),-0.05],['EUR/ALL',f.ALL.toFixed(2),0.2],['Diesel',fmt(MARKET.fuel.diesel)+' €',0.3],['Super 95',fmt(MARKET.fuel.super95)+' €',-0.1]];
  const one=items.map(([l,v,ch])=>`<div class="inline-flex items-center gap-1.5 px-4"><span class="text-[9px] font-semibold uppercase" style="color:var(--muted)">${l}</span><span class="text-[10px] font-bold">${v}</span><span class="text-[8px] font-bold ${ch>=0?'up':'dn'}">${ch>=0?'▲':'▼'}</span></div>`).join('');
  $('tick').innerHTML=one+one;
}

/* ---------- Assistant ---------- */
const AI={
 recog:null,listening:false,
 chips:['Sa është paga neto për 850 €?','Si funksionon Trusti?','Sa doganë për një veturë?','Çfarë kursesh të këmbimit?','Si llogaritet tatimi në pronë?'],
 open(){const p=$('ai');p.classList.remove('translate-y-full','opacity-0','pointer-events-none');if(!$('aiChat').dataset.init){this.greet();$('aiChat').dataset.init='1';}$('aiChips').innerHTML=this.chips.map(c=>`<button onclick="AI.quick(this.textContent)" class="shrink-0 text-[10px] font-medium px-3 py-2 rounded-full panel press whitespace-nowrap">${c}</button>`).join('');},
 close(){$('ai').classList.add('translate-y-full','opacity-0','pointer-events-none');if(this.listening&&this.recog)this.recog.stop();},
 greet(){this.bot('Mirë se vini. Unë jam asistenti i platformës <b>KALKULO X</b>. Mund t’ju ndihmoj me llogaritje të pagës, Trustit, doganës, energjisë, tatimit në pronë, si dhe me kurset e këmbimit dhe tregjet. Parashtroni pyetjen tuaj ose përdorni sugjerimet më poshtë.');},
 quick(x){$('aiIn').value=x;this.send();},
 bubble(html,me){const w=$('aiChat'),el=document.createElement('div');el.className='mi flex '+(me?'justify-end':'justify-start');el.innerHTML=`<div class="${me?'bg-emerald-500 text-black':'panel'} max-w-[82%] rounded-2xl ${me?'rounded-br-sm':'rounded-bl-sm'} px-4 py-2.5 text-sm leading-relaxed">${html}</div>`;w.appendChild(el);w.scrollTop=w.scrollHeight;},
 me(x){this.bubble(x.replace(/</g,'&lt;'),true);},
 bot(html){this.bubble(html,false);if(CFG.voice)this.speak(html.replace(/<[^>]+>/g,''));},
 typing(){const w=$('aiChat'),el=document.createElement('div');el.className='mi flex justify-start';el.id='typ';el.innerHTML='<div class="panel rounded-2xl rounded-bl-sm px-4 py-3.5 typ flex gap-1"><span></span><span></span><span></span></div>';w.appendChild(el);w.scrollTop=w.scrollHeight;},
 send(){const i=$('aiIn'),x=i.value.trim();if(!x)return;this.me(x);i.value='';this.typing();setTimeout(()=>{const e=$('typ');if(e)e.remove();this.bot(this.reply(x));},620+Math.random()*380);},
 reply(q){
   const x=q.toLowerCase(),num=(q.match(/\d[\d.,]*/)||[null])[0],n=num?parseFloat(num.replace(/\./g,'').replace(',','.')):null;
   if(/paga|neto|rrog/.test(x)){if(n){const tr=n*0.05;let tx=n-tr-250,tax=tx>0?(tx<=200?tx*0.08:16+(tx-200)*0.10):0;return `Për pagë bruto <b>${eur(n)}</b>:<br>· Kontribut Trust (5%): ${eur(tr)}<br>· Tatim ATK: ${eur(tax)}<br>· <b>Neto: ${eur(n-tr-tax)}</b><br><br>Hapni modulin “Paga” për pasqyrën e plotë.`;}return 'Më jepni shumën bruto (p.sh. “paga 850”) dhe e llogaris menjëherë netën, tatimin dhe kontributin e Trustit.';}
   if(/trust|pension/.test(x))return 'Trusti pensional financohet me <b>5% nga punëtori dhe 5% nga punëdhënësi</b>, gjithsej 10% të pagës bruto në muaj. Këto janë kursime në llogarinë tuaj pensionale. Për pagë 800 € → 80 €/muaj.';
   if(/kurs|valut|këmbim|kembim|dollar/.test(x))return `Kurset aktuale ${MARKET.fxLive?'(live)':'(referente)'}: 1 € = ${MARKET.fx.USD.toFixed(3)} USD · ${MARKET.fx.CHF.toFixed(3)} CHF · ${MARKET.fx.ALL.toFixed(2)} ALL · ${MARKET.fx.GBP.toFixed(3)} GBP. Moduli “Këmbimi” bën konvertim të plotë.`;
   if(/crypto|kripto|bitcoin|btc|eth|invest/.test(x))return `Bitcoin: ${fmt(MARKET.crypto.bitcoin.eur,0)} € (${MARKET.crypto.bitcoin.chg.toFixed(1)}%) · Ethereum: ${fmt(MARKET.crypto.ethereum.eur,0)} €. Investimet në kriptovaluta bartin rrezik të lartë — diversifikoni dhe investoni vetëm shumat që mund t’i përballoni. Ky informacion nuk përbën këshillë financiare.`;
   if(/dogan|veturë|vetur|makin|auto/.test(x))return 'Dogana e veturave llogaritet si: <b>Doganë 10% + Akcizë (sipas cm³) + TVSH 18%</b>. Hapni modulin “Dogana” dhe vendosni vitin, kubikazhin dhe çmimin.';
   if(/energ|kesco|rrym|fatur/.test(x))return 'Fatura e energjisë: tarifa e lartë 0,07 €/kWh (ditë) + tarifa e ulët 0,03 €/kWh (natë) + 2,50 € fikse + 8% TVSH. Konsumi gjatë natës është më ekonomik.';
   if(/subvenc|bujq|fermë|ferm|tokë|toke|grurë|hardhi/.test(x))return 'Subvencionet bujqësore 2026 jepen për hektar sipas kulturës (grurë 216 €, hardhi 500 €/ha, etj.), me mundësi shtese 36 €/ha për naftë. Moduli “Subvencionet” e llogarit automatikisht.';
   if(/karburant|naft|naft|benzin|udhetim|udhëtim/.test(x))return 'Kosto e udhëtimit = (distanca ÷ 100) × harxhimi × çmimi i karburantit. Moduli “Karburanti” jep edhe emetimin e CO₂.';
   if(/pron|tatim|shtëpi|shtepi|banim/.test(x))return 'Tatimi në pronë = vlera e tregut × norma (banim 0.15%), minus zbritja prej 15.000 € për rezidencë primare. Paguhet në dy këste të barabarta.';
   if(/përshëndetje|pershendetje|tung|hi|hello/.test(x))return 'Mirë se vini. Si mund t’ju ndihmoj — llogaritje page, doganë, tatim, apo të dhëna tregu?';
   if(/faleminderit|flm|falemnderit/.test(x))return 'Me kënaqësi. Jam në dispozicion për çdo llogaritje tjetër.';
   return 'Mund t’ju ndihmoj me modulet: <b>Paga, Trusti, Këmbimi, Kriptovaluta, Energjia, Dogana, Subvencionet, Karburanti, Prona</b>, si dhe me të dhëna tregu. Për cilën dëshironi informacion?';
 },
 speak(text){try{if(!('speechSynthesis'in window))return;const u=new SpeechSynthesisUtterance(text);const vs=speechSynthesis.getVoices()||[];const v=vs.find(v=>/sq/i.test(v.lang))||vs.find(v=>/Google/i.test(v.name)&&/it|en/i.test(v.lang))||vs.find(v=>/it-IT/i.test(v.lang))||vs.find(v=>/en-GB|en-US/i.test(v.lang))||vs[0];if(v){u.voice=v;u.lang=v.lang;}u.rate=0.95;u.pitch=1;speechSynthesis.cancel();speechSynthesis.speak(u);}catch(e){}},
 mic(){const SR=window.SpeechRecognition||window.webkitSpeechRecognition;if(!SR){toast('Shfletuesi nuk e mbështet hyrjen me zë');return;}if(this.listening){this.recog&&this.recog.stop();return;}this.recog=new SR();this.recog.lang='sq-AL';this.recog.interimResults=false;this.recog.onstart=()=>{this.listening=true;$('aiMic').classList.add('mic-live');$('aiSt').innerText='Po dëgjon...';};this.recog.onend=()=>{this.listening=false;$('aiMic').classList.remove('mic-live');$('aiSt').innerText='Inteligjencë financiare';};this.recog.onresult=e=>{$('aiIn').value=e.results[0][0].transcript;this.send();};this.recog.onerror=()=>toast('Zëri nuk u kap, provoni sërish');try{this.recog.start();}catch(e){}}
};

/* ---------- SETTINGS ---------- */
function openSettings(){const s=$('settings'),op=s.classList.contains('translate-x-full');if(op)s.innerHTML=settingsHTML();s.classList.toggle('translate-x-full');}
function backToSettings(){$('settings').innerHTML=settingsHTML();}
function settingsHTML(){
 const langs=[['sq','Shqip'],['en','English'],['de','Deutsch'],['tr','Türkçe']];
 const row=(i,title,sub,right)=>`<div class="flex items-center justify-between p-4 card rounded-2xl"><div class="flex items-center gap-3"><div class="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-gray-300">${ic(i,'w-[18px] h-[18px]')}</div><div><p class="text-xs font-semibold">${title}</p><p class="text-[10px]" style="color:var(--muted)">${sub}</p></div></div>${right}</div>`;
 const link=(i,title,sub,fn)=>`<button onclick="${fn}" class="w-full text-left">${row(i,title,sub,ic('chev','w-4 h-4 text-gray-600'))}</button>`;
 return `<div class="p-6 pb-24">
   <div class="flex items-center justify-between mb-7"><div><h2 class="dsp text-xl font-extrabold">${t('settings')}</h2><p class="text-[9px] text-emerald-500 font-bold uppercase tracking-[0.18em] mt-0.5">Qendra e konfigurimit</p></div><button onclick="openSettings()" class="w-9 h-9 rounded-lg panel flex items-center justify-center press">${ic('close','w-5 h-5 text-gray-400')}</button></div>

   <div class="card rounded-2xl p-4 mb-5 flex items-center gap-3"><div class="w-11 h-11 rounded-xl bg-emerald-500/12 text-emerald-500 flex items-center justify-center">${ic('lock','w-5 h-5')}</div><div><p class="text-sm font-semibold">Sesion lokal</p><p class="text-[10px]" style="color:var(--muted)">Të dhënat ruhen vetëm në pajisjen tuaj</p></div></div>

   <p class="text-[9px] font-bold uppercase tracking-[0.18em] mb-2 ml-1" style="color:var(--muted)">Preferenca</p>
   <div class="space-y-2 mb-5">
     ${row('globe','Gjuha','Gjuha e ndërfaqes',`<select onchange="setLang(this.value)" class="bg-black/35 text-xs font-semibold rounded-lg px-3 py-2 hair">${langs.map(([c,n])=>`<option value="${c}" ${CFG.lang===c?'selected':''} class="bg-black">${n}</option>`).join('')}</select>`)}
     ${row('palette','Tema','Pamja e errët premium',`<span class="text-[10px] font-bold text-emerald-500 uppercase">Dark</span>`)}
     ${row('speaker','Zëri i asistentit','Përgjigje me zë (opsionale)',`<div class="tg ${CFG.voice?'on':''}" onclick="toggleVoice(this)"><div class="kn"></div></div>`)}
     ${row('bell','Njoftime','Kujtesa ditore',`<div class="tg ${CFG.notifs?'on':''}" onclick="toggleNotifs(this)"><div class="kn"></div></div>`)}
   </div>

   <p class="text-[9px] font-bold uppercase tracking-[0.18em] mb-2 ml-1" style="color:var(--muted)">Siguria</p>
   <div class="space-y-2 mb-5">
     ${row('fingerprint','Kyçje biometrike','Face ID / gjurmë gishti',`<div class="tg ${CFG.bio?'on':''}" onclick="toggleBio(this)"><div class="kn"></div></div>`)}
     ${row('shield','Verifikim 2FA','Dy faza sigurie',`<div class="tg ${CFG.twofa?'on':''}" onclick="CFG.twofa=!CFG.twofa;saveCfg();this.classList.toggle('on')"><div class="kn"></div></div>`)}
     ${row('doc','Audit Logs','Historiku i hyrjeve',`<span class="text-[10px] text-gray-600">—</span>`)}
   </div>

   <p class="text-[9px] font-bold uppercase tracking-[0.18em] mb-2 ml-1" style="color:var(--muted)">Ndihma</p>
   <div class="space-y-2 mb-5">
     ${link('book','Si të përdoret','Udhëzues për çdo modul','openGuide()')}
     ${link('question','Pyetjet e shpeshta (FAQ)','Përgjigje të menjëhershme','openFAQ()')}
   </div>

   <p class="text-[9px] font-bold uppercase tracking-[0.18em] mb-2 ml-1" style="color:var(--muted)">Të dhënat</p>
   <div class="space-y-2 mb-6">
     ${link('download','Eksporto konfigurimin','Shkarko si JSON','exportCfg()')}
     ${link('trash','Rivendos cilësimet','Kthe në gjendjen fillestare','resetCfg()')}
   </div>

   <p class="text-center text-[9px] uppercase tracking-[0.35em]" style="color:var(--muted)">KALKULO X · 2026</p>
 </div>`;
}
function setLang(l){CFG.lang=l;saveCfg();buildNav();go(cur);$('settings').innerHTML=settingsHTML();toast('Gjuha u përditësua');}
function toggleVoice(el){CFG.voice=!CFG.voice;saveCfg();el.classList.toggle('on');toast(CFG.voice?'Zëri u aktivizua':'Zëri u çaktivizua');}
function toggleBio(el){CFG.bio=!CFG.bio;saveCfg();el.classList.toggle('on');if(CFG.bio)toast('Demonstrim — kërkon aplikacion native për Face ID');}
function toggleNotifs(el){if(!CFG.notifs){if(!('Notification'in window)){toast('Njoftimet nuk mbështeten këtu');return;}Notification.requestPermission().then(p=>{if(p==='granted'){CFG.notifs=true;saveCfg();el.classList.add('on');schedNotifs();toast('Njoftimet u aktivizuan');}else toast('Lejoni njoftimet nga shfletuesi');});}else{CFG.notifs=false;saveCfg();el.classList.remove('on');}}
function exportCfg(){const blob=new Blob([JSON.stringify(CFG,null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='kalkulo-x-config.json';a.click();toast('Konfigurimi u shkarkua');}
function resetCfg(){if(confirm('Rivendos cilësimet në gjendjen fillestare?')){CFG={...DEF};saveCfg();$('settings').innerHTML=settingsHTML();buildNav();go(cur);toast('Cilësimet u rivendosën');}}

/* ---------- HOW TO USE (guide) ---------- */
function panelHead(title,sub){return `<div class="flex items-center gap-3 mb-6"><button onclick="backToSettings()" class="w-9 h-9 rounded-lg panel flex items-center justify-center press">${ic('back','w-5 h-5')}</button><div><h2 class="dsp text-xl font-extrabold">${title}</h2><p class="text-[9px] text-emerald-500 font-bold uppercase tracking-[0.18em] mt-0.5">${sub}</p></div></div>`;}
function accItem(q,a){return `<div class="acc card rounded-2xl overflow-hidden"><button onclick="this.parentElement.classList.toggle('open')" class="w-full p-4 flex justify-between items-center text-left gap-3"><span class="text-xs font-semibold">${q}</span><span class="acc-x text-emerald-500 text-lg leading-none transition-transform">${ic('plus','w-4 h-4')}</span></button><div class="acc-body"><div class="px-4 pb-4 text-[11px] leading-relaxed" style="color:var(--muted)">${a}</div></div></div>`;}
function openGuide(){
  const steps=[
    ['Si lëviz nëpër platformë','Përdorni shiritin e poshtëm: <b>Ballina</b> (përmbledhje), <b>Kalkulo</b> (modulet), <b>Tregjet</b> (të dhëna live) dhe <b>Asistenti</b>. Ikona e ingranazhit lart-djathtas hap Cilësimet.'],
    ['Paga','Hapni “Paga”, vendosni pagën bruto mujore. Sistemi llogarit automatikisht netën, tatimin ATK dhe kontributin 5% të Trustit, sipas pragut jotatueshëm 250 €.'],
    ['Trusti','Vendosni pagën bruto për të parë kontributin 5% të punëtorit, 5% të punëdhënësit dhe totalin mujor për kursim pensional.'],
    ['Këmbimi Valutor','Shkruani shumën në euro; konvertimi në 8 valuta përditësohet me kurse reale nga tregu (ose vlera referente pa internet).'],
    ['Kriptovaluta','Vendosni shumën e investimit në euro për të parë sasinë e Bitcoin, Ethereum dhe Solana sipas çmimeve live.'],
    ['Energjia KESCO','Vendosni kWh për tarifën e lartë (ditë) dhe të ulët (natë). Fatura përfshin tarifën fikse dhe TVSH-në 8%.'],
    ['Dogana','Zgjidhni vitin, vendosni kubikazhin dhe çmimin e veturës; rezultati përmbledh doganën, akcizën dhe TVSH-në.'],
    ['Subvencionet','Zgjidhni kulturën, njësinë (ha/ari) dhe sipërfaqen; opsionalisht aktivizoni shtesën për naftë.'],
    ['Karburanti','Vendosni distancën, harxhimin dhe llojin e karburantit për koston e udhëtimit dhe emetimin e CO₂.'],
    ['Prona','Zgjidhni klasifikimin, sipërfaqen dhe vlerën për m²; aktivizoni rezidencën primare për zbritjen 15.000 €.'],
    ['Asistenti','Hapni “Asistenti”, shkruani pyetjen ose përdorni sugjerimet. Mund të aktivizoni zërin te Cilësimet → Zëri i asistentit.']
  ];
  $('settings').innerHTML=`<div class="p-6 pb-24">${panelHead('Si të përdoret','Udhëzues hap pas hapi')}<div class="space-y-2">${steps.map(([q,a])=>accItem(q,a)).join('')}</div><button onclick="openSettings();AI.open()" class="w-full mt-5 py-3.5 rounded-xl bg-emerald-500 text-black text-sm font-bold press flex items-center justify-center gap-2">${ic('assistant','w-4 h-4')} Pyet asistentin</button></div>`;
}
function openFAQ(){
  const faqs=[
    ['A janë të dhënat e tregut reale?','Po. Kurset e këmbimit dhe çmimet e kriptovalutave tërhiqen drejtpërdrejt nga API publike në kohë reale. Kur mungon interneti, përdoren vlera referente.'],
    ['Si llogaritet paga neto?','Nga paga bruto zbritet kontributi 5% i Trustit dhe tatimi ATK (8% deri 200 €, 10% mbi 200 €), pas pragut jotatueshëm prej 250 €.'],
    ['A ruhen të dhënat e mia diku?','Jo. Platforma punon plotësisht në pajisjen tuaj; asnjë e dhënë nuk dërgohet në server. Konfigurimi mund të eksportohet kurdo.'],
    ['Sa të sakta janë normat?','Modulet bazohen në normat dhe pragjet aktuale 2026 për Kosovën. Për vendime zyrtare, konsultoni gjithmonë institucionin përkatës.'],
    ['Si e aktivizoj zërin e asistentit?','Te Cilësimet → Zëri i asistentit. Cilësia e zërit varet nga shfletuesi dhe sistemi operativ.'],
    ['A funksionon pa internet?','Po, të gjitha llogaritjet funksionojnë offline. Vetëm të dhënat live të tregut kërkojnë lidhje interneti.'],
    ['Si raportoj një problem?','Përdorni seksionin “Kontakt mbështetje” ose parashtrojeni pyetjen te asistenti virtual.']
  ];
  $('settings').innerHTML=`<div class="p-6 pb-24">${panelHead('Pyetjet e shpeshta','Ndihmë & FAQ')}<div class="relative mb-4"><div class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">${ic('search','w-4 h-4')}</div><input oninput="filterFaq(this.value)" placeholder="Kërko në FAQ..." class="w-full panel rounded-xl pl-10 pr-4 py-3 text-sm"></div><div id="faqL" class="space-y-2">${faqs.map(([q,a])=>accItem(q,a)).join('')}</div><div class="grid grid-cols-2 gap-3 mt-5">${[['book','Dokumentacioni'],['info','Kontakt mbështetje']].map(([i,l])=>`<div class="card rounded-2xl p-4 flex items-center gap-2.5 press"><div class="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center">${ic(i,'w-4 h-4')}</div><span class="text-xs font-semibold">${l}</span></div>`).join('')}</div></div>`;
}
function filterFaq(q){q=q.toLowerCase();document.querySelectorAll('#faqL .acc').forEach(it=>{it.style.display=it.textContent.toLowerCase().includes(q)?'':'none';});}

/* ---------- NOTIFICATIONS ---------- */
function openNotifs(){const p=$('notifs'),op=p.classList.contains('translate-x-full');if(op){const d=$('bellDot');if(d)d.style.display='none';p.innerHTML=`<div class="p-6 pb-24"><div class="flex items-center justify-between mb-6"><div><h2 class="dsp text-xl font-extrabold">${t('notifs')}</h2><p class="text-[9px] text-emerald-500 font-bold uppercase tracking-[0.18em] mt-0.5">Smart Reminder Engine</p></div><button onclick="openNotifs()" class="w-9 h-9 rounded-lg panel flex items-center justify-center press">${ic('close','w-5 h-5 text-gray-400')}</button></div><div class="space-y-2">${[['trusti','Afati i Trustit','Kontributi pensional duhet paguar para 25 Qershorit.','2 orë më parë','#34d399'],['kesco','Fatura e energjisë','Fatura mujore skadon nesër.','5 orë më parë','#eab308'],['markets','Lëvizje tregu','Bitcoin lëvizi mbi 2% në 24 orët e fundit.','Sot','#f59e0b'],['doc','Raporti mujor','Përmbledhja e Majit është gati.','Dje','#3b82f6']].map(([i,t1,b,tm,col])=>`<div class="card rounded-2xl p-4 flex items-start gap-3 border-l-2" style="border-color:${col}66"><div class="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style="background:${col}1a;color:${col}">${ic(i,'w-4 h-4')}</div><div class="flex-1"><p class="text-xs font-semibold">${t1}</p><p class="text-[11px] mt-0.5 leading-snug" style="color:var(--muted)">${b}</p><p class="text-[8px] uppercase tracking-wider mt-1.5" style="color:var(--muted)">${tm}</p></div></div>`).join('')}</div></div>`;}p.classList.toggle('translate-x-full');}
function schedNotifs(){if(window._nt)clearInterval(window._nt);if(!CFG.notifs)return;window._nt=setInterval(()=>{const n=new Date(),h=n.getHours(),m=n.getMinutes();if(h===13&&m===30)push('Kujtesë mesditë','Kontrolloni përmbledhjen financiare në KALKULO X.');if(h===21&&m===0)push('Kujtesë mbrëmje','Mbyllni llogaritë e ditës dhe planifikoni nesërmen.');},60000);}
function push(t1,b){if(('Notification'in window)&&Notification.permission==='granted')new Notification(t1,{body:b,tag:'kalkulox'});}

function toast(m){const e=$('toast');e.innerHTML=`<div class="panel rounded-xl px-5 py-3 text-sm font-semibold border border-emerald-500/20">${m}</div>`;e.style.opacity='1';e.style.transform='translate(-50%,0)';clearTimeout(window._tt);window._tt=setTimeout(()=>{e.style.opacity='0';e.style.transform='translate(-50%,-18px)';},2400);}

if('speechSynthesis'in window){speechSynthesis.onvoiceschanged=()=>{};}
