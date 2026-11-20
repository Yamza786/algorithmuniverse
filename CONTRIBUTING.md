# Contributing

Keep algorithm rules in `src/sorts.js` free of DOM and browser dependencies.
Add deterministic tests for new algorithms with Node's built-in test runner.
For interface changes, keep controls keyboard operable and status text
announced. Describe manual browser checks honestly; do not claim unrun checks.

```sh
env -u LD_LIBRARY_PATH node --test
```
