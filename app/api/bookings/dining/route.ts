import { NextRequest, NextResponse } from 'next/server'
import { diningSchema } from '../../../../lib/validations/dining'
import { sendDiningEmails } from '../../../../lib/email'

function generateRef() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let ref = 'DIN-'
  for (let i = 0; i < 8; i++) ref += chars[Math.floor(Math.random() * chars.length)]
  return ref
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = diningSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid reservation data', details: parsed.error.flatten() },
        { status: 400 }
      )
    }

    const data = parsed.data
    const reference = generateRef()

    await sendDiningEmails({
      customerEmail: data.email,
      customerName: data.name,
      reference,
      date: data.date,
      time: data.time,
      guests: data.guests,
      dietaryNotes: data.dietaryNotes,
    })

    return NextResponse.json({
      success: true,
      reference,
      date: data.date,
      time: data.time,
      guests: data.guests,
    })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
