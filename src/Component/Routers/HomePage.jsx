import React from 'react'
import HeroSection from '../Home/HeroSection'
import FeatureSection from '../Home/FeatureSection'
import TrialSection from '../Home/TrailSection'
import FaqSection from '../Home/FAQSection'
import TestimonialCarousel from '../Home/Testimonials'
const HomePage = () => {
  return (
    <div>
      <HeroSection/>
      <TrialSection/>
      <FeatureSection/>
      <TestimonialCarousel/>
      <FaqSection/>
    </div>
  )
}

export default HomePage
