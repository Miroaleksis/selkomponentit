# Accessibly — Review Instructions

This document defines review perspectives for the Accessibly HTML pattern library. Use these when reviewing pages or code examples on the site.

**Important: Reviews are read-only. Do not modify any files during a review. Report all findings as comments in the chat only.**

---

## Site Reviews

### Accessibility Perspective
Check that the site itself meets WCAG 2.1 AA requirements. Use the `accessibility-advisor` skill to assist. Focus on:
- Sufficient color contrast (text, interactive elements, icons)
- All interactive elements are keyboard accessible and have visible focus indicators
- All images have appropriate alt text
- Headings are in logical order
- ARIA attributes are used correctly and only where necessary
- Form labels and error messages are properly associated

### Content Perspective
Check that the page text is well-written and consistent across the site:
- Wording is consistent (e.g. same terms used for same concepts across pages)
- Sentences are grammatically correct English
- Descriptions are concise and informative — not too long, not too vague
- Accessibility feature list items follow a consistent pattern and level of detail
- Page titles, h1s, and descriptions are aligned in meaning

### Developer Perspective
Check that the code examples shown on the site are correct and idiomatic from a developer's point of view:
- HTML is semantic and well-structured
- JavaScript is readable, minimal, and uses modern conventions (no unnecessary abstractions, no outdated patterns)
- CSS is clean and uses appropriate selectors
- Attribute usage matches the HTML specification
- No unnecessary complexity or redundancy

---

## Code Example Reviews

### Accessibility Perspective
Check that the code examples themselves meet WCAG standards — they are the primary deliverable of the site. Use the `accessibility-advisor` skill to assist. Focus on:
- Interactive elements have correct roles, names, and states
- Keyboard interaction works correctly
- ARIA is used correctly and only when native HTML is insufficient
- Error messages and help text are properly associated via `aria-describedby`
- Focus management is handled where needed

### Developer Perspective
Check that the code examples are well-crafted from a developer's point of view:
- HTML structure is clean and minimal
- No dead code — unused CSS rules, unreachable JS branches, or HTML elements that serve no purpose
- JavaScript is readable and appropriately minimal — no unnecessary abstractions or over-engineering
- CSS selectors are appropriate and not overly specific
- Attribute names and values are correct per the HTML/ARIA spec
- Examples follow the patterns established in other examples on the site
- CSS class names are unique across all examples — if all examples' CSS were combined into one stylesheet, there must be no naming conflicts. Each example should use a distinct prefix or namespace for its classes (e.g. `hb-` for hamburger menu)
- CSS class names must be semantically appropriate for the element they describe — a class name should reflect what the element **is**, not what it looks like or what action it performs. A name should make sense in isolation, without needing to read the surrounding code
- Avoid unnecessary class names — if a parent element already has a unique class, child elements can often be targeted with descendant or child selectors instead of adding their own class (e.g. `.hb-dialog nav` instead of `.hb-nav`)
- Never use IDs as CSS selectors — IDs may change for functional reasons (JS references, `aria-controls`, etc.), so all visual styling must go through classes
- Similar components must be implemented and named consistently — if two components work on the same principle (e.g. a dialog and a hamburger menu panel), their HTML structure, JavaScript logic, and class naming conventions should follow the same pattern so a developer reading both examples recognises the same approach and can transfer knowledge between them

### Visual Consistency Perspective
Check that the code examples are visually consistent with each other:
- Border radius values are consistent across similar elements (inputs, buttons, cards)
- Border widths are consistent
- Spacing (padding, gap) values follow a consistent scale
- Colors use the same named values (e.g. `dimgray`, `whitesmoke`) across examples
- Font sizes and weights are consistent for similar text types
- Interactive states (hover, focus, disabled) are handled consistently
