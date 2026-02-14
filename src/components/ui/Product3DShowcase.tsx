import { useRef, useState, useCallback } from 'react'
import OptimizedImage from './OptimizedImage'
import styles from './Product3DShowcase.module.css'

interface Product3DShowcaseProps {
  image: string
  alt: string
  emoji: string
}

export default function Product3DShowcase({ image, alt, emoji }: Product3DShowcaseProps) {
  const stageRef = useRef<HTMLDivElement>(null)
  const [rotation, setRotation] = useState({ x: -10, y: 0 })
  const isDragging = useRef(false)
  const lastPos = useRef({ x: 0, y: 0 })

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    isDragging.current = true
    lastPos.current = { x: e.clientX, y: e.clientY }
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
  }, [])

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current) return
    const dx = e.clientX - lastPos.current.x
    const dy = e.clientY - lastPos.current.y
    lastPos.current = { x: e.clientX, y: e.clientY }

    setRotation(prev => ({
      x: Math.max(-30, Math.min(30, prev.x - dy * 0.5)),
      y: prev.y + dx * 0.5,
    }))
  }, [])

  const handlePointerUp = useCallback(() => {
    isDragging.current = false
  }, [])

  return (
    <div
      className={styles.showcase}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      <div
        ref={stageRef}
        className={styles.stage}
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        }}
      >
        <OptimizedImage
          src={image}
          alt={alt}
          className={styles.productImage}
          fallbackEmoji={emoji}
          width={300}
          height={300}
        />
      </div>
      <div className={styles.platform} />
    </div>
  )
}
