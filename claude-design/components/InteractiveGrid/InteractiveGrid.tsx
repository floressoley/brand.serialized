/**
 * InteractiveGrid — a full-bleed grid of short lines, each rotating to
 * point at the cursor (same idea as MagnetLines), eased toward its target
 * angle every frame rather than snapping. Before the cursor ever enters the
 * grid, every line sits at a static baseAngle instead of pointing at some
 * arbitrary spot — defaulted to -68deg to match the logomark's "//" slash
 * tilt (measured directly off serialized-logomark-on-dark.svg's bar
 * vertices via atan2, ~68.06deg off horizontal — rechecked after the
 * 2026-08-06 logomark thickening, which widened the mark slightly and
 * shifted the angle ~0.5deg from the prior ~67.53deg). Note this component's
 * baseAngle is measured from horizontal (0deg = flat), NOT the same
 * convention as MagnetLines' baseAngle, which rotates a vertical bar via
 * CSS `rotate()` and so is measured from vertical — a MagnetLines angle of
 * -10 is nowhere near a -10 here; they don't carry over 1:1.
 *
 * Proximity to the cursor no longer cycles hue — every line is our single
 * accent color — proximity instead smoothstep-interpolates each line's RGB
 * from the dim neutral tone to the full accent color, so the highlighted
 * area reads as a soft gradient falloff rather than a hard-edged circle at
 * the minProximity boundary.
 *
 * Grid points and their current angle live in flat arrays (not per-point
 * objects/closures) rebuilt only on resize, so the per-frame cost is just
 * numeric math + canvas draws — no allocation in the animation loop.
 */
import { useEffect, useRef } from 'react'
import './InteractiveGrid.css'

export interface InteractiveGridProps {
  dotDistance?: number
  lineLength?: number
  lineWidth?: number
  minProximity?: number
  accentColor?: string
  dimColor?: string
  ease?: number
  baseAngle?: number
}

export function InteractiveGrid({
  dotDistance = 18,
  lineLength = 12,
  lineWidth = 1.4,
  minProximity = 150,
  accentColor = 'var(--color-accent-serialized)',
  dimColor = 'var(--color-border-strong)',
  ease = 0.15,
  baseAngle = -68,
}: InteractiveGridProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return
    const ctx = canvas.getContext('2d')!

    function resolveColor(value: string): string {
      if (value.startsWith('#') || value.startsWith('rgb')) return value
      const probe = document.createElement('span')
      probe.style.color = value
      container!.appendChild(probe)
      const computed = getComputedStyle(probe).color
      container!.removeChild(probe)
      return computed
    }
    const accentRgb = resolveColor(accentColor).match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/)
    const [ar, ag, ab] = accentRgb ? accentRgb.slice(1, 4).map(Number) : [126, 171, 245]
    const dimRgb = resolveColor(dimColor).match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/)
    const [dr, dg, db] = dimRgb ? dimRgb.slice(1, 4).map(Number) : [80, 80, 80]

    const baseAngleRad = (baseAngle * Math.PI) / 180

    let pointsX: Float32Array = new Float32Array(0)
    let pointsY: Float32Array = new Float32Array(0)
    let angles: Float32Array = new Float32Array(0)
    let w = 0
    let h = 0
    const mouse = { x: 0, y: 0 }
    let hasPointer = false
    // Falloff spans from full accent at innerRadius out to fully dim at
    // outerRadius — a wider outer band than minProximity so the gradient
    // tapers gradually into the background instead of ending at a fixed
    // radius.
    const innerRadius = minProximity * 0.35
    const outerRadius = minProximity * 2.2

    function buildGrid() {
      const cols = Math.ceil(w / dotDistance) + 1
      const rows = Math.ceil(h / dotDistance) + 1
      const total = cols * rows
      pointsX = new Float32Array(total)
      pointsY = new Float32Array(total)
      angles = new Float32Array(total)
      let i = 0
      for (let cx = 0; cx < cols; cx++) {
        for (let cy = 0; cy < rows; cy++) {
          pointsX[i] = cx * dotDistance
          pointsY[i] = cy * dotDistance
          angles[i] = baseAngleRad
          i++
        }
      }
    }

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = container!.getBoundingClientRect()
      w = Math.max(1, rect.width)
      h = Math.max(1, rect.height)
      canvas!.width = w * dpr
      canvas!.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      buildGrid()
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(container)

    function onMove(e: PointerEvent) {
      const rect = container!.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
      hasPointer = true
    }
    window.addEventListener('pointermove', onMove, { passive: true })

    let raf = 0
    function animate() {
      raf = requestAnimationFrame(animate)
      ctx.clearRect(0, 0, w, h)
      ctx.lineWidth = lineWidth
      ctx.lineCap = 'round'

      const half = lineLength / 2
      for (let i = 0; i < pointsX.length; i++) {
        const x = pointsX[i]
        const y = pointsY[i]
        const dX = x - mouse.x
        const dY = y - mouse.y
        const dist = Math.sqrt(dX * dX + dY * dY)

        const target = hasPointer ? Math.atan2(-dY, -dX) : baseAngleRad
        let diff = target - angles[i]
        while (diff > Math.PI) diff -= Math.PI * 2
        while (diff < -Math.PI) diff += Math.PI * 2
        angles[i] += diff * ease

        const t = hasPointer ? Math.max(0, Math.min(1, (outerRadius - dist) / (outerRadius - innerRadius))) : 0
        const st = t * t * (3 - 2 * t) // smoothstep — gradient falloff, no hard-edged circle
        const r = dr + (ar - dr) * st
        const g = dg + (ag - dg) * st
        const b = db + (ab - db) * st
        ctx.strokeStyle = `rgb(${r}, ${g}, ${b})`

        const dx = Math.cos(angles[i]) * half
        const dy = Math.sin(angles[i]) * half
        ctx.beginPath()
        ctx.moveTo(x - dx, y - dy)
        ctx.lineTo(x + dx, y + dy)
        ctx.stroke()
      }
    }
    raf = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      window.removeEventListener('pointermove', onMove)
    }
  }, [dotDistance, lineLength, lineWidth, minProximity, accentColor, dimColor, ease, baseAngle])

  return (
    <div ref={containerRef} className="interactive-grid">
      <canvas ref={canvasRef} className="interactive-grid__canvas" />
    </div>
  )
}
