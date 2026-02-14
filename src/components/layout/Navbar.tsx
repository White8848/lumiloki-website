import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { NAV_LINKS } from '../../utils/constants'
import { cn } from '../../utils/cn'
import { useScrollPosition } from '../../hooks/useScrollPosition'
import MobileMenu from './MobileMenu'
import styles from './Navbar.module.css'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { isScrolled } = useScrollPosition()
  const location = useLocation()

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <header className={cn(styles.navbar, isScrolled && styles.scrolled)}>
        <div className={cn('container', styles.inner)}>
          <NavLink to="/" className={styles.logo}>
            LUMILOKI
          </NavLink>

          <nav className={styles.desktopNav}>
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  cn(styles.navLink, isActive && styles.navLinkActive)
                }
                end={link.path === '/'}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <button
            className={cn(styles.hamburger, menuOpen && styles.hamburgerOpen)}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? '关闭菜单' : '打开菜单'}
          >
            <span className={styles.hamburgerLine} />
            <span className={styles.hamburgerLine} />
            <span className={styles.hamburgerLine} />
          </button>
        </div>
      </header>

      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}
