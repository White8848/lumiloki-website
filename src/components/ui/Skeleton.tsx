import { cn } from '../../utils/cn'
import styles from './Skeleton.module.css'

interface SkeletonProps {
  variant?: 'text' | 'image' | 'card' | 'circle'
  width?: string | number
  height?: string | number
  className?: string
}

export default function Skeleton({
  variant = 'text',
  width,
  height,
  className,
}: SkeletonProps) {
  const variantClass = variant === 'text' ? styles.text
    : variant === 'image' ? styles.image
    : variant === 'card' ? styles.card
    : styles.circle

  return (
    <div
      className={cn(styles.skeleton, variantClass, className)}
      style={{ width, height }}
    />
  )
}
