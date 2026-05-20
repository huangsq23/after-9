'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import logoHorizontal from '../public/logo-horizontal.png'

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
    </svg>
  )
}

const MENU_URL = 'https://www.instagram.com/p/DIRKYZtIPAs/?img_index=1&igsh=MTQ3dm14dTNyYWZtbA%3D%3D'

const navLinks = [
  { href: '/dining', label: 'Table Reservation' },
  { href: '/karaoke', label: 'Karaoke' },
  { href: MENU_URL, label: 'Menu', external: true },
]

export default function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(10,10,10,0.95)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        }}
      >
        <nav className="max-w-6xl mx-auto px-6 flex items-center justify-between" style={{ height: '72px' }}>
          <Link href="/" className="flex items-center">
            <Image
              src={logoHorizontal}
              alt="After 9 Bar & Kitchen"
              style={{ height: '64px', width: 'auto' }}
            />
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link =>
              link.external ? (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-text-muted hover:text-foreground transition-colors duration-200"
                  style={{ letterSpacing: '0.08em' }}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm transition-colors duration-200"
                  style={{
                    letterSpacing: '0.08em',
                    color: pathname.startsWith(link.href) ? 'var(--gold)' : 'var(--text-muted)',
                    borderBottom: pathname.startsWith(link.href) ? '1px solid var(--gold)' : '1px solid transparent',
                    paddingBottom: '2px',
                  }}
                >
                  {link.label}
                </Link>
              )
            )}
            <a
              href="https://www.instagram.com/after9barncl"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-gold transition-colors duration-200"
            >
              <InstagramIcon size={17} />
            </a>
            <Link
              href="/karaoke"
              className="text-sm font-medium uppercase hover:opacity-85 transition-opacity"
              style={{
                padding: '0.5rem 1.25rem',
                background: 'linear-gradient(135deg, var(--gold-dark), var(--gold))',
                color: '#0a0a0a',
                letterSpacing: '0.08em',
                borderRadius: '2px',
              }}
            >
              Book Now
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-foreground p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </header>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-10"
          style={{ background: 'rgba(10,10,10,0.97)' }}
        >
          {navLinks.map(link =>
            link.external ? (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:text-gold transition-colors duration-200 font-display font-light"
                style={{ fontSize: '2rem' }}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="font-display font-light hover:text-gold transition-colors duration-200"
                style={{
                  fontSize: '2rem',
                  color: pathname.startsWith(link.href) ? 'var(--gold)' : 'var(--foreground)',
                }}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            )
          )}
          <a
            href="https://www.instagram.com/after9barncl"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted hover:text-gold transition-colors mt-4"
            onClick={() => setMobileOpen(false)}
          >
            <InstagramIcon size={24} />
          </a>
        </div>
      )}
    </>
  )
}
