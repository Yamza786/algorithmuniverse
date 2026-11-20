# AlgorithmUniverse

A small, browser-native algorithm learning tool. The first milestone lets a
learner generate an array and step through Bubble Sort, Selection Sort, or
Insertion Sort with comparisons and writes highlighted.

## Run

From this directory, serve the static files (opening `index.html` directly also
works in browsers that allow ES modules from local files):

```sh
python -m http.server 8000
```

Visit `http://127.0.0.1:8000`. No build step or external dependency is used.

## Test

```sh
env -u LD_LIBRARY_PATH node --test
```

## Requirements and acceptance

- Target users: learners exploring how elementary comparison sorts evolve.
- Functional: choose one of three algorithms, create deterministic or random
  values, step, play/pause, reset, and see comparisons and writes.
- Quality: run fully in a modern browser without a backend or network access;
  algorithm transitions are deterministic and independently tested.
- Accepted when every algorithm returns sorted values, preserves the input, and
  emits a final state; UI controls do not require a server API.

## Architecture

`src/sorts.js` is the pure algorithm layer and yields immutable snapshots with
the current indices and operation. `src/app.js` adapts snapshots to DOM events
and playback controls. `index.html` and `src/styles.css` provide presentation.
There is no persistence or database because the initial learning session is
ephemeral.

## Limitations

This milestone has no graph algorithms, code editor, mobile screen-reader audit,
benchmark mode, saved sessions, or backend. Playback speed is a teaching aid,
not a performance measurement. The comparison counter counts algorithmic
comparisons, not browser rendering work.
