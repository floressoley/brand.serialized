/**
 * MagnetLines — a grid of thin bars that rotate to point at the cursor,
 * easing back on pointerleave. Pure DOM/CSS, no canvas.
 *
 * Perf note: bar centers are computed once (mount + resize) from the grid
 * math, not read from the DOM per frame — interleaving getBoundingClientRect
 * reads with style writes across 1,200 elements forces a synchronous layout
 * on every element, every frame, which is what makes the effect stutter or
 * appear frozen. Pointermove only reads the container's rect once, then
 * writes transforms in a single pass.
 *
 * Usage:
 *   <div style={{ position: 'relative', height: '100vh' }}>
 *     <MagnetLines />
 *   </div>
 */
import { useEffect, useRef } from 'react'
import './MagnetLines.css'

export interface MagnetLinesProps {
  rows?: number
  columns?: number
  lineColor?: string
  lineWidth?: string
  lineHeight?: string
  baseAngle?: number
}

export function MagnetLines({
  rows = 40,
  columns = 30,
  lineColor = '#2C2C2A',
  lineWidth = '1.4px',
  lineHeight = '17px',
  baseAngle = 15,
}: MagnetLinesProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const spansRef = useRef<HTMLSpanElement[]>([])
  const centersRef = useRef<{ cx: number; cy: number }[]>([])
  const pointerRef = useRef<{ x: number; y: number } | null>(null)
  const rafRef = useRef(0)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    function recomputeCenters() {
      const el = containerRef.current
      if (!el) return
      const { width, height } = el.getBoundingClientRect()
      const cellW = width / columns
      const cellH = height / rows
      const centers: { cx: number; cy: number }[] = []
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns; col++) {
          centers.push({ cx: (col + 0.5) * cellW, cy: (row + 0.5) * cellH })
        }
      }
      centersRef.current = centers
    }

    function applyRotations() {
      const pointer = pointerRef.current
      const centers = centersRef.current
      const spans = spansRef.current

      for (let i = 0; i < spans.length; i++) {
        const span = spans[i]
        const center = centers[i]
        if (!span || !center) continue

        let angleDeg = baseAngle
        if (pointer) {
          const dx = pointer.x - center.cx
          const dy = pointer.y - center.cy
          angleDeg = (Math.atan2(dy, dx) * 180) / Math.PI + 90
        }

        span.style.transform = `rotate(${angleDeg}deg)`
      }

      rafRef.current = 0
    }

    function scheduleUpdate() {
      if (rafRef.current) return
      rafRef.current = requestAnimationFrame(applyRotations)
    }

    function handlePointerMove(event: PointerEvent) {
      const rect = container!.getBoundingClientRect()
      pointerRef.current = { x: event.clientX - rect.left, y: event.clientY - rect.top }
      scheduleUpdate()
    }

    function handlePointerLeave() {
      pointerRef.current = null
      scheduleUpdate()
    }

    function handleResize() {
      recomputeCenters()
      scheduleUpdate()
    }

    recomputeCenters()
    scheduleUpdate()

    container.addEventListener('pointermove', handlePointerMove)
    container.addEventListener('pointerleave', handlePointerLeave)
    window.addEventListener('resize', handleResize)

    return () => {
      container.removeEventListener('pointermove', handlePointerMove)
      container.removeEventListener('pointerleave', handlePointerLeave)
      window.removeEventListener('resize', handleResize)
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = 0
      }
    }
  }, [rows, columns, baseAngle])

  const total = rows * columns

  return (
    <div
      ref={containerRef}
      className="magnet-lines"
      style={{
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
      }}
    >
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          ref={(el) => {
            if (el) spansRef.current[i] = el
          }}
          className="magnet-lines__bar"
          style={{
            width: lineWidth,
            height: lineHeight,
            background: lineColor,
            transform: `rotate(${baseAngle}deg)`,
          }}
        />
      ))}
    </div>
  )
}
