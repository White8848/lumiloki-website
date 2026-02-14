import { useState, useEffect, useRef } from 'react'

export function useScrollProgress(elementRef?: React.RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(0)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const handleScroll = () => {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        if (elementRef?.current) {
          const rect = elementRef.current.getBoundingClientRect()
          const viewportHeight = window.innerHeight
          const elementTop = rect.top
          const elementHeight = rect.height

          const start = viewportHeight
          const end = -elementHeight
          const current = elementTop
          const p = 1 - (current - end) / (start - end)
          setProgress(Math.max(0, Math.min(1, p)))
        } else {
          const scrollTop = window.scrollY
          const docHeight = document.documentElement.scrollHeight - window.innerHeight
          setProgress(docHeight > 0 ? scrollTop / docHeight : 0)
        }
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [elementRef])

  return progress
}
