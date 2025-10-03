'use client'

import { useState, useRef } from 'react'
import { Download, Award, Calendar, User, BookOpen, Star, Share2 } from 'lucide-react'
import Button from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

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
}

interface CertificateTemplateProps {
  certificate: Certificate
  userName: string
  userAvatar: string
  onDownload?: () => void
}

export default function CertificateTemplate({ 
  certificate, 
  userName, 
  userAvatar,
  onDownload 
}: CertificateTemplateProps) {
  const [isDownloading, setIsDownloading] = useState(false)
  const certificateRef = useRef<HTMLDivElement>(null)

  const downloadCertificate = async () => {
    if (!certificateRef.current) return
    
    setIsDownloading(true)
    
    try {
      // Create canvas from certificate HTML
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false,
        useCORS: true,
        allowTaint: true
      })
      
      // Create PDF
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF('landscape', 'mm', 'a4')
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = pdf.internal.pageSize.getHeight()
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
      pdf.save(`${userName.replace(/\s+/g, '_')}_${certificate.courseTitle.replace(/\s+/g, '_')}_Certificate.pdf`)
      
      if (onDownload) onDownload()
    } catch (error) {
      console.error('Error downloading certificate:', error)
    } finally {
      setIsDownloading(false)
    }
  }

  const shareOnLinkedIn = () => {
    const text = `I just completed "${certificate.courseTitle}" on SkillForge! 🎓 Excited to apply these new skills.`
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(text)}`
    window.open(url, '_blank', 'width=600,height=600')
  }

  return (
    <div className="space-y-6">
      {/* Certificate Preview */}
      <div 
        ref={certificateRef}
        className="relative w-full max-w-4xl mx-auto bg-gradient-to-br from-blue-50 via-white to-purple-50 border-8 border-gradient-to-r from-primary-600 to-purple-600 rounded-lg overflow-hidden shadow-2xl"
        style={{ aspectRatio: '297/210' }} // A4 landscape ratio
      >
        {/* Decorative Border */}
        <div className="absolute inset-2 border-4 border-double border-primary-300 rounded"></div>
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-32 h-32 border-8 border-primary-200 rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 border-6 border-purple-200 rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-4 border-blue-200 rounded-full"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 p-12 h-full flex flex-col justify-between">
          {/* Header */}
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-primary-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                <Award className="w-12 h-12 text-white" />
              </div>
            </div>
            
            <h1 className="text-4xl font-serif font-bold text-primary-800 mb-2">
              Certificate of Completion
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-primary-600 to-purple-600 mx-auto rounded-full"></div>
          </div>

          {/* Main Content */}
          <div className="text-center space-y-6 flex-1 flex flex-col justify-center">
            <div className="space-y-4">
              <p className="text-lg text-neutral-600 font-medium">
                This is to certify that
              </p>
              
              <div className="flex items-center justify-center space-x-4 mb-6">
                <img
                  src={userAvatar}
                  alt={userName}
                  className="w-16 h-16 rounded-full border-4 border-primary-200 shadow-md object-cover"
                />
                <h2 className="text-3xl font-serif font-bold text-neutral-800 border-b-2 border-primary-300 pb-2">
                  {userName}
                </h2>
              </div>
              
              <p className="text-lg text-neutral-600 mb-4">
                has successfully completed the course
              </p>
              
              <h3 className="text-2xl font-bold text-primary-700 mb-4">
                "{certificate.courseTitle}"
              </h3>
              
              <div className="grid grid-cols-3 gap-6 mt-8 mb-6">
                <div className="text-center">
                  <Calendar className="w-6 h-6 text-primary-600 mx-auto mb-2" />
                  <p className="text-sm text-neutral-500">Completion Date</p>
                  <p className="font-semibold text-neutral-800">{certificate.completionDate}</p>
                </div>
                
                <div className="text-center">
                  <BookOpen className="w-6 h-6 text-primary-600 mx-auto mb-2" />
                  <p className="text-sm text-neutral-500">Duration</p>
                  <p className="font-semibold text-neutral-800">{certificate.courseDuration}</p>
                </div>
                
                <div className="text-center">
                  <Star className="w-6 h-6 text-primary-600 mx-auto mb-2" />
                  <p className="text-sm text-neutral-500">Grade</p>
                  <p className="font-semibold text-neutral-800">{certificate.grade}</p>
                </div>
              </div>

              {/* Skills Earned */}
              <div className="mt-6">
                <p className="text-sm text-neutral-500 mb-3">Skills Demonstrated:</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {certificate.skills.map((skill, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Footer with Signatures */}
          <div className="flex justify-between items-end mt-8">
            <div className="text-left">
              <div className="flex items-center space-x-3 mb-2">
                <img
                  src={certificate.instructor.avatar}
                  alt={certificate.instructor.name}
                  className="w-12 h-12 rounded-full border-2 border-neutral-200 object-cover"
                />
                <div>
                  <div className="w-32 border-b-2 border-neutral-300 mb-1"></div>
                  <p className="text-sm font-semibold text-neutral-800">{certificate.instructor.name}</p>
                  <p className="text-xs text-neutral-500">{certificate.instructor.title}</p>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-primary-600 to-purple-600 rounded-full flex items-center justify-center mb-2 mx-auto shadow-lg">
                <span className="text-white font-bold text-xl">SF</span>
              </div>
              <div className="w-32 border-b-2 border-neutral-300 mb-1"></div>
              <p className="text-sm font-semibold text-neutral-800">SkillForge</p>
              <p className="text-xs text-neutral-500">Learning Platform</p>
            </div>
            
            <div className="text-right">
              <p className="text-xs text-neutral-500 mb-4">Certificate ID</p>
              <p className="text-sm font-mono text-neutral-600 border border-neutral-300 px-2 py-1 rounded bg-neutral-50">
                {certificate.certificateNumber}
              </p>
            </div>
          </div>
        </div>

        {/* Congratulations Ribbon */}
        <div className="absolute top-0 right-0 w-32 h-32 overflow-hidden">
          <div className="absolute top-4 right-4 transform rotate-45 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold py-1 px-8 shadow-lg">
            🎉 Congrats!
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button 
          onClick={downloadCertificate}
          disabled={isDownloading}
          className="px-6 py-3"
        >
          {isDownloading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              Generating PDF...
            </>
          ) : (
            <>
              <Download className="w-5 h-5 mr-2" />
              Download Certificate
            </>
          )}
        </Button>
        
        <Button 
          variant="secondary"
          onClick={shareOnLinkedIn}
          className="px-6 py-3"
        >
          <Share2 className="w-5 h-5 mr-2" />
          Share on LinkedIn
        </Button>
      </div>
    </div>
  )
}