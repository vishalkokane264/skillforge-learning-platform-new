'use client'

import { useState, useEffect } from 'react'
import { User, Settings, BookOpen, Crown, Award, Clock, Target, TrendingUp, Star } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import SubscriptionCard from '@/components/ui/SubscriptionCard'

interface UserProfile {
  name: string
  email: string
  avatar: string
  joinDate: string
  coursesCompleted: number
  totalCourses: number
  totalLearningTime: number
  certificates: number
  currentStreak: number
}

interface EnrolledCourse {
  id: string
  title: string
  instructor: string
  progress: number
  lastAccessed: string
  thumbnail: string
  totalLessons: number
  completedLessons: number
}

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('overview')
  const [profile, setProfile] = useState<UserProfile>({
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: '/api/placeholder/avatar/profile-user',
    joinDate: '2024-01-15',
    coursesCompleted: 12,
    totalCourses: 18,
    totalLearningTime: 156, // hours
    certificates: 8,
    currentStreak: 7
  })

  const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourse[]>([
    {
      id: '1',
      title: 'Complete Web Development Bootcamp',
      instructor: 'Sarah Johnson',
      progress: 75,
      lastAccessed: '2024-02-01',
      thumbnail: '/api/placeholder/course/react-mastery',
      totalLessons: 45,
      completedLessons: 34
    },
    {
      id: '2',
      title: 'Advanced JavaScript Concepts',
      instructor: 'Mike Chen',
      progress: 90,
      lastAccessed: '2024-01-30',
      thumbnail: '/api/placeholder/course/node-backend',
      totalLessons: 28,
      completedLessons: 25
    },
    {
      id: '3',
      title: 'UI/UX Design Fundamentals',
      instructor: 'Emily Rodriguez',
      progress: 45,
      lastAccessed: '2024-01-28',
      thumbnail: '/api/placeholder/course/advanced-course',
      totalLessons: 32,
      completedLessons: 14
    }
  ])

  const stats = [
    {
      icon: BookOpen,
      label: 'Courses Enrolled',
      value: profile.totalCourses,
      color: 'bg-blue-600'
    },
    {
      icon: Award,
      label: 'Certificates',
      value: profile.certificates,
      color: 'bg-yellow-600'
    },
    {
      icon: Clock,
      label: 'Learning Hours',
      value: profile.totalLearningTime,
      color: 'bg-green-600'
    },
    {
      icon: Target,
      label: 'Current Streak',
      value: `${profile.currentStreak} days`,
      color: 'bg-purple-600'
    }
  ]

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-20 h-20 rounded-full object-cover"
            />
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-neutral-900">{profile.name}</h1>
              <p className="text-neutral-600">{profile.email}</p>
              <p className="text-sm text-neutral-500">
                Member since {new Date(profile.joinDate).toLocaleDateString()}
              </p>
            </div>
            <Button variant="secondary">
              <Settings className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Navigation Tabs */}
        <div className="flex space-x-6 border-b border-neutral-200 mb-8">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'courses', label: 'My Courses' },
            { id: 'subscription', label: 'Subscription' },
            { id: 'certificates', label: 'Certificates' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-neutral-500 hover:text-neutral-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-neutral-900">{stat.value}</p>
                          <p className="text-sm text-neutral-600">{stat.label}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Continue Learning</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {enrolledCourses.slice(0, 3).map((course) => (
                    <div key={course.id} className="flex items-center space-x-4 p-4 rounded-lg border hover:bg-neutral-50 transition-colors">
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-16 h-12 rounded object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-neutral-900">{course.title}</h4>
                        <p className="text-sm text-neutral-600">by {course.instructor}</p>
                        <div className="mt-2">
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span className="text-neutral-600">{course.progress}% complete</span>
                            <span className="text-neutral-600">{course.completedLessons}/{course.totalLessons} lessons</span>
                          </div>
                          <div className="w-full bg-neutral-200 rounded-full h-2">
                            <div
                              className="bg-primary-600 h-2 rounded-full transition-all"
                              style={{ width: `${course.progress}%` }}
                            />
                          </div>
                        </div>
                      </div>
                      <Button size="sm" onClick={() => window.location.href = `/course/${course.id}`}>
                        Continue
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Learning Streak */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Learning Streak</h3>
              </CardHeader>
              <CardContent>
                <div className="text-center py-6">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-orange-100 rounded-full mb-4">
                    <TrendingUp className="w-10 h-10 text-orange-600" />
                  </div>
                  <h4 className="text-3xl font-bold text-neutral-900 mb-2">{profile.currentStreak} Days</h4>
                  <p className="text-neutral-600 mb-4">Keep up the great work! You're on a roll.</p>
                  <Badge className="bg-orange-100 text-orange-700">🔥 Hot Streak</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* My Courses Tab */}
        {activeTab === 'courses' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">My Courses ({enrolledCourses.length})</h2>
              <Button onClick={() => window.location.href = '/'}>
                Browse More Courses
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrolledCourses.map((course) => (
                <Card key={course.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="p-6">
                      <h3 className="font-semibold text-neutral-900 mb-2">{course.title}</h3>
                      <p className="text-sm text-neutral-600 mb-4">by {course.instructor}</p>
                      
                      <div className="mb-4">
                        <div className="flex items-center justify-between text-sm mb-2">
                          <span className="text-neutral-600">{course.progress}% complete</span>
                          <span className="text-neutral-600">{course.completedLessons}/{course.totalLessons} lessons</span>
                        </div>
                        <div className="w-full bg-neutral-200 rounded-full h-2">
                          <div
                            className="bg-primary-600 h-2 rounded-full transition-all"
                            style={{ width: `${course.progress}%` }}
                          />
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <Button size="sm" className="flex-1" onClick={() => window.location.href = `/course/${course.id}`}>
                          Continue Learning
                        </Button>
                        {course.progress === 100 && (
                          <Badge className="bg-green-100 text-green-700">
                            <Award className="w-3 h-3 mr-1" />
                            Completed
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Subscription Tab */}
        {activeTab === 'subscription' && (
          <div className="max-w-2xl">
            <SubscriptionCard />
          </div>
        )}

        {/* Certificates Tab */}
        {activeTab === 'certificates' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-br from-yellow-400 to-orange-500 text-white p-6 rounded-lg">
                <Award className="w-8 h-8 mb-3" />
                <h3 className="text-xl font-bold mb-2">5 Certificates</h3>
                <p className="text-yellow-100">Earned this year</p>
              </div>
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white p-6 rounded-lg">
                <Star className="w-8 h-8 mb-3" />
                <h3 className="text-xl font-bold mb-2">96% Average</h3>
                <p className="text-green-100">Course completion grade</p>
              </div>
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white p-6 rounded-lg">
                <BookOpen className="w-8 h-8 mb-3" />
                <h3 className="text-xl font-bold mb-2">15 Skills</h3>
                <p className="text-blue-100">Verified competencies</p>
              </div>
            </div>

            <div className="text-center">
              <Award className="w-16 h-16 text-primary-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-neutral-900 mb-4">Your Achievement Gallery</h3>
              <p className="text-neutral-600 mb-6 max-w-2xl mx-auto">
                View, download, and share your course completion certificates. Each certificate validates your newly acquired skills and knowledge.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  className="px-8"
                  onClick={() => window.location.href = '/certificates'}
                >
                  <Award className="w-5 h-5 mr-2" />
                  View All Certificates
                </Button>
                <Button 
                  variant="secondary"
                  onClick={() => setActiveTab('courses')}
                  className="px-8"
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  Continue Learning
                </Button>
              </div>
            </div>

            {/* Recent Certificates Preview */}
            <div className="bg-neutral-50 rounded-lg p-6 mt-8">
              <h4 className="text-lg font-semibold text-neutral-900 mb-4">Recent Achievements</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4 border border-neutral-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                      <Award className="w-6 h-6 text-primary-600" />
                    </div>
                    <div className="flex-1">
                      <h5 className="font-semibold text-neutral-900">Web Development Bootcamp</h5>
                      <p className="text-sm text-neutral-600">Completed February 15, 2024</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm font-medium text-neutral-800">95% Grade</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 border border-neutral-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <Award className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h5 className="font-semibold text-neutral-900">Advanced JavaScript</h5>
                      <p className="text-sm text-neutral-600">Completed January 28, 2024</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm font-medium text-neutral-800">98% Grade</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}