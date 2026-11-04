/// <reference types="node" />
// Testes da função pura src/calcular.ts, com o test runner que já vem no
// Node (node:test), sem instalar nada. Rode com: npm test
// Cobrem a parte matemática dos sete testes do passo 15 do roteiro.
import assert from 'node:assert/strict';
import { test } from 'node:test';

import { calcular, formatar } from '../src/calcular.ts';

test('2 + 3 = 5', () => {
  assert.equal(formatar(calcular(2, 3, '+')), '5');
});

test('10 / 4 = 2.5', () => {
  assert.equal(formatar(calcular(10, 4, '/')), '2.5');
});

test('9 - 12 = -3', () => {
  assert.equal(formatar(calcular(9, 12, '-')), '-3');
});

test('0.1 + 0.2 = 0.3, graças ao formatar', () => {
  assert.equal(0.1 + 0.2, 0.30000000000000004); // o problema
  assert.equal(formatar(calcular(0.1, 0.2, '+')), '0.3'); // a solução
});

test('7 / 0 = Erro', () => {
  assert.equal(formatar(calcular(7, 0, '/')), 'Erro');
});

test('2 + 3 = e depois * 4 = dá 20 (o resultado vira o primeiro número)', () => {
  const resultado = Number(formatar(calcular(2, 3, '+')));
  assert.equal(formatar(calcular(resultado, 4, '*')), '20');
});

test('0 / 0 (NaN) também vira Erro', () => {
  assert.equal(formatar(calcular(0, 0, '/')), 'Erro');
});
