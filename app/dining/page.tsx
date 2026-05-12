'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { diningSchema, DiningFormData, DINING_TIME_SLOTS } from '../../lib/validations/dining'

const inputClass =
  'w-full px-4 py-3 bg-surface-2 border border-border text-foreground text-sm outline-none transition-colors duration-200 focus:border-accent'

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
      router.push(
        `/dining/confirmation?ref=${json.reference}&name=${encodeURIComponent(data.name)}`
      )
    } catch (e: unknown) {
      setServerError(e instanceof Error ? e.message : 'Something went wrong. Please try again.')
      setSubmitting(false)
    }
  }

  return (
    <div className="bg-background min-h-screen">
      {/* Hero banner */}
      <section
        className="relative overflow-hidden flex items-end"
        style={{
          height: '300px',
          background: 'linear-gradient(135deg, #0d0d0d, #140608)',
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at top center, rgba(194,59,92,0.12) 0%, transparent 60%)',
          }}
        />
        <div className="relative z-10 px-6 pb-10 max-w-3xl mx-auto w-full">
          <p
            className="text-xs uppercase mb-2"
            style={{ color: 'var(--accent)', letterSpacing: '0.3em' }}
          >
            Fine Dining
          </p>
          <h1 className="font-display font-light text-foreground" style={{ fontSize: '2.5rem' }}>
            Table Reservation
          </h1>
        </div>
      </section>

      {/* Form */}
      <div className="max-w-3xl mx-auto px-6 py-12">
        <p className="text-text-muted text-sm mb-10" style={{ lineHeight: 1.6 }}>
          Opening hours: 17:00 – 02:00 · No deposit required · Confirmation sent by email
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Date & Time */}
          <section
            className="mb-6 p-7"
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: '2px',
            }}
          >
            <h2
              className="text-sm font-medium uppercase mb-5"
              style={{ color: 'var(--accent)', letterSpacing: '0.12em' }}
            >
              1 · Date & Time
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label
                  className="block text-xs uppercase text-text-muted mb-2"
                  style={{ letterSpacing: '0.08em' }}
                >
                  Date
                </label>
                <input
                  type="date"
                  min={getMinDate()}
                  {...register('date')}
                  className={inputClass}
                  style={{ borderRadius: '2px' }}
                />
                {errors.date && (
                  <p className="text-accent text-xs mt-1">{errors.date.message}</p>
                )}
              </div>
              <div>
                <label
                  className="block text-xs uppercase text-text-muted mb-2"
                  style={{ letterSpacing: '0.08em' }}
                >
                  Preferred Time
                </label>
                <select
                  {...register('time')}
                  className={inputClass}
                  style={{ borderRadius: '2px' }}
                >
                  <option value="">Select time</option>
                  {DINING_TIME_SLOTS.map(t => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
                {errors.time && (
                  <p className="text-accent text-xs mt-1">{errors.time.message}</p>
                )}
              </div>
            </div>
          </section>

          {/* Party Size */}
          <section
            className="mb-6 p-7"
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: '2px',
            }}
          >
            <h2
              className="text-sm font-medium uppercase mb-5"
              style={{ color: 'var(--accent)', letterSpacing: '0.12em' }}
            >
              2 · Party Size
            </h2>
            <div style={{ maxWidth: '200px' }}>
              <label
                className="block text-xs uppercase text-text-muted mb-2"
                style={{ letterSpacing: '0.08em' }}
              >
                Number of Guests
              </label>
              <input
                type="number"
                min={1}
                max={50}
                {...register('guests', { valueAsNumber: true })}
                className={inputClass}
                style={{ borderRadius: '2px' }}
              />
              {errors.guests && (
                <p className="text-accent text-xs mt-1">{errors.guests.message}</p>
              )}
            </div>
            {guests > 10 && (
              <p className="mt-3 text-xs text-text-muted">
                For large groups (&gt;10), we recommend calling ahead to ensure the best seating
                arrangements.
              </p>
            )}
          </section>

          {/* Contact */}
          <section
            className="mb-6 p-7"
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: '2px',
            }}
          >
            <h2
              className="text-sm font-medium uppercase mb-5"
              style={{ color: 'var(--accent)', letterSpacing: '0.12em' }}
            >
              3 · Contact Details
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div>
                <label
                  className="block text-xs uppercase text-text-muted mb-2"
                  style={{ letterSpacing: '0.08em' }}
                >
                  Full Name
                </label>
                <input
                  placeholder="Jane Smith"
                  {...register('name')}
                  className={inputClass}
                  style={{ borderRadius: '2px' }}
                />
                {errors.name && (
                  <p className="text-accent text-xs mt-1">{errors.name.message}</p>
                )}
              </div>
              <div>
                <label
                  className="block text-xs uppercase text-text-muted mb-2"
                  style={{ letterSpacing: '0.08em' }}
                >
                  Phone Number
                </label>
                <input
                  placeholder="+44 7700 900000"
                  {...register('phone')}
                  className={inputClass}
                  style={{ borderRadius: '2px' }}
                />
                {errors.phone && (
                  <p className="text-accent text-xs mt-1">{errors.phone.message}</p>
                )}
              </div>
              <div>
                <label
                  className="block text-xs uppercase text-text-muted mb-2"
                  style={{ letterSpacing: '0.08em' }}
                >
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="jane@example.com"
                  {...register('email')}
                  className={inputClass}
                  style={{ borderRadius: '2px' }}
                />
                {errors.email && (
                  <p className="text-accent text-xs mt-1">{errors.email.message}</p>
                )}
              </div>
            </div>
          </section>

          {/* Dietary */}
          <section
            className="mb-6 p-7"
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: '2px',
            }}
          >
            <h2
              className="text-sm font-medium uppercase mb-5"
              style={{ color: 'var(--accent)', letterSpacing: '0.12em' }}
            >
              4 · Dietary Requirements{' '}
              <span
                className="text-text-dim normal-case font-normal"
                style={{ textTransform: 'none' }}
              >
                (optional)
              </span>
            </h2>
            <div>
              <label
                className="block text-xs uppercase text-text-muted mb-2"
                style={{ letterSpacing: '0.08em' }}
              >
                Notes
              </label>
              <textarea
                {...register('dietary')}
                placeholder="E.g. vegetarian, nut allergy, gluten-free..."
                rows={3}
                className={inputClass}
                style={{ borderRadius: '2px', resize: 'vertical' }}
              />
            </div>
          </section>

          {/* No-deposit notice */}
          <div
            className="mb-5 px-4 py-3 text-sm"
            style={{
              background: 'rgba(194,59,92,0.05)',
              border: '1px solid rgba(194,59,92,0.15)',
              borderRadius: '2px',
            }}
          >
            <span className="font-semibold" style={{ color: 'var(--accent)' }}>
              ✓ No deposit required
            </span>
            <span className="text-text-muted">
              {' '}
              — A confirmation email will be sent immediately after reservation.
            </span>
          </div>

          {serverError && (
            <div
              className="mb-4 px-4 py-3 text-sm"
              style={{
                background: 'rgba(194,59,92,0.1)',
                border: '1px solid rgba(194,59,92,0.3)',
                color: 'var(--accent)',
                borderRadius: '2px',
              }}
            >
              {serverError}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-4 text-sm font-bold uppercase tracking-wider transition-opacity hover:opacity-90"
            style={{
              background: submitting
                ? '#333'
                : 'linear-gradient(135deg, var(--accent-dark), var(--accent))',
              color: submitting ? '#666' : '#fff',
              border: 'none',
              borderRadius: '2px',
              letterSpacing: '0.08em',
              cursor: submitting ? 'not-allowed' : 'pointer',
            }}
          >
            {submitting ? 'Processing...' : 'Confirm Reservation'}
          </button>
        </form>
      </div>
    </div>
  )
}
