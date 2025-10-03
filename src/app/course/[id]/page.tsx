import Header from '@/components/layout/Header'
import CourseHero from '@/components/course/CourseHero'
import CourseContent from '@/components/course/CourseContent'
import CourseInstructor from '@/components/course/CourseInstructor'
import CourseReviews from '@/components/course/CourseReviews'
import CourseFAQ from '@/components/course/CourseFAQ'
import RelatedCourses from '@/components/course/RelatedCourses'
import Footer from '@/components/layout/Footer'

export default async function CourseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <CourseHero courseId={id} />
        <div className="container py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-12">
              <CourseContent />
              <CourseInstructor />
              <CourseReviews />
              <CourseFAQ />
            </div>
          </div>
        </div>
        <RelatedCourses />
      </main>
      <Footer />
    </div>
  )
}