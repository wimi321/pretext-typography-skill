# Pretext Typography

Codex skill for production-grade typography and text layout powered by [Pretext](https://github.com/chenglou/pretext).

[简体中文说明](./README.zh-CN.md)

## Why This Exists

Pretext is already a strong layout engine for multiline text measurement, line breaking, and custom text flow. What it does not provide by itself is a ready-made Codex skill that helps agents:

- choose the right Pretext API for the job
- turn layout goals into implementation steps
- scaffold reusable typography patterns
- handle multilingual and mixed-script text more safely
- ship polished UI work instead of only explaining the theory

This repository packages those workflows into a top-level skill that can be installed into Codex and reused across projects.

## What You Get

- `SKILL.md`: a triggerable skill focused on high-end web typography
- `references/`: concise guidance for API selection, layout patterns, and multilingual QA
- `assets/templates/`: starter templates for common Pretext-driven UI patterns
- `scripts/scaffold-template.mjs`: copies a starter template into a target directory
- `agents/openai.yaml`: UI metadata for skill pickers and chips
- `.github/workflows/validate.yml`: lightweight CI validation for the repo structure

## When To Use This Skill

Use `$pretext-typography` when building:

- balanced hero headlines
- shrink-wrapped chat bubbles
- precise multiline measurement without DOM reflow
- editorial layouts that flow around obstacles
- multilingual card grids or virtualized feeds
- custom text rendering in Canvas, SVG, or other non-DOM surfaces

## Quick Install

Install this repository as a Codex skill by placing it under your skills directory:

```sh
git clone https://github.com/wimi321/pretext-typography-skill.git "$CODEX_HOME/skills/pretext-typography"
```

Or symlink it during local iteration:

```sh
ln -s /absolute/path/to/pretext-typography "$CODEX_HOME/skills/pretext-typography"
```

## Example Prompts

- `Use $pretext-typography to build a balanced multilingual headline block for our landing page.`
- `Use $pretext-typography to replace DOM text measurement in our chat list with Pretext.`
- `Use $pretext-typography to create an editorial article layout that wraps around two floating cards.`
- `Use $pretext-typography to make our card grid support mixed English, Chinese, and Arabic text without overflow.`

## Included Templates

### `balanced-headline`

Uses `prepareWithSegments()`, `walkLineRanges()`, and `layoutWithLines()` to search for a stronger headline width.

Scaffold it:

```sh
node scripts/scaffold-template.mjs balanced-headline ./demo
```

### `editorial-engine`

Uses `layoutNextLine()` to flow text around obstacle rectangles with per-line width changes.

Scaffold it:

```sh
node scripts/scaffold-template.mjs editorial-engine ./demo
```

### `chat-bubbles`

Uses `prepare()` and `layout()` for exact bubble height prediction in feeds and messaging UIs.

Scaffold it:

```sh
node scripts/scaffold-template.mjs chat-bubbles ./demo
```

## Direct Pretext Usage

The included templates expect the upstream package:

```sh
npm install @chenglou/pretext
```

This skill does not replace Pretext. It makes Pretext easier to apply well.

## Repository Layout

```text
.
├── SKILL.md
├── agents/openai.yaml
├── assets/
│   ├── icon-large.svg
│   ├── icon-small.svg
│   └── templates/
├── references/
└── scripts/
```

## Local Validation

```sh
npm run validate
```

## Design Direction

This project intentionally optimizes for:

- precise text metrics
- fast iteration for UI agents
- better multilingual behavior
- editorial-grade layout patterns
- reusable templates over hand-wavy advice

## Acknowledgements

- Upstream engine: [chenglou/pretext](https://github.com/chenglou/pretext)
- Original package: [`@chenglou/pretext`](https://www.npmjs.com/package/@chenglou/pretext)

## License

MIT. See [LICENSE](./LICENSE).
