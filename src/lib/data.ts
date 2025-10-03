import { Course, Category, Testimonial, FAQ } from '@/types'

export const sampleCourses: Course[] = [
  {
    id: '1',
    title: 'Web Development - Basics',
    subtitle: 'Learn HTML, CSS, and JavaScript fundamentals',
    description: 'Master the fundamentals of web development with this comprehensive course covering HTML, CSS, and JavaScript. Perfect for beginners looking to start their coding journey.',
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=225&fit=crop',
    instructor: {
      id: 'inst1',
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b6934284?w=80&h=80&fit=crop&crop=face',
      bio: 'Senior Full Stack Developer with 8+ years of experience',
      rating: 4.8,
      students: 25000,
      courses: 12,
      expertise: ['JavaScript', 'React', 'Node.js']
    },
    rating: 4.7,
    reviewCount: 2847,
    studentCount: 15420,
    price: 79.99,
    originalPrice: 129.99,
    duration: '12h 30min',
    level: 'Beginner',
    language: 'English',
    lastUpdated: '2024-01-15',
    category: 'Development',
    badges: [{ text: 'Bestseller', variant: 'bestseller' }],
    learningOutcomes: [
      'Build responsive websites from scratch',
      'Understand HTML5 semantic elements',
      'Style websites with modern CSS techniques',
      'Add interactivity with JavaScript',
      'Deploy websites to the web',
      'Follow web development best practices'
    ],
    curriculum: [
      {
        id: 'section1',
        title: 'Getting Started with HTML',
        duration: '2h 15min',
        lessons: [
          { 
            id: 'lesson1', 
            title: 'Introduction to HTML', 
            duration: '15min', 
            type: 'video', 
            isPreview: true,
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            description: 'Learn the basics of HTML and why it\'s the foundation of web development.'
          },
          { 
            id: 'lesson2', 
            title: 'HTML Document Structure', 
            duration: '20min', 
            type: 'video',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
            description: 'Understand the basic structure of an HTML document including DOCTYPE, head, and body.'
          },
          { 
            id: 'lesson3', 
            title: 'Working with Text Elements', 
            duration: '25min', 
            type: 'video',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
            description: 'Learn about headings, paragraphs, and other text formatting elements.'
          }
        ]
      },
      {
        id: 'section2',
        title: 'CSS Fundamentals',
        duration: '3h 30min',
        lessons: [
          { 
            id: 'lesson4', 
            title: 'Introduction to CSS', 
            duration: '18min', 
            type: 'video',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
            description: 'Discover how CSS works and how to style HTML elements.'
          },
          { 
            id: 'lesson5', 
            title: 'CSS Selectors', 
            duration: '22min', 
            type: 'video',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
            description: 'Master different CSS selectors and their specificity.'
          },
          { 
            id: 'lesson6', 
            title: 'Layout with Flexbox', 
            duration: '35min', 
            type: 'video',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
            description: 'Learn modern CSS layout techniques using Flexbox.'
          }
        ]
      },
      {
        id: 'section3',
        title: 'JavaScript Basics',
        duration: '4h 20min',
        lessons: [
          { 
            id: 'lesson7', 
            title: 'Variables and Data Types', 
            duration: '28min', 
            type: 'video',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
            description: 'Understand JavaScript variables, data types, and operators.'
          },
          { 
            id: 'lesson8', 
            title: 'Functions and Scope', 
            duration: '32min', 
            type: 'video',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
            description: 'Learn how to create and use functions in JavaScript.'
          },
          { 
            id: 'lesson9', 
            title: 'DOM Manipulation', 
            duration: '45min', 
            type: 'video',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Subaru.mp4',
            description: 'Manipulate web page elements using JavaScript DOM API.'
          }
        ]
      }
    ],
    requirements: ['No prior coding experience needed', 'Computer with internet connection'],
    tags: ['HTML', 'CSS', 'JavaScript', 'Web Development', 'Frontend']
  },
  {
    id: '2',
    title: 'Graphic Design for Beginners',
    subtitle: 'Master design principles and tools',
    description: 'Learn the fundamentals of graphic design including color theory, typography, and composition using industry-standard tools.',
    thumbnail: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=400&h=225&fit=crop',
    instructor: {
      id: 'inst2',
      name: 'Michael Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
      bio: 'Creative Director with 10+ years in design',
      rating: 4.9,
      students: 18500,
      courses: 8,
      expertise: ['Adobe Creative Suite', 'Branding', 'UI/UX']
    },
    rating: 4.8,
    reviewCount: 1923,
    studentCount: 9876,
    price: 89.99,
    duration: '8h 45min',
    level: 'Beginner',
    language: 'English',
    lastUpdated: '2024-02-20',
    category: 'Design',
    badges: [{ text: 'New', variant: 'new' }],
    learningOutcomes: [
      'Understand design principles',
      'Use Adobe Photoshop professionally',
      'Create stunning visual compositions',
      'Develop a design portfolio',
      'Work with clients effectively'
    ],
    curriculum: [
      {
        id: 'section1',
        title: 'Design Fundamentals',
        duration: '2h 45min',
        lessons: [
          { 
            id: 'lesson1', 
            title: 'Introduction to Design Principles', 
            duration: '20min', 
            type: 'video', 
            isPreview: true,
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
            description: 'Learn the fundamental principles of good design.'
          },
          { 
            id: 'lesson2', 
            title: 'Color Theory Basics', 
            duration: '25min', 
            type: 'video',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4',
            description: 'Understanding color harmony, contrast, and psychology.'
          }
        ]
      }
    ],
    requirements: ['Adobe Creative Suite (trial available)', 'Basic computer skills'],
    tags: ['Graphic Design', 'Photoshop', 'Typography', 'Branding']
  },
  {
    id: '3',
    title: 'Data Analysis with Python',
    subtitle: 'Analyze data and create visualizations',
    description: 'Master data analysis using Python, pandas, and matplotlib. Learn to clean, analyze, and visualize data for business insights.',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=225&fit=crop',
    instructor: {
      id: 'inst3',
      name: 'Dr. Elena Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face',
      bio: 'Data Scientist and PhD in Statistics',
      rating: 4.9,
      students: 22000,
      courses: 15,
      expertise: ['Python', 'Machine Learning', 'Statistics']
    },
    rating: 4.9,
    reviewCount: 3456,
    studentCount: 18945,
    price: 99.99,
    originalPrice: 149.99,
    duration: '16h 20min',
    level: 'Intermediate',
    language: 'English',
    lastUpdated: '2024-01-30',
    category: 'Data Science',
    badges: [{ text: 'Top Rated', variant: 'top-rated' }],
    learningOutcomes: [
      'Clean and prepare data for analysis',
      'Perform statistical analysis',
      'Create compelling data visualizations',
      'Use pandas for data manipulation',
      'Build predictive models'
    ],
    curriculum: [
      {
        id: 'section1',
        title: 'Python for Data Analysis',
        duration: '3h 15min',
        lessons: [
          { 
            id: 'lesson1', 
            title: 'Setting Up Your Environment', 
            duration: '15min', 
            type: 'video', 
            isPreview: true,
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4',
            description: 'Install Python, Jupyter, and essential data science libraries.'
          },
          { 
            id: 'lesson2', 
            title: 'Introduction to Pandas', 
            duration: '30min', 
            type: 'video',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            description: 'Learn the fundamentals of data manipulation with Pandas.'
          }
        ]
      }
    ],
    requirements: ['Basic Python knowledge', 'Statistics fundamentals helpful'],
    tags: ['Python', 'Data Analysis', 'Pandas', 'Matplotlib', 'Statistics']
  },
  {
    id: '4',
    title: 'React Complete Course 2024',
    subtitle: 'Build modern web applications with React',
    description: 'Master React from basics to advanced concepts including hooks, context, and state management.',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=225&fit=crop',
    instructor: {
      id: 'inst4',
      name: 'Alex Thompson',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face',
      bio: 'React Expert and Frontend Architect',
      rating: 4.9,
      students: 32000,
      courses: 6,
      expertise: ['React', 'JavaScript', 'TypeScript', 'Next.js']
    },
    rating: 4.9,
    reviewCount: 4521,
    studentCount: 28340,
    price: 129.99,
    originalPrice: 199.99,
    duration: '24h 15min',
    level: 'Intermediate',
    language: 'English',
    lastUpdated: '2024-03-10',
    category: 'Development',
    badges: [{ text: 'Hot', variant: 'hot' }],
    learningOutcomes: [
      'Build complete React applications',
      'Master React Hooks and Context API',
      'Implement state management with Redux',
      'Create responsive user interfaces',
      'Deploy React applications to production'
    ],
    curriculum: [
      {
        id: 'section1',
        title: 'React Fundamentals',
        duration: '4h 30min',
        lessons: [
          { 
            id: 'lesson1', 
            title: 'What is React?', 
            duration: '18min', 
            type: 'video', 
            isPreview: true,
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
            description: 'Introduction to React and modern frontend development.'
          },
          { 
            id: 'lesson2', 
            title: 'JSX and Components', 
            duration: '25min', 
            type: 'video',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
            description: 'Learn JSX syntax and how to create React components.'
          }
        ]
      }
    ],
    requirements: ['JavaScript ES6+ knowledge', 'HTML and CSS familiarity'],
    tags: ['React', 'JavaScript', 'Frontend', 'Web Development', 'SPA']
  },
  {
    id: '5',
    title: 'UI/UX Design Masterclass',
    subtitle: 'Create stunning user experiences',
    description: 'Learn professional UI/UX design principles, tools, and methodologies used by top companies.',
    thumbnail: 'https://images.unsplash.com/photo-1545665277-5937750a7c38?w=400&h=225&fit=crop',
    instructor: {
      id: 'inst5',
      name: 'Lisa Chen',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop&crop=face',
      bio: 'Senior UX Designer at Google',
      rating: 4.8,
      students: 19500,
      courses: 4,
      expertise: ['UI Design', 'UX Research', 'Figma', 'Prototyping']
    },
    rating: 4.8,
    reviewCount: 2134,
    studentCount: 16789,
    price: 99.99,
    duration: '18h 45min',
    level: 'Beginner',
    language: 'English',
    lastUpdated: '2024-02-28',
    category: 'Design',
    badges: [{ text: 'Bestseller', variant: 'bestseller' }],
    learningOutcomes: [
      'Design user-centered interfaces',
      'Conduct user research and testing',
      'Create wireframes and prototypes',
      'Master design systems and components'
    ],
    curriculum: [
      {
        id: 'section1',
        title: 'UX Research Fundamentals',
        duration: '3h 20min',
        lessons: [
          { 
            id: 'lesson1', 
            title: 'Understanding User Needs', 
            duration: '22min', 
            type: 'video', 
            isPreview: true,
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
            description: 'Learn how to research and understand your users.'
          }
        ]
      }
    ],
    requirements: ['Basic design knowledge helpful', 'Access to Figma (free plan available)'],
    tags: ['UI Design', 'UX Design', 'Figma', 'User Research', 'Prototyping']
  },
  // Additional Development Courses
  {
    id: '11',
    title: 'Node.js & Express Masterclass',
    subtitle: 'Build scalable backend applications with Node.js',
    description: 'Master server-side JavaScript with Node.js and Express framework. Learn to build RESTful APIs, handle databases, and deploy applications.',
    thumbnail: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=225&fit=crop',
    instructor: {
      id: 'inst11',
      name: 'Mark Stevens',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      bio: 'Backend Engineer at top tech companies',
      rating: 4.7,
      students: 89000,
      courses: 15,
      expertise: ['Node.js', 'Express', 'MongoDB']
    },
    rating: 4.9,
    reviewCount: 12890,
    studentCount: 38940,
    price: 94.99,
    originalPrice: 179.99,
    duration: '35h 20min',
    level: 'Intermediate',
    language: 'English',
    lastUpdated: '2024-02-01',
    category: 'development',
    badges: [{ text: 'Hot', variant: 'hot' }],
    learningOutcomes: ['Build REST APIs', 'Database integration', 'Authentication systems'],
    curriculum: [],
    requirements: ['Basic JavaScript knowledge'],
    tags: ['Node.js', 'Express', 'Backend', 'APIs']
  },
  {
    id: '12',
    title: 'React Advanced Concepts',
    subtitle: 'Master advanced React patterns and hooks',
    description: 'Take your React skills to the next level with advanced patterns, custom hooks, performance optimization, and state management.',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=225&fit=crop',
    instructor: {
      id: 'inst12',
      name: 'Alex Rodriguez',
      avatar: 'https://randomuser.me/api/portraits/men/76.jpg',
      bio: 'Senior React Developer and Tech Lead',
      rating: 4.8,
      students: 95000,
      courses: 18,
      expertise: ['React', 'GraphQL', 'TypeScript']
    },
    rating: 4.8,
    reviewCount: 18750,
    studentCount: 52340,
    price: 89.99,
    originalPrice: 169.99,
    duration: '42h 15min',
    level: 'Advanced',
    language: 'English',
    lastUpdated: '2024-01-20',
    category: 'development',
    badges: [{ text: 'New', variant: 'new' }],
    learningOutcomes: ['Advanced React patterns', 'Performance optimization', 'Custom hooks'],
    curriculum: [],
    requirements: ['Intermediate React knowledge'],
    tags: ['React', 'Hooks', 'Performance', 'Advanced']
  },
  // Additional Design Courses  
  {
    id: '21',
    title: 'Graphic Design Fundamentals',
    subtitle: 'Master visual design principles and Adobe Creative Suite',
    description: 'Learn graphic design fundamentals using industry-standard tools like Photoshop and Illustrator.',
    thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=225&fit=crop',
    instructor: {
      id: 'inst21',
      name: 'Sofia Martinez',
      avatar: 'https://randomuser.me/api/portraits/women/52.jpg',
      bio: 'Creative Director with 12 years experience',
      rating: 4.8,
      students: 67000,
      courses: 14,
      expertise: ['Photoshop', 'Illustrator', 'Branding']
    },
    rating: 4.7,
    reviewCount: 9840,
    studentCount: 35670,
    price: 74.99,
    originalPrice: 149.99,
    duration: '28h 45min',
    level: 'Beginner',
    language: 'English',
    lastUpdated: '2024-02-05',
    category: 'design',
    badges: [{ text: 'Bestseller', variant: 'bestseller' }],
    learningOutcomes: ['Design logos and branding', 'Master Adobe tools', 'Typography skills'],
    curriculum: [],
    requirements: ['No prior design experience'],
    tags: ['Graphic Design', 'Photoshop', 'Illustrator', 'Branding']
  },
  // Additional Marketing Courses
  {
    id: '31',
    title: 'Social Media Marketing Mastery',
    subtitle: 'Grow your brand across all social platforms',
    description: 'Master social media marketing across Instagram, TikTok, LinkedIn and more platforms.',
    thumbnail: 'https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=400&h=225&fit=crop',
    instructor: {
      id: 'inst31',
      name: 'Ryan Cooper',
      avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
      bio: 'Social Media Strategist for Fortune 500 companies',
      rating: 4.8,
      students: 89000,
      courses: 12,
      expertise: ['Instagram', 'TikTok', 'LinkedIn Marketing']
    },
    rating: 4.9,
    reviewCount: 15670,
    studentCount: 47890,
    price: 79.99,
    originalPrice: 159.99,
    duration: '32h 10min',
    level: 'Intermediate',
    language: 'English',
    lastUpdated: '2024-02-08',
    category: 'marketing',
    badges: [{ text: 'Bestseller', variant: 'bestseller' }],
    learningOutcomes: ['Content strategy', 'Community building', 'Paid advertising'],
    curriculum: [],
    requirements: ['Basic marketing knowledge'],
    tags: ['Social Media', 'Instagram', 'TikTok', 'Content Strategy']
  },
  // Business Course
  {
    id: '41',
    title: 'Entrepreneurship Fundamentals',
    subtitle: 'Start and grow your own successful business',
    description: 'Learn everything you need to start and scale a successful business from idea to execution.',
    thumbnail: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&h=225&fit=crop',
    instructor: {
      id: 'inst41',
      name: 'Robert Johnson',
      avatar: 'https://randomuser.me/api/portraits/men/42.jpg',
      bio: 'Serial Entrepreneur and Business Coach',
      rating: 4.8,
      students: 78000,
      courses: 16,
      expertise: ['Startups', 'Business Strategy', 'Fundraising']
    },
    rating: 4.7,
    reviewCount: 13450,
    studentCount: 42890,
    price: 89.99,
    originalPrice: 179.99,
    duration: '35h 30min',
    level: 'Beginner',
    language: 'English',
    lastUpdated: '2024-01-22',
    category: 'business',
    badges: [{ text: 'Bestseller', variant: 'bestseller' }],
    learningOutcomes: ['Business planning', 'Market validation', 'Funding strategies'],
    curriculum: [],
    requirements: ['Business idea or passion'],
    tags: ['Entrepreneurship', 'Startups', 'Business Planning']
  }
]

