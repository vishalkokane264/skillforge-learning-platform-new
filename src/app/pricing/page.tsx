'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Check, 
  X, 
  Crown, 
  Zap, 
  Users, 
  BookOpen, 
  Download, 
  MessageCircle,
  Shield,
  Infinity,
  Star,
  ChevronRight
} from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Button from '@/components/ui/Button'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'

interface PricingPlan {
  id: string
  name: string
  description: string
  price: {
    monthly: number
    yearly: number
  }
  originalPrice?: {
    monthly: number
    yearly: number
  }
  features: string[]
  limitations?: string[]
  popular?: boolean
  recommended?: boolean
  icon: React.ElementType
  gradient: string
  buttonText: string
  maxCourses?: number | 'unlimited'
  maxDownloads?: number | 'unlimited'
  supportLevel: string
}

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('yearly')
  const [isProcessing, setIsProcessing] = useState('')
  const router = useRouter()

  const plans: PricingPlan[] = [
    {
      id: 'free',
      name: 'Free',
      description: 'Perfect for trying out our platform',
      price: { monthly: 0, yearly: 0 },
      features: [
        '3 courses per month',
        'Basic video quality (720p)',
        'Community support',
        'Course completion certificates',
        'Mobile app access'
      ],
      limitations: [
        'Limited course selection',
        'No offline downloads',
        'Ads in course videos'
      ],
      icon: BookOpen,
      gradient: 'from-neutral-100 to-neutral-200',
      buttonText: 'Get Started Free',
      maxCourses: 3,
      maxDownloads: 0,
      supportLevel: 'Community'
    },
    {
      id: 'pro',
      name: 'Pro',
      description: 'Most popular choice for learners',
      price: { monthly: 29, yearly: 19 },
      originalPrice: { monthly: 39, yearly: 29 },
      features: [
        'Unlimited course access',
        'HD video quality (1080p)',
        'Offline downloads',
        'No ads',
        'Priority email support',
        'Downloadable resources',
        'Progress tracking',
        'Mobile & desktop apps',
        'Course completion certificates'
      ],
      popular: true,
      icon: Zap,
      gradient: 'from-primary-500 to-primary-700',
      buttonText: 'Start Pro Trial',
      maxCourses: 'unlimited',
      maxDownloads: 'unlimited',
      supportLevel: 'Priority Email'
    },
    {
      id: 'premium',
      name: 'Premium',
      description: 'For serious learners and professionals',
      price: { monthly: 49, yearly: 35 },
      originalPrice: { monthly: 69, yearly: 49 },
      features: [
        'Everything in Pro',
        '4K video quality',
        'Live workshops & webinars',
        'One-on-one mentorship sessions',
        'Custom learning paths',
        'Advanced analytics',
        'Early access to new courses',
        'Exclusive premium content',
        'Direct instructor messaging',
        '24/7 phone support'
      ],
      recommended: true,
      icon: Crown,
      gradient: 'from-purple-500 to-purple-700',
      buttonText: 'Go Premium',
      maxCourses: 'unlimited',
      maxDownloads: 'unlimited',
      supportLevel: '24/7 Phone + Chat'
    },
    {
      id: 'business',
      name: 'Business',
      description: 'Perfect for teams and organizations',
      price: { monthly: 99, yearly: 79 },
      features: [
        'Everything in Premium',
        'Team management dashboard',
        'Bulk user management',
        'Custom branding',
        'Advanced reporting & analytics',
        'SSO integration',
        'API access',
        'Custom content creation',
        'Dedicated account manager',
        'Training & onboarding support'
      ],
      icon: Users,
      gradient: 'from-emerald-500 to-emerald-700',
      buttonText: 'Contact Sales',
      maxCourses: 'unlimited',
      maxDownloads: 'unlimited',
      supportLevel: 'Dedicated Account Manager'
    }
  ]

  const handleSubscribe = async (planId: string) => {
    setIsProcessing(planId)
    
    if (planId === 'free') {
      // Direct signup for free plan
      setTimeout(() => {
        setIsProcessing('')
        router.push('/auth/register?plan=free')
      }, 1000)
      return
    }
    
    if (planId === 'business') {
      // Redirect to contact sales
      setTimeout(() => {
        setIsProcessing('')
        router.push('/contact-sales')
      }, 1000)
      return
    }

    // For paid plans, go to subscription checkout
    setTimeout(() => {
      setIsProcessing('')
      router.push(`/pricing/checkout?plan=${planId}&billing=${billingPeriod}`)
    }, 1500)
  }

  const yearlyDiscount = (planId: string) => {
    const plan = plans.find(p => p.id === planId)
    if (!plan || plan.price.monthly === 0) return 0
    
    const monthlyYearly = plan.price.monthly * 12
    const yearly = plan.price.yearly * 12
    return Math.round(((monthlyYearly - yearly) / monthlyYearly) * 100)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-blue-50/30 to-purple-50/30">
      <Header />
      
      <div className="container py-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          <Badge variant="new" className="mb-6">
            🚀 Limited Time: Save up to 40% on yearly plans
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 mb-6">
            Choose Your Learning
            <span className="bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent"> Journey</span>
          </h1>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto mb-8">
            Unlock unlimited learning with our flexible pricing plans. Start free and upgrade as you grow.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center bg-white rounded-full p-1 shadow-lg mb-12">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                billingPeriod === 'monthly'
                  ? 'bg-neutral-900 text-white shadow-md'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingPeriod('yearly')}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                billingPeriod === 'yearly'
                  ? 'bg-neutral-900 text-white shadow-md'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Yearly
              <Badge variant="new" className="ml-2">Save 40%</Badge>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {plans.map((plan) => (
            <Card 
              key={plan.id} 
              className={`relative overflow-hidden transition-all duration-300 hover:scale-105 ${
                plan.popular ? 'ring-2 ring-primary-500 shadow-2xl' : 'hover:shadow-xl'
              } ${plan.recommended ? 'ring-2 ring-purple-500 shadow-2xl' : ''}`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2">
                  <Badge variant="bestseller" className="px-4 py-1">
                    <Star className="w-3 h-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}

              {/* Recommended Badge */}
              {plan.recommended && (
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2">
                  <Badge className="px-4 py-1 bg-purple-600 text-white">
                    <Crown className="w-3 h-3 mr-1" />
                    Recommended
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-2">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center`}>
                  <plan.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-neutral-900">{plan.name}</h3>
                <p className="text-neutral-600 mt-2">{plan.description}</p>
              </CardHeader>

              <CardContent className="pt-0">
                {/* Pricing */}
                <div className="text-center mb-6">
                  <div className="flex items-baseline justify-center mb-2">
                    <span className="text-4xl font-bold text-neutral-900">
                      ${plan.price[billingPeriod]}
                    </span>
                    <span className="text-neutral-600 ml-2">
                      /{billingPeriod === 'yearly' ? 'month' : 'month'}
                    </span>
                  </div>
                  
                  {plan.originalPrice && (
                    <div className="flex items-center justify-center space-x-2">
                      <span className="text-neutral-500 line-through">
                        ${plan.originalPrice[billingPeriod]}
                      </span>
                      {billingPeriod === 'yearly' && (
                        <Badge variant="new" className="text-xs">
                          {yearlyDiscount(plan.id)}% off
                        </Badge>
                      )}
                    </div>
                  )}
                  
                  {billingPeriod === 'yearly' && plan.price.yearly > 0 && (
                    <p className="text-sm text-neutral-600 mt-2">
                      ${plan.price.yearly * 12} billed annually
                    </p>
                  )}
                </div>

                {/* Features */}
                <div className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-neutral-700">{feature}</span>
                    </div>
                  ))}
                  
                  {plan.limitations?.map((limitation, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <X className="w-5 h-5 text-neutral-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-neutral-500">{limitation}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <Button
                  onClick={() => handleSubscribe(plan.id)}
                  disabled={isProcessing === plan.id}
                  className={`w-full ${
                    plan.popular 
                      ? 'bg-primary-600 hover:bg-primary-700' 
                      : plan.recommended
                      ? 'bg-purple-600 hover:bg-purple-700'
                      : 'bg-neutral-900 hover:bg-neutral-800'
                  }`}
                >
                  {isProcessing === plan.id ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Processing...
                    </div>
                  ) : (
                    <>
                      {plan.buttonText}
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>

                {/* Free Trial Note */}
                {plan.id !== 'free' && plan.id !== 'business' && (
                  <p className="text-center text-xs text-neutral-500 mt-3">
                    7-day free trial • Cancel anytime
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Feature Comparison Table */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-16">
          <div className="p-8 bg-gradient-to-r from-primary-600 to-purple-600">
            <h2 className="text-3xl font-bold text-white text-center mb-4">
              Compare All Features
            </h2>
            <p className="text-primary-100 text-center">
              See exactly what's included in each plan
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-200">
                  <th className="text-left p-6 font-semibold text-neutral-900">Features</th>
                  {plans.map((plan) => (
                    <th key={plan.id} className="text-center p-6 font-semibold text-neutral-900">
                      {plan.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                <tr>
                  <td className="p-6 font-medium text-neutral-900">Course Access</td>
                  <td className="p-6 text-center">3/month</td>
                  <td className="p-6 text-center text-green-600">
                    <Infinity className="w-5 h-5 mx-auto" />
                  </td>
                  <td className="p-6 text-center text-green-600">
                    <Infinity className="w-5 h-5 mx-auto" />
                  </td>
                  <td className="p-6 text-center text-green-600">
                    <Infinity className="w-5 h-5 mx-auto" />
                  </td>
                </tr>
                <tr className="bg-neutral-50">
                  <td className="p-6 font-medium text-neutral-900">Video Quality</td>
                  <td className="p-6 text-center">720p</td>
                  <td className="p-6 text-center">1080p HD</td>
                  <td className="p-6 text-center">4K Ultra HD</td>
                  <td className="p-6 text-center">4K Ultra HD</td>
                </tr>
                <tr>
                  <td className="p-6 font-medium text-neutral-900">Offline Downloads</td>
                  <td className="p-6 text-center text-red-500">
                    <X className="w-5 h-5 mx-auto" />
                  </td>
                  <td className="p-6 text-center text-green-600">
                    <Check className="w-5 h-5 mx-auto" />
                  </td>
                  <td className="p-6 text-center text-green-600">
                    <Check className="w-5 h-5 mx-auto" />
                  </td>
                  <td className="p-6 text-center text-green-600">
                    <Check className="w-5 h-5 mx-auto" />
                  </td>
                </tr>
                <tr className="bg-neutral-50">
                  <td className="p-6 font-medium text-neutral-900">Support Level</td>
                  <td className="p-6 text-center text-sm">Community</td>
                  <td className="p-6 text-center text-sm">Priority Email</td>
                  <td className="p-6 text-center text-sm">24/7 Phone + Chat</td>
                  <td className="p-6 text-center text-sm">Dedicated Manager</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-neutral-900 mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {[
              {
                question: 'Can I switch plans at any time?',
                answer: 'Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately and we\'ll prorate the billing.'
              },
              {
                question: 'Is there a free trial?',
                answer: 'Yes, we offer a 7-day free trial for all paid plans. No credit card required to start your trial.'
              },
              {
                question: 'What payment methods do you accept?',
                answer: 'We accept all major credit cards, PayPal, and bank transfers for annual subscriptions.'
              },
              {
                question: 'Can I cancel my subscription anytime?',
                answer: 'Absolutely! You can cancel your subscription at any time with no cancellation fees. Your access continues until the end of your billing period.'
              }
            ].map((faq, index) => (
              <Card key={index} className="p-6">
                <h3 className="font-semibold text-neutral-900 mb-3">{faq.question}</h3>
                <p className="text-neutral-600">{faq.answer}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}