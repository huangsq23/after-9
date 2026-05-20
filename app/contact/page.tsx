import { MapPin, Phone, Clock, Mail } from 'lucide-react'

export const metadata = {
  title: 'Contact Us — After 9 Bar & Kitchen',
}

function WhatsAppIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.122 1.532 5.856L.057 23.215a.75.75 0 0 0 .928.928l5.42-1.46A11.934 11.934 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.694-.525-5.222-1.438l-.374-.223-3.876 1.044 1.067-3.783-.244-.389A9.96 9.96 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
    </svg>
  )
}

function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
    </svg>
  )
}

const contactItems = [
  {
    icon: <MapPin size={16} />,
    label: 'Address',
    content: <span>45-51 Stowell Street<br />Newcastle upon Tyne, NE1 4YB</span>,
  },
  {
    icon: <Phone size={16} />,
    label: 'Phone',
    content: <a href="tel:07552791612" className="hover:text-foreground transition-colors">07552 791612</a>,
  },
  {
    icon: <WhatsAppIcon size={16} />,
    label: 'WhatsApp',
    content: (
      <a href="https://wa.me/447552791612" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
        07552 791612
      </a>
    ),
  },
  {
    icon: <Mail size={16} />,
    label: 'Email',
    content: (
      <a href="mailto:Jiuhou2023@gmail.com" className="hover:text-foreground transition-colors">
        Jiuhou2023@gmail.com
      </a>
    ),
  },
  {
    icon: <InstagramIcon size={16} />,
    label: 'Instagram',
    content: (
      <a href="https://www.instagram.com/after9barncl" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
        @after9barncl
      </a>
    ),
  },
  {
    icon: <Clock size={16} />,
    label: 'Opening Hours',
    content: <span>17:00 – 02:00 &nbsp;·&nbsp; Mon – Sun</span>,
  },
]

export default function ContactPage() {
  return (
    <div className="bg-background min-h-screen">
      {/* Hero */}
      <section className="py-20 px-6" style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-5xl mx-auto">
          <p className="text-xs uppercase mb-4" style={{ color: 'var(--gold)', letterSpacing: '0.3em' }}>
            Get in Touch
          </p>
          <h1
            className="font-display font-light text-foreground"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
          >
            Contact Us
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* Left — Contact info */}
          <div>
            <p className="text-xs uppercase mb-8" style={{ color: 'var(--gold)', letterSpacing: '0.2em' }}>
              Our Details
            </p>
            <div className="flex flex-col gap-6">
              {contactItems.map(item => (
                <div key={item.label} className="flex gap-4 items-start">
                  <div
                    className="shrink-0 mt-0.5"
                    style={{ color: 'var(--gold)' }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs uppercase mb-1 text-text-dim" style={{ letterSpacing: '0.1em' }}>
                      {item.label}
                    </p>
                    <div className="text-text-muted text-sm leading-relaxed">
                      {item.content}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div
              className="mt-10 p-6 text-sm text-text-muted leading-relaxed"
              style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '2px' }}
            >
              For karaoke room bookings or table reservations, please use the booking forms on our{' '}
              <a href="/karaoke" className="hover:text-foreground transition-colors" style={{ color: 'var(--gold)' }}>Karaoke</a>
              {' '}and{' '}
              <a href="/dining" className="hover:text-foreground transition-colors" style={{ color: 'var(--gold)' }}>Dining</a>
              {' '}pages. For general enquiries, feel free to contact us via WhatsApp or email.
            </div>
          </div>

          {/* Right — Google Maps */}
          <div>
            <p className="text-xs uppercase mb-8" style={{ color: 'var(--gold)', letterSpacing: '0.2em' }}>
              Find Us
            </p>
            <div style={{ borderRadius: '2px', overflow: 'hidden', border: '1px solid var(--border)' }}>
              <iframe
                src="https://maps.google.com/maps?q=45-51+Stowell+Street+Newcastle+NE1+4YB&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="450"
                style={{ border: 0, display: 'block' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="After 9 Bar & Kitchen on Google Maps"
              />
            </div>
            <p className="text-text-dim text-xs mt-3 text-center">
              Find us in the heart of Newcastle&apos;s Chinatown
            </p>
          </div>

        </div>
      </section>
    </div>
  )
}
