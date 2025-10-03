import { NextRequest, NextResponse } from 'next/server'

interface Course {
  id: string
  title: string
  description: string
  instructor: string
  duration: string
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  price: number
  originalPrice?: number
  discount?: number
  rating: number
  reviewCount: number
  category: string
  image: string
  tags: string[]
  isPopular?: boolean
  isNew?: boolean
  completionRate?: number
  studentsEnrolled: number
}

const courses: Course[] = [
  {
    id: 'react-fundamentals',
    title: 'React Fundamentals',
    description: 'Learn React from scratch with hands-on projects and real-world examples.',
    instructor: 'Sarah Johnson',
    duration: '12 hours',
    level: 'Beginner',
    price: 89.99,
    originalPrice: 149.99,
    discount: 40,
    rating: 4.8,
    reviewCount: 2847,
    category: 'Development',
    image: '/images/courses/react-fundamentals.jpg',
    tags: ['React', 'JavaScript', 'Frontend', 'Components'],
    isPopular: true,
    studentsEnrolled: 15420
  },
  {
    id: 'advanced-react-patterns',
    title: 'Advanced React Patterns',
    description: 'Master advanced React patterns, hooks, and performance optimization techniques.',
    instructor: 'David Chen',
    duration: '18 hours',
    level: 'Advanced',
    price: 129.99,
    originalPrice: 199.99,
    discount: 35,
    rating: 4.9,
    reviewCount: 1523,
    category: 'Development',
    image: '/images/courses/advanced-react.jpg',
    tags: ['React', 'Advanced', 'Hooks', 'Performance'],
    isNew: true,
    studentsEnrolled: 8750
  },
  {
    id: 'nodejs-backend',
    title: 'Node.js Backend Development',
    description: 'Build scalable backend APIs with Node.js, Express, and MongoDB.',
    instructor: 'Michael Rodriguez',
    duration: '20 hours',
    level: 'Intermediate',
    price: 99.99,
    originalPrice: 179.99,
    discount: 45,
    rating: 4.7,
    reviewCount: 3201,
    category: 'Development',
    image: '/images/courses/nodejs-backend.jpg',
    tags: ['Node.js', 'Express', 'MongoDB', 'API'],
    isPopular: true,
    studentsEnrolled: 12300
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX Design Masterclass',
    description: 'Create stunning user interfaces and exceptional user experiences.',
    instructor: 'Emma Wilson',
    duration: '15 hours',
    level: 'Beginner',
    price: 79.99,
    originalPrice: 129.99,
    discount: 38,
    rating: 4.8,
    reviewCount: 1876,
    category: 'Design',
    image: '/images/courses/ui-ux-design.jpg',
    tags: ['UI', 'UX', 'Figma', 'Design'],
    studentsEnrolled: 9640
  },
  {
    id: 'python-data-science',
    title: 'Python for Data Science',
    description: 'Learn Python programming for data analysis, visualization, and machine learning.',
    instructor: 'Dr. Lisa Park',
    duration: '25 hours',
    level: 'Intermediate',
    price: 149.99,
    originalPrice: 249.99,
    discount: 40,
    rating: 4.9,
    reviewCount: 4562,
    category: 'Data Science',
    image: '/images/courses/python-data-science.jpg',
    tags: ['Python', 'Data Science', 'ML', 'Analytics'],
    isPopular: true,
    studentsEnrolled: 18750
  },
  {
    id: 'digital-marketing',
    title: 'Complete Digital Marketing',
    description: 'Master SEO, social media marketing, PPC, and content marketing strategies.',
    instructor: 'Robert Taylor',
    duration: '22 hours',
    level: 'Beginner',
    price: 89.99,
    originalPrice: 159.99,
    discount: 44,
    rating: 4.6,
    reviewCount: 2834,
    category: 'Marketing',
    image: '/images/courses/digital-marketing.jpg',
    tags: ['SEO', 'Social Media', 'PPC', 'Content'],
    studentsEnrolled: 11230
  }
]

export async function GET(request: NextRequest) {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 900))
    
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 12
    const level = searchParams.get('level')
    const popular = searchParams.get('popular') === 'true'
    const newest = searchParams.get('new') === 'true'
    
    let filteredCourses = courses
    
    // Filter by category
    if (category && category !== 'all') {
      filteredCourses = filteredCourses.filter(
        course => course.category.toLowerCase() === category.toLowerCase()
      )
    }
    
    // Filter by level
    if (level) {
      filteredCourses = filteredCourses.filter(
        course => course.level.toLowerCase() === level.toLowerCase()
      )
    }
    
    // Filter by popular
    if (popular) {
      filteredCourses = filteredCourses.filter(course => course.isPopular)
    }
    
    // Filter by newest
    if (newest) {
      filteredCourses = filteredCourses.filter(course => course.isNew)
    }
    
    // Sort by rating and enrollment
    filteredCourses = filteredCourses.sort((a, b) => {
      if (b.rating !== a.rating) return b.rating - a.rating
      return b.studentsEnrolled - a.studentsEnrolled
    })
    
    const response = filteredCourses.slice(0, limit)
    
    return NextResponse.json({
      success: true,
      data: response,
      total: filteredCourses.length,
      categories: Array.from(new Set(courses.map(c => c.category))),
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch courses' },
      { status: 500 }
    )
  }
}