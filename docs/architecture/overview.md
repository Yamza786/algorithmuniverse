# Architecture decision: browser-native single-page tool

**Status:** Accepted for milestone 0.1.0

## Context

The initial goal is a portable teaching visualisation that can run offline and
be developed on Termux. A backend would add deployment and security surface
without serving a current requirement.

## Decision

Use modern browser JavaScript modules, semantic HTML, and CSS. Keep algorithms
pure and emit trace snapshots consumed by a thin DOM controller. Use Node's
built-in test runner for the pure algorithm module; the browser has no runtime
dependencies.

## Consequences

The tool is easy to run from a static file server and has no credentials or
stored user data. UI behavior still needs browser-level manual review. Trace
snapshots use memory proportional to the number of algorithm operations, so
input is capped at 80 elements in the UI.
