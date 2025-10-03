import React from 'react'

export default function RelatedCourses() {
  return (
    <section className="py-16 bg-neutral-50">
      <div className="container">
        <h2 className="text-heading-2 font-bold text-neutral-900 mb-8">
          Students Also Bought
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="bg-white rounded-card shadow-card p-6">
              <div className="h-32 bg-neutral-200 rounded-lg mb-4"></div>
              <h3 className="font-semibold mb-2">Related Course {index + 1}</h3>
              <p className="text-sm text-neutral-600 mb-2">Course description</p>
              <div className="text-lg font-bold">$89.99</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}