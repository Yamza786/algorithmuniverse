import test from 'node:test';
import assert from 'node:assert/strict';
import { runSort, sortSteps } from '../src/sorts.js';

const cases = [
  ['bubble', [5, 1, 3, 3, -2]],
  ['selection', [5, 1, 3, 3, -2]],
  ['insertion', [5, 1, 3, 3, -2]]
];

for (const [algorithm, input] of cases) {
  test(`${algorithm} sorts while preserving values`, () => {
    assert.deepEqual(runSort(input, algorithm), [-2, 1, 3, 3, 5]);
    assert.deepEqual(input, [5, 1, 3, 3, -2]);
  });
}

test('empty and single-element arrays complete', () => {
  assert.deepEqual(runSort([], 'bubble'), []);
  assert.deepEqual(runSort([4], 'insertion'), [4]);
});

test('trace includes a final state and monotone comparison count', () => {
  const steps = [...sortSteps([3, 2, 1], 'bubble')];
  assert.equal(steps[0].type, 'start');
  assert.equal(steps.at(-1).type, 'done');
  assert.ok(steps.every((step, i) => i === 0 || step.comparisons >= steps[i - 1].comparisons));
});

test('invalid input and algorithm fail with clear errors', () => {
  assert.throws(() => [...sortSteps([1, Number.NaN])], /finite numbers/);
  assert.throws(() => [...sortSteps([2, 1], 'radix')], /unsupported algorithm/);
});
