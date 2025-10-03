'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/layout/Header'
import Hero from '@/components/layout/Hero'
import CategoryTeaser from '@/components/layout/CategoryTeaser'
import CourseCarousels from '@/components/layout/CourseCarousels'
import TrustStrip from '@/components/layout/TrustStrip'
import HowItWorks from '@/components/layout/HowItWorks'
import Testimonials from '@/components/layout/Testimonials'
import CTABand from '@/components/layout/CTABand'
import Footer from '@/components/layout/Footer'
import OfferPopup from '@/components/ui/OfferPopup'
import MiniPopup from '@/components/ui/MiniPopup'
import FloatingMenu from '@/components/ui/FloatingMenu'
import ProgressIndicator from '@/components/ui/ProgressIndicator'
import PromoBanners from '@/components/ui/PromoBanners'
import SmartNotifications from '@/components/ui/SmartNotifications'


// User-specific components
import UserDashboard from '@/components/layout/UserDashboard'

export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<any>(null)



  useEffect(() => {
    // Check if user is logged in
    const savedUser = localStorage.getItem('currentUser')
    if (savedUser) {
      const userData = JSON.parse(savedUser)
      setUser(userData)
      setIsLoggedIn(true)
    }
  }, [])

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {isLoggedIn ? (
          // Logged in user sees personalized dashboard
          <>
            <UserDashboard user={user} />
            <CourseCarousels title="Recommended for You" showPersonalized={true} />
            <CourseCarousels title="Continue Learning" showContinue={true} />
            <CourseCarousels title="New Courses" />
          </>
        ) : (
          // Visitors see marketing content
          <>
            <Hero />
            <CategoryTeaser />
            <CourseCarousels />
            <TrustStrip />
            <HowItWorks />
            <Testimonials />
            <CTABand />
          </>
        )}
      </main>
      <Footer />
      
      {/* Popup Components */}
      <OfferPopup currentPath="/" />
      <MiniPopup currentPath="/" />
      
      {/* Floating Action Menu */}
      <FloatingMenu currentPath="/" />
      
      {/* Progress Indicator for logged in users */}
      <ProgressIndicator isVisible={isLoggedIn} />
      
      {/* Promotional Banners */}
      <PromoBanners currentPath="/" />
      
      {/* Smart Notifications for logged in users */}
      <SmartNotifications isLoggedIn={isLoggedIn} />
      

    </div>
  )
}