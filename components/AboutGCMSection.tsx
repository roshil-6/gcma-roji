'use client'

import { useEffect, useRef } from 'react'

export default function AboutGCMSection() {
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
      ref={sectionRef}
      className="py-12 md:py-16 px-4 relative z-10"
    >
      <div className="max-w-4xl mx-auto">
        {/* Image Section */}
        <div className="mb-8 glass-card rounded-2xl overflow-hidden">
          <div className="relative h-64 md:h-96">
            <img
              src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1600&h=900&fit=crop&q=80"
              alt="About GCMA - Humanitarian Organization"
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.src = 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&h=900&fit=crop&q=80'
              }}
            />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <h2 className="text-3xl md:text-4xl font-bold text-gold-metallic text-center px-4 drop-shadow-lg">
                About GCMA
              </h2>
            </div>
          </div>
        </div>
        
        <div className="glass-card rounded-2xl p-8 md:p-12">
          <div className="space-y-6 text-gray-300 leading-relaxed">
            <p>
              The Global Council for Migration Awareness and Social Welfare (GCMA) is a 
              specialized division of the National Human Rights and Humanitarian Federation (NHRF), 
              dedicated to migrant rights and well-being globally.
            </p>
            <p>
              <span className="text-gold-metallic font-semibold">GCMA is not a commercial migration agency.</span> 
              We do not process visa applications or provide migration services for profit. 
              Instead, our focus is on awareness, ethics, and protection.
            </p>
            <p>
              We work to educate migrants about their rights, support those who have been 
              victims of fraud or exploitation, and advocate for policies that protect and 
              empower migrant communities worldwide.
            </p>
            <p>
              Our activities are monitored and conducted through Tonio & Senora Migration 
              Law Firm, ensuring that all our work adheres to the highest legal and ethical 
              standards.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
