import { layout, prepare } from '@chenglou/pretext'

type BubbleMetrics = {
  width: number
  height: number
  lineCount: number
}

export function measureBubble(text: string, targetWidth: number): BubbleMetrics {
  const prepared = prepare(text, '16px "SF Pro Text", "Helvetica Neue", sans-serif')
  const { height, lineCount } = layout(prepared, targetWidth, 22)
  return {
    width: targetWidth,
    height,
    lineCount,
  }
}
