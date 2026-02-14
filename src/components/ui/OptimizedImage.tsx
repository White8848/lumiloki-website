import { useState, useRef, useEffect } from 'react'

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  fallbackEmoji?: string
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  fallbackEmoji,
}: OptimizedImageProps) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const img = imgRef.current
    if (img && img.complete && img.naturalWidth > 0) {
      setLoaded(true)
    }
  }, [])

  if (error && fallbackEmoji) {
    return (
      <span
        role="img"
        aria-label={alt}
        style={{ fontSize: Math.min(width || 64, height || 64) * 0.5 }}
      >
        {fallbackEmoji}
      </span>
    )
  }

  return (
    <img
      ref={imgRef}
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading="lazy"
      className={className}
      onLoad={() => setLoaded(true)}
      onError={() => setError(true)}
      style={{
        opacity: loaded ? 1 : 0,
        transition: 'opacity 0.4s ease',
        filter: loaded ? 'none' : 'blur(10px)',
      }}
    />
  )
}
