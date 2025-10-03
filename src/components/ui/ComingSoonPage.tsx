'use client'

import { ArrowLeft, Clock, Wrench, Mail, Bell } from 'lucide-react'
import Button from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { useState } from 'react'

interface ComingSoonPageProps {
  title?: string
  subtitle?: string
  description?: string
  showNotifyForm?: boolean
}

export default function ComingSoonPage({ 
  title = "Coming Soon",
  subtitle = "We're working on something amazing",
  description = "This feature is currently under development. We're building something incredible that will enhance your learning experience.",
  showNotifyForm = true
}: ComingSoonPageProps) {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleNotifySubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      // In real app, this would subscribe user to notifications
      localStorage.setItem('notifyEmail', email)
      setIsSubscribed(true)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-blue-50 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Back Button */}
        <div className="mb-8">
          <Button 
            variant="secondary" 
            onClick={() => window.history.back()}
            className="inline-flex items-center"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>

        {/* Main Content */}
        <Card className="p-8 md:p-12 shadow-xl">
          <CardContent className="space-y-8">
            {/* Icon */}
            <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto">
              <Wrench className="w-12 h-12 text-primary-600" />
            </div>

            {/* Text Content */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold text-neutral-900">
                {title}
              </h1>
              <h2 className="text-xl md:text-2xl text-primary-600 font-medium">
                {subtitle}
              </h2>
              <p className="text-lg text-neutral-600 max-w-lg mx-auto">
                {description}
              </p>
            </div>

            {/* Features Preview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Clock className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-neutral-900 mb-2">Fast & Reliable</h3>
                <p className="text-sm text-neutral-600">Lightning fast performance with 99.9% uptime</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Bell className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-neutral-900 mb-2">Smart Features</h3>
                <p className="text-sm text-neutral-600">AI-powered recommendations and personalization</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Mail className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-neutral-900 mb-2">Stay Connected</h3>
                <p className="text-sm text-neutral-600">Get notified when we launch new features</p>
              </div>
            </div>

            {/* Notify Form */}
            {showNotifyForm && !isSubscribed && (
              <div className="bg-neutral-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-neutral-900 mb-4">
                  Get Notified When It's Ready
                </h3>
                <form onSubmit={handleNotifySubmit} className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="flex-1 px-4 py-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                    required
                  />
                  <Button type="submit" className="px-8">
                    <Bell className="w-4 h-4 mr-2" />
                    Notify Me
                  </Button>
                </form>
                <p className="text-xs text-neutral-500 mt-3">
                  We'll send you an email when this feature is available. No spam, promise!
                </p>
              </div>
            )}

            {/* Success Message */}
            {isSubscribed && (
              <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                <div className="flex items-center justify-center space-x-2 text-green-700">
                  <Bell className="w-5 h-5" />
                  <span className="font-medium">Thanks! We'll notify you when it's ready.</span>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Button 
                onClick={() => window.location.href = '/'}
                className="px-8"
              >
                Explore Available Courses
              </Button>
              <Button 
                variant="secondary"
                onClick={() => window.location.href = '/support'}
                className="px-8"
              >
                Contact Support
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <p className="text-neutral-500 mt-8">
          Follow our progress on social media or check back soon for updates!
        </p>
      </div>
    </div>
  )
}