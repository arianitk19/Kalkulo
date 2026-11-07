import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  salary, grossFromNet, pension, energyBill, vehicleCustoms, subsidy, tripCost, propertyTax, parseAmount,
} from '../js/core/finance.js';

const near = (a, b, eps = 0.01) => assert.ok(Math.abs(a - b) <= eps, `${a} ≠ ${b}`);

test('paga: 800 € bruto → 713 € neto', () => {
  const r = salary(800);
  near(r.trust, 40);
  near(r.tax, 47);
  near(r.net, 713);
});

test('paga: nën pragun nuk ka tatim', () => {
  const r = salary(260);
  near(r.tax, 0);
  near(r.net, 247);
});

test('paga: hyrje e pavlefshme → 0', () => {
  assert.equal(salary('abc').net, 0);
  assert.equal(salary(-500).net, 0);
});

test('paga: neto → bruto kthen vlerën e saktë', () => {
  for (const g of [300, 800, 1234.56, 5000]) near(grossFromNet(salary(g).net).gross, g, 0.02);
});

test('trusti: 600 € → 30 + 30', () => {
  const r = pension(600);
  near(r.employee, 30);
  near(r.monthly, 60);
  near(r.yearly, 720);
});

test('energjia: 100 + 100 kWh → 13,50 €', () => near(energyBill(100, 100).total, 13.5));

test('dogana: TVSH mbi vlerë + doganë + akcizë', () => {
  const r = vehicleCustoms(10000, 2000);
  near(r.duty, 1000);
  near(r.excise, 1000);
  near(r.vat, 2160);
  near(r.taxes, 4160);
  near(r.landed, 14160);
});

test('subvencionet: 2 ha grurë = 432 €, ari & naftë', () => {
  near(subsidy(216, 2).total, 432);
  near(subsidy(216, 200, 'ari').total, 432);
  near(subsidy(216, 2, 'ha', true).total, 504);
});

test('karburanti: 100 km × 10 L × 1,89 €', () => {
  const r = tripCost(100, 10, 1.89, 'diesel');
  near(r.cost, 18.9);
  near(r.co2, 26.4);
  near(r.perKm, 0.189, 0.001);
});

test('prona: 100 m² × 500 €, primare → 52,50 €', () => {
  const r = propertyTax(100, 500, 0.0015, true);
  near(r.tax, 52.5);
  near(r.installment, 26.25);
  near(propertyTax(10, 500, 0.0015, true).tax, 0); // nuk del negative
});

test('parseAmount: formate të ndryshme', () => {
  assert.equal(parseAmount('paga 850'), 850);
  assert.equal(parseAmount('1.200,50 €'), 1200.5);
  assert.equal(parseAmount('1,200.50'), 1200.5);
  assert.equal(parseAmount('1200.5'), 1200.5);
  assert.equal(parseAmount('12,5'), 12.5);
  assert.equal(parseAmount('15.000'), 15000);
  assert.equal(parseAmount('pa numër'), null);
});
