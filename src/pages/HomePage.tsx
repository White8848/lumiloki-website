import HeroSection from '../components/sections/HeroSection'
import FeaturesSection from '../components/sections/FeaturesSection'
import ProductShowcase from '../components/sections/ProductShowcase'
import BrandHighlights from '../components/sections/BrandHighlights'
import CTASection from '../components/sections/CTASection'
import GlowDivider from '../components/ui/GlowDivider'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <GlowDivider />
      <ProductShowcase />
      <BrandHighlights />
      <CTASection />
    </>
  )
}
