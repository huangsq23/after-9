'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { karaokeSchema, KaraokeFormData, ROOM_CONFIG, TIME_SLOTS } from '../../lib/validations/karaoke'

const inputClass =
  'w-full px-4 py-3 bg-surface-2 border border-border text-foreground text-sm outline-none transition-colors duration-200 focus:border-gold'

function getMinDate() {
  const d = new Date()
  d.setDate(d.getDate() + 1)
  return d.toISOString().split('T')[0]
}

export default function KaraokePage() {
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)
  const [serverError, setServerError] = useState('')

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<KaraokeFormData>({
    resolver: zodResolver(karaokeSchema),
    defaultValues: { duration: 2, guests: 2 },
  })

  const roomType = watch('roomType')
  const duration = watch('duration') || 2
  const startTime = watch('startTime')
  const room = roomType ? ROOM_CONFIG[roomType] : null

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
    return Math.max(1, Math.floor((9 * 60 - minsFromStart) / 60))
  }

  const onSubmit = async (data: KaraokeFormData) => {
    setSubmitting(true)
    setServerError('')
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, type: 'karaoke' }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Submission failed')
      router.push(
        `/karaoke/confirmation?ref=${json.reference}&name=${encodeURIComponent(data.name)}`
      )
    } catch (e: unknown) {
      setServerError(e instanceof Error ? e.message : 'Something went wrong. Please try again.')
      setSubmitting(false)
    }
  }

  return (
    <div className="bg-background min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden flex items-end" style={{ height: '300px' }}>
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
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(10,10,10,0.9) 100%)',
          }}
        />
        <div className="relative z-10 px-6 pb-10 max-w-3xl mx-auto w-full">
          <p className="text-gold text-xs uppercase mb-2" style={{ letterSpacing: '0.3em' }}>
            Private Karaoke
          </p>
          <h1 className="font-display font-light text-foreground" style={{ fontSize: '2.5rem' }}>
            Karaoke Room Booking
          </h1>
        </div>
      </section>

      {/* Room Info Cards */}
      <div className="max-w-3xl mx-auto px-6 pt-12 pb-2">
        <p className="text-gold text-xs uppercase mb-6" style={{ letterSpacing: '0.25em' }}>
          Our Rooms
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          {(
            Object.entries(ROOM_CONFIG) as [
              keyof typeof ROOM_CONFIG,
              (typeof ROOM_CONFIG)[keyof typeof ROOM_CONFIG],
            ][]
          ).map(([key, cfg]) => (
            <div
              key={key}
              className="p-6 text-center"
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: '2px',
              }}
            >
              <p
                className="text-xs uppercase mb-3"
                style={{ color: 'var(--text-dim)', letterSpacing: '0.15em' }}
              >
                {cfg.label} Room
              </p>
              <p
                className="font-display font-light mb-2"
                style={{ fontSize: '2rem', color: 'var(--gold)', lineHeight: 1 }}
              >
                £{cfg.price}
                <span
                  className="text-text-muted"
                  style={{ fontSize: '0.875rem', fontFamily: 'inherit' }}
                >
                  {' '}
                  / hr
                </span>
              </p>
              <p className="text-text-muted text-xs mt-2">
                Recommended ≤ {cfg.capacity} guests
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Booking Form */}
      <div className="max-w-3xl mx-auto px-6 pb-16">
        <p className="text-text-muted text-sm mb-8" style={{ lineHeight: 1.6 }}>
          Opening hours: 17:00 – 02:00 · Bookings in 1-hour slots · We will contact you to confirm
          your booking
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Honeypot – hidden from real users, bots fill it in */}
          <input
            type="text"
            {...register('hp')}
            style={{ display: 'none' }}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />

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
              style={{ color: 'var(--gold)', letterSpacing: '0.12em' }}
            >
              Contact Details
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
                  <span className="text-text-dim normal-case ml-1" style={{ textTransform: 'none' }}>
                    (for confirmation)
                  </span>
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
            </div>
          </section>

          {/* Room & Guests */}
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
              Room & Guests
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label
                  className="block text-xs uppercase text-text-muted mb-2"
                  style={{ letterSpacing: '0.08em' }}
                >
                  Room Type
                </label>
                <select
                  {...register('roomType')}
                  className={inputClass}
                  style={{ borderRadius: '2px' }}
                >
                  <option value="">Select a room</option>
                  {(
                    Object.entries(ROOM_CONFIG) as [
                      keyof typeof ROOM_CONFIG,
                      (typeof ROOM_CONFIG)[keyof typeof ROOM_CONFIG],
                    ][]
                  ).map(([key, cfg]) => (
                    <option key={key} value={key}>
                      {cfg.label} Room — £{cfg.price}/hr (≤ {cfg.capacity} guests)
                    </option>
                  ))}
                </select>
                {errors.roomType && (
                  <p className="text-accent text-xs mt-1">{errors.roomType.message}</p>
                )}
              </div>
              <div>
                <label
                  className="block text-xs uppercase text-text-muted mb-2"
                  style={{ letterSpacing: '0.08em' }}
                >
                  Number of Guests
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
            </div>
          </section>

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
              style={{ color: 'var(--gold)', letterSpacing: '0.12em' }}
            >
              Date & Time
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

          {/* Additional Requests */}
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
              Additional Requests{' '}
              <span
                className="text-text-dim normal-case font-normal"
                style={{ textTransform: 'none' }}
              >
                (optional)
              </span>
            </h2>
            <textarea
              {...register('notes')}
              placeholder="E.g. birthday celebration, song preferences, special arrangements..."
              rows={3}
              className={inputClass}
              style={{ borderRadius: '2px', resize: 'vertical' }}
            />
          </section>

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
            {submitting ? 'Sending...' : 'Send Booking Request'}
          </button>

          <p className="mt-6 text-center text-text-dim text-sm" style={{ lineHeight: 1.7 }}>
            For any other questions, text or WhatsApp us on{' '}
            <a
              href="https://wa.me/447552791612"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-foreground transition-colors"
              style={{ textDecoration: 'underline', textUnderlineOffset: '3px' }}
            >
              07552 791612
            </a>
          </p>
        </form>
      </div>
    </div>
  )
}
