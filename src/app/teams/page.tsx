'use client'

import { useState } from 'react'
import { Users, Check, ArrowRight, Shield, BarChart3, BookOpen, Award, Globe, Zap, Star } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'

const teamFeatures = [
  {
    icon: Users,
    title: 'Team Management',
    description: 'Add and manage team members, assign courses, track progress'
  },
  {
    icon: BarChart3,
    title: 'Advanced Analytics',
    description: 'Detailed learning analytics, progress reports, and performance insights'
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'SSO integration, advanced permissions, and enterprise-grade security'
  },
  {
    icon: BookOpen,
    title: 'Custom Learning Paths',
    description: 'Create tailored learning journeys for different roles and departments'
  },
  {
    icon: Award,
    title: 'Certification Programs',
    description: 'Track certifications, compliance training, and skill assessments'
  },
  {
    icon: Globe,
    title: 'Multi-language Support',
    description: 'Content available in multiple languages with localization options'
  }
]

const testimonials = [
  {
    name: 'Sarah Mitchell',
    role: 'Learning & Development Manager',
    company: 'TechCorp Inc.',
    avatar: '/api/placeholder/avatar/team-sarah',
    quote: 'SkillForge has transformed our team training. The analytics help us identify skill gaps and track progress effectively.',
    rating: 5
  },
  {
    name: 'David Chen',
    role: 'HR Director',
    company: 'InnovateLabs',
    avatar: '/api/placeholder/avatar/team-michael',
    quote: 'The team management features are fantastic. We can easily onboard new employees and track their learning journey.',
    rating: 5
  },
  {
    name: 'Maria Rodriguez',
    role: 'CEO',
    company: 'StartupHub',
    avatar: '/api/placeholder/avatar/team-emma',
    quote: 'ROI on team training has increased by 300% since switching to SkillForge. Highly recommended!',
    rating: 5
  }
]

const pricingPlans = [
  {
    name: 'Team Starter',
    price: 25,
    period: 'per user/month',
    description: 'Perfect for small teams getting started',
    features: [
      'Up to 25 team members',
      'Access to all courses',
      'Basic analytics',
      'Email support',
      'Team progress tracking',
      'Course assignments'
    ],
    popular: false,
    cta: 'Start Free Trial'
  },
  {
    name: 'Team Pro',
    price: 45,
    period: 'per user/month',
    description: 'Advanced features for growing teams',
    features: [
      'Up to 100 team members',
      'Everything in Team Starter',
      'Advanced analytics & reporting',
      'Custom learning paths',
      'Priority support',
      'SSO integration',
      'Bulk user management',
      'Compliance tracking'
    ],
    popular: true,
    cta: 'Start Free Trial'
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'contact sales',
    description: 'Tailored solutions for large organizations',
    features: [
      'Unlimited team members',
      'Everything in Team Pro',
      'Dedicated account manager',
      'Custom integrations',
      'Advanced security features',
      'Custom branding',
      'API access',
      'On-premise deployment option'
    ],
    popular: false,
    cta: 'Contact Sales'
  }
]

export default function TeamsPage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-neutral-50" style={{ position: 'relative', zIndex: 1 }}>
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white">
        <div className="max-w-6xl mx-auto px-4 py-20">
          <div className="text-center">
            <Badge className="bg-white/20 text-white border-white/30 mb-6">
              <Users className="w-4 h-4 mr-2" />
              For Teams & Organizations
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Empower Your <span className="text-yellow-300">Team</span> to Learn
            </h1>
            <p className="text-xl text-primary-100 mb-8 max-w-3xl mx-auto">
              Transform your organization with scalable learning solutions. Track progress, 
              manage teams, and accelerate skill development with powerful analytics and insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-primary-600 hover:bg-neutral-50">
                Start Free Trial
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button size="lg" variant="secondary" className="border-white/30 hover:bg-white/10">
                Schedule Demo
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-neutral-900 mb-4">
            Everything You Need to Scale Learning
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Powerful features designed specifically for teams and organizations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamFeatures.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-8 h-8 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-neutral-600">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">
              Trusted by Leading Organizations
            </h2>
            <p className="text-xl text-neutral-600">
              See how teams are transforming their learning with SkillForge
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-neutral-700 mb-6">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="flex items-center">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <p className="font-semibold text-neutral-900">{testimonial.name}</p>
                      <p className="text-sm text-neutral-600">{testimonial.role}</p>
                      <p className="text-sm text-neutral-500">{testimonial.company}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-neutral-900 mb-4">
            Choose the Right Plan for Your Team
          </h2>
          <p className="text-xl text-neutral-600">
            Flexible pricing that scales with your organization
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative hover:shadow-xl transition-all ${
                plan.popular ? 'ring-2 ring-primary-500 scale-105' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary-600">
                    <Zap className="w-3 h-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center p-8">
                <h3 className="text-2xl font-bold text-neutral-900 mb-2">{plan.name}</h3>
                <p className="text-neutral-600 mb-4">{plan.description}</p>
                <div className="mb-6">
                  {typeof plan.price === 'number' ? (
                    <>
                      <span className="text-4xl font-bold text-neutral-900">${plan.price}</span>
                      <span className="text-neutral-600 ml-2">{plan.period}</span>
                    </>
                  ) : (
                    <span className="text-3xl font-bold text-neutral-900">{plan.price}</span>
                  )}
                </div>
                <Button 
                  className={`w-full ${plan.popular ? 'bg-primary-600 hover:bg-primary-700' : ''}`}
                  variant={plan.popular ? 'primary' : 'secondary'}
                >
                  {plan.cta}
                </Button>
              </CardHeader>
              
              <CardContent className="p-8 pt-0">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-neutral-700">
                      <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Transform Your Team's Learning?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Start your free trial today and see the difference SkillForge can make for your organization.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-primary-600 hover:bg-neutral-50">
              Start Free 14-Day Trial
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button size="lg" variant="secondary" className="border-white/30 hover:bg-white/10">
              Talk to Sales
            </Button>
          </div>
          <p className="text-sm text-primary-200 mt-4">
            No credit card required • Setup in minutes • Cancel anytime
          </p>
        </div>
      </div>
    </div>
  )
}