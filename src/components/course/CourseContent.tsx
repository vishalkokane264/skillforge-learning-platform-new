'use client'

import React from 'react'
import { CheckCircle } from 'lucide-react'

export default function CourseContent() {
  const learningOutcomes = [
    'Build responsive websites from scratch',
    'Understand HTML5 semantic elements',
    'Style websites with modern CSS techniques',
    'Add interactivity with JavaScript',
    'Deploy websites to the web',
    'Follow web development best practices'
  ]

  return (
    <div>
      <h2 className="text-heading-2 font-bold text-neutral-900 mb-6">
        What You'll Learn
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
        {learningOutcomes.map((outcome, index) => (
          <div key={index} className="flex items-start space-x-3">
            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
            <span className="text-neutral-700">{outcome}</span>
          </div>
        ))}
      </div>

      <h3 className="text-heading-3 font-bold text-neutral-900 mb-6">
        Course Content
      </h3>
      <div className="space-y-4">
        <div className="border border-neutral-200 rounded-lg">
          <div className="p-4 bg-neutral-50 font-semibold flex justify-between items-center">
            <span>Section 1: Getting Started with HTML</span>
            <span className="text-sm text-neutral-500">2h 15min</span>
          </div>
          <div className="divide-y divide-neutral-200">
            <button 
              onClick={() => window.open('/course/1/learn/lesson1', '_blank')}
              className="w-full p-4 flex justify-between items-center hover:bg-neutral-50 transition-colors group"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                  <span className="text-primary-600 text-sm font-medium">1</span>
                </div>
                <div className="text-left">
                  <div className="font-medium group-hover:text-primary-600">Introduction to HTML</div>
                  <div className="text-sm text-neutral-500">Learn the basics of HTML structure</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-sm text-green-600 font-medium">Preview</span>
                <span className="text-sm text-neutral-500">15min</span>
              </div>
            </button>
            <button 
              onClick={() => window.open('/course/1/learn/lesson2', '_blank')}
              className="w-full p-4 flex justify-between items-center hover:bg-neutral-50 transition-colors group"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-neutral-200 flex items-center justify-center">
                  <span className="text-neutral-600 text-sm font-medium">2</span>
                </div>
                <div className="text-left">
                  <div className="font-medium group-hover:text-primary-600">HTML Document Structure</div>
                  <div className="text-sm text-neutral-500">Understanding DOCTYPE and document flow</div>
                </div>
              </div>
              <span className="text-sm text-neutral-500">20min</span>
            </button>
            <button 
              onClick={() => window.open('/course/1/learn/lesson3', '_blank')}
              className="w-full p-4 flex justify-between items-center hover:bg-neutral-50 transition-colors group"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-neutral-200 flex items-center justify-center">
                  <span className="text-neutral-600 text-sm font-medium">3</span>
                </div>
                <div className="text-left">
                  <div className="font-medium group-hover:text-primary-600">Working with Text Elements</div>
                  <div className="text-sm text-neutral-500">Headings, paragraphs, and formatting</div>
                </div>
              </div>
              <span className="text-sm text-neutral-500">25min</span>
            </button>
          </div>
        </div>
        
        <div className="border border-neutral-200 rounded-lg">
          <div className="p-4 bg-neutral-50 font-semibold flex justify-between items-center">
            <span>Section 2: CSS Fundamentals</span>
            <span className="text-sm text-neutral-500">3h 30min</span>
          </div>
          <div className="divide-y divide-neutral-200">
            <button 
              onClick={() => window.open('/course/1/learn/lesson4', '_blank')}
              className="w-full p-4 flex justify-between items-center hover:bg-neutral-50 transition-colors group"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-neutral-200 flex items-center justify-center">
                  <span className="text-neutral-600 text-sm font-medium">4</span>
                </div>
                <div className="text-left">
                  <div className="font-medium group-hover:text-primary-600">Introduction to CSS</div>
                  <div className="text-sm text-neutral-500">Styling HTML with CSS</div>
                </div>
              </div>
              <span className="text-sm text-neutral-500">18min</span>
            </button>
            <button 
              onClick={() => window.open('/course/1/learn/lesson5', '_blank')}
              className="w-full p-4 flex justify-between items-center hover:bg-neutral-50 transition-colors group"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-neutral-200 flex items-center justify-center">
                  <span className="text-neutral-600 text-sm font-medium">5</span>
                </div>
                <div className="text-left">
                  <div className="font-medium group-hover:text-primary-600">CSS Selectors</div>
                  <div className="text-sm text-neutral-500">Target elements with precision</div>
                </div>
              </div>
              <span className="text-sm text-neutral-500">22min</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}