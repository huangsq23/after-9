import { NextRequest } from 'next/server'
import { verifyBookingToken } from '../../../../lib/token'
import { sendDiningConfirmation, sendDiningDecline } from '../../../../lib/email'

function resultPage(action: 'confirm' | 'decline', ok: boolean, error?: string) {
  const isConfirm = action === 'confirm'
  const accentColor = ok ? (isConfirm ? '#4CAF50' : '#C23B5C') : '#888'
  const icon = ok ? (isConfirm ? '✅' : '❌') : '⚠️'
  const heading = ok
    ? isConfirm ? 'Confirmation Sent' : 'Decline Sent'
    : 'Something Went Wrong'
  const body = ok
    ? isConfirm
      ? 'The booking confirmation email has been sent to the guest.'
      : 'The decline email has been sent to the guest.'
    : error ?? 'An unexpected error occurred. Please contact the guest directly.'

  return new Response(
    `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${heading} — After 9</title>
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
    { status: ok ? 200 : 500, headers: { 'Content-Type': 'text/html; charset=utf-8' } }
  )
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const action = searchParams.get('action')
  const data = searchParams.get('data')

  if ((action !== 'confirm' && action !== 'decline') || !data) {
    return resultPage('confirm', false, 'Invalid request.')
  }

  const payload = verifyBookingToken(data)
  if (!payload) {
    return resultPage(action, false, 'Invalid or tampered link. Please contact the guest directly.')
  }

  try {
    if (action === 'confirm') {
      await sendDiningConfirmation(payload)
    } else {
      await sendDiningDecline(payload)
    }
    return resultPage(action, true)
  } catch (err) {
    console.error('[/api/booking/respond] error:', err)
    return resultPage(action, false, 'Failed to send email. Please try again or contact the guest directly.')
  }
}
