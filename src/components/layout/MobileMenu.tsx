import { NavLink } from 'react-router-dom'
import { NAV_LINKS } from '../../utils/constants'
import { cn } from '../../utils/cn'
import styles from './MobileMenu.module.css'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  return (
    <>
      <div
        className={cn(styles.overlay, isOpen && styles.overlayOpen)}
        onClick={onClose}
      />
      <nav className={cn(styles.menu, isOpen && styles.menuOpen)}>
        {NAV_LINKS.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              cn(styles.menuLink, isActive && styles.menuLinkActive)
            }
            onClick={onClose}
            end={link.path === '/'}
          >
            {link.label}
          </NavLink>
        ))}
        <div className={styles.menuFooter}>
          <p>LUMILOKI &copy; 2024</p>
        </div>
      </nav>
    </>
  )
}
