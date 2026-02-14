import { useRef, useEffect, useCallback } from 'react'

interface TiltOptions {
  maxTilt?: number
  scale?: number
  speed?: number
}

export function useTilt<T extends HTMLElement>({
  maxTilt = 15,
  scale = 1.02,
  speed = 400,
}: TiltOptions = {}) {
  const ref = useRef<T>(null)

  const handleMove = useCallback((e: MouseEvent) => {
    const el = ref.current
    if (!el) return

    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height

    const rotateX = (0.5 - y) * maxTilt * 2
    const rotateY = (x - 0.5) * maxTilt * 2

    el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`
    el.style.transition = `transform ${speed * 0.1}ms ease`
  }, [maxTilt, scale, speed])

  const handleLeave = useCallback(() => {
    const el = ref.current
    if (!el) return
    el.style.transform = ''
    el.style.transition = `transform ${speed}ms ease`
  }, [speed])

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const isTouch = window.matchMedia('(pointer: coarse)').matches
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (isTouch || prefersReducedMotion) return

    el.addEventListener('mousemove', handleMove)
    el.addEventListener('mouseleave', handleLeave)

    return () => {
      el.removeEventListener('mousemove', handleMove)
      el.removeEventListener('mouseleave', handleLeave)
    }
  }, [handleMove, handleLeave])

  return ref
}
