'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Clock, Users, Star } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import StarRating from '@/components/ui/StarRating'
import { Course } from '@/types'
import { formatPrice } from '@/lib/utils'

interface CourseCardProps {
  course: Course
}

export default function CourseCard({ course }: CourseCardProps) {
  const addToCart = (courseId: string) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    const existingItem = cart.find((item: any) => item.courseId === courseId)
    
    if (!existingItem) {
      cart.push({
        courseId,
        quantity: 1,
        addedAt: new Date()
      })
      localStorage.setItem('cart', JSON.stringify(cart))
      
      // Trigger storage event for header update
      window.dispatchEvent(new Event('storage'))
      
      // Show success message (you could use a toast library here)
      alert('Course added to cart!')
    } else {
      alert('Course already in cart!')
    }
  }
  return (
    <Link href={`/course/${course.id}`}>
      <Card className="group cursor-pointer h-full flex flex-col">
        <div className="relative overflow-hidden">
          <Image
            src={course.thumbnail}
            alt={course.title}
            width={400}
            height={225}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {course.badges.length > 0 && (
            <div className="absolute top-3 left-3">
              <Badge variant={course.badges[0].variant}>
                {course.badges[0].text}
              </Badge>
            </div>
          )}
          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
            <button 
              onClick={(e) => {
                e.preventDefault()
                addToCart(course.id)
              }}
              className="bg-white text-primary-600 px-4 py-2 rounded-lg font-medium hover:bg-neutral-100 transition-colors text-sm"
            >
              Add to Cart
            </button>
            <button 
              onClick={(e) => {
                e.preventDefault()
                window.open(`/course/${course.id}/learn/lesson1`, '_blank')
              }}
              className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors text-sm"
            >
              Preview
            </button>
          </div>
          <button className="absolute top-3 right-3 w-8 h-8 bg-white bg-opacity-90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
            <span className="text-neutral-600">♡</span>
          </button>
        </div>

        <CardContent className="p-5 flex-1 flex flex-col">
          <h3 className="font-semibold text-neutral-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors min-h-[3rem]">
            {course.title}
          </h3>
          <p className="text-sm text-neutral-600 mb-3 line-clamp-2 min-h-[2.5rem]">
            {course.subtitle}
          </p>

          <div className="flex items-center space-x-1 mb-3">
            <StarRating rating={course.rating} size="sm" />
            <span className="text-sm font-medium text-neutral-900 ml-1">
              {course.rating}
            </span>
            <span className="text-sm text-neutral-500">
              ({course.reviewCount.toLocaleString()})
            </span>
          </div>

          <div className="flex items-center justify-between text-sm text-neutral-500 mb-3">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4" />
                <span>{(course.studentCount / 1000).toFixed(0)}k</span>
              </div>
            </div>
            <span className="text-xs bg-neutral-100 px-2 py-1 rounded">
              {course.level}
            </span>
          </div>

          <div className="mt-auto">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <span className="text-lg font-bold text-neutral-900">
                  {formatPrice(course.price)}
                </span>
                {course.originalPrice && (
                  <span className="text-sm text-neutral-500 line-through">
                    {formatPrice(course.originalPrice)}
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <img
                src={course.instructor.avatar}
                alt={course.instructor.name}
                className="w-6 h-6 rounded-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = `/api/placeholder/avatar/default-instructor`
                }}
              />
              <p className="text-sm text-neutral-600">
                {course.instructor.name}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}