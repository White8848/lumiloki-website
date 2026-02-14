import { type ReactNode, useRef, useCallback } from 'react'
import { cn } from '../../utils/cn'
import styles from './GlowCard.module.css'

interface GlowCardProps {
  children: ReactNode
  className?: string
  enableTilt?: boolean
}

export default function GlowCard({ children, className, enableTilt = false }: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const card = cardRef.current
    const glow = glowRef.current
    if (!card || !glow) return

    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    glow.style.left = `${x}px`
    glow.style.top = `${y}px`

    if (enableTilt) {
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      const rotateX = ((y - centerY) / centerY) * -8
      const rotateY = ((x - centerX) / centerX) * 8
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
    }
  }, [enableTilt])

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current
    if (card && enableTilt) {
      card.style.transform = ''
    }
  }, [enableTilt])

  return (
    <div
      ref={cardRef}
      className={cn(styles.card, className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div ref={glowRef} className={styles.glow} />
      {children}
    </div>
  )
}
