'use client'

import { useState } from 'react'
import { Search, Filter, BookOpen, Code, Palette, Camera, TrendingUp, Globe, Brain, Wrench } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import CourseCard from '@/components/ui/CourseCard'

const categories = [
  {
    id: 'development',
    name: 'Development',
    icon: Code,
    description: 'Web development, mobile apps, programming languages',
    courseCount: 2847,
    color: 'bg-blue-600',
    featured: true
  },
  {
    id: 'design',
    name: 'Design',
    icon: Palette,
    description: 'UI/UX design, graphic design, web design',
    courseCount: 1523,
    color: 'bg-purple-600',
    featured: true
  },
  {
    id: 'business',
    name: 'Business',
    icon: TrendingUp,
    description: 'Entrepreneurship, marketing, finance, management',
    courseCount: 1876,
    color: 'bg-green-600',
    featured: true
  },
  {
    id: 'photography',
    name: 'Photography',
    icon: Camera,
    description: 'Digital photography, photo editing, videography',
    courseCount: 934,
    color: 'bg-yellow-600',
    featured: false
  },
  {
    id: 'marketing',
    name: 'Marketing',
    icon: Globe,
    description: 'Digital marketing, social media, SEO, content marketing',
    courseCount: 1245,
    color: 'bg-red-600',
    featured: true
  },
  {
    id: 'data-science',
    name: 'Data Science',
    icon: Brain,
    description: 'Machine learning, AI, data analysis, statistics',
    courseCount: 687,
    color: 'bg-indigo-600',
    featured: true
  },
  {
    id: 'personal-development',
    name: 'Personal Development',
    icon: BookOpen,
    description: 'Leadership, productivity, communication, soft skills',
    courseCount: 1432,
    color: 'bg-pink-600',
    featured: false
  },
  {
    id: 'it-software',
    name: 'IT & Software',
    icon: Wrench,
    description: 'Network security, cloud computing, DevOps, system admin',
    courseCount: 1567,
    color: 'bg-gray-600',
    featured: false
  }
]

const sampleCourses = [
  {
    id: '1',
    title: 'Complete React Developer Course',
    subtitle: 'Master React from basics to advanced concepts',
    instructor: {
      id: '1',
      name: 'Sarah Johnson',
      avatar: '/api/placeholder/avatar/sarah-johnson',
      bio: 'Senior React Developer with 8 years experience',
      rating: 4.9,
      students: 125000,
      courses: 12,
      expertise: ['React', 'JavaScript', 'Node.js']
    },
    rating: 4.8,
    reviewCount: 15420,
    price: 89.99,
    originalPrice: 199.99,
    duration: '40 hours',
    level: 'Beginner' as const,
    thumbnail: '/api/placeholder/course/react-fundamentals',
    description: 'Learn React development from scratch with hands-on projects',
    category: 'development',
    studentCount: 45230,
    language: 'English',
    lastUpdated: '2024-01-15',
    features: ['Lifetime access', 'Certificate of completion', '30-day money-back guarantee'],
    curriculum: [],
    badges: [{ text: 'Bestseller', variant: 'bestseller' as const }],
    learningOutcomes: ['Build React applications', 'Understand component lifecycle'],
    requirements: ['Basic JavaScript knowledge'],
    tags: ['React', 'JavaScript', 'Frontend']
  },
  {
    id: '2',
    title: 'UI/UX Design Mastery',
    subtitle: 'Create stunning user interfaces and experiences',
    instructor: {
      id: '2',
      name: 'Michael Chen',
      avatar: '/api/placeholder/avatar/michael-chen',
      bio: 'Lead UX Designer at top tech companies',
      rating: 4.8,
      students: 89000,
      courses: 8,
      expertise: ['UI/UX', 'Figma', 'Design Systems']
    },
    rating: 4.9,
    reviewCount: 8932,
    price: 79.99,
    originalPrice: 159.99,
    duration: '32 hours',
    level: 'Intermediate' as const,
    thumbnail: '/api/placeholder/course/nodejs-backend',
    description: 'Master UI/UX design principles and create amazing user experiences',
    category: 'design',
    studentCount: 28450,
    language: 'English',
    lastUpdated: '2024-01-20',
    features: ['Lifetime access', 'Certificate of completion', '30-day money-back guarantee'],
    curriculum: [],
    badges: [{ text: 'New', variant: 'new' as const }],
    learningOutcomes: ['Create wireframes and prototypes', 'Conduct user research'],
    requirements: ['No prior experience needed'],
    tags: ['UI', 'UX', 'Design', 'Figma']
  },
  {
    id: '3',
    title: 'Digital Marketing Strategy',
    subtitle: 'Build effective marketing campaigns that convert',
    instructor: {
      id: '3',
      name: 'Emily Rodriguez',
      avatar: '/api/placeholder/avatar/emma-wilson',
      bio: 'Digital Marketing Expert and Consultant',
      rating: 4.7,
      students: 67000,
      courses: 15,
      expertise: ['Digital Marketing', 'SEO', 'Social Media']
    },
    rating: 4.7,
    reviewCount: 12105,
    price: 69.99,
    originalPrice: 149.99,
    duration: '28 hours',
    level: 'Beginner' as const,
    thumbnail: '/api/placeholder/course/ui-ux-design',
    description: 'Learn digital marketing strategies to grow your business online',
    category: 'marketing',
    studentCount: 38720,
    language: 'English',
    lastUpdated: '2024-01-10',
    features: ['Lifetime access', 'Certificate of completion', '30-day money-back guarantee'],
    curriculum: [],
    badges: [{ text: 'Hot', variant: 'hot' as const }],
    learningOutcomes: ['Create marketing funnels', 'Master social media marketing'],
    requirements: ['Basic computer skills'],
    tags: ['Marketing', 'SEO', 'Social Media', 'Analytics']
  }
]

