import { NextRequest, NextResponse } from 'next/server'

interface MiniOffer {
  id: string
  message: string
  action: string
  actionUrl: string
  icon: string
  color: string
  duration: number
  isActive: boolean
  priority: number
}

const miniOffers: MiniOffer[] = [
  {
    id: 'free-course',
    message: '🎁 Free course of the week: "JavaScript Basics"',
    action: 'Claim Free',
    actionUrl: '/course/free-javascript',
    icon: 'Gift',
    color: 'bg-green-500',
    duration: 8000,
    isActive: true,
    priority: 1
  },
  {
    id: 'flash-discount',
    message: '⚡ Flash: 30% off all courses expires in 2 hours!',
    action: 'Shop Now',
    actionUrl: '/categories?flash=30',
    icon: 'Zap',
    color: 'bg-orange-500',
    duration: 10000,
    isActive: false,
    priority: 2
  }
]

export async function GET(request: NextRequest) {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const { searchParams } = new URL(request.url)
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 2
    const activeOnly = searchParams.get('active') === 'true'
    
    let filteredOffers = miniOffers
    
    if (activeOnly) {
      filteredOffers = miniOffers.filter(offer => offer.isActive)
    }
    
    // Show mini offers sometimes (60% chance)
    const shouldShow = Math.random() > 0.4
    if (!shouldShow) {
      return NextResponse.json({
        success: true,
        data: [],
        total: 0,
        timestamp: new Date().toISOString()
      })
    }
    
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
      { success: false, error: 'Failed to fetch mini offers' },
      { status: 500 }
    )
  }
}