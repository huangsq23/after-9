import type { Metadata } from 'next'
import { Playfair_Display, DM_Sans } from 'next/font/google'
import './globals.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '700'],
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  weight: ['400', '500'],
})

export const metadata: Metadata = {
  title: 'After 9 — Bar & Kitchen Newcastle',
  description: 'Premium KTV suites and fine dining in Newcastle Chinatown. Open daily 17:00 – 02:00.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="bg-background text-foreground min-h-screen flex flex-col" style={{ fontFamily: "var(--font-dm-sans, 'DM Sans'), sans-serif" }}>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
