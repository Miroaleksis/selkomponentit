# Accessibly — Code Example Standards

This document defines the rules for CSS/HTML/JS in the site's code examples (the `snippet-*-html/css/js` blocks). It was distilled from a full site-wide audit and should be followed for all new examples and edits to existing ones.

---

## Why these rules exist

1. The patterns are designed so that a customer can put them to use on the same page without their code conflicting with each other. In practice, it should be possible to build a rudimentary website out of nothing but these patterns without anyone needing to modify their logic. This covers different patterns coexisting on one page (e.g. a dialog and a hamburger menu on the same page) and the same component being repeated (e.g. two carousels on the same page).
2. Examples are meant to work standalone outside this site (e.g. pasted into CodePen), without relying on this site's own CSS or infrastructure. This can't be a hard guarantee against every possible external inheritance, but the example's own styling must be self-contained rather than depending on anything specific to this documentation site.
3. Examples are teaching material for users who read them to learn "the right way" to build these patterns. For this reason, HTML is meant above all to be understandable by reading it directly: markup should communicate its own structure and relationships without requiring the reader to trace through JavaScript to understand what an attribute refers to or why an element exists. The same reasoning extends to code as a whole: it must stay minimal, free of unnecessary complexity, and must never demonstrate misleading functionality.
4. Consistency lets knowledge transfer from one example to another. If the same underlying problem is solved differently in two different examples (e.g. a dialog and a hamburger menu using different logic for the same mechanism), it reads to the developer as an arbitrary choice rather than a deliberate principle, and it blocks that transfer of understanding from one pattern to the next.

---

## 1. CSS scoping

- Never write a bare tag or attribute selector in an example's CSS (e.g. `label {}`, `button {}`, `[role="alert"] {}`). Every selector must be scoped either through an ancestor class or through a class on the element itself.
- Never use an `id` as a CSS selector. IDs may change for functional reasons (JS references, `aria-controls`, etc.) — all visual styling goes through classes.
- A class name should only be given to an element when it falls into one of these three cases; otherwise the element must be named through its parent instead (e.g. `.menu > ul > li`, `.card-body h4`):
  1. **The example's top-level wrapper** (e.g. `.stepper-container`, a label-like container). This prevents anything inside it from accidentally inheriting styling from outside the example.
  2. **The main element being demonstrated** (e.g. `.menu`, `.pagination`). Its own parent is often just a situational demo wrapper (e.g. `.product` on the alert page) and must not be the styling anchor for the actual pattern being taught.
  3. **An element with a unique purpose among its siblings** that can't be targeted any other way (e.g. `.pagination-next` among a list of otherwise-identical page-number buttons).
  - When both a top-level wrapper (case 1) and a main element (case 2) exist, descendant styling anchors to the main element, not the top-level wrapper — even if the wrapper is a valid ancestor too (e.g. with `.menu-container` and `.menu` both present, list items are `.menu ul`, not `.menu-container ul`).

## 2. JS scoping default, and its one exception

- All patterns are implemented on the assumption that they could appear more than once on the same real page — this is the default, not a special case for certain components. Their JS must always be scoped with the `.component` `forEach` pattern:
  ```js
  document.querySelectorAll('.component').forEach(container => {
    const el = container.querySelector('...');
    ...
  });
  ```
- **Exception:** when a trigger and its target have no structural relationship — not parent/child, not a guaranteed sibling — id-based linkage is the correct mechanism, not a compromise. This is exactly what ARIA affords (`aria-controls`, `aria-errormessage`, etc.) for exactly this situation.
- Don't add `aria-controls`/`aria-haspopup`/other ARIA attributes purely to create a JS hook — they must always have a genuine accessibility purpose. Adding one purely as a wiring mechanism should be independently verified as standard practice for that trigger type first (check the W3C ARIA APG pattern); a missing hook does not justify inventing a non-standard attribute, and it's fine to keep a direct, hardcoded id reference instead.
- Fixing a scoping/instance-safety issue must never add a new wrapper element or extra nesting. Adding a `class`/`data-*`/`aria-*` **attribute** to an already-existing element is fine and is not "restructuring."

## 3. Naming conventions

- Class names must be unique across all patterns in the document — if all examples' CSS were combined into one stylesheet, there must be no naming conflicts.
- **Exception:** generic utility classes that are identical, byte-for-byte in meaning and implementation, across every example that uses them (e.g. `.visually-hidden`) — these represent the same shared concept everywhere, not a per-pattern name.
- A class name describes what the element **is**, not what it does or looks like, and should make sense read in isolation.
- When a pattern has closely related variants (e.g. combobox-search and combobox-multiselect-search), their class names must follow the same naming scheme consistently — e.g. if combobox-search uses `cs-trigger`, the multiselect variant should use an analogous prefix like `cms-trigger`, not an unrelated name. More generally, however a pattern's classes are named, that naming style should stay consistent with how other, similar patterns on the site are named.

## 4. Code quality and consistency

- Every CSS rule, JS function/branch, and HTML element must serve a purpose. Remove unused selectors, unreachable code paths, and markup that nothing references.
- When a pattern has closely related variants, or when two different patterns work on the same underlying principle, their HTML structure and JS logic must follow the same approach consistently — a developer reading two such examples should recognise the same technique and be able to transfer understanding between them.

