'use client'

import { useState, useEffect } from 'react'
import { Loader2 } from 'lucide-react'

interface PageLoaderProps {
  isLoading: boolean
  message?: string
}

export default function PageLoader({ isLoading, message = "Loading content..." }: PageLoaderProps) {
  const [showLoader, setShowLoader] = useState(false)

  useEffect(() => {
    let timer: NodeJS.Timeout
    
    if (isLoading) {
      // Show loader after a brief delay to avoid flashing
      timer = setTimeout(() => {
        setShowLoader(true)
      }, 100)
    } else {
      setShowLoader(false)
    }

    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [isLoading])

  if (!showLoader || !isLoading) return null

  return (
    <div className="fixed top-4 right-4 z-[200] bg-white rounded-lg shadow-lg p-3 flex items-center space-x-2 border">
      <Loader2 className="w-4 h-4 animate-spin text-primary-600" />
      <span className="text-sm text-gray-700">{message}</span>
    </div>
  )
}