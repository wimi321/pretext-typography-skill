# Editorial Engine Template

Use this template when text needs to flow around obstacles or art-directed shapes.

Suggested flow:
1. Model your blocked regions as rectangles or derive rectangles from richer geometry.
2. Call `flowAroundRectangles()` to get positioned lines.
3. Render each line at its computed `x` and `y` coordinates.
