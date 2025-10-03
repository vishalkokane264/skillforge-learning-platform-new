import React from 'react'

export default function TrustStrip() {
  const companies = ['Google', 'Microsoft', 'Amazon', 'Netflix', 'Uber', 'Airbnb']
  
  return (
    <section className="py-16 bg-white border-y">
      <div className="container">
        <div className="text-center mb-12">
          <p className="text-neutral-600 mb-8">Trusted by learners at top companies worldwide</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {companies.map((company) => (
              <div key={company} className="text-xl font-bold text-neutral-600">
                {company}
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-primary-600">2M+</div>
            <div className="text-neutral-600">Learners</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary-600">50K+</div>
            <div className="text-neutral-600">Courses</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary-600">500+</div>
            <div className="text-neutral-600">Instructors</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary-600">190+</div>
            <div className="text-neutral-600">Countries</div>
          </div>
        </div>
      </div>
    </section>
  )
}