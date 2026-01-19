import type { Metadata } from 'next'
import './globals.css'

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
      <body className="antialiased">{children}</body>
    </html>
  )
}
