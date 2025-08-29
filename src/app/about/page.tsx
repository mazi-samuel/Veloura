import React from 'react'
import AboutHero from '@/components/About/AboutHero'
import BrandStory from '@/components/About/BrandStory'
import BrandValues from '@/components/About/BrandValues'
import TeamSection from '@/components/About/TeamSection'
import SustainabilitySection from '@/components/About/SustainabilitySection'

export const metadata = {
  title: 'About Us | Veloura - Where Velvet Meets Radiance',
  description: 'Discover the story behind Veloura, our commitment to luxury beauty, and the values that drive our passion for creating exceptional lip gloss experiences.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <AboutHero />
      <BrandStory />
      <BrandValues />
      <SustainabilitySection />
      <TeamSection />
    </div>
  )
}
