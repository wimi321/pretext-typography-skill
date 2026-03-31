import { layout, layoutNextLine, layoutWithLines, prepare, prepareWithSegments } from 'https://esm.sh/@chenglou/pretext@0.0.3'

const headlineEl = document.getElementById('headline')
const bubbleStackEl = document.getElementById('bubble-stack')
const editorialLinesEl = document.getElementById('editorial-lines')

const headlineText = 'THE FUTURE OF MULTILINGUAL LAYOUT SHOULD FEEL EDITED, NOT APPROXIMATED'
const headlinePrepared = prepareWithSegments(headlineText, '700 68px "Iowan Old Style", Georgia, serif')

function chooseHeadlineWidth() {
  const maxWidth = Math.min(window.innerWidth < 640 ? 320 : 520, window.innerWidth - 80)
  let best = null
  for (let width = 220; width <= maxWidth; width += 10) {
    const result = layoutWithLines(headlinePrepared, width, 72)
    const widths = result.lines.map(line => line.width)
    const raggedness = widths.reduce((sum, lineWidth) => sum + Math.abs(Math.max(...widths) - lineWidth), 0)
    const candidate = { width, lineCount: result.lineCount, raggedness, result }
    if (
      best === null ||
      candidate.lineCount < best.lineCount ||
      (candidate.lineCount === best.lineCount && candidate.raggedness < best.raggedness)
    ) {
      best = candidate
    }
  }
  return best.result
}

function renderHeadline() {
  const result = chooseHeadlineWidth()
  headlineEl.innerHTML = result.lines.map(line => `<span>${line.text}</span>`).join('<br />')
}

const messages = [
  'English, 中文, and العربية should all feel intentional inside the same product shell.',
  'No DOM reflow probes. No guessing. Just measured multiline text.',
  'Editorial rhythm, balanced headers, tighter bubbles.',
]

function renderBubbles() {
  bubbleStackEl.innerHTML = ''
  let y = 18
  messages.forEach((text, index) => {
    const width = index === 1 ? 228 : 264
    const prepared = prepare(text, '16px "Avenir Next", "Helvetica Neue", sans-serif')
    const { height } = layout(prepared, width, 24)
    const bubble = document.createElement('div')
    bubble.className = 'bubble'
    bubble.style.top = `${y}px`
    bubble.style.left = index % 2 === 0 ? '20px' : '92px'
    bubble.style.width = `${width}px`
    bubble.style.height = `${height + 28}px`
    bubble.textContent = text
    bubbleStackEl.appendChild(bubble)
    y += height + 54
  })
}

const editorialText =
  'Browsers can paint beautiful text, but they rarely let interface authors steer it with precision. Pretext changes that tradeoff. Measure once, keep the hot path arithmetic-only, and shape each line as if typography were an application primitive rather than a side effect of the DOM.'

const obstacles = [
  { x: 318, y: 78, width: 180, height: 180 },
  { x: 0, y: 302, width: 152, height: 128 },
]

function renderEditorial() {
  editorialLinesEl.innerHTML = ''
  const prepared = prepareWithSegments(editorialText, '18px "Iowan Old Style", Georgia, serif')
  let cursor = { segmentIndex: 0, graphemeIndex: 0 }
  let y = 10
  const lineHeight = 32
  const columnWidth = window.innerWidth < 640 ? 300 : 500

  while (true) {
    const overlapping = obstacles.filter(block => y + lineHeight > block.y && y < block.y + block.height)
    const block = overlapping[0]
    const x = block ? block.x + block.width + 24 : 0
    const width = block ? Math.max(96, columnWidth - x) : columnWidth
    const line = layoutNextLine(prepared, cursor, width)
    if (line === null) break
    const lineEl = document.createElement('div')
    lineEl.className = 'editorial-line'
    lineEl.textContent = line.text
    lineEl.style.left = `${x}px`
    lineEl.style.top = `${y}px`
    editorialLinesEl.appendChild(lineEl)
    cursor = line.end
    y += lineHeight
  }
}

function renderAll() {
  renderHeadline()
  renderBubbles()
  renderEditorial()
}

renderAll()
window.addEventListener('resize', renderAll)
