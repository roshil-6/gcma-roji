'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const [bgImage, setBgImage] = useState<string | null>(null)

  useEffect(() => {
    // Use logo_statue.jpeg as background, or try hero-background.jpeg
    const imageNames = [
      '/hero-background.jpeg',
      '/logo_statue.jpeg',
      '/background.jpg',
      '/background.png',
    ]

    const checkImage = (src: string): Promise<boolean> => {
      return new Promise((resolve) => {
        const img = new Image()
        img.onload = () => resolve(true)
        img.onerror = () => resolve(false)
        img.src = src
      })
    }

    const findImage = async () => {
      for (const imgName of imageNames) {
        const exists = await checkImage(imgName)
        if (exists) {
          setBgImage(imgName)
          break
        }
      }
    }

    findImage()
  }, [])

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

    if (heroRef.current) {
      observer.observe(heroRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={heroRef}
      className="min-h-screen flex items-center justify-center relative z-10 px-4 hero-background"
    >
      {/* Background Image with Light Overlay - More transparent to show particles */}
      {bgImage && (
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${bgImage})`,
            zIndex: -1,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.4) opacity(0.5)',
          }}
        >
          {/* Dark Overlay for Text Readability */}
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
      )}
      
      <div className="max-w-6xl mx-auto text-center space-y-6 relative z-10">
        {/* Logo and Heading - Blended together */}
        <div className="mb-8">
          <p className="text-sm md:text-base text-gold-metallic/80 uppercase tracking-[0.2em] mb-8 font-medium">
            A Division of the National Human Rights and Humanitarian Federation (NHRF)
          </p>
          
          <div className="flex flex-col items-center space-y-3">
            {/* Justice Symbol with Stripe Design */}
            <div className="mb-4 relative">
              <svg 
                width="90" 
                height="90" 
                viewBox="0 0 100 100" 
                className="text-gold-metallic mx-auto"
                fill="currentColor"
              >
                <defs>
                  {/* Stripe Pattern */}
                  <pattern id="stripePattern" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
                    <line x1="0" y1="0" x2="8" y2="8" stroke="#c9a961" strokeWidth="0.8" opacity="0.4"/>
                    <line x1="4" y1="0" x2="12" y2="8" stroke="#d4af37" strokeWidth="0.6" opacity="0.3"/>
                  </pattern>
                  
                  {/* Gold Gradient */}
                  <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#c9a961" />
                    <stop offset="50%" stopColor="#d4af37" />
                    <stop offset="100%" stopColor="#c9a961" />
                  </linearGradient>
                  
                  {/* Stripe-filled gradient */}
                  <linearGradient id="stripeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#c9a961" stopOpacity="0.9" />
                    <stop offset="25%" stopColor="#d4af37" stopOpacity="0.95" />
                    <stop offset="50%" stopColor="#c9a961" stopOpacity="0.9" />
                    <stop offset="75%" stopColor="#d4af37" stopOpacity="0.95" />
                    <stop offset="100%" stopColor="#c9a961" stopOpacity="0.9" />
                  </linearGradient>
                </defs>
                
                {/* Background Circle with Stripe Pattern */}
                <circle cx="50" cy="50" r="45" fill="url(#stripePattern)" opacity="0.2"/>
                
                {/* Scales of Justice */}
                {/* Base/Platform */}
                <rect x="30" y="75" width="40" height="5" fill="url(#stripeGradient)" rx="1"/>
                
                {/* Central Pillar with Stripe Effect */}
                <rect x="48" y="30" width="4" height="45" fill="url(#stripeGradient)"/>
                
                {/* Top Beam */}
                <rect x="20" y="30" width="60" height="4" fill="url(#stripeGradient)" rx="1"/>
                
                {/* Left Scale */}
                <ellipse cx="30" cy="45" rx="12" ry="3" fill="url(#stripeGradient)"/>
                <path d="M 30 30 L 30 48" stroke="url(#goldGradient)" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
                <circle cx="30" cy="30" r="2.5" fill="url(#goldGradient)"/>
                
                {/* Right Scale */}
                <ellipse cx="70" cy="45" rx="12" ry="3" fill="url(#stripeGradient)"/>
                <path d="M 70 30 L 70 48" stroke="url(#goldGradient)" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
                <circle cx="70" cy="30" r="2.5" fill="url(#goldGradient)"/>
                
                {/* Connecting Lines */}
                <line x1="30" y1="30" x2="50" y2="30" stroke="url(#goldGradient)" strokeWidth="2" strokeLinecap="round"/>
                <line x1="70" y1="30" x2="50" y2="30" stroke="url(#goldGradient)" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            
            <div className="relative">
              {/* 3 Stripe Design - Decorative element */}
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 flex gap-2">
                <div className="w-12 md:w-16 h-1 bg-gradient-to-r from-transparent via-gold-metallic to-transparent"></div>
                <div className="w-12 md:w-16 h-1 bg-gradient-to-r from-transparent via-gold-bright to-transparent"></div>
                <div className="w-12 md:w-16 h-1 bg-gradient-to-r from-transparent via-gold-metallic to-transparent"></div>
              </div>
              
              <h1 className="text-lg md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-gold-metallic via-gold-bright via-amber-300 to-gold-metallic bg-clip-text text-transparent leading-tight tracking-tight hero-title relative">
                GLOBAL COUNCIL FOR MIGRATION AWARENESS AND SOCIAL WELFARE
              </h1>
              
              {/* 3 Stripe Design - Below text */}
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
                <div className="w-12 md:w-16 h-1 bg-gradient-to-r from-transparent via-gold-metallic to-transparent"></div>
                <div className="w-12 md:w-16 h-1 bg-gradient-to-r from-transparent via-gold-bright to-transparent"></div>
                <div className="w-12 md:w-16 h-1 bg-gradient-to-r from-transparent via-gold-metallic to-transparent"></div>
              </div>
            </div>
            <p className="text-xs md:text-sm text-gold-metallic/90 font-semibold tracking-wider">(GCMA)</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <h2 className="text-xl md:text-3xl lg:text-4xl font-bold text-[#4B2C5E] hero-subtitle drop-shadow-lg">
            "Migration Through the Lens of Human Rights"
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-gray-200 font-light italic tracking-wide hero-tagline">
            Where Every Journey Matters
          </p>
        </div>
        
        <div className="flex justify-center items-center mt-10">
          <Link href="/services" className="btn-gold text-lg px-8 py-4">
            Get Started
          </Link>
        </div>
      </div>
    </section>
  )
}
