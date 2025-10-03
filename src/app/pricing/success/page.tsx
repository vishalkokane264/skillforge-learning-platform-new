'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { CheckCircle, Download, Play, Award, Zap, Calendar, Gift } from 'lucide-react'
import Button from '@/components/ui/Button'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'

export default function SubscriptionSuccessPage() {
  const router = useRouter()

  useEffect(() => {
    // Set user as subscribed in localStorage (in real app, this would be in backend)
    localStorage.setItem('subscription', JSON.stringify({
      plan: 'pro',
      status: 'active',
      startDate: new Date().toISOString(),
      nextBilling: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days from now
    }))
  }, [])

  const benefits = [
    {
      icon: Play,
      title: 'Unlimited Course Access',
      description: 'Explore our entire library of 1,200+ courses'
    },
    {
      icon: Download,
      title: 'Offline Downloads',
      description: 'Learn anywhere with downloadable content'
    },
    {
      icon: Award,
      title: 'Certificates',
      description: 'Earn verified certificates for completed courses'
    },
    {
      icon: Zap,
      title: 'Priority Support',
      description: 'Get help faster with our dedicated support team'
    }
  ]

  const nextSteps = [
    {
      step: 1,
      title: 'Complete your profile',
      description: 'Tell us about your learning goals',
      action: 'Set up profile'
    },
    {
      step: 2,
      title: 'Download our mobile app',
      description: 'Learn on the go with our mobile apps',
      action: 'Get the app'
    },
    {
      step: 3,
      title: 'Start your first course',
      description: 'Browse our most popular courses',
      action: 'Browse courses'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-4xl w-full">
        <Card className="text-center overflow-hidden">
          {/* Success Header */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-8">
            <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-3xl font-bold mb-2">
              Welcome to SkillForge Pro! 🎉
            </h1>
            <p className="text-green-100 text-lg">
              Your 7-day free trial has started. Get ready to accelerate your learning journey!
            </p>
          </div>
          
          <CardContent className="p-8 space-y-8">
            {/* Subscription Details */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl">
              <div className="flex items-center justify-center space-x-4 mb-4">
                <Badge variant="new" className="px-4 py-2">
                  <Gift className="w-4 h-4 mr-2" />
                  Free Trial Active
                </Badge>
                <Badge className="px-4 py-2 bg-green-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  7 Days Remaining
                </Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="text-center">
                  <div className="font-semibold text-neutral-900">Plan</div>
                  <div className="text-neutral-600">Pro Annual</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-neutral-900">Next Billing</div>
                  <div className="text-neutral-600">
                    {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                  </div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-neutral-900">Amount</div>
                  <div className="text-neutral-600">$19/month</div>
                </div>
              </div>
            </div>

            {/* What You Get */}
            <div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-6">
                What You Get With Pro
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 bg-white border border-neutral-200 rounded-lg">
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="w-5 h-5 text-primary-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-neutral-900 mb-1">{benefit.title}</h4>
                      <p className="text-sm text-neutral-600">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Next Steps */}
            <div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-6">
                Get Started in 3 Easy Steps
              </h3>
              <div className="space-y-4">
                {nextSteps.map((step, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 border border-neutral-200 rounded-lg">
                    <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {step.step}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-neutral-900">{step.title}</h4>
                      <p className="text-sm text-neutral-600">{step.description}</p>
                    </div>
                    <Button variant="secondary" size="sm">
                      {step.action}
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button
                onClick={() => router.push('/')}
                className="flex-1"
              >
                <Play className="w-4 h-4 mr-2" />
                Start Learning Now
              </Button>
              <Button
                onClick={() => router.push('/my-learning')}
                variant="secondary"
                className="flex-1"
              >
                Go to Dashboard
              </Button>
            </div>

            {/* Trial Reminder */}
            <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
              <div className="flex items-start space-x-3">
                <Calendar className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div className="text-left">
                  <h4 className="font-medium text-yellow-900">Trial Reminder</h4>
                  <p className="text-sm text-yellow-700 mt-1">
                    Your trial ends on {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}. 
                    You can cancel anytime before then with no charges. We'll send you a reminder 2 days before your trial ends.
                  </p>
                </div>
              </div>
            </div>

            {/* Support */}
            <div className="text-center text-sm text-neutral-600 pt-6 border-t">
              <p>Questions about your subscription?</p>
              <p className="mt-2">
                <a href="/support" className="text-primary-600 hover:underline">Contact our support team</a> - 
                we're here to help!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}