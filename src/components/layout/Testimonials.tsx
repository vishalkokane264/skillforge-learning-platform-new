import React from 'react'
import { Star } from 'lucide-react'

export default function Testimonials() {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Frontend Developer',
      content: 'The courses here completely changed my career. The instructors are top-notch and the content is always up-to-date.',
      rating: 5,
      avatar: '/placeholder-avatar.jpg'
    },
    {
      name: 'Michael Chen',
      role: 'Data Analyst',
      content: 'Amazing platform with high-quality courses. I learned more in 3 months than I did in years of self-study.',
      rating: 5,
      avatar: '/placeholder-avatar.jpg'
    },
    {
      name: 'Emily Davis',
      role: 'UX Designer',
      content: 'The practical approach to learning is what sets this platform apart. Real projects, real results.',
      rating: 5,
      avatar: '/placeholder-avatar.jpg'
    }
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-heading-2 font-bold text-neutral-900 mb-4">
            What Our Students Say
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Join thousands of satisfied learners who have transformed their careers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.name} className="bg-white p-8 rounded-xl shadow-card">
              <div className="flex items-center mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-neutral-700 mb-6 italic">
                "{testimonial.content}"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-neutral-200 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-semibold text-neutral-900">{testimonial.name}</h4>
                  <p className="text-sm text-neutral-600">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}