import HexagonBackground from '@/components/HexagonBackground'
import ImmigrationFraudSection from '@/components/ImmigrationFraudSection'
import Link from 'next/link'

export default function ServicesPage() {
  return (
    <main className="relative min-h-screen">
      <HexagonBackground />
      
      {/* Navigation back to home */}
      <nav className="relative z-20 pt-6 px-4">
        <div className="max-w-6xl mx-auto">
          <Link 
            href="/" 
            className="inline-flex items-center text-gold-metallic hover:text-gold-bright transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </nav>

      {/* Immigration Fraud Complaint Portal ONLY */}
      <ImmigrationFraudSection />
    </main>
  )
}
