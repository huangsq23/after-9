'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Suspense } from 'react'

function ConfirmationContent() {
  const params = useSearchParams()
  const ref = params.get('ref') || 'DIN-XXXXXXXX'
  const name = params.get('name') || 'Guest'

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '5rem 1.5rem', textAlign: 'center' }}>
      {/* Success icon */}
      <div style={{
        width: '80px', height: '80px', borderRadius: '50%',
        border: '2px solid var(--pink)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        margin: '0 auto 2rem',
        fontSize: '2rem',
        color: 'var(--pink)',
      }}>
        ✓
      </div>

      <p style={{ color: 'var(--pink)', fontSize: '0.75rem', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '1rem' }}>
        Reservation Confirmed
      </p>
      <h1 style={{ fontSize: '2rem', fontWeight: '300', color: '#ddd', marginBottom: '1rem' }}>
        Thank you, {decodeURIComponent(name)}!
      </h1>
      <p style={{ color: '#666', lineHeight: 1.7, marginBottom: '2.5rem' }}>
        Your table has been reserved. A confirmation email has been sent with your reservation details.
      </p>

      {/* Reference */}
      <div style={{
        padding: '1.5rem', background: 'var(--surface)',
        border: '1px solid var(--border)', borderRadius: '4px',
        marginBottom: '2rem',
      }}>
        <p style={{ fontSize: '0.75rem', color: '#555', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>Reservation Reference</p>
        <p style={{ fontSize: '1.75rem', fontWeight: '600', color: 'var(--pink)', letterSpacing: '0.1em' }}>{ref}</p>
        <p style={{ fontSize: '0.8rem', color: '#555', marginTop: '0.5rem' }}>Please keep this reference for your records</p>
      </div>

      <div style={{
        padding: '1rem 1.25rem', background: 'rgba(232,69,122,0.05)',
        border: '1px solid rgba(232,69,122,0.15)', borderRadius: '2px',
        marginBottom: '2.5rem', fontSize: '0.8rem', color: '#777', lineHeight: 1.6, textAlign: 'left',
      }}>
        <span style={{ color: 'var(--pink)' }}>✓</span> No deposit was charged for this reservation. We look forward to welcoming you.
      </div>

      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link href="/dining" style={{
          padding: '0.75rem 1.5rem', border: '1px solid var(--pink)',
          color: 'var(--pink)', textDecoration: 'none', borderRadius: '2px',
          fontSize: '0.875rem', letterSpacing: '0.05em',
        }}>
          New Reservation
        </Link>
        <Link href="/" style={{
          padding: '0.75rem 1.5rem',
          background: 'linear-gradient(135deg, var(--pink-dark), var(--pink))',
          color: '#fff', textDecoration: 'none', borderRadius: '2px',
          fontSize: '0.875rem', fontWeight: '600', letterSpacing: '0.05em',
        }}>
          Back to Home
        </Link>
      </div>
    </div>
  )
}

export default function DiningConfirmationPage() {
  return (
    <Suspense fallback={<div style={{ textAlign: 'center', padding: '5rem', color: '#555' }}>Loading...</div>}>
      <ConfirmationContent />
    </Suspense>
  )
}
