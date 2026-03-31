# Multilingual Typography Notes

Pretext is especially valuable when the product needs stable layout across mixed scripts.

## Watch For

- mixed Latin + CJK headings
- Arabic or Hebrew with Latin fragments
- emoji inside otherwise narrow lines
- user-authored content with manual line breaks and tabs
- locale-sensitive punctuation and line-break behavior

## Recommended Practices

- prefer realistic sample content early instead of placeholder lorem ipsum
- test at narrow, medium, and wide widths
- pin a named font stack used by the actual UI
- use `setLocale()` when locale-sensitive line break behavior matters
- enable `{ whiteSpace: 'pre-wrap' }` for editors, notes, and imported plain text

## QA Checklist

- line count does not unexpectedly jump between browsers for the target font
- punctuation at line edges feels natural for the active locale
- no accidental clipping with mixed emoji or tall glyphs
- cursor handoff remains seamless in multi-column or obstacle layouts
- virtualization stays stable as content language changes
