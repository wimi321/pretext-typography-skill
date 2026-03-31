# Pretext API Guide

Use the smallest API that solves the job.

## `prepare(text, font, options?)` + `layout(prepared, maxWidth, lineHeight)`

Choose this pair when you only need block metrics.

Good for:
- virtualization
- masonry sizing
- list item measurement
- pre-render height estimation

Notes:
- `prepare()` performs segmentation and measurement once
- `layout()` is the cheap repeatable call for width changes
- use `{ whiteSpace: 'pre-wrap' }` for textarea-like content

## `prepareWithSegments(text, font, options?)` + `layoutWithLines(...)`

Choose this when you need the line strings.

Good for:
- custom canvas rendering
- SVG text placement
- visual debugging
- balanced headline experiments

## `walkLineRanges(prepared, maxWidth, onLine)`

Choose this when you need geometry but not necessarily full strings.

Good for:
- width probing
- shrink-wrap search
- finding widest line
- computing a nice container width before a final render

## `layoutNextLine(prepared, start, maxWidth)`

Choose this when every line may have a different width.

Good for:
- text around shapes
- column handoff
- obstacle-aware editorial layouts
- animated layout bands

## Supporting Helpers

- `clearCache()`: release shared internal caches if a long-lived app cycles across many fonts or inputs
- `setLocale(locale?)`: set locale-sensitive behavior for future prepare calls; changing locale also clears cache

## Practical Decision Table

- Need only height: `prepare` + `layout`
- Need fixed-width lines: `prepareWithSegments` + `layoutWithLines`
- Need variable-width lines: `prepareWithSegments` + `layoutNextLine`
- Need tight-fit width search: `prepareWithSegments` + `walkLineRanges`
