import { NextRequest, NextResponse } from 'next/server'
import { karaokeSchema, ROOM_CONFIG } from '../../../lib/validations/karaoke'
import { diningSchema } from '../../../lib/validations/dining'
import { sendKaraokeNotification, sendDiningNotification } from '../../../lib/email'

function generateRef(prefix: string) {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let ref = prefix + '-'
  for (let i = 0; i < 8; i++) ref += chars[Math.floor(Math.random() * chars.length)]
  return ref
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // Honeypot anti-spam: silently succeed so bots don't know they were blocked
    if (body.hp) {
      return NextResponse.json({ success: true, reference: 'OK' })
    }

    const { type } = body

    if (type === 'karaoke') {
      const parsed = karaokeSchema.safeParse(body)
      if (!parsed.success) {
        return NextResponse.json(
          { error: 'Invalid booking data', details: parsed.error.flatten() },
          { status: 400 }
        )
      }
      const data = parsed.data
      const room = ROOM_CONFIG[data.roomType]
      const reference = generateRef('KAR')

      await sendKaraokeNotification({
        reference,
        name: data.name,
        phone: data.phone,
        roomLabel: room.label,
        date: data.date,
        startTime: data.startTime,
        duration: data.duration,
        guests: data.guests,
        notes: data.notes,
      })

      return NextResponse.json({ success: true, reference })
    }

    if (type === 'dining') {
      const parsed = diningSchema.safeParse(body)
      if (!parsed.success) {
        return NextResponse.json(
          { error: 'Invalid reservation data', details: parsed.error.flatten() },
          { status: 400 }
        )
      }
      const data = parsed.data
      const reference = generateRef('DIN')

      await sendDiningNotification({
        reference,
        name: data.name,
        phone: data.phone,
        email: data.email,
        date: data.date,
        time: data.time,
        guests: data.guests,
        notes: data.dietary,
      })

      return NextResponse.json({ success: true, reference })
    }

    return NextResponse.json({ error: 'Invalid booking type' }, { status: 400 })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('[/api/bookings] error:', message)
    return NextResponse.json(
      { error: message },
      { status: 500 }
    )
  }
}
