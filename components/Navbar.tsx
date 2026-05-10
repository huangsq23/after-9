'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()

  const links = [
    { href: '/ktv', label: 'KTV Booking' },
    { href: '/dining', label: 'Dining' },
  ]

  const menuUrl = 'https://www.instagram.com/p/DIRKYZtIPAs/?img_index=1&igsh=MTQ3dm14dTNyYWZtbA%3D%3D'

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: 'rgba(10,10,10,0.9)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border)',
    }}>
      <nav style={{
        maxWidth: '1100px', margin: '0 auto',
        padding: '0 1.5rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: '64px',
      }}>
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
          <img src="/logo.jpg" alt="After 9" style={{ height: '40px', width: 'auto', filter: 'invert(1)' }}
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; (e.currentTarget.nextSibling as HTMLElement).style.display = 'inline' }}
          />
          <span style={{ fontSize: '1.375rem', letterSpacing: '-0.02em', color: 'var(--gold)', fontWeight: '400', display: 'none' }}>
            After <span style={{ color: 'var(--pink)' }}>9</span>
          </span>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          {links.map(link => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '2px',
                fontSize: '0.875rem',
                textDecoration: 'none',
                letterSpacing: '0.03em',
                color: pathname.startsWith(link.href) ? 'var(--gold)' : '#888',
                borderBottom: pathname.startsWith(link.href) ? '1px solid var(--gold)' : '1px solid transparent',
                transition: 'color 0.2s',
              }}
            >
              {link.label}
            </Link>
          ))}
          <a href={menuUrl} target="_blank" rel="noopener noreferrer"
            style={{ padding: '0.5rem 1rem', borderRadius: '2px', fontSize: '0.875rem', textDecoration: 'none', letterSpacing: '0.03em', color: '#888', borderBottom: '1px solid transparent', transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')}
            onMouseLeave={e => (e.currentTarget.style.color = '#888')}
          >
            Menu
          </a>
          <a href="https://www.instagram.com/after9barncl" target="_blank" rel="noopener noreferrer"
            style={{ padding: '0.5rem 0.75rem', color: '#888', textDecoration: 'none', fontSize: '1.1rem', transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--pink)')}
            onMouseLeave={e => (e.currentTarget.style.color = '#888')}
            title="Instagram"
          >
            IG
          </a>
        </div>
      </nav>
    </header>
  )
}
