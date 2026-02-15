import { useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'motion/react'
import GlowButton from '../components/ui/GlowButton'
import GlowCard from '../components/ui/GlowCard'
import ProductCard from '../components/ui/ProductCard'
import SectionHeading from '../components/ui/SectionHeading'
import ScrollReveal from '../components/ui/ScrollReveal'
import Product3DShowcase from '../components/ui/Product3DShowcase'
import { products } from '../data/products'
import { cn } from '../utils/cn'
import styles from './ProductDetailPage.module.css'

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>()
  const product = products.find((p) => p.id === id)

  if (!product) {
    return <Navigate to="/products" replace />
  }

  const others = products.filter((p) => p.id !== product.id)
  const sameSeries = others.filter((p) => p.series === product.series)
  const different = others.filter((p) => p.series !== product.series)
  const related = [...sameSeries, ...different].slice(0, 3)

  return (
    <div className={cn('container', styles.page)}>
      <Link to="/products" className={styles.backLink}>
        ← 返回产品列表
      </Link>

      <div className={styles.hero}>
        <motion.div
          className={styles.imageSection}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          {product.image ? (
            <Product3DShowcase
              image={product.image}
              alt={product.name}
              emoji={product.emoji}
            />
          ) : (
            <span className={styles.productEmoji}>{product.emoji}</span>
          )}
        </motion.div>

        <motion.div
          className={styles.infoSection}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className={styles.series}>{product.series}</span>
          <h1 className={styles.name}>{product.name}</h1>
          <p className={styles.description}>{product.longDescription}</p>
          <span className={styles.price}>{product.price}</span>
          <GlowButton size="large">立即购买</GlowButton>
        </motion.div>
      </div>

      <ScrollReveal>
        <div className={styles.specsSection}>
          <SectionHeading label="技术参数" title="硬核配置" />
          <div className={styles.specsGrid}>
            {product.specs.map((spec) => (
              <div key={spec.label} className={styles.specItem}>
                <div className={styles.specLabel}>{spec.label}</div>
                <div className={styles.specValue}>{spec.value}</div>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal>
        <div className={styles.featuresSection}>
          <SectionHeading label="功能详解" title="核心亮点" />
          <div className={styles.featuresGrid}>
            {product.features.map((feature) => (
              <GlowCard key={feature.title} className={styles.featureItem}>
                <div className={styles.featureEmoji}>{feature.emoji}</div>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDesc}>{feature.description}</p>
              </GlowCard>
            ))}
          </div>
        </div>
      </ScrollReveal>

      <div className={styles.relatedSection}>
        <SectionHeading label="更多推荐" title="你可能还喜欢" />
        <div className={styles.relatedGrid}>
          {related.map((p) => (
            <ProductCard
              key={p.id}
              id={p.id}
              name={p.name}
              description={p.description}
              price={p.price}
              emoji={p.emoji}
              image={p.image}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
