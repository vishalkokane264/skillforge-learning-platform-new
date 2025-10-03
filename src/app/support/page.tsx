'use client'

import { useState } from 'react'
import { 
  Search, MessageCircle, Mail, Phone, Book, Video, FileText, 
  Clock, CheckCircle, AlertCircle, HelpCircle, Users, Zap, ArrowRight 
} from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'

const supportOptions = [
  {
    icon: MessageCircle,
    title: 'Live Chat',
    description: 'Get instant help from our support team',
    availability: 'Available 24/7',
    responseTime: 'Usually responds in minutes',
    action: 'Start Chat',
    popular: true
  },
  {
    icon: Mail,
    title: 'Email Support',
    description: 'Send us a detailed message about your issue',
    availability: 'We reply within 24 hours',
    responseTime: 'Average response: 4 hours',
    action: 'Send Email',
    popular: false
  },
  {
    icon: Phone,
    title: 'Phone Support',
    description: 'Talk directly with our support specialists',
    availability: 'Mon-Fri, 9 AM - 6 PM EST',
    responseTime: 'Immediate assistance',
    action: 'Call Now',
    popular: false
  },
  {
    icon: Video,
    title: 'Screen Sharing',
    description: 'Get personalized help with screen sharing',
    availability: 'By appointment',
    responseTime: 'Schedule within 24 hours',
    action: 'Schedule Session',
    popular: false
  }
]

const helpCategories = [
  {
    icon: Book,
    title: 'Getting Started',
    description: 'Learn the basics of SkillForge',
    articles: 12,
    color: 'bg-blue-500'
  },
  {
    icon: Users,
    title: 'Account Management',
    description: 'Managing your profile and settings',
    articles: 8,
    color: 'bg-green-500'
  },
  {
    icon: FileText,
    title: 'Billing & Payments',
    description: 'Subscription and payment questions',
    articles: 15,
    color: 'bg-purple-500'
  },
  {
    icon: Video,
    title: 'Technical Issues',
    description: 'Troubleshooting and technical help',
    articles: 20,
    color: 'bg-red-500'
  }
]

const faqs = [
  {
    question: 'How do I reset my password?',
    answer: 'You can reset your password by clicking the "Forgot Password" link on the login page. We\'ll send you an email with instructions to create a new password.'
  },
  {
    question: 'Can I download courses for offline viewing?',
    answer: 'Yes! Premium and Business plan subscribers can download course videos for offline viewing through our mobile app.'
  },
  {
    question: 'How do I get a refund?',
    answer: 'We offer a 30-day money-back guarantee. Contact our support team within 30 days of purchase for a full refund.'
  },
  {
    question: 'Can I share my account with team members?',
    answer: 'Individual accounts are for single users only. For teams, we offer Team and Enterprise plans with multi-user access and management features.'
  },
  {
    question: 'How do I track my learning progress?',
    answer: 'Your progress is automatically tracked as you complete lessons. You can view detailed progress statistics in your profile dashboard.'
  },
  {
    question: 'Are certificates included with all plans?',
    answer: 'Certificates of completion are available with Pro, Premium, and Business plans. Free plan users have access to course content but not certificates.'
  }
]

const statusUpdates = [
  {
    service: 'Video Platform',
    status: 'operational',
    lastChecked: '2 minutes ago'
  },
  {
    service: 'Payment System',
    status: 'operational',
    lastChecked: '5 minutes ago'
  },
  {
    service: 'Mobile App',
    status: 'operational',
    lastChecked: '1 minute ago'
  },
  {
    service: 'API Services',
    status: 'maintenance',
    lastChecked: '10 minutes ago'
  }
]

