'use client'

import Link from 'next/link'

export default function HomePage() {
  return (
    <div style={{ background: 'var(--background)' }}>
      {/* Hero Section */}
      <section className="hero-bg" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '4rem 1.5rem', position: 'relative', overflow: 'hidden' }}>
        {/* Decorative rings */}
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
          <div style={{ width: '600px', height: '600px', borderRadius: '50%', border: '1px solid rgba(232,96,28,0.08)', position: 'absolute' }} />
          <div style={{ width: '800px', height: '800px', borderRadius: '50%', border: '1px solid rgba(232,96,28,0.05)', position: 'absolute' }} />
          <div style={{ width: '1000px', height: '1000px', borderRadius: '50%', border: '1px solid rgba(232,96,28,0.03)', position: 'absolute' }} />
        </div>

        <div style={{ maxWidth: '800px', position: 'relative' }}>
          <p className="animate-fade-in-up" style={{ letterSpacing: '0.3em', fontSize: '0.75rem', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
            Premium Entertainment & Dining
          </p>
          <h1 className="animate-fade-in-up delay-100" style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', fontWeight: '300', letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: '1.5rem' }}>
            <span className="text-gold-gradient">AFTER 9<br />BAR & KITCHEN</span>
          </h1>
          <p className="animate-fade-in-up delay-200" style={{ fontSize: '1.125rem', color: '#888', maxWidth: '500px', margin: '0 auto 3rem', lineHeight: 1.7 }}>
            Where the night truly begins. Book a private KTV suite or reserve your table for an unforgettable evening.
          </p>

          <div className="animate-fade-in-up delay-300" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/ktv" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.875rem 2rem', borderRadius: '2px',
              background: 'linear-gradient(135deg, var(--gold-dark), var(--gold))',
              color: '#0a0a0a', fontWeight: '600', fontSize: '0.9rem',
              letterSpacing: '0.05em', textDecoration: 'none', textTransform: 'uppercase',
              transition: 'opacity 0.2s'
            }}>
              Book KTV Room
            </Link>
            <Link href="/dining" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.875rem 2rem', borderRadius: '2px',
              border: '1px solid var(--gold)', color: 'var(--gold)',
              fontWeight: '600', fontSize: '0.9rem',
              letterSpacing: '0.05em', textDecoration: 'none', textTransform: 'uppercase',
              transition: 'background 0.2s'
            }}>
              Reserve a Table
            </Link>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section style={{ padding: '5rem 1.5rem', maxWidth: '640px', margin: '0 auto', textAlign: 'center' }}>
        <p style={{ letterSpacing: '0.3em', fontSize: '0.75rem', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: '1rem' }}>
          Experience After 9
        </p>
        <h2 style={{ fontSize: '2rem', fontWeight: '300', marginBottom: '3rem', color: '#ddd' }}>
          See What Awaits You
        </h2>
        <div style={{
          position: 'relative',
          border: '1px solid var(--border)',
          borderRadius: '4px',
          overflow: 'hidden',
          background: 'var(--surface)',
          boxShadow: '0 0 60px rgba(201,168,76,0.06)'
        }}>
          <video
            src="/promo.mp4"
            autoPlay
            muted
            loop
            playsInline
            style={{ width: '100%', display: 'block', maxHeight: '360px', objectFit: 'cover' }}
          />
        </div>
      </section>

      {/* Services Section */}
      <section style={{ padding: '5rem 1.5rem', maxWidth: '1100px', margin: '0 auto' }}>
        <p style={{ textAlign: 'center', letterSpacing: '0.3em', fontSize: '0.75rem', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: '1rem' }}>What We Offer</p>
        <h2 style={{ textAlign: 'center', fontSize: '2rem', fontWeight: '300', marginBottom: '3.5rem', color: '#ddd' }}>An Unrivalled Night Out</h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {/* KTV Card */}
          <Link href="/ktv" style={{ textDecoration: 'none' }}>
            <div style={{
              background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '4px',
              padding: '2.5rem', cursor: 'pointer', transition: 'border-color 0.3s',
              position: 'relative', overflow: 'hidden'
            }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--gold-dark)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
            >
              <div style={{ fontSize: '2.5rem', marginBottom: '1.25rem' }}>🎤</div>
              <h3 style={{ fontSize: '1.375rem', fontWeight: '400', color: 'var(--gold)', marginBottom: '0.75rem' }}>Private KTV Suites</h3>
              <p style={{ color: '#777', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                Three room sizes to suit every group. State-of-the-art sound systems, curated song libraries, and personalised service.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {[
                  { type: 'Small', cap: '8 guests', price: '£30/hr' },
                  { type: 'Medium', cap: '14 guests', price: '£40/hr' },
                  { type: 'Large', cap: '20 guests', price: '£50/hr' },
                ].map(r => (
                  <div key={r.type} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0.75rem', background: 'var(--surface-2)', borderRadius: '2px' }}>
                    <span style={{ color: '#ccc', fontSize: '0.875rem' }}>{r.type} · {r.cap}</span>
                    <span style={{ color: 'var(--gold)', fontSize: '0.875rem', fontWeight: '600' }}>{r.price}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '1.5rem', color: 'var(--gold)', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                Book now →
              </div>
            </div>
          </Link>

          {/* Dining Card */}
          <Link href="/dining" style={{ textDecoration: 'none' }}>
            <div style={{
              background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '4px',
              padding: '2.5rem', cursor: 'pointer', transition: 'border-color 0.3s',
            }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--pink)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
            >
              <div style={{ fontSize: '2.5rem', marginBottom: '1.25rem' }}>🍽️</div>
              <h3 style={{ fontSize: '1.375rem', fontWeight: '400', color: 'var(--pink)', marginBottom: '0.75rem' }}>Dining Reservations</h3>
              <p style={{ color: '#777', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                Indulge in our curated menu crafted for night-time dining. From sharing plates to intimate dinners — every seat is an experience.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {['No deposit required', 'Dietary requirements catered for', 'Available 17:00 – 02:00'].map(f => (
                  <li key={f} style={{ color: '#777', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ color: 'var(--pink)' }}>✓</span> {f}
                  </li>
                ))}
              </ul>
              <div style={{ marginTop: '1.5rem', color: 'var(--pink)', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                Reserve now →
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Info Banner */}
      <section style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '3rem 1.5rem' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', textAlign: 'center' }}>
          {[
            { icon: '🕔', label: 'Opening Hours', value: '17:00 – 02:00' },
            { icon: '📅', label: 'Bookings', value: '1-hour slots' },
            { icon: '💳', label: 'KTV Deposit', value: 'Refundable 48hrs+' },
            { icon: '📧', label: 'Confirmation', value: 'Instant by email' },
          ].map(item => (
            <div key={item.label}>
              <div style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>{item.icon}</div>
              <div style={{ fontSize: '0.75rem', color: '#555', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.25rem' }}>{item.label}</div>
              <div style={{ color: '#ccc', fontWeight: '500' }}>{item.value}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