export default function CategoriesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getCoursesByCategory = (categoryId: string) => {
    return sampleCourses.filter(course => course.category === categoryId)
  }

  const filteredCourses = selectedCategory ? getCoursesByCategory(selectedCategory) : sampleCourses.slice(0, 6)

  return (
    <div className="min-h-screen bg-neutral-50" style={{ paddingTop: '0', position: 'relative', zIndex: 1 }}>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white" style={{ marginTop: '0' }}>
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Explore Course Categories
            </h1>
            <p className="text-xl text-primary-100 mb-8 max-w-3xl mx-auto">
              Discover thousands of courses across various categories. From programming to design, 
              business to personal development - find the perfect course for your learning journey.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Search categories or courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-lg text-neutral-900 border-0 focus:ring-4 focus:ring-primary-300 text-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-between mb-8">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <Button
              variant={selectedCategory === null ? 'primary' : 'secondary'}
              onClick={() => setSelectedCategory(null)}
            >
              All Categories
            </Button>
            <Button
              variant={selectedCategory === 'featured' ? 'primary' : 'secondary'}
              onClick={() => setSelectedCategory('featured')}
            >
              Featured
            </Button>
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-neutral-600" />
            <select className="border border-neutral-200 rounded-lg px-3 py-2 text-sm">
              <option>Most Popular</option>
              <option>Newest</option>
              <option>Highest Rated</option>
              <option>Most Reviews</option>
            </select>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {filteredCategories.map((category) => {
            const Icon = category.icon
            return (
              <Card 
                key={category.id}
                className="hover:shadow-lg transition-all cursor-pointer group"
                onClick={() => setSelectedCategory(category.id)}
              >
                <CardContent className="p-6 h-64 flex flex-col">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    {category.featured && (
                      <Badge variant="new">Featured</Badge>
                    )}
                  </div>
                  
                  <h3 className="text-lg font-semibold text-neutral-900 mb-3 group-hover:text-primary-600 transition-colors min-h-[1.75rem]">
                    {category.name}
                  </h3>
                  <p className="text-sm text-neutral-600 mb-4 flex-1 leading-relaxed">
                    {category.description}
                  </p>
                  <p className="text-sm font-medium text-primary-600 mt-auto">
                    {category.courseCount.toLocaleString()} courses
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Featured Courses Section */}
        {selectedCategory && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-neutral-900">
                  {selectedCategory === 'featured' ? 'Featured Courses' : 
                   categories.find(cat => cat.id === selectedCategory)?.name + ' Courses'}
                </h2>
                <p className="text-neutral-600">
                  Top courses in {selectedCategory === 'featured' ? 'all categories' : 
                  categories.find(cat => cat.id === selectedCategory)?.name}
                </p>
              </div>
              <Button variant="secondary">View All</Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <CourseCard 
                  key={course.id} 
                  course={course}
                />
              ))}
            </div>
          </div>
        )}

        {/* Popular Categories */}
        <div className="bg-white rounded-xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-neutral-900 mb-6 text-center">
            Most Popular Categories
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.filter(cat => cat.featured).map((category) => {
              const Icon = category.icon
              return (
                <div 
                  key={category.id}
                  className="text-center group cursor-pointer"
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <div className={`w-16 h-16 ${category.color} rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-neutral-900 group-hover:text-primary-600 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-neutral-600">
                    {category.courseCount.toLocaleString()} courses
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}