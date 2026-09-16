'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense, useState, useEffect } from 'react'

function RespondContent() {
  const params = useSearchParams()
  const action = params.get('action') as 'confirm' | 'decline' | null
  const data = params.get('data')

  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  // Persist "done" across page refresh via sessionStorage
  useEffect(() => {
    const key = `respond:${data}:${action}`
    if (sessionStorage.getItem(key) === 'done') setStatus('done')
  }, [data, action])

  if (!data || (action !== 'confirm' && action !== 'decline')) {
    return <Card icon="⚠️" color="#888" heading="Invalid Link" body="This link is not valid." />
  }

  let booking: Record<string, string> | null = null
  try {
    booking = JSON.parse(atob(data.replace(/-/g, '+').replace(/_/g, '/')))
  } catch {
    return <Card icon="⚠️" color="#888" heading="Invalid Link" body="Could not read booking data." />
  }

  const isConfirm = action === 'confirm'
  const accentColor = isConfirm ? '#4CAF50' : '#C23B5C'

  async function handleClick() {
    setStatus('sending')
    try {
      const res = await fetch('/api/booking/respond', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, data }),
      })
      if (!res.ok) {
        const json = await res.json().catch(() => ({}))
        throw new Error(json.error || 'Failed')
      }
      sessionStorage.setItem(`respond:${data}:${action}`, 'done')
      setStatus('done')
    } catch (e: unknown) {
      setErrorMsg(e instanceof Error ? e.message : 'An error occurred.')
      setStatus('error')
    }
  }

  if (status === 'done') {
    return (
      <Card
        icon={isConfirm ? '✅' : '❌'}
        color={accentColor}
        heading={isConfirm ? 'Confirmation Sent' : 'Decline Sent'}
        body={isConfirm
          ? 'The booking confirmation email has been sent to the guest.'
          : 'The decline email has been sent to the guest.'}
      />
    )
  }

  return (
    <div style={cardStyle}>
      <div style={{ fontSize: 44, marginBottom: 16 }}>{isConfirm ? '📋' : '📋'}</div>
      <h1 style={{ color: accentColor, fontSize: 22, margin: '0 0 6px', fontWeight: 400 }}>
        {isConfirm ? 'Confirm Booking' : 'Decline Booking'}
      </h1>
      <p style={{ color: '#888', fontSize: 13, margin: '0 0 28px' }}>Ref: {booking?.reference}</p>

      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14, marginBottom: 28, textAlign: 'left' }}>
        {(
          [
            ['Name', booking?.name],
            ['Date', booking?.date],
            ['Time', booking?.time],
            ['Guests', booking?.guests],
            ['Phone', booking?.phone],
            ...(booking?.notes ? [['Notes', booking.notes]] : []),
          ] as [string, string][]
        ).map(([label, value]) => (
          <tr key={label}>
            <td style={{ padding: '7px 0', borderBottom: '1px solid #2a2a2a', color: '#666', width: 80 }}>{label}</td>
            <td style={{ padding: '7px 0', borderBottom: '1px solid #2a2a2a', color: '#ccc' }}>{value}</td>
          </tr>
        ))}
      </table>

      {status === 'error' && (
        <p style={{ color: '#C23B5C', fontSize: 13, marginBottom: 16 }}>{errorMsg}</p>
      )}

      <button
        onClick={handleClick}
        disabled={status === 'sending'}
        style={{
          width: '100%',
          padding: '14px',
          background: status === 'sending' ? '#333' : accentColor,
          color: status === 'sending' ? '#666' : isConfirm ? '#fff' : '#fff',
          border: 'none',
          borderRadius: 3,
          fontSize: 15,
          cursor: status === 'sending' ? 'not-allowed' : 'pointer',
          fontFamily: 'Georgia, serif',
          transition: 'background 0.2s',
        }}
      >
        {status === 'sending'
          ? 'Sending...'
          : isConfirm
          ? '✅ Send Confirmation Email'
          : '❌ Send Decline Email'}
      </button>

      <p style={{ color: '#444', fontSize: 11, marginTop: 32, letterSpacing: '0.12em' }}>
        AFTER 9 &middot; BAR &amp; KITCHEN
      </p>
    </div>
  )
}

const cardStyle: React.CSSProperties = {
  background: '#141414',
  border: '1px solid #2a2a2a',
  borderRadius: 4,
  padding: '48px 40px',
  maxWidth: 480,
  width: '100%',
  textAlign: 'center',
}

function Card({ icon, color, heading, body }: { icon: string; color: string; heading: string; body: string }) {
  return (
    <div style={cardStyle}>
      <div style={{ fontSize: 52, marginBottom: 20 }}>{icon}</div>
      <h1 style={{ color, fontSize: 24, margin: '0 0 14px', fontWeight: 400 }}>{heading}</h1>
      <p style={{ color: '#888', fontSize: 15, lineHeight: 1.7, margin: 0 }}>{body}</p>
      <p style={{ color: '#444', fontSize: 11, marginTop: 40, letterSpacing: '0.12em' }}>
        AFTER 9 &middot; BAR &amp; KITCHEN
      </p>
    </div>
  )
}

export default function RespondPage() {
  return (
    <div style={{ margin: 0, background: '#0a0a0a', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, fontFamily: 'Georgia, serif' }}>
      <Suspense fallback={<div style={{ color: '#555' }}>Loading...</div>}>
        <RespondContent />
      </Suspense>
    </div>
  )
}
