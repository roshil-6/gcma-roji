'use client'

import { useState, useEffect, useRef } from 'react'
import ExplanationPanel, { ExplanationBox } from './ExplanationPanel'

// API endpoint for form submission
const API_ENDPOINT = '/api/submissions/immigration-fraud'

export default function ImmigrationFraudSection() {
  const [formData, setFormData] = useState({
    fullName: '',
    contactNumber: '',
    agencyName: '',
    agencyLocation: '',
    description: '',
    evidence: null as File | null,
  })
  const [showForm, setShowForm] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, evidence: e.target.files![0] }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError(null)
    
    try {
      const formDataToSend = new FormData()
      formDataToSend.append('fullName', formData.fullName)
      formDataToSend.append('contactNumber', formData.contactNumber)
      formDataToSend.append('agencyName', formData.agencyName)
      formDataToSend.append('agencyLocation', formData.agencyLocation)
      formDataToSend.append('description', formData.description)
      if (formData.evidence) {
        formDataToSend.append('evidence', formData.evidence)
      }
      
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        body: formDataToSend
      })
      
      const data = await response.json()
      
      if (response.ok && data.success) {
        setSubmitSuccess(true)
        setFormData({
          fullName: '',
          contactNumber: '',
          agencyName: '',
          agencyLocation: '',
          description: '',
          evidence: null,
        })
        
        setTimeout(() => {
          setSubmitSuccess(false)
          setShowForm(false)
        }, 3000)
      } else {
        throw new Error(data.error || 'Submission failed. Please try again.')
      }
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'An error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section
      id="immigration-fraud"
      ref={sectionRef}
      className="min-h-screen py-12 md:py-16 px-4 relative z-10"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gold-metallic">
            Immigration Fraud Complaint Portal
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            A secure platform for victims of fraudulent immigration agencies to
            submit verified complaints. Your information is protected and will
            be used solely for legal and investigative purposes.
          </p>
        </div>

        {/* Image Section */}
        <div className="mb-8">
          <div 
            className="glass-card rounded-2xl overflow-hidden cursor-pointer hover:border-gold-metallic/60 transition-all duration-300"
            onClick={() => setShowExplanation(!showExplanation)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                setShowExplanation(!showExplanation)
              }
            }}
            role="button"
            tabIndex={0}
            aria-label="Click to view details about Legal Protection & Justice"
          >
            <div className="relative h-64 md:h-96">
              <img
                src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1600&h=900&fit=crop&q=80"
                alt="Legal Protection & Justice - Immigration Fraud Complaint"
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1600&h=900&fit=crop&q=80'
                }}
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gold-metallic/20 flex items-center justify-center border-2 border-gold-metallic/50 backdrop-blur-sm">
                    <svg className="w-12 h-12 text-gold-metallic" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <h3 className="text-2xl font-bold text-gold-metallic">Legal Protection & Justice</h3>
                    <ExplanationPanel
                      title="Legal Protection & Justice"
                      content="This section is for people who have been cheated or misled by immigration or visa agencies. It provides a safe and confidential way to submit complaints. All information is protected and used only for legal review, investigation, and public protection. Submitting a complaint also helps prevent others from falling victim to similar scams."
                      onToggle={setShowExplanation}
                    />
                  </div>
                  <p className="text-gray-300">Secure complaint submission for immigration fraud victims</p>
                </div>
              </div>
            </div>
          </div>
          {/* Explanation box appears here when clicked */}
          {showExplanation && (
            <ExplanationBox
              title="Legal Protection & Justice"
              content="This section is for people who have been cheated or misled by immigration or visa agencies. It provides a safe and confidential way to submit complaints. All information is protected and used only for legal review, investigation, and public protection. Submitting a complaint also helps prevent others from falling victim to similar scams."
              onClose={() => setShowExplanation(false)}
            />
          )}
        </div>

        {!showForm ? (
          <div className="glass-card rounded-2xl p-8 md:p-12 text-center">
            <p className="text-gray-300 mb-6 text-lg">
              Report fraudulent immigration agencies and help protect others from scams.
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="btn-gold"
            >
              File a Complaint
            </button>
          </div>
        ) : (
          <div className="glass-card rounded-2xl p-8 md:p-12">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gold-metallic">Complaint Form</h3>
              <button
                onClick={() => setShowForm(false)}
                className="text-gold-metallic hover:text-gold-bright transition-colors"
              >
                ← Back
              </button>
            </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            {submitSuccess && (
              <div className="bg-gold-metallic/20 border border-gold-metallic/50 rounded-lg p-4 mb-4">
                <p className="text-gold-metallic font-semibold text-center">
                  ✓ Complaint submitted successfully! Thank you for your submission.
                </p>
              </div>
            )}
            {submitError && (
              <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 mb-4">
                <p className="text-red-400 font-semibold text-center">
                  {submitError}
                </p>
              </div>
            )}
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gold-metallic mb-2"
              >
                Full Name *
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Enter your full legal name"
                disabled={submitSuccess}
              />
            </div>

            <div>
              <label
                htmlFor="contactNumber"
                className="block text-sm font-medium text-gold-metallic mb-2"
              >
                Contact Number *
              </label>
              <input
                type="tel"
                id="contactNumber"
                name="contactNumber"
                required
                value={formData.contactNumber}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Enter your contact number"
                disabled={submitSuccess}
              />
            </div>

            <div>
              <label
                htmlFor="agencyName"
                className="block text-sm font-medium text-gold-metallic mb-2"
              >
                Name of Immigration Agency *
              </label>
              <input
                type="text"
                id="agencyName"
                name="agencyName"
                required
                value={formData.agencyName}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Enter the name of the fraudulent agency"
                disabled={submitSuccess}
              />
            </div>

            <div>
              <label
                htmlFor="agencyLocation"
                className="block text-sm font-medium text-gold-metallic mb-2"
              >
                Location of Agency *
              </label>
              <input
                type="text"
                id="agencyLocation"
                name="agencyLocation"
                required
                value={formData.agencyLocation}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Enter the location/address of the agency"
                disabled={submitSuccess}
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gold-metallic mb-2"
              >
                Description of the Scam *
              </label>
              <textarea
                id="description"
                name="description"
                required
                value={formData.description}
                onChange={handleInputChange}
                rows={6}
                className="form-input resize-none"
                placeholder="Provide a detailed description of the fraudulent activity, including dates, amounts, and any relevant information"
                disabled={submitSuccess}
              />
            </div>

            <div>
              <label
                htmlFor="evidence"
                className="block text-sm font-medium text-gold-metallic mb-2"
              >
                Proof / Evidence Upload
              </label>
              <input
                type="file"
                id="evidence"
                name="evidence"
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                onChange={handleFileChange}
                className="form-input file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gold-metallic file:text-black hover:file:bg-gold-bright"
                disabled={submitSuccess}
              />
              <p className="text-xs text-gray-400 mt-2">
                Accepted formats: PDF, JPG, PNG, DOC, DOCX (Max 10MB)
              </p>
            </div>

            <div className="bg-black/30 border border-gold-metallic/30 rounded-lg p-4 text-sm text-gray-300">
              <p className="font-semibold text-gold-metallic mb-2">Disclaimer:</p>
              <p>
                By submitting this complaint, you confirm that all information
                provided is accurate and truthful. False or misleading
                information may result in legal consequences. Your personal
                information will be kept confidential and used only for
                investigation and legal purposes.
              </p>
            </div>

            <button type="submit" className="btn-gold w-full" disabled={isSubmitting || submitSuccess}>
              {isSubmitting ? 'Submitting...' : submitSuccess ? 'Submitted ✓' : 'Submit Complaint'}
            </button>
          </form>
          </div>
        )}
      </div>
    </section>
  )
}
