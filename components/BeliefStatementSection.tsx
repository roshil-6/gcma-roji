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
            <p>
              GCMA believes that meaningful social change begins with access, awareness, and participation. We are committed to creating affordable learning opportunities for government school students to develop English communication skills, empowering them to express their talents with confidence.
            </p>
            <p>
              <span className="text-gold-metallic font-semibold">GCMA provides platforms for both adults and children to actively practice social service</span> by participating in community programs that promote awareness, human ethics, dignity, and fundamental rights. <span className="text-gold-metallic font-semibold">By encouraging involvement in charitable initiatives and awareness-driven activities, we nurture responsible citizens and cultivate a culture of compassion, inclusion, and social responsibility.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
