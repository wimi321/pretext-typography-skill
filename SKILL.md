---
name: pretext-typography
description: Use when building advanced web typography, DOM-free text measurement, balanced headlines, shrink-wrapped bubbles, masonry cards, editorial text flow, multilingual line breaking, or any UI that needs precise multiline text layout powered by Pretext. This skill helps translate layout goals into production-ready Pretext patterns, templates, and implementation steps.
---

# Pretext Typography

Use this skill when the user wants text layout that CSS alone does not handle well, especially when accuracy, performance, or multilingual behavior matters.

## What This Skill Is For

Reach for this skill when the task involves:

- Measuring multiline text height without DOM reflow
- Building balanced headlines or shrink-wrapped text containers
- Rendering chat bubbles, masonry cards, or virtualized feeds with exact text heights
- Flowing text around obstacles, artwork, or irregular geometry
- Supporting multilingual text, mixed bidi, emoji, or `pre-wrap` behavior
- Using [`@chenglou/pretext`](https://github.com/chenglou/pretext) as the layout engine behind a custom UI

## Default Workflow

1. Identify the typography job:
   - height prediction
   - fixed-width line layout
   - per-line variable width layout
   - shrink-wrap / balance / editorial flow
2. Pick the lowest-complexity Pretext API:
   - `prepare()` + `layout()` for height only
   - `prepareWithSegments()` + `layoutWithLines()` for manual line rendering
   - `prepareWithSegments()` + `layoutNextLine()` for variable-width bands or shaped flow
   - `walkLineRanges()` for speculative width search and tight-fit containers
3. Keep `prepare*()` on the cold path and `layout*()` on the hot path. Re-run layout on resize; do not repeatedly re-prepare unchanged text.
4. Match `font` and `lineHeight` to the real UI styles. Pretext is only as accurate as the typography values you feed it.
5. Validate the result against the intended surface:
   - visual balance for headlines
   - no overflow in narrow widths
   - stable heights for virtualization
   - correct multilingual wrapping and punctuation behavior

## Pattern Picker

Use these mappings:

- `balanced headline`: read [references/patterns.md](references/patterns.md) and start from [assets/templates/balanced-headline/index.ts](assets/templates/balanced-headline/index.ts)
- `editorial / shape wrap / obstacle flow`: read [references/patterns.md](references/patterns.md) and start from [assets/templates/editorial-engine/index.ts](assets/templates/editorial-engine/index.ts)
- `chat / comments / virtual list`: read [references/patterns.md](references/patterns.md) and start from [assets/templates/chat-bubbles/index.ts](assets/templates/chat-bubbles/index.ts)
- `API selection or edge cases`: read [references/pretext-api.md](references/pretext-api.md)
- `international text behavior`: read [references/multilingual-typography.md](references/multilingual-typography.md)

## Implementation Guidance

- Prefer named fonts over `system-ui` when height accuracy matters on macOS.
- Cache prepared text by `text + font + locale + whiteSpace`.
- If the UI only needs block height, avoid the richer segmented API.
- For obstacle flow, compute the free horizontal slot for each line band, then pass that width to `layoutNextLine()`.
- For shrink-wrap, probe widths with `walkLineRanges()` until line count or total height hits the target shape.
- For `textarea`-like behavior, pass `{ whiteSpace: 'pre-wrap' }`.
- If the user is only describing a design goal, translate it into a concrete layout pipeline and code structure rather than explaining Pretext abstractly.

## Repo Helpers

This repo includes a scaffold helper:

```sh
node scripts/scaffold-template.mjs balanced-headline ./my-demo
node scripts/scaffold-template.mjs editorial-engine ./my-demo
node scripts/scaffold-template.mjs chat-bubbles ./my-demo
```

The scaffold copies a starter template and prints the next installation steps.

## Output Expectations

When using this skill, prefer to deliver:

- a concrete Pretext API choice
- a small implementation plan tied to the UI need
- working code or a template-based starting point
- notes about typography fidelity, performance, and multilingual behavior
