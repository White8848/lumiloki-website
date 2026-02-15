import { cn } from '../../utils/cn'
import ScrollReveal from '../ui/ScrollReveal'
import GlowButton from '../ui/GlowButton'
import ctaBg from '../../assets/images/backgrounds/cta-bg.webp'
import styles from './CTASection.module.css'

export default function CTASection() {
  return (
    <section className={styles.section}>
      <div className={styles.bgImage}>
        <img src={ctaBg} alt="" className={styles.bgImg} />
      </div>
      <div className={cn('container', styles.content)}>
        <ScrollReveal>
          <h2 className={styles.title}>准备好点亮了吗？</h2>
          <p className={styles.subtitle}>
            加入 Lumiloki 社区，和全球玩家一起探索智能发光潮玩的无限可能
          </p>
          <GlowButton to="/products" size="large">
            立即探索
          </GlowButton>
        </ScrollReveal>
      </div>
    </section>
  )
}
