import { type ReactNode, type ButtonHTMLAttributes } from 'react'
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
  const classes = cn(
    styles.button,
    styles[variant],
    size === 'large' && styles.large,
    fullWidth && styles.fullWidth,
    className
  )

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    )
  }

  return (
    <button
      className={classes}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}
