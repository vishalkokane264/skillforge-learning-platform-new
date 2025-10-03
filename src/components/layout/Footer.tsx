import React from 'react'
import Link from 'next/link'
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone } from 'lucide-react'

export default function Footer() {
  const footerSections = [
    {
      title: 'Categories',
      links: [
        { name: 'Web Development', href: '/category/web-development' },
        { name: 'Data Science', href: '/category/data-science' },
        { name: 'Design', href: '/category/design' },
        { name: 'Business', href: '/category/business' },
        { name: 'Marketing', href: '/category/marketing' },
      ]
    },
    {
      title: 'Support',
      links: [
        { name: 'Help Center', href: '/help' },
        { name: 'Contact Us', href: '/contact' },
        { name: 'System Status', href: '/status' },
        { name: 'Bug Reports', href: '/bugs' },
        { name: 'Feature Requests', href: '/features' },
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '/about' },
        { name: 'Careers', href: '/careers' },
        { name: 'Blog', href: '/blog' },
        { name: 'Press', href: '/press' },
        { name: 'Investors', href: '/investors' },
      ]
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Service', href: '/terms' },
        { name: 'Cookie Policy', href: '/cookies' },
        { name: 'Accessibility', href: '/accessibility' },
        { name: 'Sitemap', href: '/sitemap' },
      ]
    }
  ]

  return (
    <footer className="bg-neutral-900 text-white">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white font-bold">
                S
              </div>
              <span className="text-xl font-bold">SkillForge</span>
            </Link>
            <p className="text-neutral-300 mb-6 max-w-md">
              Empowering learners worldwide with high-quality, accessible education. 
              Learn new skills, advance your career, and achieve your goals.
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-6 h-6 text-neutral-400 hover:text-white cursor-pointer transition-colors" />
              <Twitter className="w-6 h-6 text-neutral-400 hover:text-white cursor-pointer transition-colors" />
              <Instagram className="w-6 h-6 text-neutral-400 hover:text-white cursor-pointer transition-colors" />
              <Youtube className="w-6 h-6 text-neutral-400 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Links Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-white mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-neutral-300 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-neutral-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-neutral-400 text-sm">
              © 2024 SkillForge. All rights reserved.
            </div>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-neutral-400">
                <Mail className="w-4 h-4" />
                <span className="text-sm">support@skillforge.com</span>
              </div>
              <div className="flex items-center space-x-2 text-neutral-400">
                <Phone className="w-4 h-4" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}