export const categories: Category[] = [
  { id: '1', name: 'Development', icon: '💻', courseCount: 1247, color: '#3B82F6' },
  { id: '2', name: 'Design', icon: '🎨', courseCount: 892, color: '#EF4444' },
  { id: '3', name: 'Business', icon: '💼', courseCount: 743, color: '#10B981' },
  { id: '4', name: 'Marketing', icon: '📈', courseCount: 654, color: '#F59E0B' },
  { id: '5', name: 'Photography', icon: '📷', courseCount: 432, color: '#8B5CF6' },
  { id: '6', name: 'Music', icon: '🎵', courseCount: 321, color: '#EC4899' },
  { id: '7', name: 'Data Science', icon: '📊', courseCount: 567, color: '#06B6D4' },
  { id: '8', name: 'Health & Fitness', icon: '💪', courseCount: 289, color: '#84CC16' },
  { id: '9', name: 'AI & Machine Learning', icon: '🤖', courseCount: 423, color: '#7C3AED' },
  { id: '10', name: 'Mobile Development', icon: '📱', courseCount: 356, color: '#059669' },
  { id: '11', name: 'Cybersecurity', icon: '🔒', courseCount: 198, color: '#DC2626' },
  { id: '12', name: 'Cloud Computing', icon: '☁️', courseCount: 234, color: '#0891B2' },
  { id: '13', name: 'DevOps', icon: '⚙️', courseCount: 167, color: '#EA580C' },
  { id: '14', name: 'Game Development', icon: '🎮', courseCount: 189, color: '#7C2D12' },
  { id: '15', name: 'Finance', icon: '💰', courseCount: 145, color: '#166534' },
  { id: '16', name: 'Languages', icon: '🌍', courseCount: 298, color: '#BE185D' }
]

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Jessica Martinez',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b6934284?w=80&h=80&fit=crop&crop=face',
    role: 'Frontend Developer',
    comment: 'The courses here completely changed my career. The instructors are top-notch and the content is always up-to-date.',
    rating: 5
  },
  {
    id: '2',
    name: 'David Park',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
    role: 'UX Designer',
    comment: 'Amazing platform with high-quality courses. I learned more in 3 months than I did in years of self-study.',
    rating: 5
  },
  {
    id: '3',
    name: 'Sophie Chen',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face',
    role: 'Data Analyst',
    comment: 'The practical approach to learning is what sets this platform apart. Real projects, real results.',
    rating: 5
  }
]

export const faqs: FAQ[] = [
  {
    id: '1',
    question: 'How long do I have access to the course?',
    answer: 'You have lifetime access to all course materials, including future updates and additional content.'
  },
  {
    id: '2',
    question: 'Is there a money-back guarantee?',
    answer: 'Yes, we offer a 30-day money-back guarantee. If you\'re not satisfied, you can get a full refund within 30 days of purchase.'
  },
  {
    id: '3',
    question: 'Do I need any prior experience?',
    answer: 'Most of our beginner courses require no prior experience. Prerequisites are clearly listed on each course page.'
  },
  {
    id: '4',
    question: 'Will I receive a certificate?',
    answer: 'Yes, you\'ll receive a certificate of completion that you can share on LinkedIn and add to your resume.'
  },
  {
    id: '5',
    question: 'Can I download the course materials?',
    answer: 'Yes, most course materials including videos, slides, and resources are available for download for offline learning.'
  }
]