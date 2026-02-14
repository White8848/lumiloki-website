import { motion } from 'motion/react'
import SectionHeading from '../ui/SectionHeading'
import GlowCard from '../ui/GlowCard'
import OptimizedImage from '../ui/OptimizedImage'
import { features } from '../../data/features'
import styles from './FeaturesSection.module.css'

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] },
  },
}

export default function FeaturesSection() {
  return (
    <section className={styles.section}>
      <div className="container">
        <SectionHeading
          label="核心科技"
          title="重新定义魔方体验"
          subtitle="将前沿科技与极致手感融为一体，每一面都闪耀智慧之光"
        />

        <motion.div
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {features.map((feature) => (
            <motion.div key={feature.title} variants={itemVariants}>
              <GlowCard className={styles.featureCard} enableTilt>
                <div className={styles.iconWrapper}>
                  <div className={styles.iconRing} />
                  {feature.image ? (
                    <OptimizedImage
                      src={feature.image}
                      alt={feature.title}
                      className={styles.featureImage}
                      fallbackEmoji={feature.icon}
                      width={40}
                      height={40}
                    />
                  ) : (
                    <span className={styles.icon}>{feature.icon}</span>
                  )}
                </div>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDesc}>{feature.description}</p>
              </GlowCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
