'use client'

import { useState, useEffect } from 'react'
import { Trophy, Target, Clock, BookOpen, Star } from 'lucide-react'

interface ProgressStats {
  coursesCompleted: number
  totalCourses: number
  currentStreak: number
  totalHours: number
  certificates: number
  level: number
}

interface ProgressIndicatorProps {
  isVisible: boolean
}

export default function ProgressIndicator({ isVisible }: ProgressIndicatorProps) {
  const [stats, setStats] = useState<ProgressStats>({
    coursesCompleted: 0,
    totalCourses: 0,
    currentStreak: 0,
    totalHours: 0,
    certificates: 0,
    level: 1
  })
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    // Load user progress from localStorage
    const savedProgress = localStorage.getItem('userProgress')
    if (savedProgress) {
      setStats(JSON.parse(savedProgress))
    } else {
      // Demo data for new users
      const demoStats = {
        coursesCompleted: 3,
        totalCourses: 8,
        currentStreak: 5,
        totalHours: 24,
        certificates: 2,
        level: 2
      }
      setStats(demoStats)
      localStorage.setItem('userProgress', JSON.stringify(demoStats))
    }
  }, [])

  if (!isVisible) return null

  const progressPercent = (stats.coursesCompleted / Math.max(stats.totalCourses, 1)) * 100
  const nextLevelProgress = ((stats.totalHours % 20) / 20) * 100

  return (
    <div className="fixed top-20 right-4 z-[100]">
      <div 
        className={`bg-white rounded-xl shadow-lg border border-gray-200 transition-all duration-300 ${
          isExpanded ? 'w-80' : 'w-16'
        } overflow-hidden`}
      >
        {/* Toggle Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full p-4 text-left hover:bg-gray-50 transition-colors flex items-center justify-center"
        >
          <div className="relative">
            <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
              <Trophy className="w-4 h-4 text-white" />
            </div>
            
            {/* Level Badge */}
            <div className="absolute -top-1 -right-1 bg-yellow-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
              {stats.level}
            </div>
          </div>
        </button>

        {/* Expanded Content */}
        {isExpanded && (
          <div className="p-4 pt-0">
            <div className="text-center mb-4">
              <h3 className="font-bold text-gray-900">Learning Progress</h3>
              <p className="text-sm text-gray-600">Level {stats.level} Learner</p>
            </div>

            {/* Progress Ring */}
            <div className="relative w-20 h-20 mx-auto mb-4">
              <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  className="text-gray-200"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray={`${progressPercent * 2.51} 251`}
                  className="text-primary-600 transition-all duration-500"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-lg font-bold text-primary-600">
                    {Math.round(progressPercent)}%
                  </div>
                  <div className="text-xs text-gray-600">Complete</div>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <BookOpen className="w-4 h-4 text-blue-500" />
                  <span className="text-sm text-gray-600">Courses</span>
                </div>
                <span className="font-semibold">
                  {stats.coursesCompleted}/{stats.totalCourses}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Target className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-600">Streak</span>
                </div>
                <span className="font-semibold">{stats.currentStreak} days</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-orange-500" />
                  <span className="text-sm text-gray-600">Hours</span>
                </div>
                <span className="font-semibold">{stats.totalHours}h</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm text-gray-600">Certificates</span>
                </div>
                <span className="font-semibold">{stats.certificates}</span>
              </div>
            </div>

            {/* Next Level Progress */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-600">Next Level</span>
                <span className="text-xs text-gray-600">
                  {Math.round(nextLevelProgress)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${nextLevelProgress}%` }}
                />
              </div>
              <div className="text-xs text-gray-500 mt-1 text-center">
                {20 - (stats.totalHours % 20)} hours to Level {stats.level + 1}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">
              <button
                onClick={() => window.location.href = '/my-learning'}
                className="w-full text-sm bg-primary-50 hover:bg-primary-100 text-primary-700 py-2 px-3 rounded-lg transition-colors"
              >
                Continue Learning
              </button>
              <button
                onClick={() => window.location.href = '/certificates'}
                className="w-full text-sm bg-gray-50 hover:bg-gray-100 text-gray-700 py-2 px-3 rounded-lg transition-colors"
              >
                View Certificates
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}