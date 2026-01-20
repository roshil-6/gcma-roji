import type { Metadata } from 'next'
import './globals.css'
import ThemeToggle from '@/components/ThemeToggle'

export const metadata: Metadata = {
  title: 'GCMA & Social Welfare - Justice, Protection & Empowerment',
  description: 'A secure platform for immigration fraud complaints, humanitarian aid, and social welfare programs.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased theme-light">
        <ThemeToggle />
        {children}
      </body>
    </html>
  )
}
