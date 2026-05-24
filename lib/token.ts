import { createHmac, timingSafeEqual } from 'crypto'

export interface BookingPayload {
  reference: string
  name: string
  email: string
  phone: string
  date: string
  time: string
  guests: number
  notes?: string
}

export function signBookingToken(payload: BookingPayload): string {
  const secret = process.env.BOOKING_SECRET
  if (!secret) throw new Error('BOOKING_SECRET is not set')
  const data = Buffer.from(JSON.stringify(payload)).toString('base64url')
  const sig = createHmac('sha256', secret).update(data).digest('hex')
  return `${data}.${sig}`
}

export function verifyBookingToken(token: string): BookingPayload | null {
  try {
    const secret = process.env.BOOKING_SECRET
    if (!secret) return null
    const dotIdx = token.lastIndexOf('.')
    if (dotIdx === -1) return null
    const data = token.slice(0, dotIdx)
    const sig = token.slice(dotIdx + 1)
    const expected = createHmac('sha256', secret).update(data).digest('hex')
    const sigBuf = Buffer.from(sig.padEnd(expected.length, '0'), 'hex')
    const expBuf = Buffer.from(expected, 'hex')
    if (sigBuf.length !== expBuf.length) return null
    if (!timingSafeEqual(sigBuf, expBuf)) return null
    return JSON.parse(Buffer.from(data, 'base64url').toString('utf-8')) as BookingPayload
  } catch {
    return null
  }
}
