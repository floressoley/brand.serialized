import type { HTMLAttributes, ReactNode } from 'react'
import './Card.css'

export interface CardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: ReactNode
  description?: ReactNode
  action?: ReactNode
  children?: ReactNode
}

export function Card({ title, description, action, className, children, ...rest }: CardProps) {
  const classes = ['card', className].filter(Boolean).join(' ')

  return (
    <div className={classes} {...rest}>
      {(title || description || action) && (
        <div className="card__header">
          <div>
            {title && <h3 className="card__title">{title}</h3>}
            {description && <p className="card__description">{description}</p>}
          </div>
          {action}
        </div>
      )}
      {children && <div className="card__body">{children}</div>}
    </div>
  )
}
