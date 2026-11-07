/* Teste për asistentin dhe modulet (pa shfletues). */
import { test } from 'node:test';
import assert from 'node:assert/strict';

// Mjedis minimal për modulet që prekin localStorage
const mem = {};
globalThis.localStorage = { getItem: (k) => mem[k] ?? null, setItem: (k, v) => { mem[k] = String(v); }, removeItem: (k) => { delete mem[k]; } };

const { reply } = await import('../js/assistant.js');
const { CALCULATORS, byId } = await import('../js/calculators/index.js');

test('asistenti: llogarit pagën nga teksti', () => {
  assert.match(reply('sa neto për 800 euro').sq, /713/);
});

test('asistenti: trusti, dogana, fallback', () => {
  assert.match(reply('si funksionon trusti').sq.toLowerCase(), /pension/);
  assert.match(reply('doganë për veturë 10000').sq, /4\.160/);
  assert.match(reply('asdf').sq, /Paga, Trusti/);
});

test('asistenti: "hi" nuk kap fjalë si "shitje"', () => {
  assert.doesNotMatch(reply('shitje').sq, /Mirë se vini/);
});

test('modulet: 9 module me id unike dhe API të plotë', () => {
  assert.equal(CALCULATORS.length, 9);
  assert.equal(new Set(CALCULATORS.map((c) => c.id)).size, 9);
  for (const c of CALCULATORS) {
    assert.equal(typeof c.render(), 'string', c.id);
    const r = c.compute(c.defaults);
    assert.ok(r.out && typeof r.out === 'object', c.id);
    assert.equal(r.summary, '', `${c.id}: pa vlera s'ka përmbledhje`);
  }
});

test('modulet: rezultatet kryesore', () => {
  assert.equal(byId.paga.compute({ mode: 'gross', amount: '800' }).out.main, '713,00 €');
  assert.equal(byId.paga.compute({ mode: 'net', amount: '713' }).out.main, '800,00 €');
  assert.equal(byId.dogana.compute({ price: '10000', cm3: '2000' }).out.taxes, '4.160,00 €');
  assert.equal(byId.prona.compute({ type: 'banim', m2: '100', perM2: '500', primary: true }).out.tax, '52,50 €');
  assert.equal(byId.subvencione.compute({ crop: 'grure', unit: 'ha', area: '2', fuel: false }).out.total, '432,00 €');
  assert.equal(byId.karburanti.compute({ type: 'diesel', dist: '100', cons: '10', price: '1.89', round: false }).out.cost, '18,90 €');
  assert.equal(byId.kesco.compute({ day: '100', night: '100' }).out.total, '13,50 €');
});