export default function SupportPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'maintenance':
        return <AlertCircle className="w-4 h-4 text-yellow-500" />
      case 'outage':
        return <AlertCircle className="w-4 h-4 text-red-500" />
      default:
        return <HelpCircle className="w-4 h-4 text-neutral-500" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'operational':
        return 'All systems operational'
      case 'maintenance':
        return 'Scheduled maintenance'
      case 'outage':
        return 'Service disruption'
      default:
        return 'Unknown status'
    }
  }

  return (
    <div className="min-h-screen bg-neutral-50" style={{ position: 'relative', zIndex: 1 }}>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            How Can We Help You?
          </h1>
          <p className="text-xl text-primary-100 mb-8">
            Find answers, get support, and learn how to make the most of SkillForge
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="text"
                placeholder="Search for help articles, FAQs, or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-lg text-neutral-900 border-0 focus:ring-4 focus:ring-primary-300 text-lg"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Support Options */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-neutral-900 mb-8 text-center">
            Get Support Your Way
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {supportOptions.map((option, index) => {
              const Icon = option.icon
              return (
                <Card 
                  key={index} 
                  className={`text-center hover:shadow-lg transition-all cursor-pointer ${
                    option.popular ? 'ring-2 ring-primary-500' : ''
                  }`}
                >
                  {option.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-primary-600">
                        <Zap className="w-3 h-3 mr-1" />
                        Popular
                      </Badge>
                    </div>
                  )}
                  
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-primary-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                      {option.title}
                    </h3>
                    <p className="text-sm text-neutral-600 mb-3">
                      {option.description}
                    </p>
                    <p className="text-xs text-neutral-500 mb-2">
                      {option.availability}
                    </p>
                    <p className="text-xs text-neutral-500 mb-4">
                      {option.responseTime}
                    </p>
                    <Button 
                      size="sm" 
                      className={option.popular ? 'bg-primary-600' : ''}
                      variant={option.popular ? 'primary' : 'secondary'}
                    >
                      {option.action}
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Help Categories */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-neutral-900 mb-8 text-center">
            Browse Help Topics
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {helpCategories.map((category, index) => {
              const Icon = category.icon
              return (
                <Card 
                  key={index}
                  className="hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => setSelectedCategory(category.title)}
                >
                  <CardContent className="p-6 text-center">
                    <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center mx-auto mb-4`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                      {category.title}
                    </h3>
                    <p className="text-sm text-neutral-600 mb-3">
                      {category.description}
                    </p>
                    <p className="text-sm font-medium text-primary-600">
                      {category.articles} articles
                    </p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* System Status */}
        <div className="mb-16">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">System Status</h2>
                <Badge className="bg-green-100 text-green-700">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  All Systems Operational
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {statusUpdates.map((service, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(service.status)}
                      <div>
                        <p className="font-medium text-neutral-900">{service.service}</p>
                        <p className="text-xs text-neutral-500">
                          Checked {service.lastChecked}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-neutral-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          
          <div className="max-w-3xl mx-auto space-y-4">
            {filteredFaqs.map((faq, index) => (
              <Card key={index} className="hover:shadow-sm transition-shadow">
                <CardContent 
                  className="p-0 cursor-pointer"
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                >
                  <div className="p-6 flex items-center justify-between">
                    <h3 className="font-semibold text-neutral-900">{faq.question}</h3>
                    <ArrowRight 
                      className={`w-5 h-5 text-neutral-400 transform transition-transform ${
                        expandedFaq === index ? 'rotate-90' : ''
                      }`} 
                    />
                  </div>
                  {expandedFaq === index && (
                    <div className="px-6 pb-6 border-t bg-neutral-50">
                      <p className="text-neutral-700 pt-4">{faq.answer}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="text-center">
          <Card className="bg-primary-50 border-primary-200">
            <CardContent className="p-8">
              <MessageCircle className="w-16 h-16 text-primary-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-neutral-900 mb-4">
                Still Need Help?
              </h3>
              <p className="text-neutral-600 mb-6 max-w-md mx-auto">
                Our support team is standing by to help you with any questions or issues you might have.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-primary-600 hover:bg-primary-700">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Start Live Chat
                </Button>
                <Button variant="secondary">
                  <Mail className="w-4 h-4 mr-2" />
                  Send Email
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}