/**
 * HexHero — a canvas of near-invisible hex-noise rows where one row at a
 * time "decodes" into a readable on-chain metric (or a wallet address),
 * sweeping left-to-right, holding, then dissolving back to noise. Hovering
 * a row shows a metric label tracking the cursor's x position, as if you're
 * scrubbing through live fields.
 *
 * Faithful port of Sasha's reference `hex-hero` custom element, including
 * its state machine (pause -> sweep -> hold -> dissolve), pacing presets,
 * and the exact reveal vocabulary pulled from the reference build.
 */
import { useEffect, useRef } from 'react'

export interface HexHeroProps {
  accent?: string
  bg?: string
  pace?: 'calm' | 'live' | 'rapid'
}

const REVEALS: { t: string; risk: boolean }[] = [
  { t: '0x', risk: true },
  { t: 'buy/sell 1.34', risk: false },
  { t: 'symbol resolved', risk: false },
  { t: 'txns 24h 8,412', risk: true },
  { t: 'metadata synced', risk: false },
  { t: 'top10 hold 41%', risk: false },
  { t: 'price 30d +42%', risk: true },
  { t: 'age 148 days', risk: false },
  { t: 'ATH $0.1912', risk: true },
  { t: 'circulating 62%', risk: false },
  { t: 'total supply 1e9', risk: false },
  { t: 'transfers 1,204/h', risk: true },
  { t: 'FDV $88.2M', risk: true },
  { t: 'liquidity $842k', risk: false },
  { t: 'ohlcv 1m backfilled', risk: false },
  { t: 'liquidity locked', risk: false },
  { t: 'decimals 18', risk: false },
  { t: 'price $0.04213', risk: true },
  { t: 'chain: ethereum', risk: false },
  { t: 'first tx block 12.9M', risk: false },
  { t: 'holders 48,201', risk: true },
  { t: '24h vol $1.28M', risk: true },
  { t: 'pairs indexed 37', risk: false },
  { t: 'realized cap $9.1M', risk: true },
  { t: 'market cap $12.4M', risk: false },
  { t: 'logo + socials ok', risk: false },
  { t: 'price feed live', risk: true },
  { t: 'volume/liq 1.52', risk: false },
]

const VERDICT_LABELS = [
  'price_usd',
  'market_cap',
  'volume_24h',
  'liquidity_usd',
  'holder_count',
  'total_supply',
  'fdv_usd',
  'circulating',
  'tx_count_24h',
  'ath_price',
  'pair_count',
  'price_feed',
  'ohlcv_1m',
]

const PACE = {
  calm: { pause: 2200, sweep: 1600, hold: 2100, ambient: 1 },
  live: { pause: 700, sweep: 1200, hold: 1300, ambient: 2 },
  rapid: { pause: 160, sweep: 620, hold: 560, ambient: 5 },
}

function hexc() {
  return '0123456789abcdef'[(Math.random() * 16) | 0]
}

interface Row {
  chars: string[]
  offset: number
  shade: string
  reveal: { text: string; start: number; risk: boolean } | null
}

