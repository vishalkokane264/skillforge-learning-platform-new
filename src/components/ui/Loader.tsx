'use client'

import { Loader2, Sparkles, Zap, Gift } from 'lucide-react'

interface LoaderProps {
  type?: 'spinner' | 'dots' | 'pulse' | 'skeleton' | 'promotional'
  size?: 'sm' | 'md' | 'lg'
  message?: string
  className?: string
}

export default function Loader({ 
  type = 'promotional', 
  size = 'md', 
  message = 'Loading amazing offers...', 
  className = '' 
}: LoaderProps) {
  
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6', 
    lg: 'w-8 h-8'
  }

  if (type === 'spinner') {
    return (
      <div className={`flex items-center justify-center space-x-2 ${className}`}>
        <Loader2 className={`animate-spin text-primary-600 ${sizeClasses[size]}`} />
        {message && <span className="text-sm text-gray-600">{message}</span>}
      </div>
    )
  }

  if (type === 'dots') {
    return (
      <div className={`flex items-center justify-center space-x-1 ${className}`}>
        <div className="animate-bounce w-2 h-2 bg-primary-600 rounded-full"></div>
        <div className="animate-bounce w-2 h-2 bg-primary-600 rounded-full" style={{ animationDelay: '0.1s' }}></div>
        <div className="animate-bounce w-2 h-2 bg-primary-600 rounded-full" style={{ animationDelay: '0.2s' }}></div>
        {message && <span className="ml-3 text-sm text-gray-600">{message}</span>}
      </div>
    )
  }

  if (type === 'pulse') {
    return (
      <div className={`flex items-center justify-center space-x-2 ${className}`}>
        <div className={`animate-pulse bg-primary-200 rounded-full ${sizeClasses[size]}`}></div>
        {message && <span className="text-sm text-gray-600">{message}</span>}
      </div>
    )
  }

  if (type === 'skeleton') {
    return (
      <div className={`animate-pulse ${className}`}>
        <div className="bg-gradient-to-r from-gray-200 to-gray-300 rounded-2xl p-6 space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
            <div className="space-y-2 flex-1">
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="h-3 bg-gray-300 rounded w-1/2"></div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-3 bg-gray-300 rounded"></div>
            <div className="h-3 bg-gray-300 rounded w-5/6"></div>
          </div>
          <div className="h-10 bg-gray-300 rounded-lg"></div>
        </div>
      </div>
    )
  }

  // Promotional loader (default)
  return (
    <div className={`flex flex-col items-center justify-center p-8 ${className}`}>
      {/* Animated Icons */}
      <div className="relative mb-4">
        <div className="flex space-x-2">
          <div className="animate-bounce" style={{ animationDelay: '0s' }}>
            <Gift className="w-8 h-8 text-green-500" />
          </div>
          <div className="animate-bounce" style={{ animationDelay: '0.2s' }}>
            <Zap className="w-8 h-8 text-yellow-500" />
          </div>
          <div className="animate-bounce" style={{ animationDelay: '0.4s' }}>
            <Sparkles className="w-8 h-8 text-purple-500" />
          </div>
        </div>
        
        {/* Pulse Ring */}
        <div className="absolute -inset-2 border-2 border-primary-300 rounded-full animate-ping opacity-30"></div>
      </div>
      
      {/* Loading Text */}
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold text-gray-800">
          {message}
        </h3>
        <div className="flex items-center justify-center space-x-1">
          <div className="w-2 h-2 bg-primary-600 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-primary-600 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 bg-primary-600 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-xs mt-6">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full animate-pulse"></div>
        </div>
      </div>
      
      {/* Fun Loading Messages */}
      <div className="mt-4 text-xs text-gray-500 animate-pulse">
        Finding the best deals just for you...
      </div>
    </div>
  )
}

// Specialized loaders for different components
export function OfferLoader() {
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[150] flex items-center justify-center">
      <div className="bg-white rounded-2xl p-8 max-w-sm mx-4">
        <Loader type="promotional" message="Loading exclusive offers..." />
      </div>
    </div>
  )
}

export function BannerLoader() {
  return (
    <div className="fixed top-16 left-0 right-0 z-[90] bg-gradient-to-r from-blue-500 to-purple-600 py-3">
      <div className="max-w-7xl mx-auto px-4">
        <Loader type="dots" message="Loading announcements..." className="text-white" />
      </div>
    </div>
  )
}

export function NotificationLoader() {
  return (
    <div className="fixed top-20 left-6 z-[100] bg-white rounded-2xl shadow-lg p-4 max-w-sm">
      <Loader type="skeleton" className="h-32" />
    </div>
  )
}

export function MiniOfferLoader() {
  return (
    <div className="fixed bottom-6 right-6 z-[120] bg-white rounded-lg shadow-lg p-4 max-w-xs">
      <Loader type="pulse" size="sm" message="Loading mini deals..." />
    </div>
  )
}