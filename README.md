# KALKULO X

Platformë financiare për Kosovën — PWA statike, pa server dhe pa llogari.

**Modulet:** Paga (bruto ⇄ neto) · Trusti · Këmbimi valutor · Kriptovalutat · Energjia (KESCO) · Dogana e veturave · Subvencionet bujqësore · Karburanti · Tatimi në pronë · Asistenti.

## Veçoritë
- Header dhe menu fikse: menu lundruese poshtë në telefon (fshihet kur hapet tastiera), navigim lart në tablet/desktop
- Router me hash (`#/calc/paga`) — butoni “mbrapa” dhe linket e drejtpërdrejta punojnë
- Historik llogaritjesh, ruajtje automatike e vlerave, ndarje e rezultatit
- Kurse dhe kripto live (me cache offline), ticker me ndryshimet reale 24h
- Instalohet si aplikacion dhe punon offline (service worker)
- Të gjitha normat ligjore në një vend: `js/core/finance.js → RATES`

## Struktura
```
index.html               skeleti i aplikacionit
css/app.css              burimi i stileve (Tailwind v4 + stile vetjake)
css/styles.css           CSS i kompiluar (mos e edito me dorë)
js/main.js               router, eventet, tregu, PWA
js/views.js              Ballina, Modulet, Tregjet, faqja e modulit
js/panels.js             Cilësimet, Historiku, Udhëzuesi, FAQ
js/assistant.js          asistenti (përgjigje lokale)
js/core/finance.js       logjika financiare (funksione të pastra)
js/core/market.js        kurset & kripto
js/core/store.js         localStorage (cilësimet, historiku)
js/calculators/*.js      një skedar për çdo modul
js/ui/components.js      komponentët e formave
tests/                   teste me node:test
sw.js, manifest.webmanifest, assets/
```

## Zhvillimi
```bash
npm install          # vetëm për Tailwind
npm run dev          # http://localhost:5173
npm run watch:css    # rikompilon CSS kur ndryshon klasat
npm test             # 16 teste
```
Pas ndryshimit të klasave Tailwind: `npm run build:css`. Pas çdo publikimi ndrysho `VERSION` te `sw.js`.

### Shtimi i një moduli
1. Krijo `js/calculators/emri.js` me `{ id, title, desc, color, icon, defaults, render(), compute(values) }`.
2. Shtoje te `js/calculators/index.js` dhe te lista `SHELL` në `sw.js`.

## Publikimi
Projekti është statik — mjafton të ngarkohet në Vercel, Netlify ose GitHub Pages (pa build step, `css/styles.css` është i përfshirë).

> Normat janë orientuese (akciza e veturave, tarifat e energjisë). Për vendime zyrtare konsultoni ATK, Doganën ose KESCO.
