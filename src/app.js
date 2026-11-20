import { sortSteps } from './sorts.js';

const bars = document.querySelector('#bars');
const message = document.querySelector('#message');
const valuesInput = document.querySelector('#values');
const algorithmInput = document.querySelector('#algorithm');
const speedInput = document.querySelector('#speed');
const counters = document.querySelector('#counters');
const stepButton = document.querySelector('#step');
const playButton = document.querySelector('#play');
const resetButton = document.querySelector('#reset');
const randomButton = document.querySelector('#random');
let trace = [];
let cursor = 0;
let timer;

function parseValues() {
  const values = valuesInput.value.split(',').map((part) => Number(part.trim()));
  if (!values.length || values.length > 80 || values.some((value) => !Number.isFinite(value))) {
    throw new Error('Enter 1 to 80 comma-separated numbers.');
  }
  return values;
}

function draw(step) {
  const min = Math.min(...step.values, 0);
  const max = Math.max(...step.values, 0);
  const spread = max - min;
  bars.replaceChildren(...step.values.map((value, index) => {
    const bar = document.createElement('div');
    bar.className = 'bar';
    if (step.type === 'done') bar.classList.add('done');
    else if (step.indices.includes(index)) bar.classList.add(step.type);
    const height = spread === 0 ? 60 : 8 + ((value - min) / spread) * 92;
    bar.style.height = `${height}%`;
    bar.setAttribute('aria-label', `Value ${value}, position ${index + 1}`);
    bar.title = String(value);
    return bar;
  }));
  message.textContent = step.type === 'done'
    ? 'Sorted. Press Play or Reset to begin again.'
    : `${step.type[0].toUpperCase()}${step.type.slice(1)} step ${cursor} of ${trace.length - 1}`;
  counters.textContent = `Comparisons: ${step.comparisons} · Writes: ${step.writes}`;
  stepButton.disabled = cursor >= trace.length - 1;
}

function prepare() {
  clearInterval(timer);
  timer = undefined;
  playButton.textContent = 'Play';
  try {
    trace = [...sortSteps(parseValues(), algorithmInput.value)];
    cursor = 0;
    draw(trace[cursor]);
  } catch (error) {
    message.textContent = error.message;
    trace = [];
    stepButton.disabled = true;
  }
}

stepButton.addEventListener('click', () => {
  if (cursor >= trace.length - 1) prepare();
  else draw(trace[++cursor]);
});
playButton.addEventListener('click', () => {
  if (timer) {
    clearInterval(timer);
    timer = undefined;
    playButton.textContent = 'Play';
    return;
  }
  if (cursor >= trace.length - 1) prepare();
  playButton.textContent = 'Pause';
  timer = setInterval(() => {
    if (cursor >= trace.length - 1) {
      clearInterval(timer);
      timer = undefined;
      playButton.textContent = 'Play';
      return;
    }
    draw(trace[++cursor]);
  }, Number(speedInput.value));
});
resetButton.addEventListener('click', prepare);
randomButton.addEventListener('click', () => {
  valuesInput.value = Array.from({ length: 24 }, () => 5 + Math.floor(Math.random() * 96)).join(',');
  prepare();
});
algorithmInput.addEventListener('change', prepare);
prepare();
