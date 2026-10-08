# Accessibility Features: Writing Style

Rules for the "Accessibility Features" list items (`<li aria-description="Required/Recommended">`) across all pattern pages. The same rules apply to any text in snippet descriptions that describes accessibility features, whether or not it is marked with `aria-description`. Text that only describes the nature of an element is excluded.

---

## Why these rules exist

1. Consistent wording lets a reader build one mental model of the site's terminology instead of re-learning slightly different phrasing on every page. If the same ARIA relationship is worded differently from page to page, the reader can no longer recognise it as the same recurring pattern.
2. This site is itself an accessibility guide, so its own language is part of what it teaches. Using precise, correct terminology (e.g. "accessible name" vs. "label") models the vocabulary developers need when they go on to read official specs or communicate with other developers.
3. A predictable sentence structure lets a reader tell what kind of requirement they're looking at from its grammar alone (a single named mechanism, a choice between two approaches, or an open-ended requirement) before they've even finished parsing the content.

---

## 1. Sentence structure

### 1.1. Sentence patterns

Chosen by situation:

1.1.1. **Default: active voice, attribute/element as subject.** Use when the requirement ties to one specific, named mechanism. When the sentence names a specific HTML element or attribute, that element/attribute must be the grammatical subject, not a generic descriptive noun for the component part, even if one would otherwise be available.
   > `role="status"` announces non-critical updates politely.

1.1.2. **Exception: passive voice.** Use passive whenever 1.1.1 doesn't cleanly apply:
   - The requirement is general/high-level and deliberately leaves the implementation open (no single named mechanism).
     > The expanded/collapsed state must be communicated programmatically to screen readers.
   - The requirement only applies under a certain condition. State the condition first.
     > If the submenu obscures content, it must be dismissible with Esc.
   - The developer must choose between two valid approaches depending on context.
     > When pagination updates content dynamically without a page reload, `<button>` must be used for the controls. When each page has its own URL, `<a>` must be used.
   - An attribute value reads naturally as an ordinary English word within the sentence (e.g. "disabled").
     > Previous and next page controls are marked `disabled` to prevent interaction.
   - The named mechanism is presented merely as an illustrative example (marked "for example"/"e.g."), not as the one definitive required technique. Forcing it into the active-subject position would overstate it as the only correct solution.
     > Feedback must be provided when the slide changes, for example using an `aria-live` region.

### 1.2. Modal verbs

1.2.1. **Required** items use "must" (patterns 1.1.1 and 1.1.2 above).
1.2.2. **Recommended** items use "should" in the equivalent of patterns 1.1.1 and 1.1.2.
1.2.3. **"can"** is reserved for genuinely optional, equally-valid alternative techniques, not as a weaker synonym for "should".
1.2.4. Modal verbs ("must"/"should"/"can") belong to passive-voice sentences (1.1.2, in any of its forms). Active-voice sentences (1.1.1) never use them. The Required/Recommended priority is already conveyed by the `aria-description` attribute itself, so repeating it in the sentence is redundant.
1.2.5. "may" is different from "must"/"should"/"can": it expresses genuine uncertainty about external behavior (e.g. how assistive technology might respond), not a requirement/recommendation level or a technique choice. It is not restricted to passive voice, and it can appear in active sentences even without a conditional clause.

### 1.3. Parallel lists

1.3.1. When a sentence names a list of targets alongside a matching list of attributes/techniques (e.g. "hide from screen readers and the keyboard with `aria-hidden="true"` and `tabindex="-1"`"), the two lists must be ordered so each item lines up positionally with its counterpart.
1.3.2. Canonical order for this specific pair: **screen readers, then keyboard**.

---

## 2. Terminology

Use correct, idiomatic UI and development terminology for elements and functionality in general, not just in the specific cases called out below.

### 2.1. Keyboard keys

2.1.1. Reference a key by its bare name only, never "the Esc key", just "Esc".
2.1.2. Name arrow keys individually ("Left Arrow", "Right Arrow", "Up Arrow", "Down Arrow"), not collectively as "arrow keys".
2.1.3. This follows the W3C ARIA Authoring Practices Guide convention.

### 2.2. "Label" vs. "accessible name"

2.2.1. Use "label" when referring to visible text that names an element.
2.2.2. Use "accessible name" specifically when the name is conveyed to screen readers without being visible on screen (e.g. via `aria-label`, or an `aria-labelledby` combination that produces a name broader than any single visible text).

### 2.3. Applying an attribute to an element

2.3.1. Use **"add"** for attaching an attribute to an element in general (e.g. "add `inert` to the other elements on the page").
2.3.2. Use **"set"** specifically when emphasizing the value being assigned (e.g. "set `tabindex` to `-1`").
2.3.3. Avoid "give" and "assign" for this. They aren't the idiomatic choice (per [MDN's `tabindex` page](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex), which uses "add"/"include" for the attribute and "set" for its value).

---

## 3. Grammar and mechanics

### 3.1. DOM order

3.1.1. Write "in DOM order", never "in the DOM order". This parallels other ordering phrases like "in tab order" or "in alphabetical order", which drop the article.

### 3.2. Punctuation

3.2.1. Every list item ends with a period, regardless of how many sentences it contains.

---

## 4. List item order

4.1. **Required** items come before **Recommended** items. Recommended items always sit at the bottom of the list.

4.2. When the list mixes structural/ARIA items, keyboard-interaction items, visual/responsive items, and pointer-only items, order items by modality:
   1. Structure and screen-reader communication
   2. Keyboard interaction
   3. Visual/responsive edge cases
   4. Pointer-only requirements

   This extends the screen-readers-before-keyboard principle (1.3.2) from word order within a sentence to item order across the whole list.
   > `role="tablist"` → `role="tab"`/`aria-selected` → `role="tabpanel"` → `tabindex="-1"` → arrow keys → mobile scaling → (Recommended) `aria-controls`.
   > cards.html: auto-scroll-into-view on focus (keyboard/screen reader) and card/CTA labelling (ARIA) come before the left/right navigation buttons item, since those buttons only serve pointer users.
   > multiselect.html: all `<output>`-related ARIA items come before the Space/Enter keyboard item, even though `<output>` appears later in the DOM than the listbox Space/Enter acts on.

4.3. Order items by DOM hierarchy, top-down: the container/outer element before its children (e.g. the combobox trigger before its options). Where this conflicts with 4.2, modality order wins.

4.4. **Exception, overrides 4.1–4.3:** if one item's sentence implicitly depends on what a previous item just established, keep them adjacent in that order regardless of what DOM hierarchy or modality order would otherwise suggest.
   > accordion.html: the keyboard item stays before the state item ("the expanded/collapsed state") because the state sentence presupposes the action just described.
