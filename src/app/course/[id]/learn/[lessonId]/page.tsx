'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  CheckCircle,
  Clock,
  FileText,
  Download,
  Menu,
  X
} from 'lucide-react'
import { sampleCourses } from '@/lib/data'
import { Course, Lesson, CourseSection } from '@/types'
import Button from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'

export default function LessonPlayerPage() {
  const params = useParams()
  const router = useRouter()
  const courseId = params?.id as string
  const lessonId = params?.lessonId as string

  const [course, setCourse] = useState<Course | null>(null)
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null)
  const [currentSection, setCurrentSection] = useState<CourseSection | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.8)
  const [muted, setMuted] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [playbackRate, setPlaybackRate] = useState(1)
  const [completedLessons, setCompletedLessons] = useState<string[]>([])

  useEffect(() => {
    // Find course and lesson
    const foundCourse = sampleCourses.find(c => c.id === courseId)
    if (foundCourse) {
      setCourse(foundCourse)
      
      // Find current lesson and section
      for (const section of foundCourse.curriculum) {
        const lesson = section.lessons.find(l => l.id === lessonId)
        if (lesson) {
          setCurrentLesson(lesson)
          setCurrentSection(section)
          break
        }
      }
    }

    // Load completed lessons from localStorage (in real app, this would be from backend)
    const completed = localStorage.getItem(`completed_${courseId}`)
    if (completed) {
      setCompletedLessons(JSON.parse(completed))
    }
  }, [courseId, lessonId])

  const handleProgress = (state: any) => {
    setProgress(state.played)
    setCurrentTime(state.playedSeconds)
  }

  const handleDuration = (duration: number) => {
    setDuration(duration)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleLessonComplete = () => {
    if (currentLesson && !completedLessons.includes(currentLesson.id)) {
      const newCompleted = [...completedLessons, currentLesson.id]
      setCompletedLessons(newCompleted)
      localStorage.setItem(`completed_${courseId}`, JSON.stringify(newCompleted))
    }
  }

  const navigateToLesson = (lessonId: string) => {
    router.push(`/course/${courseId}/learn/${lessonId}`)
  }

  const getNextLesson = () => {
    if (!course || !currentLesson) return null
    
    let found = false
    for (const section of course.curriculum) {
      for (const lesson of section.lessons) {
        if (found) return lesson
        if (lesson.id === currentLesson.id) found = true
      }
    }
    return null
  }

  const getPreviousLesson = () => {
    if (!course || !currentLesson) return null
    
    let previousLesson: Lesson | null = null
    for (const section of course.curriculum) {
      for (const lesson of section.lessons) {
        if (lesson.id === currentLesson.id) return previousLesson
        previousLesson = lesson
      }
    }
    return null
  }

  if (!course || !currentLesson) {
    return (
      <div className="min-h-screen bg-neutral-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  const nextLesson = getNextLesson()
  const previousLesson = getPreviousLesson()

  return (
    <div className="min-h-screen bg-neutral-900 text-white flex">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-96' : 'w-0'} transition-all duration-300 overflow-hidden bg-neutral-800 border-r border-neutral-700`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold truncate">{course.title}</h2>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-neutral-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
            {course.curriculum.map((section) => (
              <div key={section.id}>
                <h3 className="font-medium text-neutral-300 mb-2">{section.title}</h3>
                <div className="space-y-1">
                  {section.lessons.map((lesson) => (
                    <button
                      key={lesson.id}
                      onClick={() => navigateToLesson(lesson.id)}
                      className={`w-full p-3 rounded-lg text-left transition-colors ${
                        lesson.id === currentLesson.id
                          ? 'bg-primary-600 text-white'
                          : 'hover:bg-neutral-700 text-neutral-300'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        {completedLessons.includes(lesson.id) ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : (
                          <div className="w-4 h-4 rounded-full border-2 border-neutral-500" />
                        )}
                        <div className="flex-1">
                          <div className="text-sm font-medium">{lesson.title}</div>
                          <div className="text-xs text-neutral-400 flex items-center space-x-2">
                            <Clock className="w-3 h-3" />
                            <span>{lesson.duration}</span>
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-neutral-700 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-neutral-400 hover:text-white"
            >
              <Menu className="w-6 h-6" />
            </button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => router.push(`/course/${courseId}`)}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back to Course
            </Button>
          </div>
          
          <div className="flex items-center space-x-2">
            {previousLesson && (
              <Button
                variant="tertiary"
                size="sm"
                onClick={() => navigateToLesson(previousLesson.id)}
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Previous
              </Button>
            )}
            {nextLesson && (
              <Button
                variant="primary"
                size="sm"
                onClick={() => navigateToLesson(nextLesson.id)}
              >
                Next
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            )}
          </div>
        </div>

        {/* Video Player */}
        <div className="flex-1 bg-black flex items-center justify-center">
          <div className="w-full max-w-6xl aspect-video">
            <video
              src={currentLesson.videoUrl}
              controls
              className="w-full h-full"
              onTimeUpdate={(e) => {
                const video = e.currentTarget
                setCurrentTime(video.currentTime)
                setProgress(video.currentTime / video.duration)
              }}
              onLoadedMetadata={(e) => {
                setDuration(e.currentTarget.duration)
              }}
              onEnded={handleLessonComplete}
              poster={`/api/placeholder/video/course-poster`}
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>

        {/* Lesson Info */}
        <div className="p-6 bg-neutral-800">
          <div className="max-w-4xl">
            <h1 className="text-2xl font-bold mb-2">{currentLesson.title}</h1>
            <p className="text-neutral-300 mb-4">{currentLesson.description}</p>
            
            <div className="flex items-center space-x-6 text-sm text-neutral-400">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>{currentLesson.duration}</span>
              </div>
              <div className="flex items-center space-x-2">
                <FileText className="w-4 h-4" />
                <span>Lesson {course.curriculum.findIndex(s => s.id === currentSection?.id) + 1}</span>
              </div>
              {currentLesson.resources && (
                <div className="flex items-center space-x-2">
                  <Download className="w-4 h-4" />
                  <span>{currentLesson.resources.length} Resources</span>
                </div>
              )}
            </div>

            {!completedLessons.includes(currentLesson.id) && (
              <Button
                className="mt-4"
                onClick={handleLessonComplete}
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Mark as Complete
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}