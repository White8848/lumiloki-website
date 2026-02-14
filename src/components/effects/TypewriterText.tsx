import { useState, useEffect, useRef } from 'react'
import styles from './TypewriterText.module.css'

interface TypewriterTextProps {
  text: string
  speed?: number
  delay?: number
  className?: string
  showCursor?: boolean
}

export default function TypewriterText({
  text,
  speed = 80,
  delay = 0,
  className,
  showCursor = true,
}: TypewriterTextProps) {
  const [displayed, setDisplayed] = useState('')
  const [started, setStarted] = useState(false)
  const prefersReducedMotion = useRef(
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  )

  useEffect(() => {
    if (prefersReducedMotion.current) {
      setDisplayed(text)
      setStarted(true)
      return
    }

    const delayTimer = setTimeout(() => {
      setStarted(true)
    }, delay)

    return () => clearTimeout(delayTimer)
  }, [delay, text])

  useEffect(() => {
    if (!started || prefersReducedMotion.current) return

    let i = 0
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1))
        i++
      } else {
        clearInterval(interval)
      }
    }, speed)

    return () => clearInterval(interval)
  }, [started, text, speed])

  return (
    <span className={className}>
      <span className={styles.wrapper}>{displayed}</span>
      {showCursor && displayed.length < text.length && (
        <span className={styles.cursor} />
      )}
    </span>
  )
}
