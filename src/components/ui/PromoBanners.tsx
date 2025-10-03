'use client'

import { useState, useEffect } from 'react'
import { X, Sparkles, Clock, Gift, Trophy, Zap } from 'lucide-react'
import Button from '@/components/ui/Button'
import { apiService, useApiCall } from '@/lib/apiService'
import { BannerLoader } from '@/components/ui/Loader'

interface PromoBanner {
  id: string
  type: 'top-bar' | 'floating-banner' | 'corner-ribbon'
  title: string
  message: string
  ctaText: string
  ctaUrl: string
  backgroundColor: string
  textColor: string
  icon: string | React.ComponentType<any>
  duration?: number
  position: 'top' | 'bottom' | 'corner'
  animation: 'slide' | 'fade' | 'bounce' | 'pulse'
}

// Icon mapping for API data
const bannerIconMap: { [key: string]: React.ComponentType<any> } = {
  Zap,
  Sparkles,
  Gift,
  Trophy,
  Clock
}

const legacyBanners: PromoBanner[] = [
  {
    id: 'flash-sale-banner',
    type: 'top-bar',
    title: '⚡ FLASH SALE ALERT',
    message: '70% OFF all courses - Limited time only!',
    ctaText: 'Shop Now',
    ctaUrl: '/categories?flash=70off',
    backgroundColor: 'bg-gradient-to-r from-red-600 to-orange-500',
    textColor: 'text-white',
    icon: Zap,
    position: 'top',
    animation: 'slide',
    duration: 10000
  },
  {
    id: 'new-courses-banner',
    type: 'floating-banner',
    title: '🆕 NEW COURSES DROPPED',
    message: '50 brand new courses added this week!',
    ctaText: 'Explore New',
    ctaUrl: '/categories?filter=new',
    backgroundColor: 'bg-gradient-to-r from-blue-600 to-purple-600',
    textColor: 'text-white',
    icon: Sparkles,
    position: 'bottom',
    animation: 'fade',
    duration: 8000
  },
  {
    id: 'weekend-deal',
    type: 'corner-ribbon',
    title: '🎯 WEEKEND DEAL',
    message: '40% OFF',
    ctaText: 'Claim',
    ctaUrl: '/categories?weekend=40off',
    backgroundColor: 'bg-gradient-to-br from-green-500 to-emerald-600',
    textColor: 'text-white',
    icon: Gift,
    position: 'corner',
    animation: 'bounce',
    duration: 15000
  },
  {
    id: 'certification-promo',
    type: 'floating-banner',
    title: '🏆 FREE CERTIFICATION',
    message: 'Get certified in any course you complete this month!',
    ctaText: 'Learn More',
    ctaUrl: '/certificates',
    backgroundColor: 'bg-gradient-to-r from-yellow-500 to-orange-500',
    textColor: 'text-gray-900',
    icon: Trophy,
    position: 'top',
    animation: 'pulse',
    duration: 12000
  }
]

interface PromoBannersProps {
  currentPath: string
}

