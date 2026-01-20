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
      id="about"
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
              The Global Council for Migration Awareness and Social Welfare (GCMA) is a humanitarian and welfare-focused body dedicated to supporting individuals who aspire to migrate by ensuring they are informed, aware, and protected from scams, fraud, and exploitation during the migration process.
            </p>
            <p>
              GCMA authorizes the National Human Rights and Humanitarian Federation (NHRF) to report migration-related scams and fraudulent practices as a community welfare venture. This initiative aims to prevent individuals from falling prey to unethical agents, false promises, and illegal migration pathways while promoting transparency and responsible practices.
            </p>
            <p>
              Our work is grounded in the principles of dignity, fairness, accountability, and public awareness. We focus on education, guidance, and advocacy to help people pursue safe, legal, and informed migration pathways, recognizing migration as a legitimate aspiration and a potential force for positive social and economic development.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
