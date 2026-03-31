# Layout Patterns

## Balanced Headlines

Goal: find a width that produces fewer ragged lines and a stronger editorial silhouette.

Recipe:
- prepare the headline once with `prepareWithSegments()`
- probe candidate widths with `walkLineRanges()`
- score candidates by line count, width variance, and widow/orphan penalties
- render final lines with `layoutWithLines()`

Use when the user wants:
- hero titles
- article headlines
- quote cards
- marketing lockups

## Shrink-Wrapped Bubbles

Goal: create chat bubbles or comments whose container width hugs multiline text instead of wasting space.

Recipe:
- prepare once
- binary search a width range with `walkLineRanges()`
- stop at the narrowest width that keeps the target line count or max height
- render using the chosen width

Use when the user wants:
- messaging UIs
- annotation pills
- tooltip blocks
- compact note cards

## Editorial Shape Wrap

Goal: flow text around art direction, pull quotes, diagrams, or draggable obstacles.

Recipe:
- represent blocked geometry as intervals for each line band
- subtract blocked intervals from the base line slot
- choose the best remaining slot
- feed slot width to `layoutNextLine()`
- place the returned line at the slot's x/y position

Use when the user wants:
- magazine-like layouts
- text around circles or cards
- multi-column storytelling pages
- interactive editorial demos

## Virtualized Lists

Goal: compute message or card heights before DOM render.

Recipe:
- cache prepared text by content and typography
- call `layout()` for each viewport width bucket
- use the returned `height` and `lineCount` to size the list without reflow

Use when the user wants:
- chat timelines
- feed virtualization
- comment trees
- card grids with stable scroll anchoring
