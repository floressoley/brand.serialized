/**
 * MagnetLines — a grid of thin bars that rotate to point at the cursor.
 * Faithful port of Sasha's reference implementation (serialized-sided
 * custom element `magnet-lines`): each bar's rotation is computed in JS on
 * every window `pointermove`, from that bar's own getBoundingClientRect()
 * center to the pointer, via `acos` (not `atan2` + CSS custom properties —
 * that was our own later optimization, not what the reference does).
 *
 * Rotation is unwrapped (kept within +/-180 deg of the bar's previous angle)
 * so a bar never spins the long way round mid-transition, and each bar
 * eases toward its target with a CSS transition rather than snapping.
 * On mount, all bars seed toward an anchor point off toward the hero
 * content so the grid starts "pointing" somewhere meaningful instead of at
 * whatever the base angle happens to be.
 *
 * Usage:
 *   <div style={{ position: 'relative', height: '100%' }}>
 *     <MagnetLines />
 *   </div>
 */
import { useEffect, useRef } from 'react'
import type { CSSProperties } from 'react'
import { computeBarAngle } from './angle'
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
  rows = 18,
  columns = 13,
  lineColor = 'var(--color-border-strong)',
  lineWidth = '1.4px',
  lineHeight = '17px',
  baseAngle = -10,
}: MagnetLinesProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const itemsRef = useRef<(HTMLSpanElement & { _prev?: number })[]>([])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const items = itemsRef.current
    items.forEach((item) => {
      item._prev = baseAngle
    })

    function onMove(pointer: { clientX: number; clientY: number }) {
      for (const item of items) {
        const rect = item.getBoundingClientRect()
        const centerX = rect.x + rect.width / 2
        const centerY = rect.y + rect.height / 2
        const prev = item._prev ?? baseAngle
        item._prev = computeBarAngle(centerX, centerY, pointer.clientX, pointer.clientY, prev)
        item.style.setProperty('--rotate', `${item._prev}deg`)
      }
    }

    window.addEventListener('pointermove', onMove, { passive: true })

    const raf = requestAnimationFrame(() => {
      const rect = container.getBoundingClientRect()
      onMove({
        clientX: rect.left - rect.width * 0.35,
        clientY: rect.top + rect.height * 0.55,
      })
    })

    return () => {
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [baseAngle])

  const total = rows * columns

  return (
    <div
      ref={containerRef}
      className="magnet-lines"
      style={
        {
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`,
        } as CSSProperties
      }
    >
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          ref={(el) => {
            if (el) itemsRef.current[i] = el
          }}
          className="magnet-lines__bar"
          style={
            {
              width: lineWidth,
              height: lineHeight,
              background: lineColor,
              '--rotate': `${baseAngle}deg`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  )
}
