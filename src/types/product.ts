export interface ProductSpec {
  label: string
  value: string
}

export interface ProductFeature {
  title: string
  description: string
  emoji: string
}

export interface Product {
  id: string
  name: string
  series: '经典系列' | '竞速系列' | '限定版' | '智能棋类'
  description: string
  longDescription: string
  price: string
  emoji: string
  image?: string
  specs: ProductSpec[]
  features: ProductFeature[]
  featured?: boolean
}
