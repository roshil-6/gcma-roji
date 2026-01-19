'use client'

import { useEffect, useRef } from 'react'

export default function BeliefStatementSection() {
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
              alt="Migration as a Force for Good - Cultural Diversity"
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.src = 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1600&h=900&fit=crop&q=80'
              }}
            />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <h2 className="text-3xl md:text-4xl font-bold text-gold-metallic text-center px-4 drop-shadow-lg">
                Our Core Philosophy
              </h2>
            </div>
          </div>
        </div>
        
        <div className="glass-card rounded-2xl p-8 md:p-12">
          <div className="space-y-6 text-gray-300 leading-relaxed">
            <p className="text-lg">
              We believe that <span className="text-gold-metallic font-semibold">migration is a force for good</span>. 
              It drives economic growth, cultural exchange, and social progress, enriching 
              communities and nations alike.
            </p>
            <p>
              GCMA works through awareness, education, and advocacy to ensure that migration 
              processes are ethical, transparent, and respectful of human dignity. We recognize 
              that every migrant has a unique story, and every journey deserves to be treated 
              with fairness and compassion.
            </p>
            <p className="text-lg font-medium text-gold-metallic/90">
              Every migrant deserves dignity, fairness, and compassion — regardless of their 
              origin, destination, or circumstances.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
