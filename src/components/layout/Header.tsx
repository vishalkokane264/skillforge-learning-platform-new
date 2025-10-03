'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, ShoppingCart, User, Menu, X, BookOpen, Play } from 'lucide-react'
import Button from '@/components/ui/Button'
import SignupModal from '@/components/ui/SignupModal'
import { cn } from '@/lib/utils'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [cartItemCount, setCartItemCount] = useState(0)
  const [userProgress, setUserProgress] = useState({ completed: 12, total: 25 })
  const [isLoggedIn, setIsLoggedIn] = useState(false) // Default to visitor state
  const [showSignupModal, setShowSignupModal] = useState(false)
  const [user, setUser] = useState<{name: string, avatar: string} | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    // Check if user is logged in
    const savedUser = localStorage.getItem('currentUser')
    if (savedUser) {
      const userData = JSON.parse(savedUser)
      setUser(userData)
      setIsLoggedIn(true)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('currentUser')
    localStorage.removeItem('cart')
    setIsLoggedIn(false)
    setUser(null)
    setCartItemCount(0)
    window.location.href = '/'
  }

  useEffect(() => {
    // Load cart count from localStorage
    const updateCartCount = () => {
      const cart = localStorage.getItem('cart')
      if (cart) {
        const cartItems = JSON.parse(cart)
        setCartItemCount(cartItems.length)
      }
    }

    updateCartCount()
    
    // Listen for cart updates
    window.addEventListener('storage', updateCartCount)
    return () => window.removeEventListener('storage', updateCartCount)
  }, [])

  const navigation = [
    { name: 'Categories', href: '/categories' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'For Teams', href: '/teams' },
    { name: 'Support', href: '/support' },
  ]

  return (
    <header
      className={cn(
        'sticky top-0 z-[100] bg-white border-b transition-all duration-200 shadow-sm',
        isScrolled ? 'shadow-md py-2' : 'py-4'
      )}
      style={{ position: 'sticky', top: 0, zIndex: 100 }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white font-bold">
              S
            </div>
            <span className="text-xl font-bold text-neutral-900">SkillForge</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 ml-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-neutral-600 hover:text-primary-600 transition-colors whitespace-nowrap"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-lg mx-6">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                type="text"
                placeholder="Search courses"
                className="w-full pl-10 pr-4 py-2.5 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent text-sm"
              />
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                {/* Course Progress Indicator */}
                <div className="flex items-center space-x-3 px-3 py-2 bg-green-50 rounded-lg">
                  <BookOpen className="w-4 h-4 text-green-600" />
                  <div className="text-sm">
                    <span className="font-medium text-green-900">{userProgress.completed}/{userProgress.total}</span>
                    <span className="text-green-600 ml-1">courses</span>
                  </div>
                  <div className="w-12 h-2 bg-green-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-green-600 transition-all duration-300"
                      style={{ width: `${(userProgress.completed / userProgress.total) * 100}%` }}
                    />
                  </div>
                </div>
                
                {/* User Menu */}
                <div className="flex items-center space-x-4">
                  <Link href="/my-learning" className="flex items-center space-x-2 text-neutral-600 hover:text-primary-600 transition-colors">
                    <Play className="w-4 h-4" />
                    <span>My Learning</span>
                  </Link>
                  
                  {/* User Dropdown */}
                  <div className="relative group">
                    <button className="flex items-center space-x-2 text-neutral-600 hover:text-primary-600 transition-colors">
                      {user?.avatar ? (
                        <img 
                          src={user.avatar} 
                          alt={user.name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-white" />
                        </div>
                      )}
                      <span className="text-sm font-medium">{user?.name || 'User'}</span>
                    </button>
                    
                    {/* Dropdown Menu */}
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[110]">
                      <div className="py-2">
                        <Link href="/profile" className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50">
                          My Profile
                        </Link>
                        <Link href="/my-learning" className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50">
                          My Learning
                        </Link>
                        <Link href="/certificates" className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50">
                          My Certificates
                        </Link>
                        <Link href="/billing" className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50">
                          Billing
                        </Link>
                        <hr className="my-2" />
                        <button 
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                          Sign Out
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link href="/auth/login" className="text-neutral-600 hover:text-primary-600 transition-colors">
                  Log in
                </Link>
                <Button size="md" onClick={() => setShowSignupModal(true)}>Sign up free</Button>
              </>
            )}
            
            {/* Shopping Cart */}
            <Link href="/cart" className="relative p-2 text-neutral-600 hover:text-primary-600 transition-colors">
              <ShoppingCart className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-neutral-600"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden mt-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Search courses"
              className="w-full pl-10 pr-4 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t bg-white">
          <div className="container py-4">
            <nav className="space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block text-neutral-600 hover:text-primary-600 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="border-t pt-4 space-y-4">
                <Link href="/login" className="block text-neutral-600 hover:text-primary-600 transition-colors">
                  Log in
                </Link>
                <Button className="w-full" onClick={() => setShowSignupModal(true)}>Sign up free</Button>
              </div>
            </nav>
          </div>
        </div>
      )}
      
      {/* Signup Modal */}
      <SignupModal 
        isOpen={showSignupModal} 
        onClose={() => setShowSignupModal(false)} 
      />
    </header>
  )
}