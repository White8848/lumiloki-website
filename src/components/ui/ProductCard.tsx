import { Link } from 'react-router-dom'
import { cn } from '../../utils/cn'
import OptimizedImage from './OptimizedImage'
import styles from './ProductCard.module.css'

interface ProductCardProps {
  id: string
  name: string
  description: string
  price: string
  emoji: string
  image?: string
  featured?: boolean
}

export default function ProductCard({
  id,
  name,
  description,
  price,
  emoji,
  image,
  featured = false,
}: ProductCardProps) {
  return (
    <Link
      to={`/products/${id}`}
      className={cn(styles.card, featured && styles.featured)}
    >
      <div className={styles.imageWrapper}>
        {featured && <span className={styles.featuredBadge}>HOT</span>}
        {image ? (
          <OptimizedImage
            src={image}
            alt={name}
            className={styles.productImage}
            fallbackEmoji={emoji}
            width={200}
            height={200}
          />
        ) : (
          <span className={styles.imagePlaceholder}>{emoji}</span>
        )}
      </div>
      <div className={styles.info}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.description}>{description}</p>
        <span className={styles.price}>{price}</span>
      </div>
    </Link>
  )
}
