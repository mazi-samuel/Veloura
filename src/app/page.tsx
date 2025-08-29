import Hero from '@/components/Home/Hero'
import FeaturedCollections from '@/components/Home/FeaturedCollections'
import ProductCategories from '@/components/Home/ProductCategories'
import USPSection from '@/components/Home/USPSection'
import SocialProof from '@/components/Home/SocialProof'
import InstagramFeed from '@/components/Home/InstagramFeed'
import NewsletterSignup from '@/components/Home/NewsletterSignup'

export default function Home() {
  return (
    <div className="overflow-hidden">
      <Hero />
      <ProductCategories />
      <USPSection />
      <FeaturedCollections />
      <SocialProof />
      <InstagramFeed />
      <NewsletterSignup />
    </div>
  )
}
