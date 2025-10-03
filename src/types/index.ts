export interface Course {
  id: string
  title: string
  subtitle: string
  description: string
  thumbnail: string
  instructor: Instructor
  rating: number
  reviewCount: number
  studentCount: number
  price: number
  originalPrice?: number
  duration: string
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  language: string
  lastUpdated: string
  category: string
  badges: Badge[]
  learningOutcomes: string[]
  curriculum: CourseSection[]
  requirements: string[]
  tags: string[]
}

export interface Instructor {
  id: string
  name: string
  avatar: string
  bio: string
  rating: number
  students: number
  courses: number
  expertise: string[]
}

export interface CourseSection {
  id: string
  title: string
  lessons: Lesson[]
  duration: string
}

export interface Lesson {
  id: string
  title: string
  duration: string
  type: 'video' | 'article' | 'quiz' | 'exercise'
  isPreview?: boolean
  videoUrl?: string
  description?: string
  resources?: LessonResource[]
  completed?: boolean
}

export interface LessonResource {
  id: string
  title: string
  type: 'pdf' | 'zip' | 'link' | 'code'
  url: string
  size?: string
}

export interface Review {
  id: string
  user: {
    name: string
    avatar: string
  }
  rating: number
  comment: string
  date: string
  helpful: number
}

export interface Category {
  id: string
  name: string
  icon: string
  courseCount: number
  color: string
}

export interface Badge {
  text: string
  variant: 'bestseller' | 'new' | 'top-rated' | 'hot'
}

export interface FAQ {
  id: string
  question: string
  answer: string
}

export interface Testimonial {
  id: string
  name: string
  avatar: string
  role: string
  comment: string
  rating: number
}

export interface VideoProgress {
  courseId: string
  lessonId: string
  currentTime: number
  duration: number
  completed: boolean
  watchedAt: Date
}

export interface CourseEnrollment {
  courseId: string
  enrolledAt: Date
  progress: number
  completedLessons: string[]
  currentLesson?: string
  lastAccessedAt: Date
}