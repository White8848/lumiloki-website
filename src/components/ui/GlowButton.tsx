import { type ReactNode, type ButtonHTMLAttributes, useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '../../utils/cn'
import styles from './GlowButton.module.css'

interface GlowButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'default' | 'large'
  fullWidth?: boolean
  to?: string
  children: ReactNode
}

export default function GlowButton({
  variant = 'primary',
  size = 'default',
  fullWidth = false,
  to,
  children,
  className,
  onClick,
  ...props
}: GlowButtonProps) {
  const btnRef = useRef<HTMLButtonElement | null>(null)

  const handleRipple = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const ripple = document.createElement('span')
    ripple.className = styles.ripple
    ripple.style.left = `${x}px`
    ripple.style.top = `${y}px`

    el.appendChild(ripple)
    ripple.addEventListener('animationend', () => ripple.remove())
  }, [])

  const classes = cn(
    styles.button,
    styles[variant],
    size === 'large' && styles.large,
    fullWidth && styles.fullWidth,
    className
  )

  if (to) {
    return (
      <Link to={to} className={classes} onClick={handleRipple}>
        {children}
      </Link>
    )
  }

  return (
    <button
      ref={btnRef}
      className={classes}
      onClick={(e) => {
        handleRipple(e)
        onClick?.(e)
      }}
      {...props}
    >
      {children}
    </button>
  )
}
