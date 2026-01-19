'use client'

import { useState, useEffect, useRef } from 'react'
import ExplanationPanel, { ExplanationBox } from './ExplanationPanel'

export default function CoreServicesSection() {
  const [showService1, setShowService1] = useState(false)
  const [showService2, setShowService2] = useState(false)
  const [showService3, setShowService3] = useState(false)
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
      id="core-services"
      ref={sectionRef}
      className="py-12 md:py-16 px-4 relative z-10"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-gold-metallic mb-12 text-center">
          Core Services
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Service 1: Inquiry */}
          <div 
            className="glass-card rounded-2xl p-8 hover:border-gold-metallic/60 transition-all duration-300 cursor-pointer"
            onClick={() => setShowService1(!showService1)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                setShowService1(!showService1)
              }
            }}
            role="button"
            tabIndex={0}
            aria-label="Click to view details about Inquiry – Genuine Migration Pathway"
          >
            <div className="mb-6">
              <div className="w-16 h-16 rounded-full bg-gold-metallic/20 flex items-center justify-center border-2 border-gold-metallic/50 mb-4">
                <svg className="w-8 h-8 text-gold-metallic" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="flex items-center gap-2 mb-3">
                <h3 className="text-xl md:text-2xl font-bold text-gold-metallic">
                  Inquiry – Genuine Migration Pathway
                </h3>
                <ExplanationPanel
                  title="Inquiry – Genuine Migration Pathway"
                  content="This service helps users understand ethical, lawful, and genuine migration options without false promises. We provide accurate information about legal migration pathways, requirements, and processes, ensuring transparency and preventing exploitation."
                  onToggle={setShowService1}
                />
              </div>
              <p className="text-gray-300">
                Help users understand ethical, lawful, and genuine migration options 
                without false promises.
              </p>
            </div>
            {showService1 && (
              <ExplanationBox
                title="Inquiry – Genuine Migration Pathway"
                content="This service helps users understand ethical, lawful, and genuine migration options without false promises. We provide accurate information about legal migration pathways, requirements, and processes, ensuring transparency and preventing exploitation."
                onClose={() => setShowService1(false)}
              />
            )}
            <button 
              className="btn-gold-outline w-full mt-6"
              onClick={(e) => {
                e.stopPropagation()
                // Navigate to service or open form
              }}
            >
              Learn More
            </button>
          </div>

          {/* Service 2: Report Scam */}
          <div 
            className="glass-card rounded-2xl p-8 hover:border-gold-metallic/60 transition-all duration-300 cursor-pointer"
            onClick={() => setShowService2(!showService2)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                setShowService2(!showService2)
              }
            }}
            role="button"
            tabIndex={0}
            aria-label="Click to view details about Report a Migration Scam"
          >
            <div className="mb-6">
              <div className="w-16 h-16 rounded-full bg-gold-metallic/20 flex items-center justify-center border-2 border-gold-metallic/50 mb-4">
                <svg className="w-8 h-8 text-gold-metallic" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="flex items-center gap-2 mb-3">
                <h3 className="text-xl md:text-2xl font-bold text-gold-metallic">
                  Report a Migration Scam
                </h3>
                <ExplanationPanel
                  title="Report a Migration Scam or Unethical Activity"
                  content="Secure platform to report immigration fraud or unethical practices. Information is confidential and used only for legal and investigative purposes. Your report helps protect others and contributes to holding fraudulent actors accountable."
                  onToggle={setShowService2}
                />
              </div>
              <p className="text-gray-300">
                Secure platform to report immigration fraud or unethical practices.
              </p>
            </div>
            {showService2 && (
              <ExplanationBox
                title="Report a Migration Scam or Unethical Activity"
                content="Secure platform to report immigration fraud or unethical practices. Information is confidential and used only for legal and investigative purposes. Your report helps protect others and contributes to holding fraudulent actors accountable."
                onClose={() => setShowService2(false)}
              />
            )}
            <button 
              className="btn-gold-outline w-full mt-6"
              onClick={(e) => {
                e.stopPropagation()
                // Scroll to report form
                const formSection = document.getElementById('migration-scam-form')
                if (formSection) {
                  formSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }
              }}
            >
              Report Now
            </button>
          </div>

          {/* Service 3: Legal Advisory */}
          <div 
            className="glass-card rounded-2xl p-8 hover:border-gold-metallic/60 transition-all duration-300 cursor-pointer"
            onClick={() => setShowService3(!showService3)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                setShowService3(!showService3)
              }
            }}
            role="button"
            tabIndex={0}
            aria-label="Click to view details about Chat with Our Legal Advisory"
          >
            <div className="mb-6">
              <div className="w-16 h-16 rounded-full bg-gold-metallic/20 flex items-center justify-center border-2 border-gold-metallic/50 mb-4">
                <svg className="w-8 h-8 text-gold-metallic" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div className="flex items-center gap-2 mb-3">
                <h3 className="text-xl md:text-2xl font-bold text-gold-metallic">
                  Chat with Our Legal Advisory
                </h3>
                <ExplanationPanel
                  title="Chat with Our Legal Advisory"
                  content="Allow users to communicate with legal advisors for guidance, clarity, and responsible support. Our legal team provides accurate information, helps clarify migration-related questions, and offers guidance on legal pathways and rights."
                  onToggle={setShowService3}
                />
              </div>
              <p className="text-gray-300">
                Communicate with legal advisors for guidance, clarity, and responsible support.
              </p>
            </div>
            {showService3 && (
              <ExplanationBox
                title="Chat with Our Legal Advisory"
                content="Allow users to communicate with legal advisors for guidance, clarity, and responsible support. Our legal team provides accurate information, helps clarify migration-related questions, and offers guidance on legal pathways and rights."
                onClose={() => setShowService3(false)}
              />
            )}
            <button 
              className="btn-gold-outline w-full mt-6"
              onClick={(e) => {
                e.stopPropagation()
                // Open chat interface or contact form
              }}
            >
              Start Chat
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
