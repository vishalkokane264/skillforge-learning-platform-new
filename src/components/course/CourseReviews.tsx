import React from 'react'
import { Star } from 'lucide-react'

export default function CourseReviews() {
  const reviews = [
    {
      name: 'John Smith',
      rating: 5,
      comment: 'Excellent course! The instructor explains everything clearly.',
      date: '2 weeks ago'
    },
    {
      name: 'Maria Garcia',
      rating: 4,
      comment: 'Great content, very practical examples.',
      date: '1 month ago'
    }
  ]

  return (
    <div>
      <h2 className="text-heading-2 font-bold text-neutral-900 mb-6">
        Student Reviews
      </h2>
      <div className="mb-8">
        <div className="flex items-center space-x-4 mb-4">
          <div className="text-4xl font-bold text-neutral-900">4.8</div>
          <div>
            <div className="flex items-center space-x-1 mb-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <div className="text-sm text-neutral-600">2,847 reviews</div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {reviews.map((review, index) => (
          <div key={index} className="border-b border-neutral-200 pb-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-neutral-200 rounded-full flex-shrink-0"></div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h4 className="font-semibold">{review.name}</h4>
                  <div className="flex items-center">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-sm text-neutral-500">{review.date}</span>
                </div>
                <p className="text-neutral-700">{review.comment}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}