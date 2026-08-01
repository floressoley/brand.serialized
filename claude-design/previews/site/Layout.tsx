import { NavLink, Outlet } from 'react-router-dom'
import serializedLogo from '../../../brand-kit/logo/serialized/serialized-horizontal-on-dark.svg'
import { BackToTop } from './BackToTop'
import { NAV_SECTIONS } from './nav-config'
import './Layout.css'

export function Layout() {
  return (
    <div className="site">
      <aside className="sidebar">
        <a href="/" className="sidebar__brand">
          <img src={serializedLogo} alt="Serialized" />
        </a>
        <div className="sidebar__label">Brand</div>
        <nav>
          <ul className="sidebar__nav">
            {NAV_SECTIONS.map((section) => (
              <li key={section.path}>
                <NavLink
                  to={section.path}
                  end={section.path === '/'}
                  className={({ isActive }) =>
                    ['sidebar__link', isActive ? 'sidebar__link--active' : ''].filter(Boolean).join(' ')
                  }
                >
                  {section.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <main className="content">
        <div className="content__inner">
          <Outlet />
        </div>
      </main>
      <BackToTop />
    </div>
  )
}
