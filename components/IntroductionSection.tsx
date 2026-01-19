'use client'

import { useEffect, useRef } from 'react'

export default function IntroductionSection() {
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
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1600&h=900&fit=crop&q=80"
              alt="Human Rights and Migration - Global Community"
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.src = 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1600&h=900&fit=crop&q=80'
              }}
            />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <h2 className="text-3xl md:text-4xl font-bold text-gold-metallic text-center px-4 drop-shadow-lg">
                Introduction
              </h2>
            </div>
          </div>
        </div>
        
        <div className="glass-card rounded-2xl p-8 md:p-12">
          <div className="space-y-6 text-gray-300 leading-relaxed">
            <p className="text-lg">
              The Global Council for Migration Awareness and Social Welfare (GCMA) 
              is a humanitarian and rights-focused body dedicated to protecting and 
              empowering migrants worldwide.
            </p>
            <p>
              GCMA operates under the National Human Rights and Humanitarian Federation (NHRF), 
              and its activities are monitored and conducted through Tonio & Senora Migration 
              Law Firm. Our work is grounded in principles of dignity, fairness, accountability, 
              and the protection of migrants' fundamental rights.
            </p>
            <p>
              We focus on creating awareness, providing support, and advocating for policies 
              that recognize migration as a fundamental human right and a force for positive 
              change in our global community.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
