'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const [bgImage, setBgImage] = useState<string | null>(null)
  const [showServicesMenu, setShowServicesMenu] = useState(false)
  const [showNursingMenu, setShowNursingMenu] = useState(false)

  useEffect(() => {
    // Check for the new hero image with all text details
    const imageNames = [
      '/logo_statue.png', // Primary hero image
      '/lolo_statue.png',
      '/logo_statue.png.png',
      '/new-hero.jpg',
      '/new-hero.png',
      '/new-hero.jpeg',
      '/hero-new.jpg',
      '/hero-new.png',
      '/hero-new.jpeg',
      '/hero-main.jpg',
      '/hero-main.png',
      '/hero-main.jpeg',
      '/main-hero.jpg',
      '/main-hero.png',
      '/main-hero.jpeg',
      '/hero-image.jpg',
      '/hero-image.png',
      '/hero-image.jpeg',
      '/hero.jpg',
      '/hero.png',
      '/hero.jpeg',
      '/hero-background.jpeg',
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

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      ref={heroRef}
      className="min-h-screen h-screen relative z-10 hero-background overflow-hidden"
    >
      {/* Navigation Menu */}
      <nav className="absolute top-4 md:top-6 left-0 right-0 z-30 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-4 md:gap-6">
          {/* Home Tagline */}
          <Link 
            href="/"
            className="text-gold-metallic hover:text-gold-bright font-semibold text-sm md:text-base transition-colors px-4 py-2"
          >
            Home
          </Link>

          {/* About Us Tagline - goes to dedicated About page */}
          <Link
            href="/about"
            className="text-gold-metallic hover:text-gold-bright font-semibold text-sm md:text-base transition-colors px-4 py-2"
          >
            About Us
          </Link>

          {/* Services Tagline with Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowServicesMenu(!showServicesMenu)}
              className="text-gold-metallic hover:text-gold-bright font-semibold text-sm md:text-base transition-colors px-4 py-2 flex items-center gap-2"
            >
              Services
              <svg 
                className={`w-4 h-4 transition-transform ${showServicesMenu ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Services Dropdown Menu */}
            {showServicesMenu && (
              <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-gold-metallic/50 rounded-lg shadow-xl z-40">
                <div className="py-2">
                  <Link
                    href="/services#social-support"
                    onClick={() => setShowServicesMenu(false)}
                    className="block px-4 py-2 text-gold-metallic hover:text-gold-bright hover:bg-gold-metallic/10 transition-colors text-sm font-medium"
                  >
                    Charity Support
                  </Link>
                  <Link
                    href="/services#immigration-fraud"
                    onClick={() => setShowServicesMenu(false)}
                    className="block px-4 py-2 text-gold-metallic hover:text-gold-bright hover:bg-gold-metallic/10 transition-colors text-sm font-medium"
                  >
                    Report Immigration Fraud
                  </Link>
                  <Link
                    href="/services#education-support"
                    onClick={() => setShowServicesMenu(false)}
                    className="block px-4 py-2 text-gold-metallic hover:text-gold-bright hover:bg-gold-metallic/10 transition-colors text-sm font-medium"
                  >
                    Study Abroad Advice
                  </Link>
                  <Link
                    href="/services#migration-advice"
                    onClick={() => setShowServicesMenu(false)}
                    className="block px-4 py-2 text-gold-metallic hover:text-gold-bright hover:bg-gold-metallic/10 transition-colors text-sm font-medium"
                  >
                    Migration Advice
                  </Link>
                  <Link
                    href="/services#visit-visa"
                    onClick={() => setShowServicesMenu(false)}
                    className="block px-4 py-2 text-gold-metallic hover:text-gold-bright hover:bg-gold-metallic/10 transition-colors text-sm font-medium"
                  >
                    Visit Visa
                  </Link>
                  <Link
                    href="/services#travel"
                    onClick={() => setShowServicesMenu(false)}
                    className="block px-4 py-2 text-gold-metallic hover:text-gold-bright hover:bg-gold-metallic/10 transition-colors text-sm font-medium"
                  >
                    Travel
                  </Link>
                  <Link
                    href="/services#english-govt-students"
                    onClick={() => setShowServicesMenu(false)}
                    className="block px-4 py-2 text-gold-metallic hover:text-gold-bright hover:bg-gold-metallic/10 transition-colors text-sm font-medium"
                  >
                    English Speaking Classes - Govt School Students
                  </Link>
                  <Link
                    href="/services#english-private-students"
                    onClick={() => setShowServicesMenu(false)}
                    className="block px-4 py-2 text-gold-metallic hover:text-gold-bright hover:bg-gold-metallic/10 transition-colors text-sm font-medium"
                  >
                    English Speaking Classes - Private School Students
                  </Link>
                  <Link
                    href="/services#english-adults"
                    onClick={() => setShowServicesMenu(false)}
                    className="block px-4 py-2 text-gold-metallic hover:text-gold-bright hover:bg-gold-metallic/10 transition-colors text-sm font-medium"
                  >
                    English Speaking Classes - Adults
                  </Link>
                  <Link
                    href="/services#tutors"
                    onClick={() => setShowServicesMenu(false)}
                    className="block px-4 py-2 text-gold-metallic hover:text-gold-bright hover:bg-gold-metallic/10 transition-colors text-sm font-medium"
                  >
                    Serve society with GCMA - tutors
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Global Nursing Registration Tagline with Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowNursingMenu(!showNursingMenu)}
              className="text-gold-metallic hover:text-gold-bright font-semibold text-sm md:text-base transition-colors px-4 py-2 flex items-center gap-2"
            >
              Global nursing registration
              <svg 
                className={`w-4 h-4 transition-transform ${showNursingMenu ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Global Nursing Registration Dropdown Menu */}
            {showNursingMenu && (
              <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-gold-metallic/50 rounded-lg shadow-xl z-40">
                <div className="py-2">
                  <Link
                    href="/services#nursing-australia"
                    onClick={() => setShowNursingMenu(false)}
                    className="block px-4 py-2 text-gold-metallic hover:text-gold-bright hover:bg-gold-metallic/10 transition-colors text-sm font-medium"
                  >
                    Australia
                  </Link>
                  <Link
                    href="/services#nursing-germany"
                    onClick={() => setShowNursingMenu(false)}
                    className="block px-4 py-2 text-gold-metallic hover:text-gold-bright hover:bg-gold-metallic/10 transition-colors text-sm font-medium"
                  >
                    Germany
                  </Link>
                  <Link
                    href="/services#nursing-ireland"
                    onClick={() => setShowNursingMenu(false)}
                    className="block px-4 py-2 text-gold-metallic hover:text-gold-bright hover:bg-gold-metallic/10 transition-colors text-sm font-medium"
                  >
                    Ireland
                  </Link>
                  <Link
                    href="/services#nursing-malta"
                    onClick={() => setShowNursingMenu(false)}
                    className="block px-4 py-2 text-gold-metallic hover:text-gold-bright hover:bg-gold-metallic/10 transition-colors text-sm font-medium"
                  >
                    Malta
                  </Link>
                  <Link
                    href="/services#nursing-newzealand"
                    onClick={() => setShowNursingMenu(false)}
                    className="block px-4 py-2 text-gold-metallic hover:text-gold-bright hover:bg-gold-metallic/10 transition-colors text-sm font-medium"
                  >
                    New Zealand
                  </Link>
                  <Link
                    href="/services#nursing-canada"
                    onClick={() => setShowNursingMenu(false)}
                    className="block px-4 py-2 text-gold-metallic hover:text-gold-bright hover:bg-gold-metallic/10 transition-colors text-sm font-medium"
                  >
                    Canada
                  </Link>
                  <Link
                    href="/services#nursing-usa"
                    onClick={() => setShowNursingMenu(false)}
                    className="block px-4 py-2 text-gold-metallic hover:text-gold-bright hover:bg-gold-metallic/10 transition-colors text-sm font-medium"
                  >
                    USA
                  </Link>
                  <Link
                    href="/services#nursing-uk"
                    onClick={() => setShowNursingMenu(false)}
                    className="block px-4 py-2 text-gold-metallic hover:text-gold-bright hover:bg-gold-metallic/10 transition-colors text-sm font-medium"
                  >
                    UK
                  </Link>
                  <Link
                    href="/services#nursing-uae"
                    onClick={() => setShowNursingMenu(false)}
                    className="block px-4 py-2 text-gold-metallic hover:text-gold-bright hover:bg-gold-metallic/10 transition-colors text-sm font-medium"
                  >
                    UAE
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Contact Us Tagline */}
          <Link
            href="/contact"
            className="text-gold-metallic hover:text-gold-bright font-semibold text-sm md:text-base transition-colors px-4 py-2"
          >
            Contact Us
          </Link>
        </div>
      </nav>

      {/* Close dropdown when clicking outside */}
      {(showServicesMenu || showNursingMenu) && (
        <div 
          className="fixed inset-0 z-30" 
          onClick={() => {
            setShowServicesMenu(false)
            setShowNursingMenu(false)
          }}
        />
      )}

      {/* Hero Image with all text details */}
      {bgImage ? (
        <div className="absolute inset-0 w-full h-full">
          <img 
            src={bgImage} 
            alt="GCMA Hero" 
            className="w-full h-full object-cover object-center"
          />
          {/* Report Scam Button */}
          <div className="absolute bottom-8 md:bottom-12 left-1/2 transform -translate-x-1/2 z-20">
            <Link href="/services#immigration-fraud" className="btn-gold text-lg px-8 py-4">
              Report scam
            </Link>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-screen">
          <Link href="/services" className="btn-gold text-lg px-8 py-4">
            Get Started
          </Link>
        </div>
      )}
    </section>
  )
}
