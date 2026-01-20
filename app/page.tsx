import HexagonBackground from '@/components/HexagonBackground'
import Hero from '@/components/Hero'
import BeliefStatementSection from '@/components/BeliefStatementSection'
import WeListenSection from '@/components/WeListenSection'
import HumanitarianAidSection from '@/components/HumanitarianAidSection'
import BreakTheSilenceSection from '@/components/BreakTheSilenceSection'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <HexagonBackground />
      <Hero />
      <BeliefStatementSection />
      <WeListenSection />
      <HumanitarianAidSection />
      <BreakTheSilenceSection />
      
      {/* Footer with Legal Disclosure */}
      <footer className="relative z-10 py-12 px-4 border-t border-gold-metallic/20">
        <div className="max-w-6xl mx-auto text-center space-y-4">
          <div className="glass-card rounded-lg p-6 max-w-3xl mx-auto">
            <p className="text-gold-metallic font-semibold mb-2">Legal Disclosure</p>
            <p className="text-sm text-gray-300 leading-relaxed">
              GCMA authorizes the National Human Rights and Humanitarian Federation (NHRF) to report migration-related scams and fraudulent practices as a community welfare venture.
            </p>
          </div>
          <p className="text-gray-400 mt-6">
            © {new Date().getFullYear()} Global Council for Migration Awareness and Social Welfare (GCMA)
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
