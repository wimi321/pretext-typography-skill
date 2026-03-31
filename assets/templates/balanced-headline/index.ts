import { layoutWithLines, prepareWithSegments, walkLineRanges } from '@chenglou/pretext'

type Candidate = {
  width: number
  lineCount: number
  raggedness: number
}

function scoreCandidate(widths: number[]): number {
  const widest = Math.max(...widths)
  return widths.reduce((sum, width) => sum + Math.abs(widest - width), 0)
}

export function balanceHeadline(text: string, minWidth: number, maxWidth: number) {
  const prepared = prepareWithSegments(text, '700 64px "Iowan Old Style", Georgia, serif')
  let best: Candidate | null = null

  for (let width = minWidth; width <= maxWidth; width += 8) {
    const lineWidths: number[] = []
    walkLineRanges(prepared, width, line => {
      lineWidths.push(line.width)
    })
    const candidate = {
      width,
      lineCount: lineWidths.length,
      raggedness: scoreCandidate(lineWidths),
    }
    if (
      best === null ||
      candidate.lineCount < best.lineCount ||
      (candidate.lineCount === best.lineCount && candidate.raggedness < best.raggedness)
    ) {
      best = candidate
    }
  }

  if (best === null) throw new Error('Failed to find a headline layout.')
  return layoutWithLines(prepared, best.width, 68)
}
