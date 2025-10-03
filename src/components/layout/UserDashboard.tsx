'use client'

import { useState, useEffect } from 'react'
import { Play, BookOpen, Award, TrendingUp, Clock, Target, ArrowRight, Star } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import DynamicTagline from '@/components/ui/DynamicTagline'

interface UserDashboardProps {
  user: {
    name: string
    email: string
    avatar: string
  }
}

export default function UserDashboard({ user }: UserDashboardProps) {
  const [stats, setStats] = useState({
    coursesEnrolled: 5,
    coursesCompleted: 3,
    learningHours: 124,
    currentStreak: 7,
    certificatesEarned: 3,
    completionRate: 78
  })

  const topCategories = [
    {
      id: 'development',
      name: 'Development',
      icon: '💻',
      description: 'Web & Mobile Development',
      courseCount: 847,
      color: 'from-blue-500 to-purple-600',
      progress: 65
    },
    {
      id: 'design',
      name: 'Design',
      icon: '🎨',
      description: 'UI/UX & Graphic Design',
      courseCount: 523,
      color: 'from-pink-500 to-rose-600',
      progress: 45
    },
    {
      id: 'business',
      name: 'Business',
      icon: '📊',
      description: 'Marketing & Entrepreneurship',
      courseCount: 376,
      color: 'from-green-500 to-emerald-600',
      progress: 80
    },
    {
      id: 'data-science',
      name: 'Data Science',
      icon: '📈',
      description: 'AI & Machine Learning',
      courseCount: 287,
      color: 'from-indigo-500 to-blue-600',
      progress: 30
    }
  ]

  const currentTime = new Date().getHours()
  const getGreeting = () => {
    if (currentTime < 12) return 'Good morning'
    if (currentTime < 17) return 'Good afternoon'
    return 'Good evening'
  }

  return (
    <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            {getGreeting()}, {user.name}! 👋
          </h1>
          <DynamicTagline />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-6 h-6 text-primary-600" />
              </div>
              <div className="text-2xl font-bold text-primary-900 mb-1">{stats.coursesEnrolled}</div>
              <div className="text-sm text-primary-700">Courses Enrolled</div>
            </CardContent>
          </Card>

          <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Award className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-green-900 mb-1">{stats.coursesCompleted}</div>
              <div className="text-sm text-green-700">Completed</div>
            </CardContent>
          </Card>

          <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-blue-900 mb-1">{stats.learningHours}h</div>
              <div className="text-sm text-blue-700">Learning Time</div>
            </CardContent>
          </Card>

          <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Target className="w-6 h-6 text-orange-600" />
              </div>
              <div className="text-2xl font-bold text-orange-900 mb-1">{stats.currentStreak}</div>
              <div className="text-sm text-orange-700">Day Streak</div>
            </CardContent>
          </Card>
        </div>

        {/* Explore Categories Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2 text-white">Explore Top Categories</h2>
              <p className="text-primary-100">Discover new skills and advance your career</p>
            </div>
            <Button 
              className="bg-white/90 text-primary-700 hover:bg-white border-0 shadow-md font-semibold"
              onClick={() => window.location.href = '/categories'}
            >
              View All Categories
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {topCategories.map((category) => (
              <Card 
                key={category.id}
                className="group cursor-pointer hover:scale-105 transition-all duration-300 border-0 shadow-xl overflow-hidden"
                onClick={() => window.location.href = `/categories#${category.id}`}
              >
                <CardContent className="p-0 relative h-48">
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.color}`}>
                    <div className="absolute inset-0 bg-black/20"></div>
                  </div>
                  
                  {/* Decorative Pattern */}
                  <div className="absolute top-0 right-0 w-24 h-24 opacity-10">
                    <div className="w-full h-full rounded-full border-8 border-white transform rotate-45 translate-x-6 -translate-y-6"></div>
                  </div>
                  
                  {/* Content */}
                  <div className="relative z-10 p-6 h-full flex flex-col justify-between text-white">
                    <div>
                      <div className="text-4xl mb-3 transform group-hover:scale-110 transition-transform">
                        {category.icon}
                      </div>
                      <h3 className="text-xl font-bold mb-2 group-hover:text-yellow-200 transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-white/80 text-sm mb-4 line-height-relaxed">
                        {category.description}
                      </p>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between text-sm mb-3">
                        <span className="font-medium">{category.courseCount} courses</span>
                        <span className="bg-white/20 px-2 py-1 rounded-full text-xs">
                          {category.progress}% explored
                        </span>
                      </div>
                      <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
                        <div 
                          className="bg-white h-full rounded-full transition-all duration-500 group-hover:bg-yellow-300"
                          style={{ width: `${category.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 transform scale-75 group-hover:scale-100 transition-transform">
                      <ArrowRight className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  {/* Floating Elements */}
                  <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex space-x-1">
                      {[...Array(3)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 text-yellow-300 fill-current" />
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <Button 
            size="lg"
            className="bg-white text-primary-700 hover:bg-neutral-100 shadow-lg border-0 font-semibold"
            onClick={() => window.location.href = '/my-learning'}
          >
            <Play className="w-5 h-5 mr-2" />
            Continue Learning
          </Button>
          <Button 
            size="lg"
            className="bg-yellow-400 text-yellow-900 hover:bg-yellow-300 shadow-lg border-0 font-semibold"
            onClick={() => window.location.href = '/certificates'}
          >
            <Award className="w-5 h-5 mr-2" />
            View Certificates
          </Button>
          <Button 
            size="lg"
            className="bg-green-400 text-green-900 hover:bg-green-300 shadow-lg border-0 font-semibold"
            onClick={() => window.location.href = '/profile'}
          >
            <TrendingUp className="w-5 h-5 mr-2" />
            View Progress
          </Button>
        </div>

        {/* Achievement Message */}
        <div className="text-center">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <p className="text-primary-100 font-medium">
              {stats.coursesCompleted > 0 
                ? `🎉 ${stats.coursesCompleted} course${stats.coursesCompleted > 1 ? 's' : ''} completed! You're on fire!`
                : '🚀 Ready to start your learning journey? Pick a category above!'
              }
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}