'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

interface CourseHeroProps {
  courseId: string
}

export default function CourseHero({ courseId }: CourseHeroProps) {
  const router = useRouter()

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    const existingItem = cart.find((item: any) => item.courseId === courseId)
    
    if (!existingItem) {
      cart.push({
        courseId,
        quantity: 1,
        addedAt: new Date()
      })
      localStorage.setItem('cart', JSON.stringify(cart))
      window.dispatchEvent(new Event('storage'))
      router.push('/cart')
    } else {
      router.push('/cart')
    }
  }
  return (
    <section className="bg-neutral-900 text-white py-12">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h1 className="text-heading-1 font-bold mb-4">
              Complete Web Development Course
            </h1>
            <p className="text-xl text-neutral-300 mb-6">
              Learn HTML, CSS, JavaScript, and modern frameworks to build amazing websites
            </p>
            <div className="flex items-center space-x-6 text-sm">
              <span>⭐ 4.8 (2,847 reviews)</span>
              <span>👥 15,420 students</span>
              <span>🌐 English</span>
              <span>📅 Updated Jan 2024</span>
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="bg-white text-neutral-900 p-6 rounded-card sticky top-24">
              <div className="aspect-video bg-neutral-200 rounded-lg mb-4 flex items-center justify-center">
                <span>▶️ Preview</span>
              </div>
              <div className="text-2xl font-bold mb-2">$79.99</div>
              <div className="text-sm text-neutral-500 line-through mb-4">$129.99</div>
              <button 
                onClick={addToCart}
                className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold mb-3 hover:bg-primary-700 transition-colors"
              >
                Add to Cart - $79.99
              </button>
              <button 
                onClick={() => window.open(`/course/${courseId}/learn/lesson1`, '_blank')}
                className="w-full border border-primary-600 text-primary-600 py-3 rounded-lg font-semibold mb-3 hover:bg-primary-50 transition-colors"
              >
                Preview Course
              </button>
              <button className="w-full border border-neutral-300 py-3 rounded-button font-semibold mb-4 hover:bg-neutral-50 transition-colors">
                Add to wishlist
              </button>
              <div className="text-sm text-neutral-600 text-center">
                30-day money-back guarantee
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}