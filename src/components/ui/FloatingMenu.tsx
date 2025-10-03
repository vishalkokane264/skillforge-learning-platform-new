'use client'

import { useState, useEffect } from 'react'
import { BookOpen, Plus, X, ShoppingCart, User, Search, Heart } from 'lucide-react'
import Button from '@/components/ui/Button'

interface FloatingAction {
  icon: React.ComponentType<any>
  label: string
  action: () => void
  color: string
}

interface FloatingMenuProps {
  currentPath: string
}

export default function FloatingMenu({ currentPath }: FloatingMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 300
      setIsVisible(scrolled)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const actions: FloatingAction[] = [
    {
      icon: BookOpen,
      label: 'Browse Courses',
      action: () => window.location.href = '/categories',
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      icon: Search,
      label: 'Search',
      action: () => {
        const searchInput = document.querySelector('input[type="search"]') as HTMLInputElement
        if (searchInput) {
          searchInput.focus()
        } else {
          window.location.href = '/categories'
        }
      },
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      icon: ShoppingCart,
      label: 'Cart',
      action: () => window.location.href = '/cart',
      color: 'bg-orange-500 hover:bg-orange-600'
    },
    {
      icon: Heart,
      label: 'Wishlist',
      action: () => window.location.href = '/my-learning',
      color: 'bg-pink-500 hover:bg-pink-600'
    }
  ]

  if (!isVisible) return null

  return (
    <div className="fixed bottom-20 left-6 z-[110]">
      {/* Action Items */}
      <div className={`flex flex-col-reverse space-y-reverse space-y-3 mb-3 transition-all duration-300 ${
        isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}>
        {actions.map((action, index) => {
          const Icon = action.icon
          return (
            <div
              key={index}
              className={`transform transition-all duration-300 ${
                isOpen ? 'scale-100' : 'scale-0'
              }`}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <button
                onClick={() => {
                  action.action()
                  setIsOpen(false)
                }}
                className={`${action.color} text-white p-3 rounded-full shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-110 flex items-center justify-center group relative`}
                title={action.label}
              >
                <Icon className="w-5 h-5" />
                
                {/* Tooltip */}
                <div className="absolute left-full ml-3 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  {action.label}
                  <div className="absolute top-1/2 -left-1 transform -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                </div>
              </button>
            </div>
          )
        })}
      </div>

      {/* Main Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`bg-primary-600 hover:bg-primary-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-110 relative overflow-hidden ${
          isOpen ? 'rotate-45' : 'rotate-0'
        }`}
        title={isOpen ? 'Close menu' : 'Quick actions'}
      >
        {/* Background Animation */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-primary-700 opacity-0 hover:opacity-100 transition-opacity"></div>
        
        <div className="relative z-10">
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Plus className="w-6 h-6" />
          )}
        </div>

        {/* Ripple Effect */}
        <div className="absolute inset-0 rounded-full bg-white/20 scale-0 group-active:scale-100 transition-transform duration-200"></div>
      </button>

      {/* Quick Stats Badge */}
      {!isOpen && (
        <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold animate-pulse">
          4
        </div>
      )}
    </div>
  )
}