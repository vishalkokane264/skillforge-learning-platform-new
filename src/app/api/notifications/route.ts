import { NextRequest, NextResponse } from 'next/server'

interface SmartNotification {
  id: string
  type: 'recommendation' | 'achievement' | 'reminder' | 'social' | 'milestone'
  title: string
  message: string
  actionText: string
  actionUrl: string
  icon: string
  priority: 'high' | 'medium' | 'low'
  backgroundColor: string
  textColor: string
  showAvatar?: boolean
  showProgress?: boolean
  progressValue?: number
  expiresAt?: string
  isActive: boolean
  targetUserType: 'all' | 'logged-in' | 'new' | 'premium'
}

const notifications: SmartNotification[] = [
  {
    id: 'course-recommendation',
    type: 'recommendation',
    title: '📚 Perfect Match Found!',
    message: 'Based on your React skills, we recommend "Advanced React Patterns" - 94% match',
    actionText: 'View Course',
    actionUrl: '/course/advanced-react-patterns',
    icon: 'BookOpen',
    priority: 'high',
    backgroundColor: 'bg-gradient-to-r from-blue-500 to-indigo-600',
    textColor: 'text-white',
    showProgress: true,
    progressValue: 94,
    isActive: true,
    targetUserType: 'logged-in'
  },
  {
    id: 'streak-achievement',
    type: 'achievement',
    title: '🔥 Streak Master!',
    message: 'Congrats! You have maintained a 7-day learning streak. Keep it up!',
    actionText: 'Continue Learning',
    actionUrl: '/my-learning',
    icon: 'Trophy',
    priority: 'high',
    backgroundColor: 'bg-gradient-to-r from-orange-500 to-red-500',
    textColor: 'text-white',
    showProgress: true,
    progressValue: 100,
    isActive: false,
    targetUserType: 'logged-in'
  }
]

export async function GET(request: NextRequest) {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 700))
    
    const { searchParams } = new URL(request.url)
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 2
    const userType = searchParams.get('userType') || 'all'
    const activeOnly = searchParams.get('active') === 'true'
    
    let filteredNotifications = notifications
    
    if (activeOnly) {
      filteredNotifications = notifications.filter(notif => notif.isActive)
    }
    
    if (userType !== 'all') {
      filteredNotifications = filteredNotifications.filter(
        notif => notif.targetUserType === 'all' || notif.targetUserType === userType
      )
    }
    
    // Show notifications sometimes for logged-in users (50% chance)
    if (userType === 'logged-in') {
      const shouldShow = Math.random() > 0.5
      if (!shouldShow) {
        return NextResponse.json({
          success: true,
          data: [],
          total: 0,
          timestamp: new Date().toISOString()
        })
      }
    }
    
    // Sort by priority
    const priorityOrder = { high: 3, medium: 2, low: 1 }
    const response = filteredNotifications
      .sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority])
      .slice(0, limit)
    
    return NextResponse.json({
      success: true,
      data: response,
      total: filteredNotifications.length,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch notifications' },
      { status: 500 }
    )
  }
}