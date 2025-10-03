import React from 'react'
import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'bestseller' | 'new' | 'top-rated' | 'hot' | 'default'
  className?: string
}

export default function Badge({ children, variant = 'default', className }: BadgeProps) {
  const variants = {
    bestseller: 'bg-orange-100 text-orange-800 border-orange-200',
    new: 'bg-green-100 text-green-800 border-green-200',
    'top-rated': 'bg-purple-100 text-purple-800 border-purple-200',
    hot: 'bg-red-100 text-red-800 border-red-200',
    default: 'bg-neutral-100 text-neutral-800 border-neutral-200'
  }

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  )
}