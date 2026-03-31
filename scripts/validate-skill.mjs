import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'

const root = path.resolve(new URL('..', import.meta.url).pathname)
const requiredFiles = [
  'SKILL.md',
  'README.md',
  'README.zh-CN.md',
  'agents/openai.yaml',
  'references/pretext-api.md',
  'references/patterns.md',
  'references/multilingual-typography.md',
  'assets/icon-small.svg',
  'assets/icon-large.svg',
  'assets/previews/social-preview.svg',
  'assets/templates/balanced-headline/index.ts',
  'assets/templates/editorial-engine/index.ts',
  'assets/templates/chat-bubbles/index.ts',
  'showcase/index.html',
  'showcase/styles.css',
  'showcase/app.js',
  'showcase/README.md',
  'scripts/serve-showcase.mjs',
]

for (const relativePath of requiredFiles) {
  const fullPath = path.join(root, relativePath)
  try {
    const stat = await fs.stat(fullPath)
    if (!stat.isFile()) throw new Error('Not a file')
  } catch (error) {
    console.error(`Missing required file: ${relativePath}`)
    process.exit(1)
  }
}

const skillText = await fs.readFile(path.join(root, 'SKILL.md'), 'utf8')
if (!skillText.includes('name: pretext-typography')) {
  console.error('SKILL.md is missing the expected skill name frontmatter.')
  process.exit(1)
}

const yamlText = await fs.readFile(path.join(root, 'agents/openai.yaml'), 'utf8')
if (!yamlText.includes('display_name: "Pretext Typography"')) {
  console.error('agents/openai.yaml is missing the expected display name.')
  process.exit(1)
}

console.log('Skill structure looks good.')
