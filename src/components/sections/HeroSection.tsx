import { motion } from 'motion/react'
import GlowButton from '../ui/GlowButton'
import OptimizedImage from '../ui/OptimizedImage'
import TypewriterText from '../effects/TypewriterText'
import heroProduct from '../../assets/images/products/lumi-pro.webp'
import styles from './HeroSection.module.css'

export default function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <motion.div
          className={styles.productImage}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <OptimizedImage
            src={heroProduct}
            alt="Lumi Pro"
            className={styles.heroProductImg}
            fallbackEmoji="🟦"
            width={400}
            height={400}
            priority
            objectFit="contain"
          />
        </motion.div>

        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          LUMILOKI
        </motion.h1>

        <motion.div
          className={styles.subtitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <TypewriterText
            text="点亮你的每一次旋转"
            speed={100}
            delay={800}
          />
        </motion.div>

        <motion.div
          className={styles.ctas}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
        >
          <GlowButton to="/products" size="large">
            探索产品
          </GlowButton>
          <GlowButton to="/brand" variant="secondary" size="large">
            品牌故事
          </GlowButton>
        </motion.div>
      </div>

    </section>
  )
}
