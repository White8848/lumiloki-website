import { cn } from '../../utils/cn'
import styles from './CubeSpinner.module.css'

interface CubeSpinnerProps {
  size?: 'small' | 'default' | 'large'
}

export default function CubeSpinner({ size = 'default' }: CubeSpinnerProps) {
  return (
    <div className={cn(styles.scene, size === 'small' && styles.small, size === 'large' && styles.large)}>
      <div className={styles.cube}>
        <div className={`${styles.face} ${styles.front}`} />
        <div className={`${styles.face} ${styles.back}`} />
        <div className={`${styles.face} ${styles.right}`} />
        <div className={`${styles.face} ${styles.left}`} />
        <div className={`${styles.face} ${styles.top}`} />
        <div className={`${styles.face} ${styles.bottom}`} />
      </div>
    </div>
  )
}
