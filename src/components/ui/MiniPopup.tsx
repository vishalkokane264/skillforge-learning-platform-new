'use client'

import { useState, useEffect } from 'react'
import { X, Gift, Zap, Star, Bell, Percent } from 'lucide-react'
import Button from '@/components/ui/Button'
import { apiService, useApiCall } from '@/lib/apiService'
import { MiniOfferLoader } from '@/components/ui/Loader'

interface MiniOffer {
  id: string
  message: string
  action: string
  actionUrl: string
  icon: string | React.ComponentType<any>
  color: string
  duration?: number
}

// Icon mapping for API data
const miniIconMap: { [key: string]: React.ComponentType<any> } = {
  Gift,
  Zap,
  Star,
  Bell,
  Percent
}

const legacyOffers: MiniOffer[] = [
  {
    id: 'free-course',
    message: '🎁 Free course of the week: "JavaScript Basics"',
    action: 'Claim Free',
    actionUrl: '/course/free-javascript',
    icon: Gift,
    color: 'bg-green-500',
    duration: 8000
  },
  {
    id: 'flash-discount',
    message: '⚡ Flash: 30% off all courses expires in 2 hours!',
    action: 'Shop Now',
    actionUrl: '/categories?flash=30',
    icon: Zap,
    color: 'bg-orange-500',
    duration: 10000
  },
  {
    id: 'new-courses',
    message: '🆕 10 new courses added this week',
    action: 'Explore',
    actionUrl: '/categories?filter=new',
    icon: Star,
    color: 'bg-blue-500',
    duration: 6000
  },
  {
    id: 'streak-bonus',
    message: '🔥 7-day streak! Get bonus points for next purchase',
    action: 'Claim Bonus',
    actionUrl: '/profile?bonus=streak',
    icon: Bell,
    color: 'bg-purple-500',
    duration: 7000
  }
]

interface MiniPopupProps {
  currentPath: string
}

export default function MiniPopup({ currentPath }: MiniPopupProps) {
  const [currentOffer, setCurrentOffer] = useState<MiniOffer | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [dismissedOffers, setDismissedOffers] = useState<string[]>([])

  // Fetch mini offers from API
  const { data: apiOffers, loading, error } = useApiCall(() => apiService.getMiniOffers(2, true), [])

  // Convert API offers to component format
  const processedOffers = apiOffers.map((offer: any) => ({
    ...offer,
    icon: miniIconMap[offer.icon] || Gift
  }))

  useEffect(() => {
    if (loading) return // Don't process while loading

    if (processedOffers.length === 0) return // No offers available from API

    // Load dismissed offers
    const dismissed = localStorage.getItem('dismissedMiniOffers')
    if (dismissed) {
      setDismissedOffers(JSON.parse(dismissed))
    }

    // Show offers in sequence
    let offerIndex = 0
    const showNextOffer = () => {
      const availableOffers = processedOffers.filter((offer: MiniOffer) => 
        !dismissedOffers.includes(offer.id)
      )
      
      if (availableOffers.length === 0) return

      const offer = availableOffers[offerIndex % availableOffers.length]
      setCurrentOffer(offer)
      setIsVisible(true)

      // Auto hide after duration
      setTimeout(() => {
        setIsVisible(false)
        setTimeout(() => {
          setCurrentOffer(null)
          offerIndex++
          // Show next offer after delay
          setTimeout(showNextOffer, 15000) // 15 seconds between offers
        }, 500)
      }, offer.duration || 8000)
    }

    // Start showing offers after page load
    const initialDelay = setTimeout(showNextOffer, 5000) // 5 seconds initial delay

    return () => clearTimeout(initialDelay)
  }, [dismissedOffers, processedOffers, loading])

  const dismissOffer = (offerId: string) => {
    const newDismissed = [...dismissedOffers, offerId]
    setDismissedOffers(newDismissed)
    localStorage.setItem('dismissedMiniOffers', JSON.stringify(newDismissed))
    setIsVisible(false)
    setTimeout(() => {
      setCurrentOffer(null)
    }, 500)
  }

  // Don't show anything while loading, if error, no offer, or not visible
  if (loading || error || !currentOffer || !isVisible) return null

  const Icon = typeof currentOffer.icon === 'string' ? miniIconMap[currentOffer.icon] || Gift : currentOffer.icon

  return (
    <div className={`fixed bottom-6 right-6 z-[120] transform transition-all duration-500 ${
      isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
    }`}>
      <div className={`${currentOffer.color} text-white rounded-lg shadow-xl p-4 max-w-sm min-w-[320px] relative overflow-hidden`}>
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-black/10">
          <div className="absolute top-0 right-0 w-16 h-16 border-4 border-white/20 rounded-full transform translate-x-8 -translate-y-8"></div>
          <div className="absolute bottom-0 left-0 w-12 h-12 border-2 border-white/20 rounded-full transform -translate-x-6 translate-y-6"></div>
        </div>

        {/* Close Button */}
        <button
          onClick={() => dismissOffer(currentOffer.id)}
          className="absolute top-2 right-2 w-6 h-6 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors z-10"
        >
          <X className="w-3 h-3" />
        </button>

        {/* Content */}
        <div className="relative z-10 flex items-center space-x-3">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Icon className="w-5 h-5" />
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white leading-tight pr-6">
              {currentOffer.message}
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-3 relative z-10">
          <Button
            size="sm"
            onClick={() => window.location.href = currentOffer.actionUrl}
            className="w-full bg-white/20 hover:bg-white/30 text-white border-white/30 font-medium"
          >
            {currentOffer.action}
          </Button>
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
          <div 
            className="h-full bg-white/60 transition-all"
            style={{
              animation: `shrink ${currentOffer.duration || 8000}ms linear`,
              transformOrigin: 'left'
            }}
          />
        </div>
      </div>
    </div>
  )
}

// Add this CSS to globals.css
const progressCSS = `
@keyframes shrink {
  from { width: 100%; }
  to { width: 0%; }
}
`