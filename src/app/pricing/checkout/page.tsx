'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowLeft, CreditCard, Lock, Shield, CheckCircle, Calendar, Zap, Crown } from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Button from '@/components/ui/Button'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'

interface SubscriptionPlan {
  id: string
  name: string
  description: string
  price: { monthly: number; yearly: number }
  features: string[]
  icon: React.ElementType
}

function CheckoutContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    billingAddress: '',
    city: '',
    postalCode: '',
    country: 'US'
  })

  const planId = searchParams.get('plan') || 'pro'
  const billingPeriod = (searchParams.get('billing') as 'monthly' | 'yearly') || 'yearly'

  const plans: Record<string, SubscriptionPlan> = {
    pro: {
      id: 'pro',
      name: 'Pro',
      description: 'Perfect for individual learners',
      price: { monthly: 29, yearly: 19 },
      features: [
        'Unlimited course access',
        'HD video quality',
        'Offline downloads',
        'No ads',
        'Priority support'
      ],
      icon: Zap
    },
    premium: {
      id: 'premium',
      name: 'Premium',
      description: 'For serious learners and professionals',
      price: { monthly: 49, yearly: 35 },
      features: [
        'Everything in Pro',
        '4K video quality',
        'Live workshops',
        'One-on-one mentorship',
        '24/7 phone support'
      ],
      icon: Crown
    }
  }

  const selectedPlan = plans[planId]
  const monthlyPrice = selectedPlan.price[billingPeriod]
  const totalPrice = billingPeriod === 'yearly' ? monthlyPrice * 12 : monthlyPrice
  const savings = billingPeriod === 'yearly' ? (selectedPlan.price.monthly * 12) - totalPrice : 0

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      router.push('/pricing/success')
    }, 3000)
  }

  if (!selectedPlan) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-neutral-900 mb-4">Plan not found</h1>
          <Button onClick={() => router.push('/pricing')}>
            Back to Pricing
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />
      
      <div className="container py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center space-x-4 mb-8">
            <button
              onClick={() => router.push('/pricing')}
              className="flex items-center text-neutral-600 hover:text-neutral-900"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Pricing
            </button>
            <h1 className="text-3xl font-bold text-neutral-900">Complete Your Subscription</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Payment Form */}
            <div className="space-y-6">
              {/* Account Information */}
              <Card>
                <CardHeader>
                  <h2 className="text-xl font-semibold">Account Information</h2>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                        placeholder="John"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                        placeholder="Doe"
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card>
                <CardHeader>
                  <h2 className="text-xl font-semibold flex items-center">
                    <CreditCard className="w-5 h-5 mr-2" />
                    Payment Information
                  </h2>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">Card Number</label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                        placeholder="1234 5678 9012 3456"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">Expiry Date</label>
                        <input
                          type="text"
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                          placeholder="MM/YY"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">CVV</label>
                        <input
                          type="text"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                          placeholder="123"
                          required
                        />
                      </div>
                    </div>
                  </form>
                </CardContent>
              </Card>

              {/* Security Notice */}
              <div className="flex items-center space-x-3 text-sm text-neutral-600 bg-green-50 p-4 rounded-lg">
                <Shield className="w-5 h-5 text-green-600" />
                <span>Your payment information is encrypted and secure</span>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-8">
                <CardHeader>
                  <h2 className="text-xl font-bold">Order Summary</h2>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Plan Details */}
                  <div className="flex items-start space-x-4 p-4 bg-gradient-to-r from-primary-50 to-purple-50 rounded-lg">
                    <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center">
                      <selectedPlan.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-neutral-900">{selectedPlan.name} Plan</h3>
                      <p className="text-sm text-neutral-600 mb-2">{selectedPlan.description}</p>
                      <Badge variant="new" className="text-xs">
                        {billingPeriod === 'yearly' ? 'Annual Billing' : 'Monthly Billing'}
                      </Badge>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-3">
                    <h4 className="font-medium text-neutral-900">What's included:</h4>
                    {selectedPlan.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-sm text-neutral-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Pricing Breakdown */}
                  <div className="space-y-3 border-t pt-4">
                    <div className="flex justify-between text-sm">
                      <span>{selectedPlan.name} Plan ({billingPeriod})</span>
                      <span>
                        ${monthlyPrice}/{billingPeriod === 'yearly' ? 'month' : 'month'}
                      </span>
                    </div>
                    
                    {billingPeriod === 'yearly' && (
                      <>
                        <div className="flex justify-between text-sm">
                          <span>Billed yearly (12 months)</span>
                          <span>${totalPrice}</span>
                        </div>
                        {savings > 0 && (
                          <div className="flex justify-between text-sm text-green-600">
                            <span>Annual discount</span>
                            <span>-${savings}</span>
                          </div>
                        )}
                      </>
                    )}
                    
                    <div className="border-t pt-3 flex justify-between font-bold text-lg">
                      <span>Total {billingPeriod === 'yearly' ? '(First Year)' : '(Monthly)'}</span>
                      <span>${totalPrice}</span>
                    </div>
                  </div>

                  {/* Trial Information */}
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Calendar className="w-4 h-4 text-blue-600" />
                      <span className="font-medium text-blue-900">7-Day Free Trial</span>
                    </div>
                    <p className="text-sm text-blue-700">
                      You won't be charged until your trial ends. Cancel anytime during the trial period.
                    </p>
                  </div>

                  {/* Subscribe Button */}
                  <Button
                    onClick={handleSubmit}
                    className="w-full"
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Processing...
                      </div>
                    ) : (
                      <>
                        <Lock className="w-4 h-4 mr-2" />
                        Start Free Trial
                      </>
                    )}
                  </Button>

                  <div className="text-xs text-neutral-500 text-center">
                    By subscribing, you agree to our Terms of Service and Privacy Policy.
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default function SubscriptionCheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  )
}