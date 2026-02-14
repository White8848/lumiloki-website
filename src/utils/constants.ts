export const NAV_LINKS = [
  { label: '首页', path: '/' },
  { label: '产品中心', path: '/products' },
  { label: '品牌故事', path: '/brand' },
  { label: '新闻动态', path: '/news' },
  { label: '联系我们', path: '/contact' },
] as const

export const SOCIAL_LINKS = [
  { label: '微信', icon: 'wechat', url: '#' },
  { label: '微博', icon: 'weibo', url: '#' },
  { label: '抖音', icon: 'douyin', url: '#' },
  { label: 'B站', icon: 'bilibili', url: '#' },
  { label: '小红书', icon: 'xiaohongshu', url: '#' },
] as const

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
} as const
