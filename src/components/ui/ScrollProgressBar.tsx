import { useScrollProgress } from '../../hooks/useScrollProgress'
import styles from './ScrollProgressBar.module.css'

export default function ScrollProgressBar() {
  const progress = useScrollProgress()

  return (
    <div
      className={styles.bar}
      style={{ width: `${progress * 100}%` }}
      role="progressbar"
      aria-valuenow={Math.round(progress * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
    />
  )
}
