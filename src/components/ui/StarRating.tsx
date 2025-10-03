'use client'

import React from 'react'
import { Star, StarHalf } from 'lucide-react'
import { cn } from '@/lib/utils'
import { generateStars } from '@/lib/utils'

interface StarRatingProps {
  rating: number
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export default function StarRating({ rating, className, size = 'md' }: StarRatingProps) {
  const { filled, half, empty } = generateStars(rating)
  
  const starSize = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  }[size]

  return (
    <div className={cn('flex items-center', className)}>
      {Array.from({ length: filled }).map((_, i) => (
        <Star key={`filled-${i}`} className={cn(starSize, 'fill-yellow-400 text-yellow-400')} />
      ))}
      {half && (
        <StarHalf className={cn(starSize, 'fill-yellow-400 text-yellow-400')} />
      )}
      {Array.from({ length: empty }).map((_, i) => (
        <Star key={`empty-${i}`} className={cn(starSize, 'text-neutral-300')} />
      ))}
    </div>
  )
}