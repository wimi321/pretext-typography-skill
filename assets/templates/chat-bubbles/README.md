# Chat Bubbles Template

Use this template when a list or messaging UI needs exact multiline bubble height before render.

Suggested flow:
1. Cache prepared text outside the render hot path if the content repeats.
2. Call `measureBubble()` with the active width.
3. Use the returned `height` and `lineCount` to size the row or bubble container.
