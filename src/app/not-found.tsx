import ComingSoonPage from '@/components/ui/ComingSoonPage'

export default function NotFound() {
  return (
    <ComingSoonPage 
      title="Page Not Found"
      subtitle="This page is under construction"
      description="The page you're looking for doesn't exist yet or has been moved. We're constantly adding new features and pages to enhance your learning experience."
      showNotifyForm={false}
    />
  )
}