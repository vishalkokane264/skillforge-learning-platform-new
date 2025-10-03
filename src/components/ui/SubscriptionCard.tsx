'use client'

import { useState, useEffect } from 'react'
import { Calendar, CreditCard, Settings, Crown, Zap, AlertCircle, CheckCircle } from 'lucide-react'
import Button from '@/components/ui/Button'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'

interface Subscription {
  plan: string
  status: 'active' | 'trial' | 'cancelled' | 'expired'
  startDate: string
  nextBilling: string
  amount: number
  billingPeriod: 'monthly' | 'yearly'
}

export default function SubscriptionCard() {
  const [subscription, setSubscription] = useState<Subscription | null>(null)
  const [showCancelModal, setShowCancelModal] = useState(false)

  useEffect(() => {
    // Load subscription from localStorage (in real app, this would be from backend)
    const savedSub = localStorage.getItem('subscription')
    if (savedSub) {
      const sub = JSON.parse(savedSub)
      setSubscription({
        plan: sub.plan || 'free',
        status: sub.status || 'trial',
        startDate: sub.startDate,
        nextBilling: sub.nextBilling,
        amount: sub.plan === 'pro' ? 19 : sub.plan === 'premium' ? 35 : 0,
        billingPeriod: 'yearly'
      })
    }
  }, [])

  const getPlanIcon = (plan: string) => {
    switch (plan) {
      case 'pro': return Zap
      case 'premium': return Crown
      default: return CreditCard
    }
  }

  const getPlanName = (plan: string) => {
    switch (plan) {
      case 'pro': return 'Pro'
      case 'premium': return 'Premium'
      default: return 'Free'
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-600"><CheckCircle className="w-3 h-3 mr-1" />Active</Badge>
      case 'trial':
        return <Badge variant="new"><AlertCircle className="w-3 h-3 mr-1" />Free Trial</Badge>
      case 'cancelled':
        return <Badge className="bg-orange-600">Cancelled</Badge>
      case 'expired':
        return <Badge className="bg-red-600">Expired</Badge>
      default:
        return <Badge variant="default">Free</Badge>
    }
  }

  const handleCancelSubscription = () => {
    // In real app, this would call an API
    if (subscription) {
      const updatedSub = { ...subscription, status: 'cancelled' as const }
      setSubscription(updatedSub)
      localStorage.setItem('subscription', JSON.stringify(updatedSub))
    }
    setShowCancelModal(false)
  }

  if (!subscription) {
    return (
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Subscription</h3>
        </CardHeader>
        <CardContent className="text-center py-8">
          <div className="text-neutral-500 mb-4">No active subscription</div>
          <Button onClick={() => window.location.href = '/pricing'}>
            View Pricing Plans
          </Button>
        </CardContent>
      </Card>
    )
  }

  const PlanIcon = getPlanIcon(subscription.plan)
  const daysUntilBilling = Math.ceil(
    (new Date(subscription.nextBilling).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  )

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">My Subscription</h3>
          {getStatusBadge(subscription.status)}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Plan Details */}
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center">
            <PlanIcon className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-neutral-900">{getPlanName(subscription.plan)} Plan</h4>
            <p className="text-sm text-neutral-600">
              {subscription.amount > 0 
                ? `$${subscription.amount}/month (billed ${subscription.billingPeriod})`
                : 'Free plan'
              }
            </p>
          </div>
        </div>

        {/* Billing Information */}
        {subscription.status === 'trial' && (
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Calendar className="w-4 h-4 text-blue-600" />
              <span className="font-medium text-blue-900">Free Trial</span>
            </div>
            <p className="text-sm text-blue-700">
              Your trial ends in {daysUntilBilling} days. You'll be charged $${subscription.amount}/month starting {new Date(subscription.nextBilling).toLocaleDateString()}.
            </p>
          </div>
        )}

        {subscription.status === 'active' && (
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <CreditCard className="w-4 h-4 text-green-600" />
              <span className="font-medium text-green-900">Next Billing</span>
            </div>
            <p className="text-sm text-green-700">
              Your next payment of $${subscription.amount} is due on {new Date(subscription.nextBilling).toLocaleDateString()}.
            </p>
          </div>
        )}

        {subscription.status === 'cancelled' && (
          <div className="bg-orange-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <AlertCircle className="w-4 h-4 text-orange-600" />
              <span className="font-medium text-orange-900">Subscription Cancelled</span>
            </div>
            <p className="text-sm text-orange-700">
              Your subscription will end on {new Date(subscription.nextBilling).toLocaleDateString()}. You'll still have access until then.
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          {subscription.status === 'trial' || subscription.status === 'active' ? (
            <>
              <Button variant="secondary" className="w-full" onClick={() => window.location.href = '/pricing'}>
                <Settings className="w-4 h-4 mr-2" />
                Change Plan
              </Button>
              <Button variant="tertiary" className="w-full" onClick={() => window.location.href = '/billing'}>
                View Billing History
              </Button>
              <Button 
                variant="tertiary" 
                className="w-full text-red-600 hover:text-red-700"
                onClick={() => setShowCancelModal(true)}
              >
                Cancel Subscription
              </Button>
            </>
          ) : subscription.status === 'cancelled' ? (
            <Button className="w-full" onClick={() => window.location.href = '/pricing'}>
              Reactivate Subscription
            </Button>
          ) : (
            <Button className="w-full" onClick={() => window.location.href = '/pricing'}>
              Upgrade to Pro
            </Button>
          )}
        </div>

        {/* Cancel Confirmation Modal */}
        {showCancelModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <h3 className="text-lg font-semibold mb-4">Cancel Subscription?</h3>
              <p className="text-neutral-600 mb-6">
                You'll lose access to premium features at the end of your current billing period. 
                Are you sure you want to cancel?
              </p>
              <div className="flex space-x-3">
                <Button
                  variant="secondary"
                  className="flex-1"
                  onClick={() => setShowCancelModal(false)}
                >
                  Keep Subscription
                </Button>
                <Button
                  className="flex-1 bg-red-600 hover:bg-red-700"
                  onClick={handleCancelSubscription}
                >
                  Cancel Subscription
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}