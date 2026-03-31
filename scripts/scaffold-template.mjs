import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'

const repoRoot = path.resolve(new URL('..', import.meta.url).pathname)
const templatesRoot = path.join(repoRoot, 'assets', 'templates')

function usage() {
  console.error('Usage: node scripts/scaffold-template.mjs <template-name> <target-dir>')
  console.error('Templates: balanced-headline, editorial-engine, chat-bubbles')
}

async function copyDir(src, dest) {
  await fs.mkdir(dest, { recursive: true })
  const entries = await fs.readdir(src, { withFileTypes: true })
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name)
    const destPath = path.join(dest, entry.name)
    if (entry.isDirectory()) {
      await copyDir(srcPath, destPath)
    } else {
      await fs.copyFile(srcPath, destPath)
    }
  }
}

const [, , templateName, targetDir] = process.argv
if (!templateName || !targetDir) {
  usage()
  process.exit(1)
}

const srcDir = path.join(templatesRoot, templateName)
try {
  await fs.access(srcDir)
} catch {
  console.error(`Unknown template: ${templateName}`)
  usage()
  process.exit(1)
}

const outputDir = path.resolve(process.cwd(), targetDir)
await copyDir(srcDir, outputDir)

console.log(`Scaffolded '${templateName}' into ${outputDir}`)
console.log('Next steps:')
console.log('1. npm install @chenglou/pretext')
console.log('2. Wire the files into your bundler or demo app')
console.log('3. Match the font and line-height values to your real UI')
