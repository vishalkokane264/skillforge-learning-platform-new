'use client'

import { useState, useEffect } from 'react'

const taglines = [
  "Learn Without Limits",
  "Unlock Your Potential", 
  "Master New Skills Daily",
  "Transform Your Career",
  "Knowledge Never Stops",
  "Grow Beyond Boundaries",
  "Skill Up, Level Up",
  "Learn Today, Lead Tomorrow",
  "Your Success Journey Starts Here",
  "Endless Learning, Endless Possibilities"
]

export default function DynamicTagline() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false)
      
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % taglines.length)
        setIsVisible(true)
      }, 250) // Half of the transition duration
      
    }, 5000) // Change every 5 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="h-8 flex items-center justify-center overflow-hidden">
      <span 
        className={`text-lg font-medium text-primary-100 transition-all duration-500 transform ${
          isVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 -translate-y-2'
        }`}
      >
        {taglines[currentIndex]}
      </span>
    </div>
  )
}