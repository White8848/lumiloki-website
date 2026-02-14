import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import SectionHeading from '../components/ui/SectionHeading'
import ProductCard from '../components/ui/ProductCard'
import { products, seriesOptions } from '../data/products'
import { cn } from '../utils/cn'
import styles from './ProductsPage.module.css'

export default function ProductsPage() {
  const [activeFilter, setActiveFilter] = useState<string>('全部')

  const filtered =
    activeFilter === '全部'
      ? products
      : products.filter((p) => p.series === activeFilter)

  return (
    <div className={cn('container', styles.page)}>
      <SectionHeading
        label="产品中心"
        title="全系产品"
        subtitle="从入门到旗舰，从经典到限定，找到属于你的那一款"
      />

      <div className={styles.filters}>
        {seriesOptions.map((option) => (
          <button
            key={option}
            className={cn(
              styles.filterBtn,
              activeFilter === option && styles.filterBtnActive
            )}
            onClick={() => setActiveFilter(option)}
          >
            {option}
          </button>
        ))}
      </div>

      <div className={styles.grid}>
        <AnimatePresence mode="popLayout">
          {filtered.map((product) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
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
        </AnimatePresence>
      </div>
    </div>
  )
}
