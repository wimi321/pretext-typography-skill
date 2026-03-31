import { layoutNextLine, prepareWithSegments, type LayoutCursor } from '@chenglou/pretext'

type Rect = {
  x: number
  y: number
  width: number
  height: number
}

type PositionedLine = {
  x: number
  y: number
  text: string
  width: number
}

export function flowAroundRectangles(text: string, columnWidth: number, lineHeight: number, blocks: Rect[]) {
  const prepared = prepareWithSegments(text, '18px "Iowan Old Style", Georgia, serif')
  const lines: PositionedLine[] = []
  let cursor: LayoutCursor = { segmentIndex: 0, graphemeIndex: 0 }
  let y = 0

  while (true) {
    const overlapping = blocks.filter(block => y + lineHeight > block.y && y < block.y + block.height)
    const block = overlapping[0]
    const x = block ? block.x + block.width + 24 : 0
    const width = block ? Math.max(80, columnWidth - x) : columnWidth
    const line = layoutNextLine(prepared, cursor, width)
    if (line === null) break
    lines.push({ x, y, text: line.text, width: line.width })
    cursor = line.end
    y += lineHeight
  }

  return lines
}
