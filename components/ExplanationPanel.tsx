'use client'

import { useState } from 'react'

interface ExplanationPanelProps {
  content: string
  title: string
  onToggle?: (isVisible: boolean) => void
}

export default function ExplanationPanel({ content, title, onToggle }: ExplanationPanelProps) {
  const [isVisible, setIsVisible] = useState(false)

  const togglePanel = () => {
    const newState = !isVisible
    setIsVisible(newState)
    if (onToggle) {
      onToggle(newState)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      togglePanel()
    } else if (e.key === 'Escape') {
      setIsVisible(false)
      if (onToggle) {
        onToggle(false)
      }
    }
  }

  return (
    <>
      {/* Info Icon Button */}
      <button
        type="button"
        className="inline-flex items-center justify-center w-6 h-6 rounded-full text-gold-metallic hover:text-gold-bright hover:bg-gold-metallic/20 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gold-metallic focus:ring-offset-2 focus:ring-offset-black ml-2"
        onClick={(e) => {
          e.stopPropagation()
          togglePanel()
        }}
        onKeyDown={handleKeyDown}
        aria-label={`Show details about ${title}`}
        aria-expanded={isVisible}
      >
        <svg
          className="w-5 h-5"
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

      {/* Return visibility state for parent to render box */}
      {isVisible && (
        <div style={{ display: 'none' }} data-explanation-visible="true" />
      )}
    </>
  )
}

// Export a separate component for the explanation box
export function ExplanationBox({ content, title, onClose }: { content: string; title: string; onClose: () => void }) {
  return (
    <div
      className="mt-4 glass-card rounded-xl border border-gold-metallic/50 shadow-lg shadow-gold-metallic/20 p-6 md:p-8 animate-fade-in"
      role="region"
      aria-labelledby="explanation-title"
    >
      <div className="flex justify-between items-start mb-4">
        <h4
          id="explanation-title"
          className="text-xl md:text-2xl font-bold text-gold-metallic"
        >
          {title}
        </h4>
        <button
          onClick={onClose}
          className="text-gold-metallic hover:text-gold-bright transition-colors focus:outline-none focus:ring-2 focus:ring-gold-metallic rounded-full p-1"
          aria-label="Close explanation"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <p className="text-base md:text-lg text-gray-200 leading-relaxed">
        {content}
      </p>
    </div>
  )
}
