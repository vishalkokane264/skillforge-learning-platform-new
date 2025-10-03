'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { CheckCircle, Download, Play, Award } from 'lucide-react'
import Button from '@/components/ui/Button'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'

export default function CheckoutSuccessPage() {
  const router = useRouter()

  useEffect(() => {
    // Clear cart after successful purchase
    localStorage.removeItem('cart')
  }, [])

  const purchasedCourses = [
    {
      id: '1',
      title: 'Web Development - Basics',
      instructor: 'Sarah Johnson',
      thumbnail: '/api/placeholder/course/purchased-course'
    }
  ]

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-2xl w-full">
        <Card className="text-center">
          <CardHeader className="pb-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-neutral-900 mb-2">
              Payment Successful! 🎉
            </h1>
            <p className="text-lg text-neutral-600">
              Thank you for your purchase. You now have lifetime access to your courses.
            </p>
          </CardHeader>
          
          <CardContent className="space-y-8">
            {/* Order Details */}
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="font-semibold text-green-900 mb-4">Order Confirmation</h3>
              <div className="space-y-2 text-sm text-green-800">
                <div className="flex justify-between">
                  <span>Order Number:</span>
                  <span className="font-mono">#LH-2024-001</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Paid:</span>
                  <span className="font-semibold">$71.99</span>
                </div>
                <div className="flex justify-between">
                  <span>Payment Method:</span>
                  <span>Credit Card (**** 3456)</span>
                </div>
              </div>
            </div>

            {/* Purchased Courses */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-neutral-900">Your Courses</h3>
              {purchasedCourses.map((course) => (
                <div key={course.id} className="flex items-center space-x-4 p-4 border border-neutral-200 rounded-lg">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-16 h-10 rounded object-cover"
                  />
                  <div className="flex-1 text-left">
                    <h4 className="font-semibold text-neutral-900">{course.title}</h4>
                    <p className="text-sm text-neutral-600">By {course.instructor}</p>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => window.open(`/course/${course.id}/learn/lesson1`, '_blank')}
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Start Learning
                  </Button>
                </div>
              ))}
            </div>

            {/* Next Steps */}
            <div className="bg-blue-50 p-6 rounded-lg text-left">
              <h3 className="font-semibold text-blue-900 mb-4">What's Next?</h3>
              <ul className="space-y-3 text-sm text-blue-800">
                <li className="flex items-center">
                  <Play className="w-4 h-4 mr-3 flex-shrink-0" />
                  Start watching your courses immediately
                </li>
                <li className="flex items-center">
                  <Download className="w-4 h-4 mr-3 flex-shrink-0" />
                  Download course materials and resources
                </li>
                <li className="flex items-center">
                  <Award className="w-4 h-4 mr-3 flex-shrink-0" />
                  Earn certificates upon completion
                </li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button
                onClick={() => router.push('/my-learning')}
                className="flex-1"
              >
                Go to My Learning
              </Button>
              <Button
                onClick={() => router.push('/')}
                variant="secondary"
                className="flex-1"
              >
                Continue Browsing
              </Button>
            </div>

            {/* Receipt */}
            <div className="text-center text-sm text-neutral-600 pt-6 border-t">
              <p>A receipt has been sent to your email address.</p>
              <p className="mt-2">
                Need help? <a href="/support" className="text-primary-600 hover:underline">Contact Support</a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}