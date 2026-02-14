import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import SectionHeading from '../components/ui/SectionHeading'
import NewsCard from '../components/ui/NewsCard'
import OptimizedImage from '../components/ui/OptimizedImage'
import { newsArticles, newsCategories } from '../data/news'
import { cn } from '../utils/cn'
import styles from './NewsPage.module.css'

export default function NewsPage() {
  const [activeFilter, setActiveFilter] = useState<string>('全部')

  const featuredArticle = newsArticles.find((a) => a.featured)
  const otherArticles =
    activeFilter === '全部'
      ? newsArticles.filter((a) => !a.featured)
      : newsArticles.filter(
          (a) => !a.featured && a.category === activeFilter
        )

  return (
    <div className={cn('container', styles.page)}>
      <SectionHeading
        label="新闻动态"
        title="最新资讯"
        subtitle="了解 Lumiloki 的最新产品、活动和技术分享"
      />

      {featuredArticle && (
        <Link to={`/news/${featuredArticle.id}`} style={{ textDecoration: 'none' }}>
          <motion.div
            className={styles.featured}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className={styles.featuredImage}>
              {featuredArticle.image ? (
                <OptimizedImage
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  className={styles.featuredCoverImage}
                  fallbackEmoji={featuredArticle.emoji}
                  width={600}
                  height={300}
                />
              ) : (
                <span>{featuredArticle.emoji}</span>
              )}
            </div>
            <div className={styles.featuredContent}>
              <span className={styles.featuredBadge}>精选</span>
              <h2 className={styles.featuredTitle}>{featuredArticle.title}</h2>
              <p className={styles.featuredSummary}>{featuredArticle.summary}</p>
              <span className={styles.featuredDate}>{featuredArticle.date}</span>
            </div>
          </motion.div>
        </Link>
      )}

      <div className={styles.filters}>
        {newsCategories.map((cat) => (
          <button
            key={cat}
            className={cn(
              styles.filterBtn,
              activeFilter === cat && styles.filterBtnActive
            )}
            onClick={() => setActiveFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className={styles.grid}>
        {otherArticles.map((article, index) => (
          <motion.div
            key={article.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <NewsCard
              id={article.id}
              title={article.title}
              summary={article.summary}
              category={article.category}
              date={article.date}
              emoji={article.emoji}
              image={article.image}
            />
          </motion.div>
        ))}
      </div>
    </div>
  )
}
