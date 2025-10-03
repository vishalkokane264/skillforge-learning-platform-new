'use client'

import React from 'react'
import { Search, ArrowRight } from 'lucide-react'
import Button from '@/components/ui/Button'
import DynamicTagline from '@/components/ui/DynamicTagline'

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 py-20 lg:py-24 text-white">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            SkillForge
          </h1>
          <DynamicTagline />
          <div className="h-4"></div>
          <p className="text-xl text-primary-100 mb-12 max-w-2xl mx-auto">
            Find the right course and start today. Join thousands of learners who are advancing their careers with our expert-led courses.
          </p>

          {/* Search Section */}
          <div className="bg-white p-8 rounded-2xl shadow-lg max-w-2xl mx-auto mb-8">
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input
                  type="text"
                  placeholder="What do you want to learn?"
                  className="w-full pl-12 pr-4 py-4 border border-neutral-200 rounded-lg text-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                />
              </div>
              <Button size="lg" className="px-8">
                <Search className="w-5 h-5 mr-2" />
                Search
              </Button>
            </div>
            
            <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm">
              <span className="text-neutral-400">Popular searches:</span>
              {['Python', 'Web Development', 'Data Science', 'Design', 'Marketing'].map((term) => (
                <button
                  key={term}
                  className="px-3 py-1 bg-white/10 text-white rounded-full hover:bg-white/20 transition-colors backdrop-blur-sm"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Button variant="secondary" size="lg" className="group">
              Browse categories
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-neutral-200">
            <div>
              <div className="text-3xl font-bold text-primary-600">50K+</div>
              <div className="text-neutral-600 mt-1">Students</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600">1,200+</div>
              <div className="text-neutral-600 mt-1">Courses</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600">150+</div>
              <div className="text-neutral-600 mt-1">Instructors</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600">4.8★</div>
              <div className="text-neutral-600 mt-1">Average Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}