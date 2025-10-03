'use client'

import { useState, useEffect } from 'react'
import { Award, Download, Eye, Calendar, BookOpen, Star, Filter } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import CertificateTemplate from '@/components/ui/CertificateTemplate'

interface Certificate {
  id: string
  courseTitle: string
  courseDuration: string
  completionDate: string
  grade: string
  instructor: {
    name: string
    title: string
    signature: string
    avatar: string
  }
  skills: string[]
  certificateNumber: string
  thumbnail: string
}

export default function CertificatesPage() {
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null)
  const [user, setUser] = useState<any>(null)
  const [filter, setFilter] = useState('all') // all, recent, top-rated

  useEffect(() => {
    // Load user data
    const savedUser = localStorage.getItem('currentUser')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }

    // Generate sample certificates with random user images
    const sampleCertificates: Certificate[] = [
      {
        id: 'cert-001',
        courseTitle: 'Complete Web Development Bootcamp',
        courseDuration: '40 hours',
        completionDate: new Date(2024, 1, 15).toLocaleDateString('en-US', { 
          year: 'numeric', month: 'long', day: 'numeric' 
        }),
        grade: 'Excellent (95%)',
        instructor: {
          name: 'Sarah Johnson',
          title: 'Senior Full Stack Developer',
          signature: '/signatures/sarah.png',
          avatar: '/api/placeholder/avatar/sarah-instructor'
        },
        skills: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Node.js'],
        certificateNumber: 'SF-2024-WD-001',
        thumbnail: '/api/placeholder/course/react-fundamentals'
      },
      {
        id: 'cert-002',
        courseTitle: 'Advanced JavaScript Concepts',
        courseDuration: '25 hours',
        completionDate: new Date(2024, 0, 28).toLocaleDateString('en-US', { 
          year: 'numeric', month: 'long', day: 'numeric' 
        }),
        grade: 'Outstanding (98%)',
        instructor: {
          name: 'Mike Chen',
          title: 'JavaScript Expert & Consultant',
          signature: '/signatures/mike.png',
          avatar: '/api/placeholder/avatar/michael-instructor'
        },
        skills: ['ES6+', 'Async/Await', 'Closures', 'Prototypes', 'Design Patterns'],
        certificateNumber: 'SF-2024-JS-002',
        thumbnail: '/api/placeholder/course/python-basics'
      },
      {
        id: 'cert-003',
        courseTitle: 'UI/UX Design Fundamentals',
        courseDuration: '32 hours',
        completionDate: new Date(2024, 0, 10).toLocaleDateString('en-US', { 
          year: 'numeric', month: 'long', day: 'numeric' 
        }),
        grade: 'Excellent (92%)',
        instructor: {
          name: 'Emily Rodriguez',
          title: 'Lead UX Designer',
          signature: '/signatures/emily.png',
          avatar: '/api/placeholder/avatar/emma-instructor'
        },
        skills: ['User Research', 'Wireframing', 'Prototyping', 'Figma', 'Design Systems'],
        certificateNumber: 'SF-2024-UX-003',
        thumbnail: '/api/placeholder/course/nodejs-backend'
      },
      {
        id: 'cert-004',
        courseTitle: 'Digital Marketing Strategy',
        courseDuration: '28 hours',
        completionDate: new Date(2023, 11, 20).toLocaleDateString('en-US', { 
          year: 'numeric', month: 'long', day: 'numeric' 
        }),
        grade: 'Excellent (94%)',
        instructor: {
          name: 'David Wilson',
          title: 'Digital Marketing Director',
          signature: '/signatures/david.png',
          avatar: '/api/placeholder/avatar/david-instructor'
        },
        skills: ['SEO', 'Social Media Marketing', 'Content Strategy', 'Analytics', 'PPC'],
        certificateNumber: 'SF-2023-DM-004',
        thumbnail: '/api/placeholder/course/ui-ux-design'
      },
      {
        id: 'cert-005',
        courseTitle: 'Python for Data Science',
        courseDuration: '45 hours',
        completionDate: new Date(2023, 10, 8).toLocaleDateString('en-US', { 
          year: 'numeric', month: 'long', day: 'numeric' 
        }),
        grade: 'Outstanding (97%)',
        instructor: {
          name: 'Dr. Lisa Chang',
          title: 'Data Science Professor',
          signature: '/signatures/lisa.png',
          avatar: '/api/placeholder/avatar/lisa-instructor'
        },
        skills: ['Python', 'Pandas', 'NumPy', 'Machine Learning', 'Data Visualization'],
        certificateNumber: 'SF-2023-DS-005',
        thumbnail: '/api/placeholder/course/data-science'
      }
    ]

    setCertificates(sampleCertificates)
  }, [])

  const filteredCertificates = certificates.filter(cert => {
    const certDate = new Date(cert.completionDate)
    const threeMonthsAgo = new Date()
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3)

    if (filter === 'recent') return certDate >= threeMonthsAgo
    if (filter === 'top-rated') return cert.grade.includes('Outstanding') || parseInt(cert.grade.match(/\d+/)?.[0] || '0') >= 95
    return true
  })

  const stats = {
    total: certificates.length,
    thisYear: certificates.filter(cert => new Date(cert.completionDate).getFullYear() === 2024).length,
    outstanding: certificates.filter(cert => cert.grade.includes('Outstanding')).length,
    skills: Array.from(new Set(certificates.flatMap(cert => cert.skills))).length
  }

  if (selectedCertificate && user) {
    return (
      <div className="min-h-screen bg-neutral-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <Button 
              variant="secondary" 
              onClick={() => setSelectedCertificate(null)}
            >
              ← Back to Certificates
            </Button>
            <h1 className="text-2xl font-bold text-neutral-900">Certificate Preview</h1>
            <div></div>
          </div>
          
          <CertificateTemplate
            certificate={selectedCertificate}
            userName={user.name}
            userAvatar={user.avatar}
            onDownload={() => {
              // Track download analytics here
              console.log('Certificate downloaded:', selectedCertificate.id)
            }}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900 mb-2">My Certificates</h1>
            <p className="text-neutral-600">View and download your course completion certificates</p>
          </div>
          <Button onClick={() => window.location.href = '/courses'}>
            <Award className="w-4 h-4 mr-2" />
            Earn More Certificates
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <Award className="w-8 h-8 text-primary-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-neutral-900 mb-1">{stats.total}</div>
              <div className="text-sm text-neutral-600">Total Certificates</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <Calendar className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-neutral-900 mb-1">{stats.thisYear}</div>
              <div className="text-sm text-neutral-600">This Year</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <Star className="w-8 h-8 text-yellow-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-neutral-900 mb-1">{stats.outstanding}</div>
              <div className="text-sm text-neutral-600">Outstanding Grades</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <BookOpen className="w-8 h-8 text-green-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-neutral-900 mb-1">{stats.skills}</div>
              <div className="text-sm text-neutral-600">Skills Mastered</div>
            </CardContent>
          </Card>
        </div>

        {/* Filter */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Filter className="w-5 h-5 text-neutral-600" />
            <select 
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border border-neutral-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-600 focus:border-transparent"
            >
              <option value="all">All Certificates ({certificates.length})</option>
              <option value="recent">Recent (Last 3 months)</option>
              <option value="top-rated">Top Rated (95%+)</option>
            </select>
          </div>
          
          <div className="text-sm text-neutral-500">
            Showing {filteredCertificates.length} of {certificates.length} certificates
          </div>
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCertificates.map((certificate) => (
            <Card key={certificate.id} className="hover:shadow-xl transition-all duration-300 group">
              <CardContent className="p-0">
                {/* Thumbnail */}
                <div className="relative">
                  <img
                    src={certificate.thumbnail}
                    alt={certificate.courseTitle}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  
                  {/* Grade Badge */}
                  <div className="absolute top-3 left-3">
                    <Badge 
                      className={
                        certificate.grade.includes('Outstanding') 
                          ? 'bg-yellow-500 text-yellow-900' 
                          : 'bg-green-500 text-green-900'
                      }
                    >
                      <Star className="w-3 h-3 mr-1" />
                      {certificate.grade.split('(')[0].trim()}
                    </Badge>
                  </div>

                  {/* Overlay Actions */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-3">
                    <Button 
                      size="sm"
                      onClick={() => setSelectedCertificate(certificate)}
                      className="bg-white/90 text-neutral-800 hover:bg-white"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </Button>
                    <Button 
                      size="sm"
                      variant="secondary"
                      className="bg-primary-600 text-white hover:bg-primary-700"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-bold text-neutral-900 mb-2 line-clamp-2">
                    {certificate.courseTitle}
                  </h3>
                  
                  <div className="flex items-center space-x-3 mb-3">
                    <img
                      src={certificate.instructor.avatar}
                      alt={certificate.instructor.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-sm font-medium text-neutral-800">{certificate.instructor.name}</p>
                      <p className="text-xs text-neutral-500">{certificate.instructor.title}</p>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-neutral-500">Completed:</span>
                      <span className="font-medium text-neutral-800">{certificate.completionDate}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-neutral-500">Duration:</span>
                      <span className="font-medium text-neutral-800">{certificate.courseDuration}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-neutral-500">Grade:</span>
                      <span className="font-semibold text-green-600">{certificate.grade}</span>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="mb-4">
                    <p className="text-xs text-neutral-500 mb-2">Skills Demonstrated:</p>
                    <div className="flex flex-wrap gap-1">
                      {certificate.skills.slice(0, 3).map((skill, index) => (
                        <span 
                          key={index}
                          className="px-2 py-1 bg-primary-50 text-primary-700 rounded text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                      {certificate.skills.length > 3 && (
                        <span className="px-2 py-1 bg-neutral-100 text-neutral-600 rounded text-xs">
                          +{certificate.skills.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Certificate ID */}
                  <div className="border-t pt-3">
                    <p className="text-xs text-neutral-500 mb-1">Certificate ID:</p>
                    <p className="text-xs font-mono text-neutral-700 bg-neutral-50 px-2 py-1 rounded">
                      {certificate.certificateNumber}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCertificates.length === 0 && (
          <div className="text-center py-16">
            <Award className="w-24 h-24 text-neutral-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-neutral-900 mb-2">
              No certificates found
            </h3>
            <p className="text-neutral-600 mb-6">
              Complete courses to earn certificates and showcase your achievements.
            </p>
            <Button onClick={() => window.location.href = '/'}>
              Browse Courses
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}