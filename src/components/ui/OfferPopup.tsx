'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import { X, Gift, Zap, Clock, Star, Trophy } from 'lucide-react'
import Button from '@/components/ui/Button'
import { apiService, useApiCall } from '@/lib/apiService'

interface PopupOffer {
  id: string
  type: 'discount' | 'trial' | 'bundle' | 'limited' | 'welcome' | 'special'
  title: string
  subtitle: string
  description: string
  discount?: number
  originalPrice: string
  salePrice: string
  timeLeft?: string
  buttonText: string
  buttonUrl: string
  gradient: string
  icon: string | React.ComponentType<any>
  trigger: 'scroll' | 'time'
  triggerValue: number
  pattern: string
  countdown?: number | null
}

// Icon mapping for API data
const iconMap: { [key: string]: React.ComponentType<any> } = {
  Gift,
  Zap,
  Trophy,
  Star,
  Clock
}

// Legacy offers (will be replaced by API)
const legacyOffers: PopupOffer[] = [
  {
    id: 'welcome-discount',
    type: 'welcome',
    title: '🎉 Welcome! Get 50% OFF',
    subtitle: 'New User Special',
    description: 'Start your learning journey with our exclusive welcome offer. Join 100,000+ students worldwide!',
    discount: 50,
    originalPrice: '$199',
    salePrice: '$99',
    buttonText: 'Claim Discount',
    buttonUrl: '/categories?discount=welcome50',
    gradient: 'from-blue-600 via-purple-600 to-pink-600',
    pattern: 'geometric',
    icon: Gift,
    trigger: 'time',
    triggerValue: 3000,
    countdown: 24 * 60 * 60
  },
  {
    id: 'flash-sale',
    type: 'limited',
    title: '⚡ MEGA FLASH SALE',
    subtitle: '70% OFF Everything',
    description: 'Our biggest sale of the year! All 500+ courses included. Limited slots available.',
    discount: 70,
    originalPrice: '$299',
    salePrice: '$89',
    buttonText: 'Shop Now',
    buttonUrl: '/categories?sale=flash70',
    gradient: 'from-red-600 via-orange-500 to-yellow-500',
    pattern: 'lightning',
    icon: Zap,
    trigger: 'scroll',
    triggerValue: 50,
    countdown: 6 * 60 * 60
  },
  {
    id: 'premium-trial',
    type: 'trial',
    title: '� Premium Access FREE',
    subtitle: '30-Day Trial',
    description: 'Unlock everything: All courses, certificates, mentorship, and career support!',
    originalPrice: '$49/month',
    salePrice: 'FREE',
    buttonText: 'Start Free Trial',
    buttonUrl: '/pricing?trial=premium',
    gradient: 'from-emerald-600 via-teal-600 to-cyan-600',
    pattern: 'waves',
    icon: Trophy,
    trigger: 'scroll',
    triggerValue: 75,
    countdown: null
  },
  {
    id: 'weekend-special',
    type: 'special',
    title: '� Weekend Intensive',
    subtitle: 'Live Bootcamp + Recording',
    description: 'Join our exclusive weekend bootcamp: 16 hours of live training + lifetime access.',
    discount: 60,
    originalPrice: '$599',
    salePrice: '$199',
    buttonText: 'Reserve Spot',
    buttonUrl: '/categories?bootcamp=weekend',
    gradient: 'from-pink-600 via-rose-500 to-red-500',
    pattern: 'stars',
    icon: Star,
    trigger: 'time',
    triggerValue: 8000,
    countdown: 5 * 24 * 60 * 60
  }
]

interface OfferPopupProps {
  currentPath: string
}

