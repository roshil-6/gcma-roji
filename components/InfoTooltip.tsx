'use client'

import { useState, useRef, useEffect } from 'react'

interface InfoTooltipProps {
  content: string
  position?: 'top' | 'bottom' | 'left' | 'right'
}

export default function InfoTooltip({ content, position = 'bottom' }: InfoTooltipProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    // Detect mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    // Close tooltip when clicking outside
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        tooltipRef.current &&
        triggerRef.current &&
        !tooltipRef.current.contains(event.target as Node) &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsVisible(false)
      }
    }

    if (isVisible && isMobile) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('touchstart', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [isVisible, isMobile])

  const handleMouseEnter = () => {
    if (!isMobile) {
      setIsVisible(true)
    }
  }

  const handleMouseLeave = () => {
    if (!isMobile) {
      setIsVisible(false)
    }
  }

  const handleClick = () => {
    if (isMobile) {
      setIsVisible(!isVisible)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setIsVisible(!isVisible)
    } else if (e.key === 'Escape') {
      setIsVisible(false)
    }
  }

  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  }

  const arrowClasses = {
    top: 'top-full left-1/2 -translate-x-1/2 border-t-gold-metallic border-l-transparent border-r-transparent border-b-transparent',
    bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-gold-metallic border-l-transparent border-r-transparent border-t-transparent',
    left: 'left-full top-1/2 -translate-y-1/2 border-l-gold-metallic border-t-transparent border-b-transparent border-r-transparent',
    right: 'right-full top-1/2 -translate-y-1/2 border-r-gold-metallic border-t-transparent border-b-transparent border-l-transparent',
  }

  return (
    <div className="relative inline-block">
      <button
        ref={triggerRef}
        type="button"
        className="inline-flex items-center justify-center w-5 h-5 rounded-full text-gold-metallic hover:text-gold-bright hover:bg-gold-metallic/10 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gold-metallic focus:ring-offset-2 focus:ring-offset-black"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        aria-label="More information"
        aria-expanded={isVisible}
        aria-describedby={isVisible ? 'tooltip-content' : undefined}
      >
        <svg
          className="w-4 h-4"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isVisible && (
        <div
          ref={tooltipRef}
          id="tooltip-content"
          role="tooltip"
          className={`absolute z-50 ${positionClasses[position]} w-64 sm:w-80 animate-fade-in`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Arrow */}
          <div
            className={`absolute w-0 h-0 border-4 ${arrowClasses[position]}`}
            aria-hidden="true"
          />
          
          {/* Tooltip Content */}
          <div className="glass-card rounded-lg p-4 border border-gold-metallic/50 shadow-lg shadow-gold-metallic/20">
            <p className="text-sm text-gray-200 leading-relaxed">{content}</p>
          </div>
        </div>
      )}
    </div>
  )
}
