export type NewsCategory = '产品发布' | '品牌活动' | '技术分享' | '赛事报道'

export interface NewsArticle {
  id: string
  title: string
  summary: string
  content: string
  category: NewsCategory
  date: string
  emoji: string
  image?: string
  featured?: boolean
}
