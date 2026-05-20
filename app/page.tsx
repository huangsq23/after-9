import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Clock, Phone, ChevronDown } from 'lucide-react'
import Marquee from '../components/Marquee'
import FadeIn from '../components/FadeIn'
import VenueCarousel from '../components/VenueCarousel'
import heroLogo from '../public/hero-logo.png'

export default function HomePage() {
  return (
    <div className="bg-background">
      {/* Section 1: Full-Screen Video Hero */}
      <section className="relative overflow-hidden" style={{ height: '100vh' }}>
        <iframe
          src={`https://player.vimeo.com/video/1191686397?autoplay=1&muted=1&loop=1&controls=0&background=1`}
          className="vimeo-bg"
          allow="autoplay; fullscreen"
          title="After 9 atmosphere video"
        />
        {/* Dark gradient overlay */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.55) 50%, rgba(10,10,10,0.88) 100%)',
          }}
        />
        {/* Text overlay */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6">
          <p
            className="text-gold uppercase mb-6"
            style={{ letterSpacing: '0.3em', fontSize: '0.75rem' }}
          >
            Premium Entertainment & Dining
          </p>
          <Image
            src={heroLogo}
            alt="After 9 Bar"
            className="mb-4 h-auto w-64 sm:w-80 md:w-[500px]"
          />
          <p
            className="text-text-muted uppercase mb-5"
            style={{ letterSpacing: '0.2em', fontSize: '0.875rem' }}
          >
            KITCHEN · NEWCASTLE
          </p>
          <p className="text-foreground italic mb-12" style={{ fontSize: '1.125rem' }}>
            Where the night truly begins.
          </p>
          <div className="flex gap-4 flex-wrap justify-center">
            <Link
              href="/dining"
              className="px-8 py-3 text-sm font-semibold uppercase hover:opacity-85 transition-opacity"
              style={{
                background: 'linear-gradient(135deg, var(--gold-dark), var(--gold))',
                color: '#0a0a0a',
                letterSpacing: '0.08em',
                borderRadius: '2px',
              }}
            >
              Reserve a Table
            </Link>
            <Link
              href="/karaoke"
              className="px-8 py-3 text-sm font-semibold uppercase transition-colors duration-200 hover:bg-gold hover:text-background"
              style={{
                border: '1px solid var(--gold)',
                color: 'var(--gold)',
                letterSpacing: '0.08em',
                borderRadius: '2px',
              }}
            >
              Book Karaoke
            </Link>
          </div>
        </div>
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
          <span className="text-text-muted text-xs uppercase" style={{ letterSpacing: '0.2em' }}>
            Scroll
          </span>
          <ChevronDown size={20} className="text-gold chevron-bounce" />
        </div>
      </section>

      {/* Section 2: Welcome */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div>
                <p
                  className="text-gold text-xs uppercase mb-5"
                  style={{ letterSpacing: '0.3em' }}
                >
                  Welcome to After 9
                </p>
                <h2
                  className="font-display font-light text-foreground mb-6 leading-tight"
                  style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
                >
                  An Unforgettable<br />Night Out
                </h2>
                <p className="text-text-muted leading-relaxed mb-4 text-sm">
                  Nestled in the heart of Newcastle's vibrant Chinatown, After 9 is where premium karaoke suites meet fine late-night dining. Whether you're celebrating, socialising, or simply seeking something special — every visit is an occasion.
                </p>
                <p className="text-text-muted leading-relaxed mb-8 text-sm">
                  Open every night from 5PM until 2AM, we offer beautifully appointed private karaoke rooms alongside an expertly crafted dining menu — all under one roof on Stowell Street.
                </p>
              </div>
              <VenueCarousel />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Section 3: Marquee */}
      <Marquee />

      {/* Section 4: Services */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <p
              className="text-center text-gold text-xs uppercase mb-3"
              style={{ letterSpacing: '0.3em' }}
            >
              What We Offer
            </p>
            <h2
              className="font-display font-light text-center text-foreground mb-16"
              style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)' }}
            >
              Two Signature Experiences
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* KTV Card */}
            <FadeIn delay={100}>
              <Link href="/karaoke" className="block group">
                <div
                  className="relative overflow-hidden border border-border hover:border-gold-dark transition-colors duration-300"
                  style={{
                    minHeight: '440px',
                    background: 'linear-gradient(135deg, #0d0d0d, #1a1008)',
                    borderRadius: '2px',
                  }}
                >
                  <div className="relative z-10 p-10 flex flex-col" style={{ minHeight: '440px' }}>
                    <p
                      className="text-gold text-xs uppercase mb-4"
                      style={{ letterSpacing: '0.25em' }}
                    >
                      Private Karaoke
                    </p>
                    <h3
                      className="font-display font-light text-foreground mb-4"
                      style={{ fontSize: '1.875rem' }}
                    >
                      Private Karaoke Suites
                    </h3>
                    <p className="text-text-muted text-sm leading-relaxed mb-8">
                      Three beautifully appointed rooms for every group size. State-of-the-art sound systems, expansive song libraries, and attentive service throughout the night.
                    </p>
                    <div className="flex flex-col gap-0 mb-auto">
                      {[
                        { type: 'Small Room', cap: 'Up to 8 guests', price: '£30 / hr' },
                        { type: 'Medium Room', cap: 'Up to 14 guests', price: '£40 / hr' },
                        { type: 'Large Room', cap: 'Up to 20 guests', price: '£50 / hr' },
                      ].map(r => (
                        <div
                          key={r.type}
                          className="flex justify-between items-center py-3 border-b border-border"
                        >
                          <div>
                            <span className="text-foreground text-sm">{r.type}</span>
                            <span className="text-text-dim text-xs ml-2">{r.cap}</span>
                          </div>
                          <span className="text-gold text-sm font-medium">{r.price}</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-gold text-sm mt-8 group-hover:text-gold-light transition-colors">
                      Book Now →
                    </p>
                  </div>
                </div>
              </Link>
            </FadeIn>

            {/* Dining Card */}
            <FadeIn delay={200}>
              <Link href="/dining" className="block group">
                <div
                  className="relative overflow-hidden border border-border hover:border-accent-dark transition-colors duration-300"
                  style={{
                    minHeight: '440px',
                    background: 'linear-gradient(135deg, #0d0d0d, #140608)',
                    borderRadius: '2px',
                  }}
                >
                  <div className="relative z-10 p-10 flex flex-col" style={{ minHeight: '440px' }}>
                    <p
                      className="text-xs uppercase mb-4"
                      style={{ color: 'var(--accent)', letterSpacing: '0.25em' }}
                    >
                      Late Night Dining
                    </p>
                    <h3
                      className="font-display font-light text-foreground mb-4"
                      style={{ fontSize: '1.875rem' }}
                    >
                      Fine Dining
                    </h3>
                    <p className="text-text-muted text-sm leading-relaxed mb-8">
                      An expertly crafted menu for night-time indulgence. From elegant sharing plates to intimate dinners — every dish is designed to complement the evening.
                    </p>
                    <ul className="flex flex-col gap-3 mb-auto">
                      {[
                        'No deposit required',
                        'Dietary requirements catered for',
                        'Available every night 17:00 – 02:00',
                        'Large group seating available',
                      ].map(f => (
                        <li key={f} className="flex items-start gap-3 text-text-muted text-sm">
                          <span style={{ color: 'var(--accent)' }} className="mt-0.5 shrink-0">
                            ✓
                          </span>
                          {f}
                        </li>
                      ))}
                    </ul>
                    <p
                      className="text-sm mt-8 transition-opacity group-hover:opacity-75"
                      style={{ color: 'var(--accent)' }}
                    >
                      Reserve Now →
                    </p>
                  </div>
                </div>
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Section 7: Location & Info */}
      <FadeIn>
        <section
          className="py-20 px-6"
          style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)' }}
        >
          <div className="max-w-5xl mx-auto">
            <p
              className="text-center text-gold text-xs uppercase mb-14"
              style={{ letterSpacing: '0.3em' }}
            >
              Find Us
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="flex flex-col items-center gap-3">
                <Clock size={22} className="text-gold" />
                <p className="text-xs uppercase text-text-dim" style={{ letterSpacing: '0.1em' }}>
                  Opening Hours
                </p>
                <p className="text-foreground text-sm">
                  17:00 – 02:00<br />
                  <span className="text-text-muted">Every Day</span>
                </p>
              </div>
              <div className="flex flex-col items-center gap-3">
                <MapPin size={22} className="text-gold" />
                <p className="text-xs uppercase text-text-dim" style={{ letterSpacing: '0.1em' }}>
                  Address
                </p>
                <p className="text-foreground text-sm">
                  45-51 Stowell Street<br />
                  <span className="text-text-muted">Newcastle NE1 4YB</span>
                </p>
              </div>
              <div className="flex flex-col items-center gap-3">
                <Phone size={22} className="text-gold" />
                <p className="text-xs uppercase text-text-dim" style={{ letterSpacing: '0.1em' }}>
                  Contact
                </p>
                <p className="text-foreground text-sm">
                  <a href="tel:07552791612" className="hover:text-gold transition-colors">
                    07552 791612
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* Section 8: Instagram */}
      <FadeIn>
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <p
              className="text-gold text-xs uppercase mb-3"
              style={{ letterSpacing: '0.3em' }}
            >
              Social
            </p>
            <h2
              className="font-display font-light text-foreground mb-3"
              style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)' }}
            >
              Follow Us
            </h2>
            <p className="text-text-muted text-sm mb-10">@after9barncl</p>
            <a
              href="https://www.instagram.com/after9barncl"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-sm uppercase text-foreground hover:text-gold hover:border-gold transition-colors duration-300"
              style={{
                padding: '0.75rem 2rem',
                border: '1px solid var(--border)',
                letterSpacing: '0.08em',
                borderRadius: '2px',
              }}
            >
              View on Instagram →
            </a>
          </div>
        </section>
      </FadeIn>
    </div>
  )
}
