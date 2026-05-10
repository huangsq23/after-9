import { NextRequest, NextResponse } from 'next/server'
import { ktvSchema, ROOM_CONFIG } from '../../../../lib/validations/ktv'
import { sendKtvEmails } from '../../../../lib/email'

function generateRef() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let ref = 'KTV-'
  for (let i = 0; i < 8; i++) ref += chars[Math.floor(Math.random() * chars.length)]
  return ref
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = ktvSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid booking data', details: parsed.error.flatten() },
        { status: 400 }
      )
    }

    const data = parsed.data
    const room = ROOM_CONFIG[data.roomType]
    const totalAmount = room.price * data.duration
    const depositAmount = room.price

    const reference = generateRef()

    await sendKtvEmails({
      customerEmail: data.email,
      customerName: data.name,
      reference,
      roomLabel: room.label,
      date: data.date,
      startTime: data.startTime,
      duration: data.duration,
      totalAmount,
      depositAmount,
    })

    return NextResponse.json({
      success: true,
      reference,
      roomLabel: room.label,
      totalAmount,
      depositAmount,
      startTime: data.startTime,
      duration: data.duration,
      date: data.date,
    })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
