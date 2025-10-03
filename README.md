# Learning Platform - E-Learning Website

A modern, lightweight e-learning platform built with Next.js, TypeScript, and Tailwind CSS. Features a clean, accessible design with responsive layouts for desktop, tablet, and mobile devices.

## 🎯 Project Overview

This is a complete e-learning platform similar to Udemy, Skillshare, and Coursera, but with a more compact and modern design approach. The platform includes:

- **Homepage**: Course discovery, categories, testimonials, and more
- **Course Detail Pages**: Comprehensive course information, curriculum, reviews
- **Video Learning Platform**: Full-featured video player with lesson navigation (similar to Udemy)
- **Interactive Course Curriculum**: Clickable lessons that open in new learning interface
- **Progress Tracking**: Mark lessons as complete, track learning progress
- **Responsive Design**: Optimized for desktop (1200-1440px), tablet (768-1024px), and mobile (360-430px)
- **Modern UI/UX**: Card-based design with soft shadows, rounded corners, and subtle micro-interactions

## 🎨 Design System

### Colors

- **Primary**: #0b2fc5 (Brand blue)
- **Text**: #0A0A0A (Primary), #4A5568 (Secondary)
- **Background**: #FFFFFF (Cards), #F7FAFC (Page background)
- **Feedback**: Success #16A34A, Warning #D97706, Error #DC2626

### Typography

- **Font**: Inter (Google Fonts)
- **Sizes**: H1 48/56px, H2 32/40px, H3 24/32px, Body 16/24px, Caption 13/18px

### Components

- **Cards**: 12-16px radius, soft shadows with hover elevation
- **Buttons**: Primary, Secondary, Tertiary variants with 10-12px radius
- **Badges**: Bestseller, New, Top Rated, Hot variants
- **Form Elements**: Large search bars, dropdowns, focus states

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone or download the project**
2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Start development server**:

   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to `http://localhost:3000` (or the port shown in terminal)

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── course/[id]/       # Course detail pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/
│   ├── course/            # Course-specific components
│   ├── layout/            # Layout components (Header, Footer, etc.)
│   └── ui/                # Reusable UI components
├── lib/
│   ├── data.ts            # Sample data
│   └── utils.ts           # Utility functions
└── types/
    └── index.ts           # TypeScript type definitions
```

## 🎨 Features

### Homepage Sections

1. **Header/Navigation** - Logo, search, categories, auth
2. **Hero Section** - Main value proposition with search
3. **Category Teaser** - Top 8 categories with icons
4. **Course Carousels** - Trending, New, Top Rated courses
5. **Trust Strip** - Company logos and stats
6. **How It Works** - 3-step process
7. **Testimonials** - Student reviews
8. **CTA Band** - Sign up call-to-action
9. **Footer** - Links, contact, social media

### Course Detail Page

1. **Course Hero** - Title, description, pricing, preview
2. **Learning Outcomes** - What students will learn
3. **Course Content** - Curriculum with lessons
4. **Instructor Info** - Bio, stats, expertise
5. **Reviews & Ratings** - Student feedback
6. **FAQ Section** - Common questions
7. **Related Courses** - Recommendations

### Responsive Design

- **Desktop**: 12-column grid, 24px gutters
- **Tablet**: 8-column grid, 16px gutters
- **Mobile**: Single column, horizontal carousels

## 🔧 Customization

### Adding New Courses

Edit `src/lib/data.ts` to add course data:

```typescript
export const sampleCourses: Course[] = [
  {
    id: "your-course-id",
    title: "Your Course Title",
    // ... other properties
  },
];
```

### Styling

- Global styles: `src/app/globals.css`
- Tailwind config: `tailwind.config.ts`
- Component styles: Use Tailwind utility classes

### Adding New Pages

Create new files in `src/app/` following Next.js App Router conventions.

## 🎯 Design Principles

1. **Accessibility First** - WCAG AA contrast ratios, keyboard navigation, ARIA labels
2. **Mobile-First** - Responsive design starting from mobile
3. **Performance** - Optimized images, code splitting, fast loading
4. **User Experience** - Clear hierarchy, intuitive navigation, helpful micro-interactions
5. **Modern Visual Identity** - Clean, contemporary design distinct from competitors

## 📦 Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety and better developer experience
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Modern icon library
- **Inter Font** - Professional typography from Google Fonts

## 🎨 Browser Support

- Chrome, Firefox, Safari, Edge (latest versions)
- Mobile Safari, Chrome Mobile
- Responsive breakpoints: 360px, 768px, 1024px, 1200px, 1440px

## 📄 License

MIT License - feel free to use this project for learning or commercial purposes.

---

**Ready to learn without limits?** 🚀 Your modern e-learning platform is ready to go!
