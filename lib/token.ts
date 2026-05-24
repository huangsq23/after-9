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

export function decodeBookingToken(token: string): BookingPayload | null {
  try {
    return JSON.parse(Buffer.from(token, 'base64url').toString('utf-8')) as BookingPayload
  } catch {
    return null
  }
}
