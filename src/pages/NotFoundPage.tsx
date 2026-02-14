import { motion } from 'motion/react'
import GlowButton from '../components/ui/GlowButton'
import styles from './NotFoundPage.module.css'

export default function NotFoundPage() {
  return (
    <div className={styles.page}>
      <motion.div
        className={styles.cubeWrapper}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className={styles.scene3d}>
          <div className={styles.cube3d}>
            <div className={`${styles.face3d} ${styles.faceFront}`}>404</div>
            <div className={`${styles.face3d} ${styles.faceBack}`}>404</div>
            <div className={`${styles.face3d} ${styles.faceRight}`}>404</div>
            <div className={`${styles.face3d} ${styles.faceLeft}`}>404</div>
            <div className={`${styles.face3d} ${styles.faceTop}`}>?</div>
            <div className={`${styles.face3d} ${styles.faceBottom}`}>?</div>
          </div>
        </div>
      </motion.div>

      <motion.div
        className={styles.code}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        404
      </motion.div>

      <motion.p
        className={styles.message}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        页面走丢了
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
      >
        <GlowButton to="/" size="large">
          返回首页
        </GlowButton>
      </motion.div>
    </div>
  )
}
