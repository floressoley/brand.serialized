/**
 * AnimatedWord — cycles through a list of words in place using a clip-path
 * wipe: the outgoing word's clip region collapses away to the right while
 * translating slightly right, and the incoming word's clip region wipes
 * open left-to-right while easing back to its resting position. Two
 * persistent, absolutely-stacked spans alternate the "front"/"back" role
 * each cycle — the animation classes are applied imperatively via refs
 * (forcing a reflow between removing and re-adding a class so the
 * keyframes restart every time), not through React state/re-render, so
 * there's no risk of a keyframe animation silently failing to restart on
 * a reused element.
 *
 * The container is sized once, up front, to fit the longest word (a
 * hidden measurer renders every word off-screen and takes the max width)
 * so swapping between short and long words never reflows the heading.
 */
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import './AnimatedWord.css'

export interface AnimatedWordProps {
  words: string[]
  holdMs?: number
  animationMs?: number
  className?: string
}

export function AnimatedWord({ words, holdMs = 1000, animationMs = 2000, className = '' }: AnimatedWordProps) {
  const containerRef = useRef<HTMLSpanElement | null>(null)
  const measureRef = useRef<HTMLSpanElement | null>(null)
  const spanARef = useRef<HTMLSpanElement | null>(null)
  const spanBRef = useRef<HTMLSpanElement | null>(null)
  const [width, setWidth] = useState<number | undefined>(undefined)
  const [height, setHeight] = useState<number | undefined>(undefined)

  useLayoutEffect(() => {
    const measure = measureRef.current
    if (!measure) return
    let maxWidth = 0
    let maxHeight = 0
    for (const child of Array.from(measure.children)) {
      maxWidth = Math.max(maxWidth, (child as HTMLElement).offsetWidth)
      maxHeight = Math.max(maxHeight, (child as HTMLElement).offsetHeight)
    }
    setWidth(maxWidth)
    setHeight(maxHeight)
  }, [words])

  useEffect(() => {
    const spanA = spanARef.current
    const spanB = spanBRef.current
    if (!spanA || !spanB || words.length < 2) return

    spanA.textContent = words[0]
    spanB.textContent = words[1] ?? words[0]
    spanA.classList.remove('animated-word__item--in', 'animated-word__item--out')
    spanB.classList.remove('animated-word__item--in', 'animated-word__item--out')

    let frontIndex = 0
    let front = spanA
    let back = spanB

    function play(el: HTMLSpanElement, direction: 'in' | 'out') {
      el.classList.remove('animated-word__item--in', 'animated-word__item--out')
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      el.offsetWidth // force reflow so the animation restarts even if this class was used before
      el.classList.add(direction === 'in' ? 'animated-word__item--in' : 'animated-word__item--out')
    }

    const id = setInterval(() => {
      const nextIndex = (frontIndex + 1) % words.length
      back.textContent = words[nextIndex]
      play(front, 'out')
      play(back, 'in')
      frontIndex = nextIndex
      const tmp = front
      front = back
      back = tmp
    }, holdMs + animationMs)

    return () => clearInterval(id)
  }, [words, holdMs, animationMs])

  return (
    <span
      ref={containerRef}
      className={`animated-word ${className}`}
      style={{ width, height, animationDuration: `${animationMs}ms` }}
    >
      <span ref={measureRef} className="animated-word__measure" aria-hidden="true">
        {words.map((word) => (
          <span key={word}>{word}</span>
        ))}
      </span>
      <span ref={spanARef} className="animated-word__item" />
      <span ref={spanBRef} className="animated-word__item" />
      <span className="animated-word__sr-only">{words[0]}</span>
    </span>
  )
}
