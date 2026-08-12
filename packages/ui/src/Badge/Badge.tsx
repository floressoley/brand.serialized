import type { HTMLAttributes, ReactNode } from 'react'
import './Badge.css'

export type BadgeTone = 'neutral' | 'pass' | 'warning' | 'error' | 'info'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Maps to audit result severity: pass (green), warning, error, info, or neutral for non-severity labels */
  tone?: BadgeTone
  /** Shows a small status dot before the label */
  dot?: boolean
  children: ReactNode
}

export function Badge({ tone = 'neutral', dot = false, className, children, ...rest }: BadgeProps) {
  const classes = ['badge', `badge--${tone}`, className].filter(Boolean).join(' ')

  return (
    <span className={classes} {...rest}>
      {dot && <span className="badge__dot" />}
      {children}
    </span>
  )
}
