'use client'

import { useState, useEffect, useRef } from 'react'
import ExplanationPanel, { ExplanationBox } from './ExplanationPanel'

export default function HumanitarianAidSection() {
  const [activeCard, setActiveCard] = useState<'medical' | 'education' | null>(
    null
  )
  const [showMedicalExplanation, setShowMedicalExplanation] = useState(false)
  const [showEducationExplanation, setShowEducationExplanation] = useState(false)
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
      id="social-support"
      ref={sectionRef}
      className="min-h-screen py-12 md:py-16 px-4 relative z-10"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gold-metallic">
            Humanitarian Aid & Welfare Programs
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Supporting communities through verified medical assistance and
            educational empowerment programs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Medical Assistance Card */}
          <div id="medical-assistance" className="glass-card rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-300 scroll-mt-20">
            {/* Image Section */}
            <div 
              className="relative h-48 cursor-pointer"
              onClick={() => setShowMedicalExplanation(!showMedicalExplanation)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  setShowMedicalExplanation(!showMedicalExplanation)
                }
              }}
              role="button"
              tabIndex={0}
              aria-label="Click to view details about Healthcare Support"
            >
              <img
                src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1600&h=900&fit=crop&auto=format&q=80"
                alt="Medical Assistance for the Underprivileged - Hospital Care"
                className="absolute inset-0 w-full h-full object-cover object-center z-0"
                loading="lazy"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=1600&h=900&fit=crop&auto=format&q=80'
                }}
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
                <div className="text-center p-6 w-full flex flex-col items-center justify-center">
                  <div className="w-16 h-16 mb-3 rounded-full bg-gold-metallic/20 flex items-center justify-center border-2 border-gold-metallic/50 backdrop-blur-sm">
                    <svg className="w-8 h-8 text-gold-metallic" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <div className="flex items-center justify-center gap-2 flex-wrap">
                    <h4 className="text-xl md:text-2xl font-bold text-gold-metallic drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8), 0 0 4px rgba(0,0,0,0.5)' }}>Healthcare Support</h4>
                    <ExplanationPanel
                      title="Healthcare Support"
                      content="This program supports financially vulnerable patients who need medical assistance. Applications are reviewed using verified doctor and hospital referrals to ensure responsible and fair support. The focus is on dignity, transparency, and genuine care."
                      onToggle={setShowMedicalExplanation}
                    />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Explanation box for Medical */}
            {showMedicalExplanation && (
              <div className="px-8 pt-4">
                <ExplanationBox
                  title="Healthcare Support"
                  content="This program supports financially vulnerable patients who need medical assistance. Applications are reviewed using verified doctor and hospital referrals to ensure responsible and fair support. The focus is on dignity, transparency, and genuine care."
                  onClose={() => setShowMedicalExplanation(false)}
                />
              </div>
            )}
            
            <div className="p-8">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gold-metallic mb-3">
                  Medical Assistance for the Underprivileged
                </h3>
                <p className="text-gray-300">
                  Support financially vulnerable patients through verified hospital
                  referrals. We connect those in need with appropriate medical
                  care and financial assistance.
                </p>
              </div>

              <button
                onClick={() => setActiveCard(activeCard === 'medical' ? null : 'medical')}
                className="btn-gold-outline w-full"
              >
                {activeCard === 'medical' ? 'Close Form' : 'Apply for Medical Assistance'}
              </button>

              {activeCard === 'medical' && (
                <MedicalForm
                  onClose={() => setActiveCard(null)}
                />
              )}
            </div>
          </div>

          {/* Educational Support Card */}
          <div id="education-support" className="glass-card rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-300 scroll-mt-20">
            {/* Image Section */}
            <div 
              className="relative h-48 cursor-pointer"
              onClick={() => setShowEducationExplanation(!showEducationExplanation)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  setShowEducationExplanation(!showEducationExplanation)
                }
              }}
              role="button"
              tabIndex={0}
              aria-label="Click to view details about Education Empowerment"
            >
              <img
                src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1600&h=900&fit=crop&auto=format&q=80"
                alt="Educational Support for Girl Students - Women Empowerment"
                className="absolute inset-0 w-full h-full object-cover object-center"
                loading="lazy"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1600&h=900&fit=crop&auto=format&q=80'
                }}
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
                <div className="text-center p-6 w-full flex flex-col items-center justify-center">
                  <div className="w-16 h-16 mb-3 rounded-full bg-gold-metallic/20 flex items-center justify-center border-2 border-gold-metallic/50 backdrop-blur-sm">
                    <svg className="w-8 h-8 text-gold-metallic" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div className="flex items-center justify-center gap-2 flex-wrap">
                    <h4 className="text-xl md:text-2xl font-bold text-gold-metallic drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8), 0 0 4px rgba(0,0,0,0.5)' }}>Education Empowerment</h4>
                    <ExplanationPanel
                      title="Education Empowerment"
                      content="This initiative supports girl students who require educational assistance to continue their studies. Applications help us understand the student's background and needs so support can be provided responsibly and meaningfully. The goal is empowerment through education."
                      onToggle={setShowEducationExplanation}
                    />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Explanation box for Education */}
            {showEducationExplanation && (
              <div className="px-8 pt-4">
                <ExplanationBox
                  title="Education Empowerment"
                  content="This initiative supports girl students who require educational assistance to continue their studies. Applications help us understand the student's background and needs so support can be provided responsibly and meaningfully. The goal is empowerment through education."
                  onClose={() => setShowEducationExplanation(false)}
                />
              </div>
            )}
            
            <div className="p-8">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gold-metallic mb-3">
                  Educational Support for Girl Students
                </h3>
                <p className="text-gray-300">
                  Promote education and empowerment for girls through social
                  welfare initiatives. Supporting the next generation of leaders
                  and change-makers.
                </p>
              </div>

              <button
                onClick={() => setActiveCard(activeCard === 'education' ? null : 'education')}
                className="btn-gold-outline w-full"
              >
                {activeCard === 'education' ? 'Close Form' : 'Apply for Educational Support'}
              </button>

              {activeCard === 'education' && (
                <EducationForm
                  onClose={() => setActiveCard(null)}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// API endpoint for Medical Form
const MEDICAL_API_ENDPOINT = '/api/submissions/medical-assistance'

function MedicalForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    applicantName: '',
    contactNumber: '',
    doctorName: '',
    hospitalName: '',
    caseDescription: '',
    medicalCertificate: null as File | null,
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, medicalCertificate: e.target.files![0] }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError(null)
    
    try {
      const formDataToSend = new FormData()
      formDataToSend.append('applicantName', formData.applicantName)
      formDataToSend.append('contactNumber', formData.contactNumber)
      formDataToSend.append('doctorName', formData.doctorName)
      formDataToSend.append('hospitalName', formData.hospitalName)
      formDataToSend.append('caseDescription', formData.caseDescription)
      if (formData.medicalCertificate) {
        formDataToSend.append('medicalCertificate', formData.medicalCertificate)
      }
      
      const response = await fetch(MEDICAL_API_ENDPOINT, {
        method: 'POST',
        body: formDataToSend
      })
      
      const data = await response.json()
      
      if (response.ok && data.success) {
        setSubmitSuccess(true)
        setFormData({
          applicantName: '',
          contactNumber: '',
          doctorName: '',
          hospitalName: '',
          caseDescription: '',
          medicalCertificate: null,
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
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      {submitSuccess && (
        <div className="bg-gold-metallic/20 border border-gold-metallic/50 rounded-lg p-4 mb-4">
          <p className="text-gold-metallic font-semibold text-center">
            ✓ Application submitted successfully! Thank you for your submission.
          </p>
        </div>
      )}
      <div>
        <label className="block text-sm font-medium text-gold-metallic mb-2">
          Applicant Name *
        </label>
        <input
          type="text"
          name="applicantName"
          required
          value={formData.applicantName}
          onChange={handleInputChange}
          className="form-input"
          placeholder="Enter applicant's full name"
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
          placeholder="Enter contact number"
          disabled={isSubmitting || submitSuccess}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gold-metallic mb-2">
          Referring Doctor's Name *
        </label>
        <input
          type="text"
          name="doctorName"
          required
          value={formData.doctorName}
          onChange={handleInputChange}
          className="form-input"
          placeholder="Enter referring doctor's name"
          disabled={isSubmitting || submitSuccess}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gold-metallic mb-2">
          Referring Hospital Name *
        </label>
        <input
          type="text"
          name="hospitalName"
          required
          value={formData.hospitalName}
          onChange={handleInputChange}
          className="form-input"
          placeholder="Enter hospital name"
          disabled={isSubmitting || submitSuccess}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gold-metallic mb-2">
          Medical Case Description *
        </label>
        <textarea
          name="caseDescription"
          required
          value={formData.caseDescription}
          onChange={handleInputChange}
          rows={4}
          className="form-input resize-none"
          placeholder="Describe the medical condition and required assistance"
          disabled={isSubmitting || submitSuccess}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gold-metallic mb-2">
          Medical Certificate (Optional)
        </label>
        <input
          type="file"
          name="medicalCertificate"
          accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
          onChange={handleFileChange}
          className="form-input file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gold-metallic file:text-black hover:file:bg-gold-bright"
          disabled={isSubmitting || submitSuccess}
        />
        {formData.medicalCertificate && (
          <p className="text-xs text-gray-400 mt-2">
            Selected: {formData.medicalCertificate.name}
          </p>
        )}
        <p className="text-xs text-gray-400 mt-2">
          Accepted formats: PDF, JPG, PNG, DOC, DOCX (Max 10MB)
        </p>
      </div>

      <div className="flex gap-3">
        <button type="submit" className="btn-gold flex-1" disabled={submitSuccess}>
          {submitSuccess ? 'Submitted ✓' : 'Submit Application'}
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
  )
}

// API endpoint for Education Form
const EDUCATION_API_ENDPOINT = '/api/submissions/education-support'

function EducationForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    studentName: '',
    contactNumber: '',
    educationLevel: '',
    schoolName: '',
    supportRequirement: '',
  })
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
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
      formDataToSend.append('studentName', formData.studentName)
      formDataToSend.append('contactNumber', formData.contactNumber)
      formDataToSend.append('educationLevel', formData.educationLevel)
      formDataToSend.append('schoolName', formData.schoolName)
      formDataToSend.append('supportRequirement', formData.supportRequirement)
      
      const response = await fetch(EDUCATION_API_ENDPOINT, {
        method: 'POST',
        body: formDataToSend
      })
      
      const data = await response.json()
      
      if (response.ok && data.success) {
        setSubmitSuccess(true)
        setFormData({
          studentName: '',
          contactNumber: '',
          educationLevel: '',
          schoolName: '',
          supportRequirement: '',
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
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      {submitSuccess && (
        <div className="bg-gold-metallic/20 border border-gold-metallic/50 rounded-lg p-4 mb-4">
          <p className="text-gold-metallic font-semibold text-center">
            ✓ Application submitted successfully! Thank you for your submission.
          </p>
        </div>
      )}
      <div>
        <label className="block text-sm font-medium text-gold-metallic mb-2">
          Student Name *
        </label>
        <input
          type="text"
          name="studentName"
          required
          value={formData.studentName}
          onChange={handleInputChange}
          className="form-input"
          placeholder="Enter student's full name"
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
          placeholder="Enter contact number"
          disabled={isSubmitting || submitSuccess}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gold-metallic mb-2">
          Current Education Level *
        </label>
        <select
          name="educationLevel"
          required
          value={formData.educationLevel}
          onChange={handleInputChange}
          className="form-input appearance-none bg-black/80 text-white cursor-pointer"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23c9a961' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 1rem center',
            paddingRight: '2.5rem'
          }}
          disabled={isSubmitting || submitSuccess}
        >
          <option value="" className="bg-black text-white">Select education level</option>
          <option value="primary" className="bg-black text-white">Primary School</option>
          <option value="secondary" className="bg-black text-white">Secondary School</option>
          <option value="higher-secondary" className="bg-black text-white">Higher Secondary</option>
          <option value="undergraduate" className="bg-black text-white">Undergraduate</option>
          <option value="graduate" className="bg-black text-white">Graduate</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gold-metallic mb-2">
          School / College Name *
        </label>
        <input
          type="text"
          name="schoolName"
          required
          value={formData.schoolName}
          onChange={handleInputChange}
          className="form-input"
          placeholder="Enter school or college name"
          disabled={isSubmitting || submitSuccess}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gold-metallic mb-2">
          Support Requirement Description *
        </label>
        <textarea
          name="supportRequirement"
          required
          value={formData.supportRequirement}
          onChange={handleInputChange}
          rows={4}
          className="form-input resize-none"
          placeholder="Describe the type of educational support needed"
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
  )
}
