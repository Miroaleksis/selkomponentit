# Accessibly — Review Instructions

This document defines review perspectives for the Accessibly HTML pattern library. Use these when reviewing pages or code examples on the site.

**Important: Reviews are read-only. Do not modify any files during a review. Report all findings as comments in the chat only.**

**Before starting, confirm with the user exactly which review area(s) and perspective(s) to run (e.g. "Code Example Reviews > Developer Perspective"). Don't assume every perspective should be checked at once — the user usually wants one specific area reviewed at a time.**

**Report honestly. Don't invent issues that aren't actually there just to have something to report, and don't flatter the user by claiming something is fine when it isn't.**

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
- Similar descriptions across pages follow consistent sentence structures — the same concept should be expressed the same way (e.g. if one page says "X must have `aria-expanded`", another page should not say "X is implemented with `aria-expanded`")

### Developer Perspective
Check that the site's own code (not the code examples) is correct and idiomatic from a developer's point of view:
- The site's own JavaScript (e.g. `example-page.js`, `common.js`) is readable, minimal, and uses modern conventions (no unnecessary abstractions, no outdated patterns)
- The site's own CSS (`styles.css`) is clean and uses appropriate selectors
- The site's own HTML (page templates, layout markup — not the example snippets) is semantic and well-structured
- No unnecessary complexity or redundancy in the site's own implementation
- Search for and report dead code (unused CSS rules, unreachable JS branches, unused functions/variables, HTML elements that serve no purpose)

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
Check that the code examples comply with the rules in `.claude/code-example-standards.md`. Read that document and verify each example against it — do not use a separate checklist here.

### Visual Consistency Perspective
Check that the code examples are visually consistent with each other:
- Border radius values are consistent across similar elements (inputs, buttons, cards)
- Border widths are consistent
- Spacing (padding, gap) values follow a consistent scale
- Colors use the same named values (e.g. `dimgray`, `whitesmoke`) across examples
- Font sizes and weights are consistent for similar text types
- Interactive states (hover, focus, disabled) are handled consistently
