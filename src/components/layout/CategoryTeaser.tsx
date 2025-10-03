'use client'

import React from 'react'
import Link from 'next/link'
import { categories } from '@/lib/data'

export default function CategoryTeaser() {
  return (
    <section className="py-16 bg-white">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-4">
            Explore Top Categories
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Discover courses across various fields and start learning from industry experts
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.id}`}
              className="group p-6 text-center hover:bg-neutral-50 rounded-xl transition-all duration-200 hover:shadow-lg"
            >
              <div 
                className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-2xl transition-transform group-hover:scale-110"
                style={{ backgroundColor: `${category.color}20`, color: category.color }}
              >
                {category.icon}
              </div>
              <h3 className="font-semibold text-neutral-900 mb-1 group-hover:text-primary-600 transition-colors">
                {category.name}
              </h3>
              <p className="text-sm text-neutral-500">
                {category.courseCount.toLocaleString()} courses
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}