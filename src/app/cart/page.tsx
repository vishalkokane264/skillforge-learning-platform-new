'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Trash2, Plus, Minus, ShoppingBag, CreditCard, Lock } from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Button from '@/components/ui/Button'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { sampleCourses } from '@/lib/data'
import { formatPrice } from '@/lib/utils'

interface CartItem {
  courseId: string
  quantity: number
  addedAt: Date
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      setCartItems(JSON.parse(savedCart))
    }
  }, [])

  const saveCart = (items: CartItem[]) => {
    setCartItems(items)
    localStorage.setItem('cart', JSON.stringify(items))
  }

  const removeFromCart = (courseId: string) => {
    const updatedCart = cartItems.filter(item => item.courseId !== courseId)
    saveCart(updatedCart)
  }

  const updateQuantity = (courseId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(courseId)
      return
    }

    const updatedCart = cartItems.map(item =>
      item.courseId === courseId ? { ...item, quantity } : item
    )
    saveCart(updatedCart)
  }

  const getCartCourses = () => {
    return cartItems.map(item => {
      const course = sampleCourses.find(c => c.id === item.courseId)
      return course ? { ...course, quantity: item.quantity } : null
    }).filter(Boolean)
  }

  const cartCourses = getCartCourses()
  const subtotal = cartCourses.reduce((sum, course) => sum + (course?.price || 0) * (course?.quantity || 1), 0)
  const discount = subtotal * 0.1 // 10% discount
  const total = subtotal - discount

  const handleCheckout = () => {
    if (cartCourses.length === 0) return
    router.push('/checkout')
  }

  if (cartCourses.length === 0) {
    return (
      <div className="min-h-screen bg-neutral-50">
        <Header />
        <div className="container py-16">
          <div className="max-w-2xl mx-auto text-center">
            <ShoppingBag className="w-24 h-24 mx-auto text-neutral-300 mb-6" />
            <h1 className="text-3xl font-bold text-neutral-900 mb-4">Your cart is empty</h1>
            <p className="text-lg text-neutral-600 mb-8">
              Looks like you haven't added any courses to your cart yet.
            </p>
            <Button onClick={() => router.push('/')} size="lg">
              Browse Courses
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />
      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <h1 className="text-2xl font-bold">Shopping Cart ({cartCourses.length} items)</h1>
              </CardHeader>
              <CardContent className="space-y-6">
                {cartCourses.map((course) => (
                  <div key={course?.id} className="flex items-start space-x-4 p-4 border border-neutral-200 rounded-lg">
                    <Image
                      src={course?.thumbnail || ''}
                      alt={course?.title || ''}
                      width={120}
                      height={68}
                      className="rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-neutral-900 mb-1">{course?.title}</h3>
                      <p className="text-sm text-neutral-600 mb-2">{course?.subtitle}</p>
                      <div className="flex items-center space-x-4 text-sm text-neutral-500">
                        <span>By {course?.instructor.name}</span>
                        <span>{course?.duration}</span>
                        <span className="flex items-center">
                          ⭐ {course?.rating} ({course?.reviewCount} reviews)
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <div className="text-right">
                        <div className="text-lg font-bold text-neutral-900">
                          {formatPrice(course?.price || 0)}
                        </div>
                        {course?.originalPrice && (
                          <div className="text-sm text-neutral-500 line-through">
                            {formatPrice(course.originalPrice)}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(course?.id || '', (course?.quantity || 1) - 1)}
                          className="w-8 h-8 rounded-lg border border-neutral-300 flex items-center justify-center hover:bg-neutral-100"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-12 text-center font-medium">{course?.quantity}</span>
                        <button
                          onClick={() => updateQuantity(course?.id || '', (course?.quantity || 1) + 1)}
                          className="w-8 h-8 rounded-lg border border-neutral-300 flex items-center justify-center hover:bg-neutral-100"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(course?.id || '')}
                        className="text-red-600 hover:text-red-700 p-2"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <h2 className="text-xl font-bold">Order Summary</h2>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-green-600">
                    <span>Discount (10%)</span>
                    <span>-{formatPrice(discount)}</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t">
                  <Button 
                    onClick={handleCheckout}
                    className="w-full"
                    disabled={isLoading}
                  >
                    <CreditCard className="w-4 h-4 mr-2" />
                    {isLoading ? 'Processing...' : 'Proceed to Checkout'}
                  </Button>
                  
                  <div className="flex items-center justify-center space-x-2 text-sm text-neutral-600">
                    <Lock className="w-4 h-4" />
                    <span>Secure 256-bit SSL encryption</span>
                  </div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-medium text-green-900 mb-2">✓ 30-Day Money-Back Guarantee</h3>
                  <p className="text-sm text-green-700">
                    Full refund if you're not satisfied with your purchase.
                  </p>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-medium text-blue-900 mb-2">What you'll get:</h3>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Lifetime access to all courses</li>
                    <li>• Watch on mobile and desktop</li>
                    <li>• Certificate of completion</li>
                    <li>• Download resources</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}