'use client'

import { useState } from 'react'
import { Download, Calendar, CreditCard, Check } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'

interface Invoice {
  id: string
  date: string
  amount: number
  status: 'paid' | 'pending' | 'failed'
  plan: string
  period: string
  downloadUrl?: string
}

export default function BillingPage() {
  const [invoices] = useState<Invoice[]>([
    {
      id: 'INV-2024-001',
      date: '2024-02-01',
      amount: 19,
      status: 'paid',
      plan: 'Pro Plan',
      period: 'Feb 2024 - Jan 2025',
      downloadUrl: '/invoices/INV-2024-001.pdf'
    },
    {
      id: 'INV-2024-002',
      date: '2024-01-01',
      amount: 19,
      status: 'paid',
      plan: 'Pro Plan',
      period: 'Jan 2024 - Dec 2024',
      downloadUrl: '/invoices/INV-2024-002.pdf'
    },
    {
      id: 'INV-2023-012',
      date: '2023-12-01',
      amount: 0,
      status: 'paid',
      plan: 'Free Trial',
      period: 'Dec 2023 (Trial)',
    }
  ])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge className="bg-green-100 text-green-700"><Check className="w-3 h-3 mr-1" />Paid</Badge>
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-700">Pending</Badge>
      case 'failed':
        return <Badge className="bg-red-100 text-red-700">Failed</Badge>
      default:
        return <Badge variant="default">Unknown</Badge>
    }
  }

  const totalPaid = invoices
    .filter(invoice => invoice.status === 'paid')
    .reduce((sum, invoice) => sum + invoice.amount, 0)

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-neutral-900">Billing & Invoices</h1>
              <p className="text-neutral-600">Manage your subscription and download invoices</p>
            </div>
            <Button variant="secondary">
              <CreditCard className="w-4 h-4 mr-2" />
              Update Payment Method
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-neutral-600">Current Plan</p>
                  <p className="text-2xl font-bold text-neutral-900">Pro</p>
                </div>
                <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-neutral-600">Next Billing</p>
                  <p className="text-2xl font-bold text-neutral-900">Feb 1</p>
                </div>
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-neutral-600">Total Spent</p>
                  <p className="text-2xl font-bold text-neutral-900">${totalPaid}</p>
                </div>
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                  <Check className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Invoice History */}
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">Invoice History</h2>
            <p className="text-neutral-600">Download receipts and manage your billing history</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {invoices.map((invoice) => (
                <div
                  key={invoice.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-neutral-50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center">
                      <CreditCard className="w-5 h-5 text-neutral-600" />
                    </div>
                    <div>
                      <p className="font-medium text-neutral-900">{invoice.plan}</p>
                      <p className="text-sm text-neutral-600">{invoice.period}</p>
                      <p className="text-xs text-neutral-500">
                        Invoice #{invoice.id} • {new Date(invoice.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="font-semibold text-neutral-900">
                        {invoice.amount === 0 ? 'Free' : `$${invoice.amount}`}
                      </p>
                      {getStatusBadge(invoice.status)}
                    </div>
                    {invoice.downloadUrl && invoice.status === 'paid' && (
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => {
                          // In a real app, this would download the PDF
                          alert(`Downloading invoice ${invoice.id}`)
                        }}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Payment Method */}
            <div className="mt-8 pt-8 border-t">
              <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-neutral-900">•••• •••• •••• 1234</p>
                    <p className="text-sm text-neutral-600">Expires 12/26</p>
                  </div>
                </div>
                <Button variant="secondary" size="sm">
                  Update
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}