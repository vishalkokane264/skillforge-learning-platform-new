import { NextRequest, NextResponse } from 'next/server'

interface Banner {
  id: string
  type: 'top-bar' | 'floating-banner' | 'corner-ribbon'
  title: string
  message: string
  ctaText: string
  ctaUrl: string
  backgroundColor: string
  textColor: string
  icon: string
  duration: number
  position: 'top' | 'bottom' | 'corner'
  animation: 'slide' | 'fade' | 'bounce' | 'pulse'
  isActive: boolean
  priority: number
}

const banners: Banner[] = [
  {
    id: 'flash-sale-banner',
    type: 'top-bar',
    title: '⚡ FLASH SALE ALERT',
    message: '70% OFF all courses - Limited time only!',
    ctaText: 'Shop Now',
    ctaUrl: '/categories?flash=70off',
    backgroundColor: 'bg-gradient-to-r from-red-600 to-orange-500',
    textColor: 'text-white',
    icon: 'Zap',
    position: 'top',
    animation: 'slide',
    duration: 10000,
    isActive: true,
    priority: 1
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
    icon: 'Sparkles',
    position: 'bottom',
    animation: 'fade',
    duration: 8000,
    isActive: false,
    priority: 2
  }
]

export async function GET(request: NextRequest) {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 600))
    
    const { searchParams } = new URL(request.url)
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 1
    const activeOnly = searchParams.get('active') === 'true'
    
    let filteredBanners = banners
    
    if (activeOnly) {
      filteredBanners = banners.filter(banner => banner.isActive)
    }
    
    // Show banners sometimes (40% chance)
    const shouldShow = Math.random() > 0.6
    if (!shouldShow) {
      return NextResponse.json({
        success: true,
        data: [],
        total: 0,
        timestamp: new Date().toISOString()
      })
    }
    
    const response = filteredBanners
      .sort((a, b) => a.priority - b.priority)
      .slice(0, limit)
    
    return NextResponse.json({
      success: true,
      data: response,
      total: filteredBanners.length,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch banners' },
      { status: 500 }
    )
  }
}