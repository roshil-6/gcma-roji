'use client'

import { useState, useEffect, useRef } from 'react'
import ExplanationPanel, { ExplanationBox } from './ExplanationPanel'

export default function BreakTheSilenceSection() {
  const [selectedOption, setSelectedOption] = useState<'student' | 'tutor' | null>(
    null
  )
  const [showExplanation, setShowExplanation] = useState(false)
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

  return (
    <section
      id="break-the-silence"
      ref={sectionRef}
      className="min-h-screen py-12 md:py-16 px-4 relative z-10"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gold-metallic">
            Break the Silence
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            A social initiative focused on improving English communication skills
            through subsided, volunteer-based teaching. Empowering individuals through
            language and confidence.
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
            aria-label="Click to view details about Communication & Confidence"
          >
            <div className="relative h-64 md:h-80">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600&h=900&fit=crop&q=80"
                alt="Break the Silence - English Communication and Learning"
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1600&h=900&fit=crop&q=80'
                }}
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <div className="text-center p-8 relative w-full h-full flex items-center justify-center">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gold-metallic/20 flex items-center justify-center border-2 border-gold-metallic/50 backdrop-blur-sm">
                    <svg className="w-12 h-12 text-gold-metallic" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <h3 className="text-2xl font-bold text-gold-metallic">Communication & Confidence</h3>
                    <ExplanationPanel
                      title="Communication & Confidence"
                      content="This free social initiative helps individuals improve their English communication skills in a supportive environment. Teaching is provided by volunteers as a social service. The focus is on confidence-building, expression, and personal growth."
                      onToggle={setShowExplanation}
                    />
                  </div>
                  <p className="text-gray-300">Free English language learning through volunteer mentorship</p>
                </div>
              </div>
            </div>
          </div>
          {/* Explanation box appears here when clicked */}
          {showExplanation && (
            <ExplanationBox
              title="Communication & Confidence"
              content="This free social initiative helps individuals improve their English communication skills in a supportive environment. Teaching is provided by volunteers as a social service. The focus is on confidence-building, expression, and personal growth."
              onClose={() => setShowExplanation(false)}
            />
          )}
        </div>

        <div className="glass-card rounded-2xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <button
              onClick={() => setSelectedOption('student')}
              className={`relative overflow-hidden rounded-xl border-2 transition-all duration-300 ${
                selectedOption === 'student'
                  ? 'border-gold-metallic bg-gold-metallic/10'
                  : 'border-gold-metallic/30 hover:border-gold-metallic/60'
              }`}
            >
              <div className="relative h-32">
                <img
                  src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1600&h=900&fit=crop&q=80"
                  alt="I Am a Student - English Learning"
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1600&h=900&fit=crop&q=80'
                  }}
                />
                <div className="absolute inset-0 bg-black/40"></div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gold-metallic mb-2">
                  I Am a Student
                </h3>
                <p className="text-gray-300 text-sm">
                  Apply to improve your English speaking skills through our
                  volunteer-based program.
                </p>
              </div>
            </button>

            <button
              onClick={() => setSelectedOption('tutor')}
              className={`relative overflow-hidden rounded-xl border-2 transition-all duration-300 ${
                selectedOption === 'tutor'
                  ? 'border-gold-metallic bg-gold-metallic/10'
                  : 'border-gold-metallic/30 hover:border-gold-metallic/60'
              }`}
            >
              <div className="relative h-32">
                <img
                  src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1600&h=900&fit=crop&q=80"
                  alt="I Am a Tutor - Volunteer Teaching"
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600&h=900&fit=crop&q=80'
                  }}
                />
                <div className="absolute inset-0 bg-black/40"></div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gold-metallic mb-2">
                  I Am a Tutor
                </h3>
                <p className="text-gray-300 text-sm">
                  Volunteer to teach English as a social service. Teaching is
                  completely free.
                </p>
              </div>
            </button>
          </div>

          {selectedOption === 'student' && (
            <StudentForm onClose={() => setSelectedOption(null)} />
          )}

          {selectedOption === 'tutor' && (
            <TutorForm onClose={() => setSelectedOption(null)} />
          )}
        </div>
      </div>
    </section>
  )
}

// API endpoint for BTS Student Form
const BTS_STUDENT_API_ENDPOINT = '/api/submissions/bts-student'

function StudentForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    name: '',
    contactNumber: '',
    learningGoals: '',
  })
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError(null)
    
    try {
      const formDataToSend = new FormData()
      formDataToSend.append('name', formData.name)
      formDataToSend.append('contactNumber', formData.contactNumber)
      formDataToSend.append('learningGoals', formData.learningGoals)
      
      const response = await fetch(BTS_STUDENT_API_ENDPOINT, {
        method: 'POST',
        body: formDataToSend
      })
      
      const data = await response.json()
      
      if (response.ok && data.success) {
        setSubmitSuccess(true)
        setFormData({
          name: '',
          contactNumber: '',
          learningGoals: '',
        })
        
        setTimeout(() => {
          setSubmitSuccess(false)
          onClose()
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
    <div className="mt-6">
      <h3 className="text-xl font-bold text-gold-metallic mb-4">
        Student Application Form
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        {submitSuccess && (
          <div className="bg-gold-metallic/20 border border-gold-metallic/50 rounded-lg p-4 mb-4">
            <p className="text-gold-metallic font-semibold text-center">
              ✓ Application submitted successfully! Thank you for your submission.
            </p>
          </div>
        )}
        <div>
          <label className="block text-sm font-medium text-gold-metallic mb-2">
            Name *
          </label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleInputChange}
            className="form-input"
            placeholder="Enter your full name"
            disabled={isSubmitting || submitSuccess}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gold-metallic mb-2">
            Contact Number *
          </label>
          <input
            type="tel"
            name="contactNumber"
            required
            value={formData.contactNumber}
            onChange={handleInputChange}
            className="form-input"
            placeholder="Enter your contact number"
            disabled={isSubmitting || submitSuccess}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gold-metallic mb-2">
            Learning Goals *
          </label>
          <textarea
            name="learningGoals"
            required
            value={formData.learningGoals}
            onChange={handleInputChange}
            rows={4}
            className="form-input resize-none"
            placeholder="Describe your learning goals and what you hope to achieve"
            disabled={isSubmitting || submitSuccess}
          />
        </div>

        <div className="flex gap-3">
          <button type="submit" className="btn-gold flex-1" disabled={isSubmitting || submitSuccess}>
            {isSubmitting ? 'Submitting...' : submitSuccess ? 'Submitted ✓' : 'Submit Application'}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="btn-gold-outline flex-1"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

// API endpoint for BTS Tutor Form
const BTS_TUTOR_API_ENDPOINT = '/api/submissions/bts-tutor'

function TutorForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    name: '',
    contactNumber: '',
    areaOfExpertise: '',
    availability: '',
  })
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError(null)
    
    try {
      const formDataToSend = new FormData()
      formDataToSend.append('name', formData.name)
      formDataToSend.append('contactNumber', formData.contactNumber)
      formDataToSend.append('areaOfExpertise', formData.areaOfExpertise)
      formDataToSend.append('availability', formData.availability)
      
      const response = await fetch(BTS_TUTOR_API_ENDPOINT, {
        method: 'POST',
        body: formDataToSend
      })
      
      const data = await response.json()
      
      if (response.ok && data.success) {
        setSubmitSuccess(true)
        setFormData({
          name: '',
          contactNumber: '',
          areaOfExpertise: '',
          availability: '',
        })
        
        setTimeout(() => {
          setSubmitSuccess(false)
          onClose()
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
    <div className="mt-6">
      <div className="bg-gold-metallic/10 border border-gold-metallic/30 rounded-lg p-4 mb-6">
        <p className="text-gold-metallic font-semibold text-center">
          ⚠️ Important: Teaching is carried out as a voluntary social service, with our educators contributing their time and knowledge without compensation to support community development.
        </p>
      </div>

      <h3 className="text-xl font-bold text-gold-metallic mb-4">
        Tutor Application Form
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        {submitSuccess && (
          <div className="bg-gold-metallic/20 border border-gold-metallic/50 rounded-lg p-4 mb-4">
            <p className="text-gold-metallic font-semibold text-center">
              ✓ Application submitted successfully! Thank you for your submission.
            </p>
          </div>
        )}
        <div>
          <label className="block text-sm font-medium text-gold-metallic mb-2">
            Name *
          </label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleInputChange}
            className="form-input"
            placeholder="Enter your full name"
            disabled={isSubmitting || submitSuccess}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gold-metallic mb-2">
            Contact Number *
          </label>
          <input
            type="tel"
            name="contactNumber"
            required
            value={formData.contactNumber}
            onChange={handleInputChange}
            className="form-input"
            placeholder="Enter your contact number"
            disabled={isSubmitting || submitSuccess}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gold-metallic mb-2">
            Area of Expertise *
          </label>
          <input
            type="text"
            name="areaOfExpertise"
            required
            value={formData.areaOfExpertise}
            onChange={handleInputChange}
            className="form-input"
            placeholder="e.g., Business English, Conversational English, Academic Writing"
            disabled={isSubmitting || submitSuccess}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gold-metallic mb-2">
            Availability *
          </label>
          <textarea
            name="availability"
            required
            value={formData.availability}
            onChange={handleInputChange}
            rows={3}
            className="form-input resize-none"
            placeholder="Describe your availability (e.g., Weekdays 6-8 PM, Weekends)"
            disabled={isSubmitting || submitSuccess}
          />
        </div>

        <div className="flex gap-3">
          <button type="submit" className="btn-gold flex-1" disabled={isSubmitting || submitSuccess}>
            {isSubmitting ? 'Submitting...' : submitSuccess ? 'Submitted ✓' : 'Submit Application'}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="btn-gold-outline flex-1"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
