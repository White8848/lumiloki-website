import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import SectionHeading from '../ui/SectionHeading'
import ProductCard from '../ui/ProductCard'
import ScrollReveal from '../ui/ScrollReveal'
import { products } from '../../data/products'
import styles from './ProductShowcase.module.css'

export default function ProductShowcase() {
  const showcaseProducts = products.filter(p => p.featured || ['lumi-lite', 'lumi-speed'].includes(p.id)).slice(0, 3)

  return (
    <section className={styles.section}>
      <div className="container">
        <SectionHeading
          label="明星产品"
          title="为你精选"
          subtitle="从入门到专业，总有一款点亮你的指尖"
        />

        <div className={styles.grid}>
          {showcaseProducts.map((product, index) => (
            <motion.div
              key={product.id}
              className={index === 0 ? styles.mainProduct : undefined}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <ProductCard
                id={product.id}
                name={product.name}
                description={product.description}
                price={product.price}
                emoji={product.emoji}
                image={product.image}
                featured={product.featured}
              />
            </motion.div>
          ))}
        </div>

        <ScrollReveal>
          <Link to="/products" className={styles.viewAll}>
            查看全部产品
            <span className={styles.viewAllArrow}>→</span>
          </Link>
        </ScrollReveal>
      </div>
    </section>
  )
}
