'use client'

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--border)', background: 'var(--surface)', padding: '3rem 1.5rem 2rem' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2.5rem', marginBottom: '2rem' }}>
        <div>
          <img src="/logo.jpg" alt="After 9" style={{ height: '48px', width: 'auto', filter: 'invert(1)', marginBottom: '1rem' }}
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
          />
          <p style={{ color: '#555', fontSize: '0.875rem', lineHeight: 1.7 }}>
            Premium KTV & Dining<br />Newcastle upon Tyne
          </p>
        </div>
        <div>
          <p style={{ color: 'var(--gold)', fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1rem' }}>Location</p>
          <p style={{ color: '#777', fontSize: '0.875rem', lineHeight: 1.8 }}>
            45-51 Stowell Street<br />Newcastle upon Tyne<br />NE1 4YB
          </p>
        </div>
        <div>
          <p style={{ color: 'var(--gold)', fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1rem' }}>Contact</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <a href="tel:07552791612" style={{ color: '#777', fontSize: '0.875rem', textDecoration: 'none' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#ccc')}
              onMouseLeave={e => (e.currentTarget.style.color = '#777')}
            >📞 07552 791612</a>
            <a href="https://wa.me/447552791612" target="_blank" rel="noopener noreferrer" style={{ color: '#777', fontSize: '0.875rem', textDecoration: 'none' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#ccc')}
              onMouseLeave={e => (e.currentTarget.style.color = '#777')}
            >💬 WhatsApp</a>
            <a href="mailto:huangsq0716@gmail.com" style={{ color: '#777', fontSize: '0.875rem', textDecoration: 'none' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#ccc')}
              onMouseLeave={e => (e.currentTarget.style.color = '#777')}
            >✉️ huangsq0716@gmail.com</a>
            <a href="https://www.instagram.com/after9barncl" target="_blank" rel="noopener noreferrer" style={{ color: '#777', fontSize: '0.875rem', textDecoration: 'none' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--pink)')}
              onMouseLeave={e => (e.currentTarget.style.color = '#777')}
            >📸 @after9barncl</a>
          </div>
        </div>
        <div>
          <p style={{ color: 'var(--gold)', fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1rem' }}>Hours</p>
          <p style={{ color: '#777', fontSize: '0.875rem', lineHeight: 1.8 }}>
            Every Day<br />17:00 – 02:00
          </p>
        </div>
      </div>
      <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem', textAlign: 'center', color: '#444', fontSize: '0.8rem' }}>
        © {new Date().getFullYear()} After 9. All rights reserved.
      </div>
    </footer>
  )
}
