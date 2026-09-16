import { NextRequest } from 'next/server'
import { decodeBookingToken } from '../../../../lib/token'
import { sendDiningConfirmation, sendDiningDecline } from '../../../../lib/email'

// Tracks references that have already been responded to this instance lifetime.
// Prevents double-sending if the venue staff clicks the button more than once.
const respondedRefs = new Set<string>()

function html(title: string, icon: string, heading: string, body: string, accentColor: string, status = 200) {
  return new Response(
    `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${title} — After 9</title>
  <style>
    *{box-sizing:border-box}
    body{margin:0;background:#0a0a0a;color:#f0ece4;font-family:Georgia,serif;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
    .card{background:#141414;border:1px solid #2a2a2a;border-radius:4px;padding:48px 40px;max-width:480px;width:100%;text-align:center}
    .icon{font-size:52px;margin-bottom:20px}
    h1{color:${accentColor};font-size:24px;margin:0 0 14px;font-weight:400}
    p{color:#888;font-size:15px;line-height:1.7;margin:0}
    .brand{font-size:11px;color:#444;margin-top:40px;letter-spacing:0.12em}
  </style>
</head>
<body>
  <div class="card">
    <div class="icon">${icon}</div>
    <h1>${heading}</h1>
    <p>${body}</p>
    <p class="brand">AFTER 9 &middot; BAR &amp; KITCHEN</p>
  </div>
</body>
</html>`,
    { status, headers: { 'Content-Type': 'text/html; charset=utf-8' } }
  )
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const action = searchParams.get('action')
  const data = searchParams.get('data')

  if ((action !== 'confirm' && action !== 'decline') || !data) {
    return html('Invalid Request', '⚠️', 'Something Went Wrong', 'Invalid request.', '#888', 400)
  }

  const payload = decodeBookingToken(data)
  if (!payload) {
    return html('Error', '⚠️', 'Something Went Wrong', 'Could not read booking data. Please contact the guest directly.', '#888', 400)
  }

  const key = `${payload.reference}:${action}`

  if (respondedRefs.has(key)) {
    const label = action === 'confirm' ? 'Confirmation' : 'Decline'
    return html(
      'Already Sent',
      'ℹ️',
      'Already Sent',
      `The ${label.toLowerCase()} email for booking <strong style="color:#ccc">${payload.reference}</strong> has already been sent to the guest.`,
      '#888'
    )
  }

  try {
    if (action === 'confirm') {
      await sendDiningConfirmation(payload)
    } else {
      await sendDiningDecline(payload)
    }
    respondedRefs.add(key)
    const isConfirm = action === 'confirm'
    return html(
      isConfirm ? 'Confirmation Sent' : 'Decline Sent',
      isConfirm ? '✅' : '❌',
      isConfirm ? 'Confirmation Sent' : 'Decline Sent',
      isConfirm
        ? 'The booking confirmation email has been sent to the guest.'
        : 'The decline email has been sent to the guest.',
      isConfirm ? '#4CAF50' : '#C23B5C'
    )
  } catch (err) {
    console.error('[/api/booking/respond] error:', err)
    return html('Error', '⚠️', 'Something Went Wrong', 'Failed to send email. Please try again or contact the guest directly.', '#888', 500)
  }
}
