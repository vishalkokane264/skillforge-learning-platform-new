'use client'

import React from 'react'
import Button from '@/components/ui/Button'

export default function CTABand() {
  return (
    <section className="py-16 bg-primary-600">
      <div className="container">
        <div className="text-center text-white">
          <h2 className="text-heading-2 font-bold mb-4">
            Ready to Start Learning?
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Sign up free and start today. Join thousands of learners advancing their careers with our expert-led courses.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Button size="lg" className="bg-white text-primary-600 hover:bg-neutral-50">
              Sign up free
            </Button>
            <Button variant="tertiary" size="lg" className="text-white hover:bg-white hover:bg-opacity-10">
              Browse courses
            </Button>
          </div>
          <p className="text-sm opacity-75 mt-6">
            No credit card required • 30-day money-back guarantee
          </p>
        </div>
      </div>
    </section>
  )
}