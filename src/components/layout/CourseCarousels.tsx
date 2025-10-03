'use client'

import React from 'react'
import CourseCard from '@/components/ui/CourseCard'
import { sampleCourses } from '@/lib/data'

interface CourseCarouselsProps {
  title?: string
  showPersonalized?: boolean
  showContinue?: boolean
}

export default function CourseCarousels({ title, showPersonalized, showContinue }: CourseCarouselsProps) {
  const trendingCourses = sampleCourses.slice(0, 4)
  const newCourses = sampleCourses.slice(1, 5)
  const topRatedCourses = sampleCourses.filter(course => course.rating >= 4.8).slice(0, 4)
  const recommendedCourses = sampleCourses.slice(2, 6)
  const continueCourses = sampleCourses.slice(0, 3) // Mock continue learning

  // If single title prop is passed, show only that carousel
  if (title) {
    let courses = trendingCourses
    if (showPersonalized) courses = recommendedCourses
    if (showContinue) courses = continueCourses
    if (title === 'New Courses') courses = newCourses
    
    return (
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-900">{title}</h2>
            <button className="text-primary-600 hover:text-primary-700 font-medium">
              View All →
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>
    )
  }

  const carousels = [
    { title: 'Trending Courses', courses: trendingCourses },
    { title: 'New & Noteworthy', courses: newCourses },
    { title: 'Top Rated', courses: topRatedCourses },
  ]

  return (
    <section className="py-16 bg-neutral-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="space-y-16">
          {carousels.map((carousel) => (
            <div key={carousel.title}>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-neutral-900">{carousel.title}</h2>
                <button className="text-primary-600 hover:text-primary-700 font-medium">
                  View All →
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {carousel.courses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}