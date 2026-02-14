import { cn } from '../../utils/cn'
import styles from './GlitchText.module.css'

interface GlitchTextProps {
  text: string
  as?: 'span' | 'h1' | 'h2' | 'h3' | 'p'
  className?: string
  alwaysActive?: boolean
}

export default function GlitchText({
  text,
  as: Tag = 'span',
  className,
  alwaysActive = false,
}: GlitchTextProps) {
  return (
    <Tag
      className={cn(styles.glitch, alwaysActive && styles.alwaysActive, className)}
      data-text={text}
    >
      {text}
    </Tag>
  )
}
