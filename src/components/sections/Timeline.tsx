import ScrollReveal from '../ui/ScrollReveal'
import { timeline } from '../../data/timeline'
import styles from './Timeline.module.css'

export default function Timeline() {
  return (
    <div className={styles.timeline}>
      <div className={styles.line} />

      {timeline.map((item, index) => {
        const isLeft = index % 2 === 0

        return (
          <div key={item.year} className={styles.item}>
            <div className={styles.dot}>
              <div className={styles.dotInner} />
            </div>

            {isLeft ? (
              <>
                <ScrollReveal direction="left" delay={0.1}>
                  <div className={styles.contentLeft}>
                    <div className={styles.year}>
                      {item.year}
                    </div>
                    <h3 className={styles.title}>{item.title}</h3>
                    <p className={styles.description}>{item.description}</p>
                  </div>
                </ScrollReveal>
                <div className={styles.placeholder} />
              </>
            ) : (
              <>
                <div className={styles.placeholder} />
                <ScrollReveal direction="right" delay={0.1}>
                  <div className={styles.contentRight}>
                    <div className={styles.year}>
                      {item.year}
                    </div>
                    <h3 className={styles.title}>{item.title}</h3>
                    <p className={styles.description}>{item.description}</p>
                  </div>
                </ScrollReveal>
              </>
            )}
          </div>
        )
      })}
    </div>
  )
}
