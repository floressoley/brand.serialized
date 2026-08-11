import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { InteractiveGrid } from '../../components/InteractiveGrid/InteractiveGrid'
import serializedLogo from '../../../brand-kit/logo/serialized/serialized-horizontal-on-dark.svg'
import { BackToTop } from './BackToTop'
import { NAV_SECTIONS } from './nav-config'
import './Layout.css'

function ChevronIcon({ expanded }: { expanded: boolean }) {
  return (
    <svg
      className={`sidebar__chevron${expanded ? ' sidebar__chevron--expanded' : ''}`}
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
    >
      <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M4 4L14 14M14 4L4 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export function Layout() {
  const location = useLocation()
  const [openPath, setOpenPath] = useState<string | null>(
    NAV_SECTIONS.find((s) => s.children && s.path !== '/' && location.pathname.startsWith(s.path))?.path ?? null,
  )
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
    setMobileNavOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (!location.hash) return
    const el = document.getElementById(location.hash.slice(1))
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [location.pathname, location.hash])

  useEffect(() => {
    document.body.style.overflow = mobileNavOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileNavOpen])

  return (
    <div className="site">
      <header className="mobile-topbar">
        <a href="/" className="mobile-topbar__brand">
          <img src={serializedLogo} alt="Serialized" />
        </a>
        <button
          type="button"
          className="mobile-topbar__toggle"
          aria-label="Open navigation"
          aria-expanded={mobileNavOpen}
          onClick={() => setMobileNavOpen(true)}
        >
          <MenuIcon />
        </button>
      </header>

      {mobileNavOpen && <div className="sidebar-overlay" onClick={() => setMobileNavOpen(false)} />}

      <aside className={`sidebar${mobileNavOpen ? ' sidebar--open' : ''}`}>
        <div className="sidebar__header">
          <a href="/" className="sidebar__brand">
            <img src={serializedLogo} alt="Serialized" />
          </a>
          <button
            type="button"
            className="sidebar__close"
            aria-label="Close navigation"
            onClick={() => setMobileNavOpen(false)}
          >
            <CloseIcon />
          </button>
        </div>
        <nav>
          <ul className="sidebar__nav">
            {NAV_SECTIONS.map((section, index) => {
              const hasChildren = !!section.children?.length
              const isOpen = hasChildren && openPath === section.path
              const previousGroup = NAV_SECTIONS[index - 1]?.group
              const showGroupHeader = section.group && section.group !== previousGroup
              return (
                <li key={section.path}>
                  {showGroupHeader && <div className="sidebar__group-label">{section.group}</div>}
                  <div className="sidebar__row">
                    <NavLink
                      to={section.path}
                      end={section.path === '/'}
                      className={({ isActive }) =>
                        ['sidebar__link', isActive ? 'sidebar__link--active' : ''].filter(Boolean).join(' ')
                      }
                    >
                      {section.label}
                    </NavLink>
                    {hasChildren && (
                      <button
                        type="button"
                        className="sidebar__toggle"
                        aria-label={isOpen ? `Collapse ${section.label}` : `Expand ${section.label}`}
                        onClick={() => setOpenPath(isOpen ? null : section.path)}
                      >
                        <ChevronIcon expanded={isOpen} />
                      </button>
                    )}
                  </div>
                  {hasChildren && isOpen && (
                    <ul className="sidebar__subnav">
                      {section.children!.map((child) => (
                        <li key={child.id}>
                          <Link
                            to={`${section.path}#${child.id}`}
                            className={[
                              'sidebar__sublink',
                              location.pathname === section.path && location.hash === `#${child.id}`
                                ? 'sidebar__sublink--active'
                                : '',
                            ]
                              .filter(Boolean)
                              .join(' ')}
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              )
            })}
          </ul>
        </nav>
      </aside>
      <main className="content">
        <div className="content-hero-bg">
          <InteractiveGrid />
        </div>
        <div className="content__inner content__inner--enter" key={location.pathname}>
          <Outlet />
        </div>
      </main>
      <BackToTop />
    </div>
  )
}
