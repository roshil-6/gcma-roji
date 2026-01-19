'use client'

import { useState, useEffect, useRef } from 'react'

export default function MigrationScamReportForm() {
  const [formData, setFormData] = useState({
    name: '',
    contactNumber: '',
    email: '',
    location: '',
    problemDescription: '',
    comment: '',
  })
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('section-reveal')
          }
        })
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Redirect to Google Form
    const googleFormUrl = process.env.NEXT_PUBLIC_MIGRATION_SCAM_FORM_URL || 'https://forms.google.com/YOUR_MIGRATION_SCAM_FORM_ID'
    window.open(googleFormUrl, '_blank')
  }

  return (
    <section
      id="migration-scam-form"
      ref={sectionRef}
      className="py-12 md:py-16 px-4 relative z-10"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gold-metallic">
            Migration Scam Report Form
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Report immigration fraud or unethical practices. All information is confidential 
            and used solely for legal and investigative purposes.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-8 md:p-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gold-metallic mb-2"
              >
                Your Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label
                htmlFor="contactNumber"
                className="block text-sm font-medium text-gold-metallic mb-2"
              >
                Contact Number (with country code) *
              </label>
              <input
                type="tel"
                id="contactNumber"
                name="contactNumber"
                required
                value={formData.contactNumber}
                onChange={handleInputChange}
                className="form-input"
                placeholder="e.g., +1 234 567 8900"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gold-metallic mb-2"
              >
                Email ID *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Enter your email address"
              />
            </div>

            <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gold-metallic mb-2"
              >
                Location (Organization) *
              </label>
              <input
                type="text"
                id="location"
                name="location"
                required
                value={formData.location}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Enter the location or organization name"
              />
            </div>

            <div>
              <label
                htmlFor="problemDescription"
                className="block text-sm font-medium text-gold-metallic mb-2"
              >
                Problem Description *
              </label>
              <textarea
                id="problemDescription"
                name="problemDescription"
                required
                value={formData.problemDescription}
                onChange={handleInputChange}
                rows={6}
                className="form-input resize-none"
                placeholder="Provide a detailed description of the scam or unethical activity"
              />
            </div>

            <div>
              <label
                htmlFor="comment"
                className="block text-sm font-medium text-gold-metallic mb-2"
              >
                Comment Box
              </label>
              <textarea
                id="comment"
                name="comment"
                value={formData.comment}
                onChange={handleInputChange}
                rows={4}
                className="form-input resize-none"
                placeholder="Any additional comments or information"
              />
            </div>

            <div className="bg-black/30 border border-gold-metallic/30 rounded-lg p-4 text-sm text-gray-300">
              <p className="font-semibold text-gold-metallic mb-2">Confidentiality Notice:</p>
              <p>
                All information provided is strictly confidential and will be used only for 
                legal review, investigation, and public protection purposes. False or misleading 
                information may result in legal consequences.
              </p>
            </div>

            <button type="submit" className="btn-gold w-full">
              Register
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
