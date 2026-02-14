import { type ReactNode } from 'react'
import styles from './GradientText.module.css'

interface GradientTextProps {
  children: ReactNode
  as?: 'span' | 'h1' | 'h2' | 'h3' | 'p'
  className?: string
}

export default function GradientText({
  children,
  as: Tag = 'span',
  className,
}: GradientTextProps) {
  return (
    <Tag className={`${styles.text} ${className || ''}`}>
      {children}
    </Tag>
  )
}
