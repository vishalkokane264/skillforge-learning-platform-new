'use client'

import { useState, useEffect } from 'react'
import { X, BookOpen, Trophy, Target, Clock, Star, TrendingUp, Users, Award } from 'lucide-react'
import Button from '@/components/ui/Button'
import { apiService, useApiCall } from '@/lib/apiService'
import { NotificationLoader } from '@/components/ui/Loader'

interface SmartNotification {
  id: string
  type: 'recommendation' | 'achievement' | 'reminder' | 'social' | 'milestone'
  title: string
  message: string
  actionText: string
  actionUrl: string
  icon: string | React.ComponentType<any>
  priority: 'high' | 'medium' | 'low'
  backgroundColor: string
  textColor: string
  showAvatar?: boolean
  showProgress?: boolean
  progressValue?: number
  expiresAt?: Date
}

// Icon mapping for API data
const notificationIconMap: { [key: string]: React.ComponentType<any> } = {
  BookOpen,
  Trophy,
  Target,
  Clock,
  Star,
  TrendingUp,
  Users,
  Award
}

const legacyNotifications: SmartNotification[] = [
  {
    id: 'course-recommendation',
    type: 'recommendation',
    title: '📚 Perfect Match Found!',
    message: 'Based on your React skills, we recommend "Advanced React Patterns" - 94% match',
    actionText: 'View Course',
    actionUrl: '/course/advanced-react-patterns',
    icon: BookOpen,
    priority: 'high',
    backgroundColor: 'bg-gradient-to-r from-blue-500 to-indigo-600',
    textColor: 'text-white',
    showProgress: true,
    progressValue: 94
  },
  {
    id: 'streak-achievement',
    type: 'achievement',
    title: '🔥 Streak Master!',
    message: 'Congrats! You\'ve maintained a 7-day learning streak. Keep it up!',
    actionText: 'Continue Learning',
    actionUrl: '/my-learning',
    icon: Trophy,
    priority: 'high',
    backgroundColor: 'bg-gradient-to-r from-orange-500 to-red-500',
    textColor: 'text-white',
    showProgress: true,
    progressValue: 100
  },
  {
    id: 'course-reminder',
    type: 'reminder',
    title: '⏰ Course in Progress',
    message: 'You\'re 75% through "JavaScript Fundamentals". Finish today to get certified!',
    actionText: 'Continue Course',
    actionUrl: '/course/javascript-fundamentals/learn',
    icon: Clock,
    priority: 'medium',
    backgroundColor: 'bg-gradient-to-r from-green-500 to-teal-500',
    textColor: 'text-white',
    showProgress: true,
    progressValue: 75
  },
  {
    id: 'social-update',
    type: 'social',
    title: '👥 Community Update',
    message: '1,247 students just completed courses in your skill area this week!',
    actionText: 'Join Community',
    actionUrl: '/community',
    icon: Users,
    priority: 'low',
    backgroundColor: 'bg-gradient-to-r from-purple-500 to-pink-500',
    textColor: 'text-white',
    showAvatar: true
  },
  {
    id: 'milestone-reached',
    type: 'milestone',
    title: '🎯 Milestone Unlocked',
    message: 'You\'ve completed 10 courses! Claim your "Dedicated Learner" badge.',
    actionText: 'Claim Badge',
    actionUrl: '/profile/achievements',
    icon: Award,
    priority: 'high',
    backgroundColor: 'bg-gradient-to-r from-yellow-500 to-orange-500',
    textColor: 'text-gray-900',
    showProgress: true,
    progressValue: 100
  },
  {
    id: 'skill-trend',
    type: 'recommendation',
    title: '📈 Trending Skills',
    message: 'AI & Machine Learning courses are 300% more popular. Start learning today!',
    actionText: 'Explore AI',
    actionUrl: '/categories?category=ai-ml',
    icon: TrendingUp,
    priority: 'medium',
    backgroundColor: 'bg-gradient-to-r from-cyan-500 to-blue-500',
    textColor: 'text-white',
    showProgress: false
  }
]

interface SmartNotificationsProps {
  isLoggedIn: boolean
}

