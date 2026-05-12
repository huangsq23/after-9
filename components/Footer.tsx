'use client'

import { useState } from 'react'
import { Instagram, Facebook, MapPin, Clock, Phone, Mail, MessageCircle } from 'lucide-react'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) setSubscribed(true)
  }

  return (
    <footer style={{ background: '#080808', borderTop: '1px solid var(--gold-dark)' }}>
      {/* Newsletter */}
      <div className="border-b border-border py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-xs uppercase text-gold mb-1" style={{ letterSpacing: '0.2em' }}>
              Stay in the loop
            </p>
            <p className="text-foreground font-display font-light text-xl">
              Get exclusive offers & updates
            </p>
          </div>
          {subscribed ? (
            <p className="text-gold text-sm tracking-wider">Thank you for subscribing ✓</p>
          ) : (
            <form onSubmit={handleSubscribe} className="flex w-full max-w-md">
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="flex-1 px-4 py-3 text-sm text-foreground bg-surface-2 border border-border outline-none"
                style={{ borderRadius: '2px 0 0 2px' }}
              />
              <button
                type="submit"
                className="px-5 py-3 text-xs font-medium uppercase hover:opacity-90 transition-opacity"
                style={{
                  background: 'var(--gold)',
                  color: '#0a0a0a',
                  letterSpacing: '0.08em',
                  borderRadius: '0 2px 2px 0',
                }}
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Main columns */}
      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <img
            src="/logo.jpg"
            alt="After 9"
            style={{ height: '48px', width: 'auto', filter: 'brightness(0) invert(1)', marginBottom: '1rem' }}
            onError={(e) => {
              ;(e.currentTarget as HTMLImageElement).style.display = 'none'
            }}
          />
          <p className="text-text-dim text-sm leading-relaxed">
            Premium KTV & Dining<br />Newcastle Chinatown
          </p>
          <div className="flex gap-4 mt-5">
            <a
              href="https://www.instagram.com/after9barncl"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-dim hover:text-gold transition-colors"
            >
              <Instagram size={18} />
            </a>
            <a href="#" className="text-text-dim hover:text-gold transition-colors">
              <Facebook size={18} />
            </a>
          </div>
        </div>

        {/* Location */}
        <div>
          <p className="text-xs uppercase text-gold mb-5" style={{ letterSpacing: '0.2em' }}>
            Location
          </p>
          <div className="flex gap-3 text-text-muted text-sm leading-relaxed">
            <MapPin size={16} className="shrink-0 mt-0.5 text-gold-dark" />
            <span>
              45-51 Stowell Street<br />
              Newcastle upon Tyne<br />
              NE1 4YB
            </span>
          </div>
        </div>

        {/* Contact */}
        <div>
          <p className="text-xs uppercase text-gold mb-5" style={{ letterSpacing: '0.2em' }}>
            Contact
          </p>
          <div className="flex flex-col gap-3">
            <a href="tel:07552791612" className="flex gap-3 items-center text-text-muted hover:text-foreground text-sm transition-colors">
              <Phone size={15} className="text-gold-dark shrink-0" />
              07552 791612
            </a>
            <a href="https://wa.me/447552791612" target="_blank" rel="noopener noreferrer" className="flex gap-3 items-center text-text-muted hover:text-foreground text-sm transition-colors">
              <MessageCircle size={15} className="text-gold-dark shrink-0" />
              WhatsApp
            </a>
            <a href="mailto:huangsq0716@gmail.com" className="flex gap-3 items-center text-text-muted hover:text-foreground text-sm transition-colors">
              <Mail size={15} className="text-gold-dark shrink-0" />
              huangsq0716@gmail.com
            </a>
            <a href="https://www.instagram.com/after9barncl" target="_blank" rel="noopener noreferrer" className="flex gap-3 items-center text-text-muted hover:text-gold text-sm transition-colors">
              <Instagram size={15} className="text-gold-dark shrink-0" />
              @after9barncl
            </a>
          </div>
        </div>

        {/* Hours */}
        <div>
          <p className="text-xs uppercase text-gold mb-5" style={{ letterSpacing: '0.2em' }}>
            Hours
          </p>
          <div className="flex gap-3 text-text-muted text-sm">
            <Clock size={16} className="shrink-0 mt-0.5 text-gold-dark" />
            <span>
              Every Day<br />
              17:00 – 02:00
            </span>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border px-6 py-5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-text-dim text-xs" style={{ letterSpacing: '0.05em' }}>
            © {new Date().getFullYear()} After 9. All rights reserved.
          </p>
          <a href="#" className="text-text-dim hover:text-text-muted text-xs transition-colors">
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  )
}
