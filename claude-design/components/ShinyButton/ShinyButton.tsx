import type { ButtonHTMLAttributes, ReactNode } from 'react'
import './ShinyButton.css'

export interface ShinyButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
}

export function ShinyButton({ children, className = '', ...rest }: ShinyButtonProps) {
  return (
    <button className={`shiny-cta ${className}`} {...rest}>
      <span>{children}</span>
    </button>
  )
}
