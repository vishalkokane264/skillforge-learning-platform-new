import { NextRequest, NextResponse } from 'next/server'

interface RouteParams {
  params: Promise<{ slug: string[] }>
}

// Simple placeholder image generator
export async function GET(request: NextRequest, { params }: RouteParams) {
  const { slug: slugArray } = await params
  const slug = slugArray?.join('/') || 'default'
  
  // Generate a simple colored rectangle as placeholder
  const colors = [
    '#3B82F6', // blue
    '#10B981', // emerald
    '#F59E0B', // amber
    '#EF4444', // red
    '#8B5CF6', // violet
    '#06B6D4', // cyan
  ]
  
  const color = colors[slug.length % colors.length]
  const width = 400
  const height = 250
  
  // Create SVG placeholder
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${color}"/>
      <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="16" fill="white" text-anchor="middle" dominant-baseline="middle">
        ${slug.replace(/-/g, ' ').toUpperCase()}
      </text>
    </svg>
  `
  
  return new NextResponse(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  })
}