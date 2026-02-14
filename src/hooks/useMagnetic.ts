import { useRef, useEffect, useCallback } from 'react'

interface MagneticOptions {
  strength?: number
  radius?: number
}

export function useMagnetic<T extends HTMLElement>({
  strength = 0.3,
  radius = 100,
}: MagneticOptions = {}) {
  const ref = useRef<T>(null)

  const handleMove = useCallback((e: MouseEvent) => {
    const el = ref.current
    if (!el) return

    const rect = el.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const dx = e.clientX - centerX
    const dy = e.clientY - centerY
    const dist = Math.sqrt(dx * dx + dy * dy)

    if (dist < radius) {
      const pull = (radius - dist) / radius
      el.style.transform = `translate(${dx * strength * pull}px, ${dy * strength * pull}px)`
      el.style.transition = 'transform 100ms ease'
    }
  }, [strength, radius])

  const handleLeave = useCallback(() => {
    const el = ref.current
    if (!el) return
    el.style.transform = ''
    el.style.transition = 'transform 300ms ease'
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const isTouch = window.matchMedia('(pointer: coarse)').matches
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (isTouch || prefersReducedMotion) return

    const parent = el.parentElement || document
    parent.addEventListener('mousemove', handleMove as EventListener)
    el.addEventListener('mouseleave', handleLeave)

    return () => {
      parent.removeEventListener('mousemove', handleMove as EventListener)
      el.removeEventListener('mouseleave', handleLeave)
    }
  }, [handleMove, handleLeave])

  return ref
}