export default function SmartNotifications({ isLoggedIn }: SmartNotificationsProps) {
  const [activeNotification, setActiveNotification] = useState<SmartNotification | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [dismissedNotifications, setDismissedNotifications] = useState<string[]>([])
  const [notificationQueue, setNotificationQueue] = useState<SmartNotification[]>([])

  // Fetch notifications from API
  const userType = isLoggedIn ? 'logged-in' : 'all'
  const { data: apiNotifications, loading, error } = useApiCall(() => apiService.getNotifications(2, userType, true), [isLoggedIn])

  // Convert API notifications to component format
  const processedNotifications = apiNotifications.map((notif: any) => ({
    ...notif,
    icon: notificationIconMap[notif.icon] || BookOpen
  }))

  useEffect(() => {
    if (!isLoggedIn || loading) return // Don't process while loading

    if (processedNotifications.length === 0) return // No notifications available from API

    // Load dismissed notifications
    const dismissed = localStorage.getItem('dismissedSmartNotifications')
    if (dismissed) {
      setDismissedNotifications(JSON.parse(dismissed))
    }

    // Filter and prioritize notifications
    const availableNotifications = processedNotifications
      .filter((notif: SmartNotification) => !dismissedNotifications.includes(notif.id))
      .sort((a: SmartNotification, b: SmartNotification) => {
        const priority = { high: 3, medium: 2, low: 1 }
        return priority[b.priority] - priority[a.priority]
      })

    setNotificationQueue(availableNotifications)
  }, [isLoggedIn, dismissedNotifications, processedNotifications, loading])

  useEffect(() => {
    if (notificationQueue.length === 0 || activeNotification) return

    // Show next notification
    const showNextNotification = () => {
      const nextNotification = notificationQueue[0]
      setActiveNotification(nextNotification)
      setIsVisible(true)

      // Auto dismiss after time based on priority
      const dismissTime = {
        high: 12000,    // 12 seconds
        medium: 8000,   // 8 seconds  
        low: 6000       // 6 seconds
      }

      setTimeout(() => {
        dismissNotification(nextNotification.id, false) // Auto dismiss without marking as dismissed
      }, dismissTime[nextNotification.priority])
    }

    // Initial delay before showing first notification
    const delay = setTimeout(showNextNotification, 3000)
    return () => clearTimeout(delay)
  }, [notificationQueue, activeNotification])

  const dismissNotification = (notificationId: string, markAsDismissed = true) => {
    if (markAsDismissed) {
      const newDismissed = [...dismissedNotifications, notificationId]
      setDismissedNotifications(newDismissed)
      localStorage.setItem('dismissedSmartNotifications', JSON.stringify(newDismissed))
    }

    setIsVisible(false)
    setTimeout(() => {
      setActiveNotification(null)
      
      // Remove from queue and show next after delay
      setNotificationQueue(prev => {
        const filtered = prev.filter(n => n.id !== notificationId)
        
        // Show next notification after 10 seconds
        if (filtered.length > 0) {
          setTimeout(() => {
            const nextNotif = filtered[0]
            setActiveNotification(nextNotif)
            setIsVisible(true)
            
            // Auto dismiss
            const dismissTime = { high: 12000, medium: 8000, low: 6000 }
            setTimeout(() => {
              dismissNotification(nextNotif.id, false)
            }, dismissTime[nextNotif.priority])
          }, 10000)
        }
        
        return filtered
      })
    }, 300)
  }

  // Don't show anything while loading, not logged in, error, or no notification
  if (loading || !isLoggedIn || error || !activeNotification || !isVisible) return null

  const Icon = typeof activeNotification.icon === 'string' ? notificationIconMap[activeNotification.icon] || BookOpen : activeNotification.icon

  return (
    <div className={`fixed top-20 left-6 z-[100] transform transition-all duration-500 ${
      isVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
    }`}>
      <div className={`${activeNotification.backgroundColor} ${activeNotification.textColor} rounded-2xl shadow-2xl p-5 max-w-sm relative overflow-hidden`}>
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-white/5">
          <div className="absolute -top-4 -right-4 w-20 h-20 border-4 border-white/20 rounded-full"></div>
          <div className="absolute -bottom-2 -left-2 w-12 h-12 bg-white/10 rounded-full"></div>
        </div>

        {/* Priority Indicator */}
        <div className={`absolute top-0 left-0 w-full h-1 ${
          activeNotification.priority === 'high' ? 'bg-red-400' :
          activeNotification.priority === 'medium' ? 'bg-yellow-400' : 'bg-blue-400'
        }`}></div>

        {/* Close Button */}
        <button
          onClick={() => dismissNotification(activeNotification.id, true)}
          className="absolute top-3 right-3 w-6 h-6 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors z-10"
        >
          <X className="w-3 h-3" />
        </button>

        {/* Content */}
        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-start space-x-3 mb-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
              <Icon className="w-5 h-5" />
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-sm leading-tight mb-1">{activeNotification.title}</h3>
              <p className="text-xs opacity-90 leading-relaxed">{activeNotification.message}</p>
            </div>
          </div>

          {/* Progress Bar (if applicable) */}
          {activeNotification.showProgress && activeNotification.progressValue && (
            <div className="mb-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs opacity-75">Progress</span>
                <span className="text-xs font-bold">{activeNotification.progressValue}%</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <div 
                  className="bg-white/80 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${activeNotification.progressValue}%` }}
                />
              </div>
            </div>
          )}

          {/* Avatar (for social notifications) */}
          {activeNotification.showAvatar && (
            <div className="flex items-center space-x-2 mb-3">
              <div className="flex -space-x-2">
                <div className="w-6 h-6 bg-white/30 rounded-full border-2 border-white/50"></div>
                <div className="w-6 h-6 bg-white/20 rounded-full border-2 border-white/50"></div>
                <div className="w-6 h-6 bg-white/40 rounded-full border-2 border-white/50"></div>
              </div>
              <span className="text-xs opacity-75">+1,244 others</span>
            </div>
          )}

          {/* Action Button */}
          <Button
            onClick={() => window.location.href = activeNotification.actionUrl}
            size="sm"
            className="w-full bg-white/20 hover:bg-white/30 border-white/30 font-medium text-xs"
          >
            {activeNotification.actionText}
          </Button>

          {/* Type Badge */}
          <div className="flex items-center justify-between mt-3 text-xs opacity-60">
            <span className="capitalize">{activeNotification.type}</span>
            <div className="flex items-center space-x-1">
              <div className={`w-2 h-2 rounded-full ${
                activeNotification.priority === 'high' ? 'bg-red-400' :
                activeNotification.priority === 'medium' ? 'bg-yellow-400' : 'bg-blue-400'
              }`}></div>
              <span>{activeNotification.priority} priority</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}