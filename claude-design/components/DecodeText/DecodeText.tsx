/**
 * DecodeText — the final text stays the same word (no layout jitter from
 * swapping between different-length words), but on mount — and again every
 * `loopEvery` ms, if set — it scrambles through random characters and
 * resolves left to right, one character locking in slightly after the
 * previous one, like HexHero's row-decode reveal applied to a headline
 * word instead of a canvas row.
 *
 * Plain DOM text (not canvas) so it inherits the surrounding heading's
 * actual font naturally — a canvas re-implementation would need to
 * reproduce Fraunces' variable-font settings and would render blurrier at
 * display-text sizes.
 */
import { useEffect, useRef, useState } from 'react'

export interface DecodeTextProps {
  text: string
  charset?: string
  durationMs?: number
  loopEveryMs?: number
  className?: string
}

const DEFAULT_CHARSET = 'abcdefghijklmnopqrstuvwxyz'

export function DecodeText({
  text,
  charset = DEFAULT_CHARSET,
  durationMs = 900,
  loopEveryMs,
  className = '',
}: DecodeTextProps) {
  const [display, setDisplay] = useState(text)
  const rafRef = useRef(0)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      setDisplay(text)
      return
    }

    function randomChar() {
      return charset[(Math.random() * charset.length) | 0]
    }

    function scrambleOnce() {
      const start = performance.now()
      const perCharMs = durationMs / text.length

      function tick(now: number) {
        const elapsed = now - start
        let out = ''
        for (let i = 0; i < text.length; i++) {
          if (text[i] === ' ') {
            out += ' '
            continue
          }
          const lockAt = (i + 1) * perCharMs
          out += elapsed >= lockAt ? text[i] : randomChar()
        }
        setDisplay(out)

        if (elapsed < durationMs) {
          rafRef.current = requestAnimationFrame(tick)
        } else {
          setDisplay(text)
        }
      }
      rafRef.current = requestAnimationFrame(tick)
    }

    scrambleOnce()
    const intervalId = loopEveryMs ? window.setInterval(scrambleOnce, loopEveryMs) : undefined

    return () => {
      cancelAnimationFrame(rafRef.current)
      if (intervalId) clearInterval(intervalId)
    }
  }, [text, charset, durationMs, loopEveryMs])

  return <span className={className}>{display}</span>
}
