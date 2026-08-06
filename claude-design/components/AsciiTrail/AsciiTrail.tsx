/**
 * AsciiTrail — a canvas overlay that spawns small glyph particles along the
 * cursor's path, which drift up and fade out. Faithful port of Sasha's
 * reference `ascii-trail` custom element from serialized-sided: listens on
 * `window` for pointermove (so it reacts even though the canvas itself has
 * `pointer-events: none`), walks the swept segment between the last and
 * current point so fast movement doesn't leave gaps, and gives each spawned
 * particle a random glyph, a slight random offset, upward velocity with
 * gravity, and an age-based fade using the accent color.
 *
 * `data-no-trail` on an ancestor of whatever's under the cursor opts that
 * area out (e.g. so text/buttons don't get glyphs spawned over them).
 */
import { useEffect, useRef } from 'react'

export interface AsciiTrailProps {
  accent?: string
  size?: number
  density?: number
  life?: number
  glyphs?: string
}

const DEFAULT_GLYPHS = '01{}[]<>/\\;:_-+=~^$#*01010110abcdef'

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace('#', '')
  const full = h.length === 3
    ? h.split('').map((c) => c + c).join('')
    : h
  const n = parseInt(full, 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}

interface Particle {
  x: number
  y: number
  ch: string
  born: number
  vy: number
  vx: number
}

export function AsciiTrail({
  accent = 'var(--color-accent-serialized)',
  size = 15,
  density = 1,
  life = 900,
  glyphs = DEFAULT_GLYPHS,
}: AsciiTrailProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const canvas = document.createElement('canvas')
    canvas.style.cssText = 'width:100%;height:100%;display:block;'
    container.appendChild(canvas)
    const ctx = canvas.getContext('2d')!
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const resolvedAccent = accent.startsWith('#')
      ? accent
      : (() => {
          const probe = document.createElement('span')
          probe.style.color = accent
          container.appendChild(probe)
          const computed = getComputedStyle(probe).color
          container.removeChild(probe)
          const match = computed.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/)
          return match ? `#${(+match[1]).toString(16).padStart(2, '0')}${(+match[2]).toString(16).padStart(2, '0')}${(+match[3]).toString(16).padStart(2, '0')}` : '#FF5C1C'
        })()
    const [R, G, B] = hexToRgb(resolvedAccent)

    const fontProbe = document.createElement('span')
    fontProbe.style.fontFamily = 'var(--font-mono)'
    container.appendChild(fontProbe)
    const monoFontFamily = getComputedStyle(fontProbe).fontFamily
    container.removeChild(fontProbe)

    let W = 1
    let H = 1
    function resize() {
      const r = container!.getBoundingClientRect()
      W = Math.max(1, r.width)
      H = Math.max(1, r.height)
      canvas.width = W * dpr
      canvas.height = H * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.font = `400 ${size}px ${monoFontFamily}`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(container)

    const parts: Particle[] = []
    let last = { x: 0, y: 0, on: false }

    function onMove(e: PointerEvent) {
      const r = container!.getBoundingClientRect()
      const x = e.clientX - r.left
      const y = e.clientY - r.top
      const inside = x >= 0 && x <= r.width && y >= 0 && y <= r.height
      if (!inside) {
        last.on = false
        return
      }
      const over = document.elementFromPoint(e.clientX, e.clientY)
      if (over && over.closest && over.closest('[data-no-trail]')) {
        last.on = false
        return
      }
      if (last.on) {
        const dx = x - last.x
        const dy = y - last.y
        const dist = Math.hypot(dx, dy)
        const steps = Math.max(1, Math.floor(dist / (26 / density)))
        for (let i = 0; i < steps; i++) {
          const t = i / steps
          parts.push({
            x: last.x + dx * t + (Math.random() - 0.5) * 10,
            y: last.y + dy * t + (Math.random() - 0.5) * 10,
            ch: glyphs[(Math.random() * glyphs.length) | 0],
            born: performance.now(),
            vy: -8 - Math.random() * 14,
            vx: (Math.random() - 0.5) * 12,
          })
        }
        if (parts.length > 400) parts.splice(0, parts.length - 400)
      }
      last.x = x
      last.y = y
      last.on = true
    }
    window.addEventListener('pointermove', onMove, { passive: true })

    let raf = 0
    function loop() {
      raf = requestAnimationFrame(loop)
      ctx.clearRect(0, 0, W, H)
      const now = performance.now()
      for (let i = parts.length - 1; i >= 0; i--) {
        const p = parts[i]
        const age = (now - p.born) / life
        if (age >= 1) {
          parts.splice(i, 1)
          continue
        }
        const dt = 1 / 60
        p.x += p.vx * dt
        p.y += p.vy * dt
        p.vy += 12 * dt
        const alpha = (1 - age) * 0.9
        ctx.fillStyle = `rgba(${R}, ${G}, ${B}, ${alpha})`
        ctx.fillText(p.ch, p.x, p.y)
      }
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      window.removeEventListener('pointermove', onMove)
      container!.removeChild(canvas)
    }
  }, [accent, size, density, life, glyphs])

  return <div ref={containerRef} style={{ width: '100%', height: '100%', pointerEvents: 'none' }} />
}
