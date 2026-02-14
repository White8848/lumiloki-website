import { useRef, useEffect, useState } from 'react'
import styles from './CursorGlow.module.css'

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (isTouch || prefersReducedMotion) return

    let rafId: number

    const handleMove = (e: MouseEvent) => {
      if (!visible) setVisible(true)
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        if (glowRef.current) {
          glowRef.current.style.left = `${e.clientX}px`
          glowRef.current.style.top = `${e.clientY}px`
        }
      })
    }

    const handleLeave = () => setVisible(false)
    const handleEnter = () => setVisible(true)

    document.addEventListener('mousemove', handleMove)
    document.addEventListener('mouseleave', handleLeave)
    document.addEventListener('mouseenter', handleEnter)

    return () => {
      cancelAnimationFrame(rafId)
      document.removeEventListener('mousemove', handleMove)
      document.removeEventListener('mouseleave', handleLeave)
      document.removeEventListener('mouseenter', handleEnter)
    }
  }, [visible])

  return (
    <div
      ref={glowRef}
      className={styles.glow}
      style={{ opacity: visible ? 1 : 0 }}
    />
  )
}
