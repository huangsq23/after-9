'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { ktvSchema, KtvFormData, ROOM_CONFIG, TIME_SLOTS } from '../../lib/validations/ktv'

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
  d.setDate(d.getDate() + 1)
  return d.toISOString().split('T')[0]
}

export default function KtvPage() {
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)
  const [serverError, setServerError] = useState('')

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<KtvFormData>({
    resolver: zodResolver(ktvSchema),
    defaultValues: { duration: 2, guests: 2 },
  })

  const roomType = watch('roomType')
  const duration = watch('duration') || 2
  const startTime = watch('startTime')

  const room = roomType ? ROOM_CONFIG[roomType] : null
  const depositAmount = room ? room.price : 0
  const totalAmount = room ? room.price * duration : 0

  const getEndTime = (start: string, hours: number) => {
    if (!start) return ''
    const [h, m] = start.split(':').map(Number)
    const endH = (h + hours) % 24
    return `${String(endH).padStart(2, '0')}:${String(m).padStart(2, '0')}`
  }

  const getMaxDuration = (start: string) => {
    if (!start) return 9
    const [h] = start.split(':').map(Number)
    const minsFromStart = h >= 17 ? (h - 17) * 60 : (h + 7) * 60
    const remaining = 9 * 60 - minsFromStart
    return Math.max(1, Math.floor(remaining / 60))
  }

  const onSubmit = async (data: KtvFormData) => {
    setSubmitting(true)
    setServerError('')
    try {
      const res = await fetch('/api/bookings/ktv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Booking failed')
      router.push(`/ktv/confirmation?ref=${json.reference}&name=${encodeURIComponent(data.name)}`)
    } catch (e: unknown) {
      setServerError(e instanceof Error ? e.message : 'Something went wrong. Please try again.')
      setSubmitting(false)
    }
  }

  return (
    <div style={{ maxWidth: '820px', margin: '0 auto', padding: '3rem 1.5rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '2.5rem' }}>
        <p style={{ color: 'var(--gold)', fontSize: '0.75rem', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
          Private Karaoke
        </p>
        <h1 style={{ fontSize: '2.25rem', fontWeight: '300', color: '#ddd', marginBottom: '0.75rem' }}>KTV Room Booking</h1>
        <p style={{ color: '#666', lineHeight: 1.6 }}>
          Opening hours: 17:00 – 02:00 · Bookings in 1-hour slots · Deposit required
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Step 1: Room Type */}
        <section style={{ marginBottom: '2.5rem', padding: '1.75rem', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '4px' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: '500', color: '#ccc', marginBottom: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            1 · Choose Your Room
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
            {(Object.entries(ROOM_CONFIG) as [keyof typeof ROOM_CONFIG, typeof ROOM_CONFIG[keyof typeof ROOM_CONFIG]][]).map(([key, cfg]) => (
              <label key={key} style={{ cursor: 'pointer' }}>
                <input type="radio" value={key} {...register('roomType')} style={{ display: 'none' }} />
                <div style={{
                  padding: '1.25rem',
                  border: `1px solid ${roomType === key ? 'var(--gold)' : 'var(--border)'}`,
                  borderRadius: '2px',
                  background: roomType === key ? 'rgba(201,168,76,0.07)' : 'var(--surface-2)',
                  transition: 'all 0.2s',
                  textAlign: 'center',
                }}>
                  <div style={{ fontSize: '1.375rem', fontWeight: '400', color: roomType === key ? 'var(--gold)' : '#ccc' }}>
                    {cfg.label}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#777', margin: '0.3rem 0' }}>Up to {cfg.capacity} guests</div>
                  <div style={{ fontSize: '1.125rem', fontWeight: '600', color: 'var(--gold)' }}>£{cfg.price}/hr</div>
                </div>
              </label>
            ))}
          </div>
          {errors.roomType && <p style={errorStyle}>{errors.roomType.message}</p>}
        </section>

        {/* Step 2: Date & Time */}
        <section style={{ marginBottom: '2.5rem', padding: '1.75rem', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '4px' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: '500', color: '#ccc', marginBottom: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            2 · Date & Time
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>
            <div>
              <label style={labelStyle}>Date</label>
              <input type="date" min={getMinDate()} {...register('date')} style={inputStyle} />
              {errors.date && <p style={errorStyle}>{errors.date.message}</p>}
            </div>
            <div>
              <label style={labelStyle}>Start Time</label>
              <select {...register('startTime')} style={inputStyle}>
                <option value="">Select time</option>
                {TIME_SLOTS.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
              {errors.startTime && <p style={errorStyle}>{errors.startTime.message}</p>}
            </div>
            <div>
              <label style={labelStyle}>Duration (hours)</label>
              <select
                value={duration}
                onChange={e => setValue('duration', Number(e.target.value))}
                style={inputStyle}
              >
                {Array.from({ length: startTime ? getMaxDuration(startTime) : 9 }, (_, i) => i + 1).map(h => (
                  <option key={h} value={h}>{h} hour{h > 1 ? 's' : ''}</option>
                ))}
              </select>
            </div>
          </div>
          {startTime && duration > 0 && (
            <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: 'var(--gold)' }}>
              Session: {startTime} – {getEndTime(startTime, duration)}
            </p>
          )}
        </section>

        {/* Step 3: Guests */}
        <section style={{ marginBottom: '2.5rem', padding: '1.75rem', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '4px' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: '500', color: '#ccc', marginBottom: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            3 · Number of Guests
          </h2>
          <div style={{ maxWidth: '200px' }}>
            <label style={labelStyle}>Guests</label>
            <input
              type="number"
              min={1}
              max={room?.capacity ?? 20}
              {...register('guests', { valueAsNumber: true })}
              style={inputStyle}
            />
            {room && <p style={{ fontSize: '0.8rem', color: '#555', marginTop: '0.4rem' }}>Max {room.capacity} for {room.label} room</p>}
            {errors.guests && <p style={errorStyle}>{errors.guests.message}</p>}
          </div>
        </section>

        {/* Step 4: Contact Info */}
        <section style={{ marginBottom: '2.5rem', padding: '1.75rem', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '4px' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: '500', color: '#ccc', marginBottom: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            4 · Contact Details
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

        {/* Summary & Deposit Policy */}
        {room && (
          <section style={{ marginBottom: '2rem', padding: '1.75rem', background: 'rgba(201,168,76,0.05)', border: '1px solid rgba(201,168,76,0.2)', borderRadius: '4px' }}>
            <h2 style={{ fontSize: '1rem', fontWeight: '500', color: 'var(--gold)', marginBottom: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Booking Summary
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#aaa', fontSize: '0.9rem' }}>
                <span>{room.label} Room × {duration} hr{duration > 1 ? 's' : ''}</span>
                <span>£{totalAmount}</span>
              </div>
              <div style={{ borderTop: '1px solid rgba(201,168,76,0.15)', paddingTop: '0.6rem', display: 'flex', justifyContent: 'space-between', color: '#ccc', fontSize: '0.9rem' }}>
                <span>Deposit due now</span>
                <span style={{ color: 'var(--gold)', fontWeight: '600' }}>£{depositAmount}</span>
              </div>
              {duration > 1 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#666', fontSize: '0.875rem' }}>
                  <span>Remaining on the night</span>
                  <span>£{totalAmount - depositAmount}</span>
                </div>
              )}
            </div>
            <div style={{ marginTop: '1.25rem', padding: '1rem', background: 'rgba(0,0,0,0.3)', borderRadius: '2px', fontSize: '0.8rem', color: '#777', lineHeight: 1.6 }}>
              <strong style={{ color: '#aaa' }}>Deposit Policy</strong><br />
              The deposit of £{depositAmount} is fully refundable if you cancel or modify at least <strong style={{ color: '#ccc' }}>48 hours</strong> before your booking. Changes made within 48 hours of the start time are <strong style={{ color: 'var(--pink)' }}>non-refundable</strong>.
            </div>
          </section>
        )}

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
            background: submitting ? '#333' : 'linear-gradient(135deg, var(--gold-dark), var(--gold))',
            color: submitting ? '#666' : '#0a0a0a',
            border: 'none', borderRadius: '2px',
            fontSize: '0.95rem', fontWeight: '700',
            letterSpacing: '0.08em', textTransform: 'uppercase',
            cursor: submitting ? 'not-allowed' : 'pointer',
            transition: 'opacity 0.2s',
          }}
        >
          {submitting ? 'Processing...' : `Confirm Booking — Pay £${depositAmount} Deposit`}
        </button>
      </form>
    </div>
  )
}
