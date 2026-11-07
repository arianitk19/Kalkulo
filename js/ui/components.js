/** Komponentë HTML të ripërdorshëm për modulet. */
import { icon } from '../core/icons.js';
import { esc } from '../core/dom.js';

export const label = (text, color = 'var(--muted)') =>
  `<span class="block text-[10px] font-bold uppercase tracking-wider mb-2" style="color:${color}">${text}</span>`;

/** Fushë numerike e madhe (hero input). */
export function bigInput({ name, label: l, prefix = '€', suffix = '', placeholder = '0', color, center = false, size = 'text-5xl' }) {
  return `<label class="card rounded-2xl p-5 block ${center ? 'text-center' : ''}">
    ${label(l, color)}
    <div class="flex items-center ${center ? 'justify-center' : ''} gap-2">
      ${prefix ? `<span class="text-3xl" style="color:var(--muted)">${prefix}</span>` : ''}
      <input name="${name}" type="number" inputmode="decimal" min="0" step="any" placeholder="${placeholder}"
        class="bare min-w-0 ${center ? 'w-48 text-center' : 'w-full'} ${size} font-bold tnum" autocomplete="off">
      ${suffix ? `<span class="font-bold" style="color:var(--muted)">${suffix}</span>` : ''}
    </div>
  </label>`;
}

/** Fushë numerike kompakte. */
export function input({ name, label: l, placeholder = '0', color, suffix = '' }) {
  return `<label class="card rounded-2xl p-4 block">
    ${label(l, color)}
    <div class="flex items-end gap-2">
      <input name="${name}" type="number" inputmode="decimal" min="0" step="any" placeholder="${placeholder}" class="bare w-full min-w-0 text-2xl font-bold tnum" autocomplete="off">
      ${suffix ? `<span class="text-xs font-bold mb-1" style="color:var(--muted)">${suffix}</span>` : ''}
    </div>
  </label>`;
}

export function select({ name, label: l, options, color }) {
  return `<label class="card rounded-2xl p-4 block">
    ${label(l, color)}
    <div class="relative">
      <select name="${name}" class="field w-full appearance-none rounded-xl p-3.5 pr-10 text-[15px] font-semibold">
        ${options.map((o) => `<option value="${esc(o.value)}">${esc(o.label)}</option>`).join('')}
      </select>
      <span class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 rotate-90" style="color:var(--muted)">${icon('chev', 'w-4 h-4')}</span>
    </div>
  </label>`;
}

/** Segmented control me radio — i aksesueshëm nga tastiera. */
export function segmented({ name, options, value }) {
  return `<div class="seg" role="radiogroup">
    ${options.map((o) => `<label class="seg-i"><input type="radio" name="${name}" value="${esc(o.value)}" ${o.value === value ? 'checked' : ''}><span>${o.label}</span></label>`).join('')}
  </div>`;
}

export function toggle({ name, title, sub, color = 'var(--accent)' }) {
  return `<label class="card rounded-2xl p-4 flex items-center justify-between gap-3 cursor-pointer press">
    <span><span class="block text-[11px] font-bold uppercase">${title}</span><span class="block text-[9px] uppercase tracking-wider mt-0.5" style="color:${color}">${sub}</span></span>
    <input type="checkbox" name="${name}" class="switch">
  </label>`;
}

/** Kartë rezultati kryesor. */
export function hero({ out, title, gradient, dark = false, extra = '' }) {
  return `<div class="relative rounded-3xl p-6 overflow-hidden ${gradient}">
    <div class="absolute -right-8 -bottom-8 w-32 h-32 rounded-full ${dark ? 'bg-black/10' : 'bg-white/10'}"></div>
    <span class="relative text-[10px] font-bold uppercase tracking-wider ${dark ? 'text-black/60' : 'text-white/70'}">${title}</span>
    <p class="relative dsp text-[2.6rem] leading-tight font-extrabold tnum mt-1 break-all ${dark ? 'text-black' : 'text-white'}" data-out="${out}" aria-live="polite">0,00 €</p>
    ${extra}
  </div>`;
}

export function stat({ out, title, color = 'rgba(255,255,255,.12)', compact = false }) {
  return `<div class="card rounded-2xl ${compact ? 'p-3' : 'p-4'} border-b-2 min-w-0" style="border-bottom-color:${color}">
    <span class="text-[9px] uppercase font-bold" style="color:var(--muted)">${title}</span>
    <p class="${compact ? 'text-sm' : 'text-lg'} font-bold tnum mt-1 truncate" data-out="${out}">0,00 €</p>
  </div>`;
}

/** Shirit i ndarjes (p.sh. neto / tatim / trust). */
export function breakdown(parts) {
  return `<div class="card rounded-2xl p-4">
    <div class="flex h-2.5 rounded-full overflow-hidden bg-white/5">
      ${parts.map((p) => `<div data-bar="${p.key}" class="h-full transition-[width] duration-500" style="width:0;background:${p.color}"></div>`).join('')}
    </div>
    <div class="flex flex-wrap gap-x-4 gap-y-1 mt-3">
      ${parts.map((p) => `<span class="flex items-center gap-1.5 text-[10px]" style="color:var(--muted)"><i class="w-2 h-2 rounded-full" style="background:${p.color}"></i>${p.label}</span>`).join('')}
    </div>
  </div>`;
}

export const note = (text) => `<p class="text-[10px] text-center leading-relaxed px-2" style="color:var(--muted)">${text}</p>`;
