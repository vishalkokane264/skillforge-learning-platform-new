import React from 'react'
import { Search, BookOpen, Award } from 'lucide-react'

export default function HowItWorks() {
  const steps = [
    {
      icon: Search,
      title: 'Find Your Course',
      description: 'Browse our extensive catalog or search for specific skills you want to learn.'
    },
    {
      icon: BookOpen,
      title: 'Start Learning',
      description: 'Access high-quality video lessons, exercises, and resources anytime, anywhere.'
    },
    {
      icon: Award,
      title: 'Get Certified',
      description: 'Complete the course and receive a certificate to showcase your new skills.'
    }
  ]

  return (
    <section className="py-16 bg-neutral-50">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-heading-2 font-bold text-neutral-900 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Start your learning journey in just three simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={step.title} className="text-center">
              <div className="relative">
                <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <step.icon className="w-8 h-8 text-white" />
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-neutral-200 -translate-y-1/2 translate-x-8"></div>
                )}
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-4">
                {step.title}
              </h3>
              <p className="text-neutral-600">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}