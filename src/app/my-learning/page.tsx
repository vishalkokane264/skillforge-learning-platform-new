'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Play, Clock, CheckCircle, BookOpen, Search, Filter } from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Button from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'

interface EnrolledCourse {
  id: string
  title: string
  instructor: string
  thumbnail: string
  progress: number
  totalLessons: number
  completedLessons: number
  lastAccessed: string
  duration: string
  currentLesson: string
}

export default function MyLearningPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filter, setFilter] = useState('all') // all, in-progress, completed

  const enrolledCourses: EnrolledCourse[] = [
    {
      id: '1',
      title: 'Web Development - Basics',
      instructor: 'Sarah Johnson',
      thumbnail: '/placeholder-course-1.jpg',
      progress: 65,
      totalLessons: 42,
      completedLessons: 27,
      lastAccessed: '2 hours ago',
      duration: '12h 30min',
      currentLesson: 'lesson8'
    },
    {
      id: '4',
      title: 'React Complete Course 2024',
      instructor: 'Alex Thompson',
      thumbnail: '/placeholder-course-2.jpg',
      progress: 30,
      totalLessons: 68,
      completedLessons: 20,
      lastAccessed: '1 day ago',
      duration: '24h 15min',
      currentLesson: 'lesson5'
    },
    {
      id: '5',
      title: 'UI/UX Design Masterclass',
      instructor: 'Lisa Chen',
      thumbnail: '/placeholder-course-3.jpg',
      progress: 100,
      totalLessons: 35,
      completedLessons: 35,
      lastAccessed: '3 days ago',
      duration: '18h 45min',
      currentLesson: 'completed'
    }
  ]

  const filteredCourses = enrolledCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchQuery.toLowerCase())
    
    if (filter === 'in-progress') return matchesSearch && course.progress > 0 && course.progress < 100
    if (filter === 'completed') return matchesSearch && course.progress === 100
    return matchesSearch
  })

  const stats = {
    totalCourses: enrolledCourses.length,
    inProgress: enrolledCourses.filter(c => c.progress > 0 && c.progress < 100).length,
    completed: enrolledCourses.filter(c => c.progress === 100).length,
    totalHours: enrolledCourses.reduce((sum, course) => {
      const hours = parseFloat(course.duration.replace(/[^0-9.]/g, ''))
      return sum + hours
    }, 0)
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />
      
      <div className="container py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900 mb-4">My Learning</h1>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4 text-center">
                <BookOpen className="w-8 h-8 text-primary-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-neutral-900">{stats.totalCourses}</div>
                <div className="text-sm text-neutral-600">Total Courses</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Play className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-neutral-900">{stats.inProgress}</div>
                <div className="text-sm text-neutral-600">In Progress</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-neutral-900">{stats.completed}</div>
                <div className="text-sm text-neutral-600">Completed</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-neutral-900">{stats.totalHours.toFixed(1)}</div>
                <div className="text-sm text-neutral-600">Hours Learning</div>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="text"
                placeholder="Search your courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-neutral-600" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
              >
                <option value="all">All Courses</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <Card key={course.id} className="hover:shadow-xl transition-all duration-300">
              <div className="relative">
                <Image
                  src={course.thumbnail}
                  alt={course.title}
                  width={300}
                  height={169}
                  className="w-full h-48 object-cover"
                />
                
                {/* Progress Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white text-sm font-medium">
                      {course.progress}% Complete
                    </span>
                    {course.progress === 100 && (
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    )}
                  </div>
                  <div className="w-full bg-white/30 rounded-full h-2 overflow-hidden">
                    <div 
                      className="h-full bg-white transition-all duration-300"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>

                {/* Play Button Overlay */}
                <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Link href={`/course/${course.id}/learn/${course.currentLesson === 'completed' ? 'lesson1' : course.currentLesson}`}>
                    <Button size="lg" className="bg-white/90 text-primary-600 hover:bg-white">
                      <Play className="w-5 h-5 mr-2" />
                      {course.progress === 100 ? 'Review' : 'Continue'}
                    </Button>
                  </Link>
                </div>
              </div>

              <CardContent className="p-6">
                <h3 className="font-semibold text-neutral-900 mb-2 line-clamp-2">
                  {course.title}
                </h3>
                <p className="text-sm text-neutral-600 mb-3">By {course.instructor}</p>
                
                <div className="flex items-center justify-between text-sm text-neutral-500 mb-4">
                  <div className="flex items-center space-x-4">
                    <span>{course.completedLessons}/{course.totalLessons} lessons</span>
                    <span>{course.duration}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-neutral-500">
                    Last accessed {course.lastAccessed}
                  </span>
                  
                  <Link href={`/course/${course.id}/learn/${course.currentLesson === 'completed' ? 'lesson1' : course.currentLesson}`}>
                    <Button size="sm" variant="secondary">
                      <Play className="w-4 h-4 mr-2" />
                      {course.progress === 100 ? 'Review' : 'Continue'}
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-16">
            <BookOpen className="w-24 h-24 text-neutral-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-neutral-900 mb-2">
              No courses found
            </h3>
            <p className="text-neutral-600 mb-6">
              {searchQuery ? 'Try adjusting your search or filter.' : 'Start learning by browsing our course catalog.'}
            </p>
            <Button onClick={() => window.location.href = '/'}>
              Browse Courses
            </Button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}