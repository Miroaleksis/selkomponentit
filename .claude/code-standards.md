# Accessibly — Code Example Standards

This document defines the rules for CSS/HTML/JS in the site's code examples (the `snippet-*-html/css/js` blocks). It was distilled from a full site-wide audit and should be followed for all new examples and edits to existing ones.

---

## 1. CSS scoping

- Never write a bare tag or attribute selector in an example's CSS (e.g. `label {}`, `button {}`, `[role="alert"] {}`). Every selector must be scoped either through an ancestor class or through a class on the element itself.
- Never use an `id` as a CSS selector. IDs may change for functional reasons (JS references, `aria-controls`, etc.) — all visual styling goes through classes.
- A class name describes what the element **is**, not what it does or looks like, and should make sense read in isolation.
- Don't add a class to a child element if it can be reached through an existing ancestor class instead (e.g. `.card-body h4` instead of a dedicated `.card-title` class) — but see section 6 for when a dedicated class is actually required.
- When two closely related variants exist in the same file (e.g. two menu examples, two table examples), give each variant its own distinct class — don't share one class across structurally/visually different implementations.

## 2. Semantic element vs. its internal markup

- When a semantic landmark element (`<nav>`, `<header>`, etc.) wraps an implementation-detail list (`<ul>`/`<ol>`), the landmark carries the component's identifying class — not the list. The list markup (`<ul>` vs `<ol>` vs something else) is an implementation choice, not the component itself.
- Watch for specificity/scoping traps this creates: `.menu ul { display: flex; }` is a **descendant** selector and will also match a nested submenu's `<ul>`. Use `.menu > ul` (direct child) when the rule should only apply to the top-level list, not to a nested list anywhere inside it.
- Selectors that used a direct-child combinator against the old class location (e.g. `.menu > li`) need an extra level inserted when the class moves up to the landmark (e.g. `.menu > ul > li`).

## 3. JS instance safety

- Never find a component's own internal elements with a bare `document.querySelector` / `querySelectorAll` / `getElementById` if the component could realistically be repeated on the same real page. Scope with:
  ```js
  document.querySelectorAll('.component').forEach(container => {
    const el = container.querySelector('...');
    ...
  });
  ```
- **Exception:** `document.getElementById(x)` is always correct when `x` is a value read from an `aria-controls`, `aria-labelledby`, `aria-describedby`, `aria-errormessage`, or `for` attribute. That is the sanctioned ARIA-relationship use of an id, not a scoping violation.
- A collection of sibling elements within one instance (e.g. a stepper's list of step buttons, a pagination's list of page buttons) is still selected by class/`querySelectorAll`, even inside an otherwise id-based singular component — ids cannot repeat across sibling elements by spec, so collections are never id-based.

## 4. Singular vs. repeatable components

Two categories emerged, and they're handled differently:

- **Repeatable content components** — cards, carousel, tabs, sortable/expandable tables, tooltip, menu. These can realistically appear more than once on the same real page (e.g. two independent product carousels). Their JS must be fully scoped with the `.component` `forEach` pattern from section 3.
- **Singular per-page components** — alert/status notifications tied to one action, a stepper/wizard, a modal dialog, a hamburger menu. A real page essentially never shows two of these at once (a user completes one wizard or one destructive-action confirmation at a time). These may reference their own elements directly with `getElementById`, without a `forEach` wrapper — building generic multi-instance scaffolding for them is premature abstraction.
- Before deciding a component belongs in the singular category, sanity-check the *frequency* argument specifically (would a real page realistically show two of these at once?), not a *content-uniqueness* argument (different instances having different text/content is normal for repeatable components too, e.g. cards, and doesn't by itself justify treating something as singular).
- A singular component can still open a **generic** shared mechanism for the part of its behavior that doesn't need to know which specific instance it is — see section 5.

## 5. Trigger → distant-target relationships

- When a trigger and its target have no structural relationship — not parent/child, not a guaranteed sibling — id-based linkage is the correct mechanism, not a compromise. This is exactly what ARIA affords (`aria-controls`, `aria-errormessage`, etc.) for exactly this situation.
- Never rely on DOM adjacency guesses (`nextElementSibling`, an assumed `closest()` structure) to link two elements that aren't genuinely part of the same component instance — a customer's real markup can order things differently.
- **Opening** a dialog is always instance-specific (must reference one particular dialog by id) and can't be generalized.
- **Closing** can be made fully generic across any number of dialogs on the page, because the native `close` event fires on whichever dialog closed, regardless of how it closed (close button, cancel button, Escape, `.close()` call):
  ```js
  const dialogOpeners = new WeakMap();

  document.getElementById('open-my-dialog').addEventListener('click', (e) => {
    dialogOpeners.set(myDialog, e.currentTarget);
    myDialog.showModal();
  });

  document.querySelectorAll('.close-btn, .cancel-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.target.closest('dialog').close();
    });
  });

  document.querySelectorAll('dialog').forEach(dialog => {
    dialog.addEventListener('close', () => {
      dialogOpeners.get(dialog)?.focus();
    });
  });
  ```
  This scales to any number of distinct dialogs on one real page with zero extra code — only the dialog's own id needs to be unique, which HTML already requires.
- Two examples that work on the same underlying principle (e.g. a dialog and a hamburger menu panel) must use this identical pattern — same structure, same variable roles, same selector style for equivalent elements (e.g. both open buttons use an `id`, not one using an `id` and the other a class).
- Don't add `aria-controls`/`aria-haspopup` purely to create a JS hook unless it's independently verified as standard practice for that trigger type — check the W3C ARIA APG pattern first. A missing hook does not justify inventing a non-standard attribute; it's fine to keep a direct, hardcoded reference instead (see section 4).

## 6. Boundaries of structural changes

- Fixing a scoping/instance-safety issue must never add a new wrapper element or extra nesting. Adding a `class`/`data-*`/`aria-*` **attribute** to an already-existing element is fine and is not "restructuring."
- Decorative or contextual filler content that exists only to make an example look realistic (e.g. a fake product name and price in the alert example) must not get its own dedicated class — style it via the parent container's tag selector (`.product h3`, `.product p`). Dedicated classes are reserved for the actual pattern being taught.
- An element that **is** the pattern being taught (e.g. the alert/status message box itself) must get its own dedicated class, independent of whatever demo container happens to wrap it in this particular example — a real implementation of that pattern won't necessarily sit inside the same wrapper.

## 7. Naming conventions

- Established abbreviation: `-btn` for buttons. Full words for other roles (e.g. `-label`, not `-lbl`) — abbreviate only where there's already a strong site-wide precedent.
- Prefer short, clear names over verbose compound ones when both are equally clear (e.g. `link-menu` over `menu-with-links`).
- Don't repeat in the class/id name what a `role` or ARIA attribute already conveys — e.g. `role="status"` already says "this is a message," so `status-message` id can just describe what it's about (`add-to-cart-status`), not restate "message" again once that's redundant with the surrounding context.
- When an id exists purely for JS/CSS hook purposes (no ARIA relationship), name it after what it specifically belongs to, not a generic top-level prefix (e.g. `quantity-alert` rather than `product-alert-message`).

## 8. Workflow

- Always propose a plan and get explicit confirmation before making any edit. Go file by file, snippet by snippet — never bundle multiple unconfirmed changes into one edit.
- Never restructure, refactor, or clean up anything beyond what was explicitly requested or agreed in the current plan.