export default function PromoBanners({ currentPath }: PromoBannersProps) {
  const [activeBanner, setActiveBanner] = useState<PromoBanner | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [dismissedBanners, setDismissedBanners] = useState<string[]>([])

  // Fetch banners from API
  const { data: apiBanners, loading, error } = useApiCall(() => apiService.getBanners(1, true), [])

  // Convert API banners to component format
  const processedBanners = apiBanners.map((banner: any) => ({
    ...banner,
    icon: bannerIconMap[banner.icon] || Zap
  }))

  useEffect(() => {
    if (loading) return // Don't process while loading

    if (processedBanners.length === 0) return // No banners available from API

    // Load dismissed banners
    const dismissed = localStorage.getItem('dismissedBanners')
    if (dismissed) {
      setDismissedBanners(JSON.parse(dismissed))
    }

    // Rotate through banners
    let bannerIndex = 0
    const showNextBanner = () => {
      const availableBanners = processedBanners.filter((banner: PromoBanner) => 
        !dismissedBanners.includes(banner.id)
      )
      
      if (availableBanners.length === 0) return

      const banner = availableBanners[bannerIndex % availableBanners.length]
      setActiveBanner(banner)
      setIsVisible(true)

      // Auto hide after duration
      setTimeout(() => {
        setIsVisible(false)
        setTimeout(() => {
          setActiveBanner(null)
          bannerIndex++
          // Show next banner after delay
          setTimeout(showNextBanner, 5000) // 5 seconds between banners
        }, 300)
      }, banner.duration || 10000)
    }

    // Start showing banners after page load
    const initialDelay = setTimeout(showNextBanner, 2000) // 2 seconds initial delay

    return () => clearTimeout(initialDelay)
  }, [dismissedBanners, processedBanners, loading])

  const dismissBanner = (bannerId: string) => {
    const newDismissed = [...dismissedBanners, bannerId]
    setDismissedBanners(newDismissed)
    localStorage.setItem('dismissedBanners', JSON.stringify(newDismissed))
    setIsVisible(false)
    setTimeout(() => setActiveBanner(null), 300)
  }

  // Don't show anything while loading, if error, no banner, or not visible
  if (loading || error || !activeBanner || !isVisible) return null

  const Icon = typeof activeBanner.icon === 'string' ? bannerIconMap[activeBanner.icon] || Zap : activeBanner.icon

  // Top Bar Banner
  if (activeBanner.type === 'top-bar') {
    return (
      <div className={`fixed top-16 left-0 right-0 z-[90] transform transition-all duration-500 ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      }`}>
        <div className={`${activeBanner.backgroundColor} ${activeBanner.textColor} py-3 px-4 shadow-lg`}>
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Icon className="w-5 h-5 animate-pulse" />
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2">
                <span className="font-bold text-sm sm:text-base">{activeBanner.title}</span>
                <span className="text-xs sm:text-sm opacity-90">{activeBanner.message}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                onClick={() => window.location.href = activeBanner.ctaUrl}
                size="sm"
                className="bg-white/20 hover:bg-white/30 text-white border-white/30 font-medium"
              >
                {activeBanner.ctaText}
              </Button>
              <button
                onClick={() => dismissBanner(activeBanner.id)}
                className="w-6 h-6 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Floating Banner
  if (activeBanner.type === 'floating-banner') {
    return (
      <div className={`fixed ${activeBanner.position === 'top' ? 'top-20' : 'bottom-6'} left-6 right-6 z-[90] transform transition-all duration-500 ${
        isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
      }`}>
        <div className={`${activeBanner.backgroundColor} ${activeBanner.textColor} rounded-2xl shadow-2xl p-4 max-w-md mx-auto relative overflow-hidden`}>
          {/* Background Animation */}
          <div className="absolute inset-0 bg-white/10 animate-pulse"></div>
          
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm">{activeBanner.title}</h3>
                <p className="text-xs opacity-90">{activeBanner.message}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                onClick={() => window.location.href = activeBanner.ctaUrl}
                size="sm"
                className="bg-white/20 hover:bg-white/30 border-white/30 font-medium text-xs"
              >
                {activeBanner.ctaText}
              </Button>
              <button
                onClick={() => dismissBanner(activeBanner.id)}
                className="w-6 h-6 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Corner Ribbon
  if (activeBanner.type === 'corner-ribbon') {
    return (
      <div className={`fixed top-20 right-4 z-[90] transform transition-all duration-500 ${
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}>
        <div className={`${activeBanner.backgroundColor} ${activeBanner.textColor} rounded-l-2xl shadow-lg p-3 pr-8 relative`}>
          {/* Ribbon Tail */}
          <div className="absolute -right-2 top-0 bottom-0 w-4 bg-gradient-to-l from-green-600 to-emerald-700 transform skew-y-12"></div>
          
          <div className="flex items-center space-x-2">
            <Icon className="w-4 h-4 animate-bounce" />
            <div>
              <div className="font-bold text-xs">{activeBanner.title}</div>
              <div className="text-lg font-black">{activeBanner.message}</div>
            </div>
          </div>
          
          <Button
            onClick={() => window.location.href = activeBanner.ctaUrl}
            size="sm"
            className="w-full mt-2 bg-white/20 hover:bg-white/30 border-white/30 font-bold text-xs"
          >
            {activeBanner.ctaText}
          </Button>
          
          <button
            onClick={() => dismissBanner(activeBanner.id)}
            className="absolute -top-2 -left-2 w-5 h-5 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors"
          >
            <X className="w-3 h-3 text-white" />
          </button>
        </div>
      </div>
    )
  }

  return null
}