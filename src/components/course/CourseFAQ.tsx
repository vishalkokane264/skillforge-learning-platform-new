import React from 'react'

export default function CourseFAQ() {
  const faqs = [
    {
      question: 'How long do I have access to the course?',
      answer: 'You have lifetime access to all course materials, including future updates.'
    },
    {
      question: 'Is there a money-back guarantee?',
      answer: 'Yes, we offer a 30-day money-back guarantee if you\'re not satisfied.'
    },
    {
      question: 'Do I need any prior experience?',
      answer: 'This course is designed for beginners with no prior coding experience.'
    }
  ]

  return (
    <div>
      <h2 className="text-heading-2 font-bold text-neutral-900 mb-6">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border border-neutral-200 rounded-lg">
            <div className="p-4">
              <h3 className="font-semibold text-neutral-900 mb-2">{faq.question}</h3>
              <p className="text-neutral-700">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}