export function HexHero({ accent = 'var(--color-accent-serialized)', bg = 'var(--color-background)', pace = 'live' }: HexHeroProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    function resolveColor(value: string): string {
      if (value.startsWith('#') || value.startsWith('rgb')) return value
      const probe = document.createElement('span')
      probe.style.color = value
      container!.appendChild(probe)
      const computed = getComputedStyle(probe).color
      container!.removeChild(probe)
      return computed
    }

    const resolvedAccent = resolveColor(accent)

    // Idle/noise colors are computed as small steps up from the actual
    // resolved --color-background (not hardcoded hex borrowed from the
    // reference build, nor jumped all the way to the surface-scale tokens —
    // both read as too bright/prominent for what's meant to be a barely-
    // there texture) so they always stay a subtle, near-invisible step
    // above bg regardless of what the background token resolves to.
    const resolvedBg = resolveColor(bg)
    const bgMatch = resolvedBg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/)
    const [bgR, bgG, bgB] = bgMatch ? [+bgMatch[1], +bgMatch[2], +bgMatch[3]] : [15, 15, 15]
    function lighten(amount: number) {
      const clamp = (n: number) => Math.min(255, n)
      return `rgb(${clamp(bgR + amount)}, ${clamp(bgG + amount)}, ${clamp(bgB + amount)})`
    }
    const noiseLow = lighten(2)
    const noiseMid = lighten(4)
    const noiseHigh = lighten(7)
    const dimGray = lighten(14)
    const neutralReveal = resolveColor('var(--color-text-secondary)')

    const fontProbe = document.createElement('span')
    fontProbe.style.fontFamily = 'var(--font-mono)'
    container.appendChild(fontProbe)
    const monoFontFamily = getComputedStyle(fontProbe).fontFamily
    container.removeChild(fontProbe)

    const canvas = document.createElement('canvas')
    canvas.style.cssText = 'display:block;width:100%;height:100%;'
    container.appendChild(canvas)
    const ctx = canvas.getContext('2d')!

    const fontSize = 14
    const rowH = 25
    const paceCfg = PACE[pace]

    let w = 0
    let h = 0
    let charW = 1
    let nChars = 0
    let nRows = 0
    let rows: Row[] = []
    let phase: 'pause' | 'sweep' | 'hold' | 'dissolve' = 'pause'
    let phaseT0 = Date.now()
    let active = -1
    let sweepX = 0
    let hoverRow: number | null = null
    let hoverX = 0
    let hoverVerdict = VERDICT_LABELS[0]

    function font() {
      return `400 ${fontSize}px ${monoFontFamily}`
    }

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      const rect = container!.getBoundingClientRect()
      if (rect.width === 0 || rect.height === 0) return
      w = rect.width
      h = rect.height
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.font = font()
      charW = ctx.measureText('0').width

      nChars = Math.ceil(w / charW) + 2
      nRows = Math.ceil(h / rowH) + 1

      rows = []
      for (let r = 0; r < nRows; r++) {
        rows.push({
          chars: Array.from({ length: nChars }, hexc),
          offset: -Math.random() * charW,
          shade: Math.random() < 0.22 ? noiseHigh : Math.random() < 0.5 ? noiseMid : noiseLow,
          reveal: null,
        })
      }
      phase = 'pause'
      phaseT0 = Date.now()
      active = -1
      hoverRow = null
    }
    resize()
    const ro = new ResizeObserver(() => {
      clearTimeout(resizeTimer)
      resizeTimer = window.setTimeout(resize, 100)
    })
    let resizeTimer = 0
    ro.observe(container)

    function startSweep(now: number) {
      active = Math.floor(Math.random() * nRows)
      const row = rows[active]
      const fits = REVEALS.filter((rv) => (rv.t.startsWith('0x') ? 15 : rv.t.length) <= nChars - 6)
      const rv = fits.length ? fits[Math.floor(Math.random() * fits.length)] : { t: 'price feed live', risk: true }
      let text = rv.t
      if (text.startsWith('0x')) text = `0x${Array.from({ length: 12 }, hexc).join('')}…`
      row.reveal = { text, start: Math.max(1, Math.floor((nChars - text.length) / 2)), risk: rv.risk }
      sweepX = -4
      phase = 'sweep'
      phaseT0 = now
    }

    function onMouseMove(e: MouseEvent) {
      const rect = container!.getBoundingClientRect()
      const my = e.clientY - rect.top
      hoverX = e.clientX - rect.left
      const r = Math.round((my - rowH / 2 - 6) / rowH)
      const rc = Math.max(0, Math.min(nRows - 1, r))
      if (rc !== hoverRow) {
        hoverRow = rc
        hoverVerdict = VERDICT_LABELS[Math.floor(Math.random() * VERDICT_LABELS.length)]
      }
    }
    function onMouseLeave() {
      hoverRow = null
    }
    container.style.pointerEvents = 'auto'
    container.addEventListener('mousemove', onMouseMove)
    container.addEventListener('mouseleave', onMouseLeave)

    function draw(dt: number) {
      ctx.clearRect(0, 0, w, h)
      ctx.font = font()
      ctx.textBaseline = 'middle'

      for (let r = 0; r < nRows; r++) {
        const row = rows[r]
        const y = rowH * r + rowH / 2 + 6

        if (r !== active) {
          if (r === hoverRow) {
            const label = hoverVerdict
            let ci = Math.round((hoverX - row.offset) / charW)
            ci = Math.max(0, Math.min(nChars - label.length, ci))
            let hx = row.offset
            for (let i = 0; i < nChars; i++) {
              const inLabel = i >= ci && i < ci + label.length
              let ch = row.chars[i]
              let col = dimGray
              if (inLabel) {
                ch = label[i - ci]
                col = resolvedAccent
              }
              if (ch !== ' ') {
                ctx.fillStyle = col
                ctx.fillText(ch, hx, y)
              }
              hx += charW
            }
            continue
          }
          ctx.fillStyle = row.shade
          ctx.fillText(row.chars.join(''), row.offset, y)
          continue
        }

        const rv = row.reveal
        const revealCol = rv && rv.risk ? resolvedAccent : neutralReveal
        for (let i = 0; i < nChars; i++) {
          const x = row.offset + i * charW
          let ch = row.chars[i]
          let col = noiseLow
          const inReveal = !!rv && i >= rv.start && i < rv.start + rv.text.length

          if (phase === 'sweep') {
            const d = sweepX - i
            if (d >= 0) {
              if (inReveal) {
                ch = rv!.text[i - rv!.start]
                col = revealCol
              } else {
                col = dimGray
              }
            }
            if (d >= 0 && d < 3) {
              col = resolvedAccent
              if (!inReveal) ch = hexc()
            }
          } else if (phase === 'hold') {
            if (inReveal) {
              ch = rv!.text[i - rv!.start]
              col = revealCol
            } else {
              col = dimGray
            }
          } else if (phase === 'dissolve') {
            const p = dt / 350
            if (inReveal && Math.random() > p) {
              ch = rv!.text[i - rv!.start]
              col = revealCol
            } else {
              col = noiseLow
            }
          }

          if (ch === ' ') continue
          ctx.fillStyle = col
          ctx.fillText(ch, x, y)
        }
      }
    }

    let raf = 0
    function animate() {
      raf = requestAnimationFrame(animate)
      const now = Date.now()

      for (let i = 0; i < paceCfg.ambient; i++) {
        const r = rows[Math.floor(Math.random() * nRows)]
        if (!r) continue
        const idx = Math.floor(Math.random() * nChars)
        r.chars[idx] = hexc()
      }

      const dt = now - phaseT0
      if (phase === 'pause' && dt > paceCfg.pause) {
        startSweep(now)
      } else if (phase === 'sweep') {
        sweepX = (dt / paceCfg.sweep) * nChars
        if (sweepX >= nChars + 4) {
          phase = 'hold'
          phaseT0 = now
        }
      } else if (phase === 'hold' && dt > paceCfg.hold) {
        phase = 'dissolve'
        phaseT0 = now
      } else if (phase === 'dissolve') {
        if (dt > 350) {
          const row = rows[active]
          if (row) row.reveal = null
          active = -1
          phase = 'pause'
          phaseT0 = now
        }
      }

      draw(dt)
    }
    raf = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      clearTimeout(resizeTimer)
      container!.removeEventListener('mousemove', onMouseMove)
      container!.removeEventListener('mouseleave', onMouseLeave)
      container!.removeChild(canvas)
    }
  }, [accent, bg, pace])

  return <div ref={containerRef} style={{ width: '100%', height: '100%', position: 'relative', background: bg }} />
}
