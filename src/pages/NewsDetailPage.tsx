import { useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'motion/react'
import SectionHeading from '../components/ui/SectionHeading'
import NewsCard from '../components/ui/NewsCard'
import OptimizedImage from '../components/ui/OptimizedImage'
import { newsArticles } from '../data/news'
import { cn } from '../utils/cn'
import styles from './NewsDetailPage.module.css'

export default function NewsDetailPage() {
  const { id } = useParams<{ id: string }>()
  const article = newsArticles.find((a) => a.id === id)

  if (!article) {
    return <Navigate to="/news" replace />
  }

  const related = newsArticles.filter((a) => a.id !== article.id).slice(0, 3)

  return (
    <div className={cn('container', styles.page)}>
      <Link to="/news" className={styles.backLink}>
        ← 返回新闻列表
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className={styles.header}>
          <div className={styles.meta}>
            <span className={styles.category}>{article.category}</span>
            <span className={styles.date}>{article.date}</span>
          </div>
          <h1 className={styles.title}>{article.title}</h1>
        </div>

        <div className={styles.coverImage}>
          {article.image ? (
            <OptimizedImage
              src={article.image}
              alt={article.title}
              className={styles.coverImg}
              fallbackEmoji={article.emoji}
              width={800}
              height={300}
            />
          ) : (
            <span className={styles.coverEmoji}>{article.emoji}</span>
          )}
        </div>

        <div className={styles.content}>{article.content}</div>

        <div className={styles.share}>
          <span className={styles.shareLabel}>分享到：</span>
          <button className={styles.shareBtn}>微信</button>
          <button className={styles.shareBtn}>微博</button>
          <button className={styles.shareBtn}>复制链接</button>
        </div>
      </motion.div>

      <div className={styles.related}>
        <SectionHeading label="相关文章" title="推荐阅读" />
        <div className={styles.relatedGrid}>
          {related.map((a) => (
            <NewsCard
              key={a.id}
              id={a.id}
              title={a.title}
              summary={a.summary}
              category={a.category}
              date={a.date}
              emoji={a.emoji}
              image={a.image}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
