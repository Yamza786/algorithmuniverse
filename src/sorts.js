const freezeStep = (values, type, indices = [], comparisons = 0, writes = 0) => ({
  values: [...values],
  type,
  indices: [...indices],
  comparisons,
  writes
});

export function* sortSteps(input, algorithm = 'bubble') {
  if (!Array.isArray(input) || input.some((value) => !Number.isFinite(value))) {
    throw new TypeError('input must be an array of finite numbers');
  }
  if (!['bubble', 'selection', 'insertion'].includes(algorithm)) {
    throw new RangeError(`unsupported algorithm: ${algorithm}`);
  }

  const values = [...input];
  let comparisons = 0;
  let writes = 0;
  yield freezeStep(values, 'start');

  if (algorithm === 'bubble') {
    for (let end = values.length - 1; end > 0; end -= 1) {
      let changed = false;
      for (let i = 0; i < end; i += 1) {
        comparisons += 1;
        yield freezeStep(values, 'compare', [i, i + 1], comparisons, writes);
        if (values[i] > values[i + 1]) {
          [values[i], values[i + 1]] = [values[i + 1], values[i]];
          writes += 2;
          changed = true;
          yield freezeStep(values, 'swap', [i, i + 1], comparisons, writes);
        }
      }
      if (!changed) break;
    }
  } else if (algorithm === 'selection') {
    for (let start = 0; start < values.length - 1; start += 1) {
      let min = start;
      for (let i = start + 1; i < values.length; i += 1) {
        comparisons += 1;
        yield freezeStep(values, 'compare', [min, i], comparisons, writes);
        if (values[i] < values[min]) min = i;
      }
      if (min !== start) {
        [values[start], values[min]] = [values[min], values[start]];
        writes += 2;
        yield freezeStep(values, 'swap', [start, min], comparisons, writes);
      }
    }
  } else {
    for (let i = 1; i < values.length; i += 1) {
      const current = values[i];
      let j = i - 1;
      while (j >= 0) {
        comparisons += 1;
        yield freezeStep(values, 'compare', [j, j + 1], comparisons, writes);
        if (values[j] <= current) break;
        values[j + 1] = values[j];
        writes += 1;
        yield freezeStep(values, 'write', [j, j + 1], comparisons, writes);
        j -= 1;
      }
      if (values[j + 1] !== current) {
        values[j + 1] = current;
        writes += 1;
        yield freezeStep(values, 'write', [j + 1], comparisons, writes);
      }
    }
  }

  yield freezeStep(values, 'done', [], comparisons, writes);
}

export function runSort(input, algorithm) {
  return [...sortSteps(input, algorithm)].at(-1).values;
}
