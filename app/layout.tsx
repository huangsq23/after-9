import type { Metadata } from 'next'
import { Playfair_Display, DM_Sans, Archivo_Black } from 'next/font/google'
import Script from 'next/script'
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

const archivoblack = Archivo_Black({
  subsets: ['latin'],
  variable: '--font-archivo-black',
  weight: '400',
})

export const metadata: Metadata = {
  title: 'After 9 — Bar & Kitchen Newcastle',
  description: 'Premium Karaoke suites and fine dining in Newcastle Chinatown. Open Mon & Wed–Sun 17:00 – 02:00. Closed Tuesdays.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID

  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable} ${archivoblack.variable}`}>
      <body className="bg-background text-foreground min-h-screen flex flex-col" style={{ fontFamily: "var(--font-dm-sans, 'DM Sans'), sans-serif" }}>
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}');`}
            </Script>
          </>
        )}
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
