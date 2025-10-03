import { NextRequest, NextResponse } from 'next/server'

interface Offer {
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
  icon: string
  trigger: 'scroll' | 'time'
  triggerValue: number
  pattern: string
  countdown?: number | null
  isActive: boolean
  priority: number
}

const offers: Offer[] = [
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
    trigger: 'time',
    triggerValue: 5000,
    gradient: 'from-blue-600 via-purple-600 to-pink-600',
    pattern: 'geometric',
    icon: 'Gift',
    countdown: 24 * 60 * 60,
    isActive: true,
    priority: 1
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
    trigger: 'scroll',
    triggerValue: 50,
    gradient: 'from-red-600 via-orange-500 to-yellow-500',
    pattern: 'lightning',
    icon: 'Zap',
    countdown: 6 * 60 * 60,
    isActive: false, // Sometimes active
    priority: 2
  }
]

export async function GET(request: NextRequest) {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800))
    
    const { searchParams } = new URL(request.url)
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 2
    const activeOnly = searchParams.get('active') === 'true'
    
    let filteredOffers = offers
    
    if (activeOnly) {
      filteredOffers = offers.filter(offer => offer.isActive)
    }
    
    // Randomly show offers sometimes (30% chance)
    const shouldShow = Math.random() > 0.7
    if (!shouldShow) {
      return NextResponse.json({
        success: true,
        data: [],
        total: 0,
        timestamp: new Date().toISOString()
      })
    }
    
    // Return only specified number of offers, sorted by priority
    const response = filteredOffers
      .sort((a, b) => a.priority - b.priority)
      .slice(0, limit)
    
    return NextResponse.json({
      success: true,
      data: response,
      total: filteredOffers.length,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch offers' },
      { status: 500 }
    )
  }
}