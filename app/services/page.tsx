import HexagonBackground from '@/components/HexagonBackground'
import ImmigrationFraudSection from '@/components/ImmigrationFraudSection'
import HumanitarianAidSection from '@/components/HumanitarianAidSection'
import BreakTheSilenceSection from '@/components/BreakTheSilenceSection'
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

      <ImmigrationFraudSection />
      <HumanitarianAidSection />
      <BreakTheSilenceSection />
      
      {/* Footer */}
      <footer className="relative z-10 py-12 px-4 border-t border-gold-metallic/20">
        <div className="max-w-6xl mx-auto text-center space-y-4">
          <div className="glass-card rounded-lg p-6 max-w-3xl mx-auto">
            <p className="text-gold-metallic font-semibold mb-2">Legal Disclosure</p>
            <p className="text-sm text-gray-300 leading-relaxed">
              This program of the National Human Rights and Humanitarian Federation (NHRF) 
              is monitored and conducted through Tonio & Senora Migration Law Firm.
            </p>
          </div>
          <p className="text-gray-400 mt-6">
            © {new Date().getFullYear()} Global Council for Migration Awareness and Social Welfare (GCMA)
          </p>
          <p className="text-sm text-gray-500">
            A Division of the National Human Rights and Humanitarian Federation (NHRF)
          </p>
          
          {/* Admin Login Link - Subtle and unobtrusive */}
          <div className="mt-8 pt-4 border-t border-gold-metallic/10">
            <Link 
              href="/admin/login" 
              className="text-xs text-gray-600 hover:text-gold-metallic/70 transition-colors inline-block"
            >
              admin login
            </Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
