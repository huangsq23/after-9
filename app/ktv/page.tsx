'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { ktvSchema, KtvFormData, ROOM_CONFIG, TIME_SLOTS } from '../../lib/validations/ktv'

const inputClass =
  'w-full px-4 py-3 bg-surface-2 border border-border text-foreground text-sm outline-none transition-colors duration-200 focus:border-gold'

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
    <div className="bg-background min-h-screen">
      {/* Hero banner with promo video */}
      <section
        className="relative overflow-hidden flex items-end"
        style={{ height: '300px' }}
      >
        <video
          src="/promo.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(10,10,10,0.9) 100%)',
          }}
        />
        <div className="relative z-10 px-6 pb-10 max-w-3xl mx-auto w-full">
          <p
            className="text-gold text-xs uppercase mb-2"
            style={{ letterSpacing: '0.3em' }}
          >
            Private Karaoke
          </p>
          <h1 className="font-display font-light text-foreground" style={{ fontSize: '2.5rem' }}>
            Karaoke Room Booking
          </h1>
        </div>
      </section>

      {/* Form */}
      <div className="max-w-3xl mx-auto px-6 py-12">
        <p className="text-text-muted text-sm mb-10" style={{ lineHeight: 1.6 }}>
          Opening hours: 17:00 – 02:00 · Bookings in 1-hour slots · Deposit required
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Step 1: Room Type */}
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
              style={{ color: 'var(--gold)', letterSpacing: '0.12em' }}
            >
              1 · Choose Your Room
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {(
                Object.entries(ROOM_CONFIG) as [
                  keyof typeof ROOM_CONFIG,
                  (typeof ROOM_CONFIG)[keyof typeof ROOM_CONFIG],
                ][]
              ).map(([key, cfg]) => (
                <label key={key} className="cursor-pointer">
                  <input
                    type="radio"
                    value={key}
                    {...register('roomType')}
                    className="sr-only"
                  />
                  <div
                    className="p-5 text-center transition-all duration-200"
                    style={{
                      border: `1px solid ${roomType === key ? 'var(--gold)' : 'var(--border)'}`,
                      background:
                        roomType === key ? 'rgba(201,168,76,0.07)' : 'var(--surface-2)',
                      borderRadius: '2px',
                    }}
                  >
                    <div
                      className="text-lg font-light mb-1"
                      style={{ color: roomType === key ? 'var(--gold)' : 'var(--foreground)' }}
                    >
                      {cfg.label}
                    </div>
                    <div className="text-xs text-text-muted mb-2">Up to {cfg.capacity} guests</div>
                    <div className="text-base font-semibold text-gold">£{cfg.price}/hr</div>
                  </div>
                </label>
              ))}
            </div>
            {errors.roomType && (
              <p className="text-accent text-xs mt-3">{errors.roomType.message}</p>
            )}
          </section>

          {/* Step 2: Date & Time */}
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
              style={{ color: 'var(--gold)', letterSpacing: '0.12em' }}
            >
              2 · Date & Time
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
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
                  Start Time
                </label>
                <select
                  {...register('startTime')}
                  className={inputClass}
                  style={{ borderRadius: '2px' }}
                >
                  <option value="">Select time</option>
                  {TIME_SLOTS.map(t => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
                {errors.startTime && (
                  <p className="text-accent text-xs mt-1">{errors.startTime.message}</p>
                )}
              </div>
              <div>
                <label
                  className="block text-xs uppercase text-text-muted mb-2"
                  style={{ letterSpacing: '0.08em' }}
                >
                  Duration (hours)
                </label>
                <select
                  value={duration}
                  onChange={e => setValue('duration', Number(e.target.value))}
                  className={inputClass}
                  style={{ borderRadius: '2px' }}
                >
                  {Array.from(
                    { length: startTime ? getMaxDuration(startTime) : 9 },
                    (_, i) => i + 1
                  ).map(h => (
                    <option key={h} value={h}>
                      {h} hour{h > 1 ? 's' : ''}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {startTime && duration > 0 && (
              <p className="mt-4 text-sm text-gold">
                Session: {startTime} – {getEndTime(startTime, duration)}
              </p>
            )}
          </section>

          {/* Step 3: Guests */}
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
              style={{ color: 'var(--gold)', letterSpacing: '0.12em' }}
            >
              3 · Number of Guests
            </h2>
            <div style={{ maxWidth: '200px' }}>
              <label
                className="block text-xs uppercase text-text-muted mb-2"
                style={{ letterSpacing: '0.08em' }}
              >
                Guests
              </label>
              <input
                type="number"
                min={1}
                max={room?.capacity ?? 20}
                {...register('guests', { valueAsNumber: true })}
                className={inputClass}
                style={{ borderRadius: '2px' }}
              />
              {room && (
                <p className="text-xs text-text-dim mt-1">
                  Max {room.capacity} for {room.label} room
                </p>
              )}
              {errors.guests && (
                <p className="text-accent text-xs mt-1">{errors.guests.message}</p>
              )}
            </div>
          </section>

          {/* Step 4: Contact */}
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
              style={{ color: 'var(--gold)', letterSpacing: '0.12em' }}
            >
              4 · Contact Details
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

          {/* Booking Summary */}
          {room && (
            <section
              className="mb-6 p-7"
              style={{
                background: 'rgba(201,168,76,0.04)',
                border: '1px solid rgba(201,168,76,0.2)',
                borderRadius: '2px',
              }}
            >
              <h2
                className="text-sm font-medium uppercase mb-5 text-gold"
                style={{ letterSpacing: '0.12em' }}
              >
                Booking Summary
              </h2>
              <div className="flex flex-col gap-3">
                <div className="flex justify-between text-text-muted text-sm">
                  <span>
                    {room.label} Room × {duration} hr{duration > 1 ? 's' : ''}
                  </span>
                  <span>£{totalAmount}</span>
                </div>
                <div
                  className="flex justify-between text-sm pt-3"
                  style={{ borderTop: '1px solid rgba(201,168,76,0.15)' }}
                >
                  <span className="text-foreground">Deposit due now</span>
                  <span className="text-gold font-semibold">£{depositAmount}</span>
                </div>
                {duration > 1 && (
                  <div className="flex justify-between text-text-dim text-sm">
                    <span>Remaining on the night</span>
                    <span>£{totalAmount - depositAmount}</span>
                  </div>
                )}
              </div>
              <div
                className="mt-5 p-4 text-xs text-text-muted leading-relaxed"
                style={{ background: 'rgba(0,0,0,0.25)', borderRadius: '2px' }}
              >
                <strong className="text-foreground">Deposit Policy</strong>
                <br />
                The deposit of £{depositAmount} is fully refundable if you cancel or modify at least{' '}
                <strong className="text-foreground">48 hours</strong> before your booking. Changes made
                within 48 hours are{' '}
                <strong style={{ color: 'var(--accent)' }}>non-refundable</strong>.
              </div>
            </section>
          )}

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
                : 'linear-gradient(135deg, var(--gold-dark), var(--gold))',
              color: submitting ? '#666' : '#0a0a0a',
              border: 'none',
              borderRadius: '2px',
              letterSpacing: '0.08em',
              cursor: submitting ? 'not-allowed' : 'pointer',
            }}
          >
            {submitting ? 'Processing...' : `Confirm Booking — Pay £${depositAmount} Deposit`}
          </button>
        </form>
      </div>
    </div>
  )
}