export default function OfferPopup({ currentPath }: OfferPopupProps) {
  const [currentOffer, setCurrentOffer] = useState<PopupOffer | null>(null)
  const [closedOffers, setClosedOffers] = useState<string[]>([])
  const [scrollProgress, setScrollProgress] = useState(0)
  const [timeOnPage, setTimeOnPage] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [countdown, setCountdown] = useState<number | null>(null)

  // Fetch offers from API (memoized to prevent re-fetching)
  const { data: apiOffers, loading, error } = useApiCall(
    useCallback(() => apiService.getOffers(2, true), []), 
    []
  )

  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const scroll = Math.round((totalScroll / windowHeight) * 100)
      setScrollProgress(scroll)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Track time on page
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeOnPage(prev => prev + 1000)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  // Load closed offers from localStorage
  useEffect(() => {
    const closed = localStorage.getItem('closedOffers')
    if (closed) {
      setClosedOffers(JSON.parse(closed))
    }
  }, [])

  // Convert API offers to component format (memoized)
  const processedOffers = useMemo(() => 
    apiOffers.map((offer: any) => ({
      ...offer,
      icon: iconMap[offer.icon] || Gift
    })), [apiOffers]
  )

  // Check for offer triggers
  useEffect(() => {
    if (currentOffer || loading) return // Don't show multiple offers or process while loading

    if (processedOffers.length === 0) return // No offers available from API

    const availableOffers = processedOffers.filter((offer: PopupOffer) => {
      // Check if offer was already closed
      if (closedOffers.includes(offer.id)) {
        return false
      }

      // Check trigger conditions
      if (offer.trigger === 'scroll') {
        return scrollProgress >= offer.triggerValue
      }
      
      if (offer.trigger === 'time') {
        return timeOnPage >= offer.triggerValue
      }
      
      return false
    })

    // Show the first available offer
    if (availableOffers.length > 0) {
      const offer = availableOffers[0]
      setCurrentOffer(offer)
      
      setTimeout(() => {
        setIsVisible(true)
        if (offer.countdown) {
          setCountdown(offer.countdown)
        }
      }, 500)
    }
  }, [scrollProgress, timeOnPage, closedOffers, currentOffer, processedOffers, loading])

  // Countdown timer
  useEffect(() => {
    if (countdown && countdown > 0) {
      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev && prev > 1) {
            return prev - 1
          } else {
            setIsVisible(false)
            setTimeout(() => setCurrentOffer(null), 300)
            return null
          }
        })
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [countdown])

  const closeOffer = () => {
    if (currentOffer) {
      const newClosed = [...closedOffers, currentOffer.id]
      setClosedOffers(newClosed)
      localStorage.setItem('closedOffers', JSON.stringify(newClosed))
      setIsVisible(false)
      setTimeout(() => {
        setCurrentOffer(null)
        setCountdown(null)
      }, 300)
    }
  }

  const formatCountdown = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`
  }

  const BackgroundPattern = ({ pattern }: { pattern: string }) => {
    switch (pattern) {
      case 'geometric':
        return (
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-4 right-4 w-16 h-16 border-4 border-white/30 rounded-lg rotate-45"></div>
            <div className="absolute bottom-8 left-8 w-12 h-12 border-2 border-white/30 rounded-full"></div>
          </div>
        )
      case 'lightning':
        return (
          <div className="absolute inset-0 overflow-hidden opacity-15">
            <div className="absolute -top-4 -right-4 w-24 h-24">
              <div className="w-full h-full bg-white transform rotate-12"></div>
            </div>
          </div>
        )
      case 'waves':
        return (
          <div className="absolute inset-0 overflow-hidden opacity-10">
            <div className="absolute -bottom-4 -left-4 w-48 h-48 bg-white rounded-full"></div>
          </div>
        )
      case 'stars':
        return (
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-6 right-12 w-4 h-4 bg-white rounded-full"></div>
            <div className="absolute bottom-8 left-6 w-3 h-3 bg-white rounded-full"></div>
          </div>
        )
      default:
        return null
    }
  }

  // Don't render anything if still loading initial data
  if (loading) return null

  // Log errors (except for empty responses which are normal)
  if (error && !error.includes('404')) {
    console.error('Failed to load offers:', error)
  }

  // Don't render if no current offer or there was an error
  if (!currentOffer || error) return null

  const Icon = typeof currentOffer.icon === 'string' ? iconMap[currentOffer.icon] || Gift : currentOffer.icon

  return (
    <div className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-[150] flex items-center justify-center p-4 transition-all duration-300 ${
      isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
    }`}>
      <div className={`relative max-w-lg w-full mx-auto transform transition-all duration-500 ${
        isVisible ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
      }`}>
        <div className={`relative bg-gradient-to-br ${currentOffer.gradient} rounded-3xl shadow-2xl overflow-hidden`}>
          {/* Background Pattern */}
          <BackgroundPattern pattern={currentOffer.pattern} />

          {/* Close Button */}
          <button
            onClick={closeOffer}
            className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 z-20"
          >
            <X className="w-5 h-5 text-white" />
          </button>

          {/* Countdown Timer */}
          {countdown && (
            <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2 z-20">
              <div className="text-white text-sm font-bold flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{formatCountdown(countdown)}</span>
              </div>
            </div>
          )}

          {/* Content */}
          <div className="relative z-10 p-8 text-center text-white">
            {/* Icon */}
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
              <Icon className="w-10 h-10" />
            </div>
            
            {/* Subtitle Badge */}
            <div className="inline-block bg-white/20 rounded-full px-4 py-1 text-sm font-medium mb-3 animate-pulse">
              {currentOffer.subtitle}
            </div>
            
            {/* Main Title */}
            <h2 className="text-3xl font-bold mb-4 leading-tight">{currentOffer.title}</h2>
            
            {/* Pricing Display */}
            <div className="flex items-center justify-center space-x-3 mb-4">
              <span className="text-white/70 line-through text-xl">{currentOffer.originalPrice}</span>
              <span className="text-white text-4xl font-bold animate-pulse">{currentOffer.salePrice}</span>
            </div>
            
            {/* Description */}
            <p className="text-white/90 mb-6 leading-relaxed text-lg">
              {currentOffer.description}
            </p>
            
            {/* CTA Button */}
            <Button
              onClick={() => window.location.href = currentOffer.buttonUrl}
              size="lg"
              className="w-full bg-white text-gray-900 hover:bg-white/90 font-bold text-xl py-5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02] mb-4"
            >
              {currentOffer.buttonText} 🚀
            </Button>
            
            {/* Trust Indicators */}
            <div className="flex items-center justify-center space-x-6 text-white/70 text-sm">
              <div className="flex items-center space-x-1">
                <span>✅</span>
                <span>Instant Access</span>
              </div>
              <div className="flex items-center space-x-1">
                <span>🔒</span>
                <span>Secure</span>
              </div>
              <div className="flex items-center space-x-1">
                <span>💯</span>
                <span>Money Back</span>
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -top-4 -right-4 w-20 h-20 border-4 border-white/20 rounded-full animate-spin-slow"></div>
        </div>
      </div>
    </div>
  )
}

// CSS for custom animations (add to globals.css)
const customCSS = `
@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.animate-spin-slow {
  animation: spin-slow 8s linear infinite;
}

@keyframes slide-in-from-bottom-4 {
  from {
    transform: translateY(1rem);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.slide-in-from-bottom-4 {
  animation: slide-in-from-bottom-4 0.5s ease-out;
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

.fade-in {
  animation: fade-in 0.3s ease-out;
}

.animate-in {
  animation-fill-mode: both;
}
`