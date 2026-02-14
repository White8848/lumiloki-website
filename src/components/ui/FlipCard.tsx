import { type ReactNode } from 'react'
import styles from './FlipCard.module.css'

interface FlipCardProps {
  front: ReactNode
  back: ReactNode
  className?: string
}

export default function FlipCard({ front, back, className }: FlipCardProps) {
  return (
    <div className={`${styles.flipCard} ${className || ''}`}>
      <div className={styles.inner}>
        <div className={styles.front}>{front}</div>
        <div className={styles.back}>{back}</div>
      </div>
    </div>
  )
}
