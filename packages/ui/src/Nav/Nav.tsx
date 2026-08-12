import type { HTMLAttributes, ReactNode } from 'react'
import './Nav.css'

export interface NavLinkItem {
  label: string
  href: string
  active?: boolean
}

export interface NavProps extends HTMLAttributes<HTMLElement> {
  /** Pass a logo SVG/img — see brand-kit/logo for the correct on-dark/on-light variant */
  brand: ReactNode
  links?: NavLinkItem[]
  actions?: ReactNode
}

export function Nav({ brand, links = [], actions, className, ...rest }: NavProps) {
  return (
    <nav className={['nav', className].filter(Boolean).join(' ')} {...rest}>
      <div className="nav__brand">{brand}</div>
      {links.length > 0 && (
        <ul className="nav__links">
          {links.map((link) => (
            <li key={link.href}>
              <a
                className={['nav__link', link.active ? 'nav__link--active' : ''].filter(Boolean).join(' ')}
                href={link.href}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
      {actions && <div className="nav__actions">{actions}</div>}
    </nav>
  )
}
