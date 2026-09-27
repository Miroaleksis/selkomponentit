# Accessibility Features: Writing Style

Rules for the "Accessibility Features" list items (`<li aria-description="Required/Recommended">`) across all pattern pages.

---

## Why these rules exist

1. Consistent wording lets a reader build one mental model of the site's terminology instead of re-learning slightly different phrasing on every page. If the same ARIA relationship is worded differently from page to page, the reader can no longer recognise it as the same recurring pattern.
2. This site is itself an accessibility guide, so its own language is part of what it teaches. Using precise, correct terminology (e.g. "accessible name" vs. "label") models the vocabulary developers need when they go on to read official specs or communicate with other developers.
3. A predictable sentence structure lets a reader tell what kind of requirement they're looking at from its grammar alone (a single named mechanism, a choice between two approaches, or an open-ended requirement) before they've even finished parsing the content.

---

## Sentence structure

### Three sentence patterns

Chosen by situation:

1. **Default: active voice, attribute/element as subject.** Use when the requirement ties to one specific, named mechanism.
   > `role="status"` announces non-critical updates politely.

2. **Choice between two approaches: imperative, reader as subject.** Use when the developer must pick one of two valid implementations depending on context.
   > Use `<button>` for the controls when pagination updates content dynamically without a page reload. Use `<a>` when each page has its own URL.

3. **General requirement, no single named mechanism: passive voice.** Use when the requirement is high-level and deliberately leaves the implementation open.
   > The expanded/collapsed state must be communicated programmatically to screen readers.

### Modal verbs

- **Required** items use "must" (patterns 1 and 3 above).
- **Recommended** items use "should" in the equivalent of patterns 1 and 3.
- **"can"** is reserved for genuinely optional, equally-valid alternative techniques, not as a weaker synonym for "should".

### Parallel lists

- When a sentence names a list of targets alongside a matching list of attributes/techniques (e.g. "hide from screen readers and the keyboard with `aria-hidden="true"` and `tabindex="-1"`"), the two lists must be ordered so each item lines up positionally with its counterpart.
- Canonical order for this specific pair: **screen readers, then keyboard**.

---

## Terminology

Use correct, idiomatic UI and development terminology for elements and functionality in general, not just in the specific cases called out below.

### Keyboard keys

- Reference a key by its bare name only, never "the Escape key", just "Escape".
- Name arrow keys individually ("Left Arrow", "Right Arrow", "Up Arrow", "Down Arrow"), not collectively as "arrow keys".
- This follows the W3C ARIA Authoring Practices Guide convention.

### "Label" vs. "accessible name"

- Use "label" when referring to visible text that names an element.
- Use "accessible name" specifically when the name is conveyed to screen readers without being visible on screen (e.g. via `aria-label`, or an `aria-labelledby` combination that produces a name broader than any single visible text).

### Applying an attribute to an element

- Use **"add"** for attaching an attribute to an element in general (e.g. "add `inert` to the other elements on the page").
- Use **"set"** specifically when emphasizing the value being assigned (e.g. "set `tabindex` to `-1`").
- Avoid "give" and "assign" for this. They aren't the idiomatic choice (per [MDN's `tabindex` page](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex), which uses "add"/"include" for the attribute and "set" for its value).

---

## Grammar and mechanics

### DOM order

- Write "in DOM order", never "in the DOM order". This parallels other ordering phrases like "in tab order" or "in alphabetical order", which drop the article.

### Punctuation

- Every list item ends with a period, regardless of how many sentences it contains.
