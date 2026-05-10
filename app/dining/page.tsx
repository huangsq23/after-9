'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { diningSchema, DiningFormData, DINING_TIME_SLOTS } from '../../lib/validations/dining'

const inputStyle = {
  width: '100%',
  padding: '0.75rem 1rem',
  background: 'var(--surface-2)',
  border: '1px solid var(--border)',
  borderRadius: '2px',
  color: 'var(--foreground)',
  fontSize: '0.95rem',
  outline: 'none',
}

const errorStyle = { color: 'var(--pink)', fontSize: '0.8rem', marginTop: '0.25rem' }
const labelStyle = { display: 'block', fontSize: '0.8rem', color: '#888', textTransform: 'uppercase' as const, letterSpacing: '0.08em', marginBottom: '0.5rem' }

function getMinDate() {
  const d = new Date()
  return d.toISOString().split('T')[0]
}

export default function DiningPage() {
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)
  const [serverError, setServerError] = useState('')

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<DiningFormData>({
    resolver: zodResolver(diningSchema),
    defaultValues: { guests: 2 },
  })

  const guests = watch('guests')

  const onSubmit = async (data: DiningFormData) => {
    setSubmitting(true)
    setServerError('')
    try {
      const res = await fetch('/api/bookings/dining', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Reservation failed')
      router.push(`/dining/confirmation?ref=${json.reference}&name=${encodeURIComponent(data.name)}`)
    } catch (e: unknown) {
      setServerError(e instanceof Error ? e.message : 'Something went wrong. Please try again.')
      setSubmitting(false)
    }
  }

  return (
    <div style={{ maxWidth: '820px', margin: '0 auto', padding: '3rem 1.5rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '2.5rem' }}>
        <p style={{ color: 'var(--pink)', fontSize: '0.75rem', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
          Fine Dining
        </p>
        <h1 style={{ fontSize: '2.25rem', fontWeight: '300', color: '#ddd', marginBottom: '0.75rem' }}>Table Reservation</h1>
        <p style={{ color: '#666', lineHeight: 1.6 }}>
          Opening hours: 17:00 – 02:00 · No deposit required · Confirmation sent by email
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Date & Time */}
        <section style={{ marginBottom: '2rem', padding: '1.75rem', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '4px' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: '500', color: '#ccc', marginBottom: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            1 · Date & Time
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>
            <div>
              <label style={labelStyle}>Date</label>
              <input type="date" min={getMinDate()} {...register('date')} style={inputStyle} />
              {errors.date && <p style={errorStyle}>{errors.date.message}</p>}
            </div>
            <div>
              <label style={labelStyle}>Preferred Time</label>
              <select {...register('time')} style={inputStyle}>
                <option value="">Select time</option>
                {DINING_TIME_SLOTS.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
              {errors.time && <p style={errorStyle}>{errors.time.message}</p>}
            </div>
          </div>
        </section>

        {/* Guests */}
        <section style={{ marginBottom: '2rem', padding: '1.75rem', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '4px' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: '500', color: '#ccc', marginBottom: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            2 · Party Size
          </h2>
          <div style={{ maxWidth: '200px' }}>
            <label style={labelStyle}>Number of Guests</label>
            <input
              type="number"
              min={1}
              max={50}
              {...register('guests', { valueAsNumber: true })}
              style={inputStyle}
            />
            {errors.guests && <p style={errorStyle}>{errors.guests.message}</p>}
          </div>
          {guests > 10 && (
            <p style={{ marginTop: '0.75rem', fontSize: '0.8rem', color: '#777' }}>
              For large groups (&gt;10), we recommend calling ahead to ensure the best seating arrangements.
            </p>
          )}
        </section>

        {/* Contact */}
        <section style={{ marginBottom: '2rem', padding: '1.75rem', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '4px' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: '500', color: '#ccc', marginBottom: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            3 · Contact Details
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
            <div>
              <label style={labelStyle}>Full Name</label>
              <input placeholder="Jane Smith" {...register('name')} style={inputStyle} />
              {errors.name && <p style={errorStyle}>{errors.name.message}</p>}
            </div>
            <div>
              <label style={labelStyle}>Phone Number</label>
              <input placeholder="+44 7700 900000" {...register('phone')} style={inputStyle} />
              {errors.phone && <p style={errorStyle}>{errors.phone.message}</p>}
            </div>
            <div>
              <label style={labelStyle}>Email Address</label>
              <input type="email" placeholder="jane@example.com" {...register('email')} style={inputStyle} />
              {errors.email && <p style={errorStyle}>{errors.email.message}</p>}
            </div>
          </div>
        </section>

        {/* Dietary */}
        <section style={{ marginBottom: '2rem', padding: '1.75rem', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '4px' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: '500', color: '#ccc', marginBottom: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            4 · Dietary Requirements <span style={{ color: '#555', fontWeight: '400', textTransform: 'none' }}>(optional)</span>
          </h2>
          <div>
            <label style={labelStyle}>Notes</label>
            <textarea
              {...register('dietary')}
              placeholder="E.g. vegetarian, nut allergy, gluten-free..."
              rows={3}
              style={{ ...inputStyle, resize: 'vertical' as const }}
            />
          </div>
        </section>

        {/* No-deposit notice */}
        <div style={{ marginBottom: '1.5rem', padding: '1rem 1.25rem', background: 'rgba(232,69,122,0.05)', border: '1px solid rgba(232,69,122,0.15)', borderRadius: '2px', fontSize: '0.875rem', color: '#888' }}>
          <span style={{ color: 'var(--pink)', fontWeight: '600' }}>✓ No deposit required</span> — A confirmation email will be sent to you immediately after reservation.
        </div>

        {serverError && (
          <div style={{ marginBottom: '1rem', padding: '0.75rem 1rem', background: 'rgba(232,69,122,0.1)', border: '1px solid rgba(232,69,122,0.3)', borderRadius: '2px', color: 'var(--pink)', fontSize: '0.875rem' }}>
            {serverError}
          </div>
        )}

        <button
          type="submit"
          disabled={submitting}
          style={{
            width: '100%', padding: '1rem',
            background: submitting ? '#333' : 'linear-gradient(135deg, var(--pink-dark), var(--pink))',
            color: submitting ? '#666' : '#fff',
            border: 'none', borderRadius: '2px',
            fontSize: '0.95rem', fontWeight: '700',
            letterSpacing: '0.08em', textTransform: 'uppercase',
            cursor: submitting ? 'not-allowed' : 'pointer',
          }}
        >
          {submitting ? 'Processing...' : 'Confirm Reservation'}
        </button>
      </form>
    </div>
  )
}
