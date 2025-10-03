import React from 'react'

export default function CourseInstructor() {
  return (
    <div>
      <h2 className="text-heading-2 font-bold text-neutral-900 mb-6">
        Your Instructor
      </h2>
      <div className="flex items-start space-x-6">
        <div className="w-24 h-24 bg-neutral-200 rounded-full flex-shrink-0"></div>
        <div>
          <h3 className="text-xl font-semibold text-neutral-900 mb-2">Sarah Johnson</h3>
          <p className="text-neutral-600 mb-4">Senior Full Stack Developer with 8+ years of experience</p>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <div className="font-semibold">⭐ 4.8</div>
              <div className="text-neutral-600">Instructor Rating</div>
            </div>
            <div>
              <div className="font-semibold">25,000</div>
              <div className="text-neutral-600">Students</div>
            </div>
            <div>
              <div className="font-semibold">12</div>
              <div className="text-neutral-600">Courses</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}