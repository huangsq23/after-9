'use client'

import { MapPin, Clock, Phone, Mail, MessageCircle } from 'lucide-react'

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
    </svg>
  )
}

function FacebookIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  )
}

export default function Footer() {
  return (
    <footer style={{ background: '#080808', borderTop: '1px solid var(--gold-dark)' }}>
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
            Premium Karaoke & Dining<br />Newcastle Chinatown
          </p>
          <div className="flex gap-4 mt-5">
            <a
              href="https://www.instagram.com/after9barncl"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-dim hover:text-gold transition-colors"
            >
              <InstagramIcon size={18} />
            </a>
            <a href="#" className="text-text-dim hover:text-gold transition-colors">
              <FacebookIcon size={18} />
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
              <InstagramIcon size={15} />
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
