import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'SkillForge - Forge Your Future Through Learning',
  description: 'Master new skills with SkillForge - the modern e-learning platform. Access unlimited courses, learn from experts, and accelerate your career growth.',
  keywords: ['e-learning', 'online courses', 'education', 'skills', 'learning', 'skillforge'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}