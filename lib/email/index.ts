import { Resend } from 'resend'
import { signBookingToken, BookingPayload } from '../token'

function getResend() {
  const key = process.env.RESEND_API_KEY
  if (!key) throw new Error('RESEND_API_KEY environment variable is not set')
  return new Resend(key)
}

const FROM = 'After 9 <bookings@after9bar-newcastle.co.uk>'

function getNotifyEmail() {
  return process.env.BOOKING_NOTIFY_EMAIL ?? 'huangsq0716@gmail.com'
}

function getBaseUrl(): string {
  if (process.env.APP_URL) return process.env.APP_URL
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
  return 'http://localhost:3000'
}

// ── New venue-notification functions (used by unified /api/bookings route) ──

export async function sendKaraokeNotification({
  reference, name, phone, roomLabel, date, startTime, duration, guests, notes,
}: {
  reference: string
  name: string
  phone: string
  roomLabel: string
  date: string
  startTime: string
  duration: number
  guests: number
  notes?: string
}) {
  const html = emailWrapper(`
    <h2 style="color:#C9A84C;font-size:22px;margin:0 0 8px;">New Karaoke Booking</h2>
    <p style="color:#888;margin:0 0 24px;">A new karaoke room enquiry has been submitted.</p>
    <table style="width:100%;border-collapse:collapse;font-size:14px;color:#ccc;">
      <tr><td style="padding:8px 0;border-bottom:1px solid #2a2a2a;color:#777;width:140px;">Reference</td><td style="padding:8px 0;border-bottom:1px solid #2a2a2a;font-weight:600;color:#ededed;">${reference}</td></tr>
      <tr><td style="padding:8px 0;border-bottom:1px solid #2a2a2a;color:#777;">Name</td><td style="padding:8px 0;border-bottom:1px solid #2a2a2a;">${name}</td></tr>
      <tr><td style="padding:8px 0;border-bottom:1px solid #2a2a2a;color:#777;">Phone</td><td style="padding:8px 0;border-bottom:1px solid #2a2a2a;">${phone}</td></tr>
      <tr><td style="padding:8px 0;border-bottom:1px solid #2a2a2a;color:#777;">Room</td><td style="padding:8px 0;border-bottom:1px solid #2a2a2a;">${roomLabel} Room</td></tr>
      <tr><td style="padding:8px 0;border-bottom:1px solid #2a2a2a;color:#777;">Date</td><td style="padding:8px 0;border-bottom:1px solid #2a2a2a;">${date}</td></tr>
      <tr><td style="padding:8px 0;border-bottom:1px solid #2a2a2a;color:#777;">Start Time</td><td style="padding:8px 0;border-bottom:1px solid #2a2a2a;">${startTime}</td></tr>
      <tr><td style="padding:8px 0;border-bottom:1px solid #2a2a2a;color:#777;">Duration</td><td style="padding:8px 0;border-bottom:1px solid #2a2a2a;">${duration} hour${duration > 1 ? 's' : ''}</td></tr>
      <tr><td style="padding:8px 0;${notes ? 'border-bottom:1px solid #2a2a2a;' : ''}color:#777;">Guests</td><td style="padding:8px 0;${notes ? 'border-bottom:1px solid #2a2a2a;' : ''}">${guests}</td></tr>
      ${notes ? `<tr><td style="padding:8px 0;color:#777;">Notes</td><td style="padding:8px 0;">${notes}</td></tr>` : ''}
    </table>
  `)

  await getResend().emails.send({
    from: FROM,
    to: getNotifyEmail(),
    subject: `[Karaoke Booking] ${reference} — ${name}`,
    html,
  })
}

export async function sendDiningNotification({
  reference, name, phone, email, date, time, guests, notes,
}: {
  reference: string
  name: string
  phone: string
  email: string
  date: string
  time: string
  guests: number
  notes?: string
}) {
  const detailsTable = `
    <table style="width:100%;border-collapse:collapse;font-size:14px;color:#ccc;">
      <tr><td style="padding:8px 0;border-bottom:1px solid #2a2a2a;color:#777;width:140px;">Reference</td><td style="padding:8px 0;border-bottom:1px solid #2a2a2a;font-weight:600;color:#ededed;">${reference}</td></tr>
      <tr><td style="padding:8px 0;border-bottom:1px solid #2a2a2a;color:#777;">Name</td><td style="padding:8px 0;border-bottom:1px solid #2a2a2a;">${name}</td></tr>
      <tr><td style="padding:8px 0;border-bottom:1px solid #2a2a2a;color:#777;">Phone</td><td style="padding:8px 0;border-bottom:1px solid #2a2a2a;">${phone}</td></tr>
      <tr><td style="padding:8px 0;border-bottom:1px solid #2a2a2a;color:#777;">Date</td><td style="padding:8px 0;border-bottom:1px solid #2a2a2a;">${date}</td></tr>
      <tr><td style="padding:8px 0;border-bottom:1px solid #2a2a2a;color:#777;">Time</td><td style="padding:8px 0;border-bottom:1px solid #2a2a2a;">${time}</td></tr>
      <tr><td style="padding:8px 0;${notes ? 'border-bottom:1px solid #2a2a2a;' : ''}color:#777;">Guests</td><td style="padding:8px 0;${notes ? 'border-bottom:1px solid #2a2a2a;' : ''}">${guests} ${guests > 1 ? 'people' : 'person'}</td></tr>
      ${notes ? `<tr><td style="padding:8px 0;color:#777;">Notes</td><td style="padding:8px 0;">${notes}</td></tr>` : ''}
    </table>
  `

  const tokenPayload: BookingPayload = { reference, name, email, phone, date, time, guests, notes }
  const token = signBookingToken(tokenPayload)
  const base = getBaseUrl()
  const confirmUrl = `${base}/api/booking/respond?action=confirm&data=${encodeURIComponent(token)}`
  const declineUrl = `${base}/api/booking/respond?action=decline&data=${encodeURIComponent(token)}`

  const actionButtons = `
    <table style="width:100%;margin-top:32px;border-collapse:collapse;">
      <tr>
        <td style="padding-right:8px;">
          <a href="${confirmUrl}" style="display:block;text-align:center;background:#1a4a1a;border:1px solid #2d7a2d;color:#4CAF50;padding:14px 20px;font-size:14px;font-family:Georgia,serif;text-decoration:none;border-radius:3px;">✅ Confirm Booking</a>
        </td>
        <td style="padding-left:8px;">
          <a href="${declineUrl}" style="display:block;text-align:center;background:#3a1018;border:1px solid #7a1a30;color:#C23B5C;padding:14px 20px;font-size:14px;font-family:Georgia,serif;text-decoration:none;border-radius:3px;">❌ Decline Booking</a>
        </td>
      </tr>
    </table>
    <p style="color:#555;font-size:12px;margin-top:16px;">Clicking a button will immediately send an email to the guest. Each link can only be used once per response.</p>
  `

  const resend = getResend()
  await Promise.all([
    // Venue notification
    resend.emails.send({
      from: FROM,
      to: getNotifyEmail(),
      subject: `[Table Reservation] ${reference} — ${name}`,
      html: emailWrapper(`
        <h2 style="color:#C23B5C;font-size:22px;margin:0 0 8px;">New Table Reservation</h2>
        <p style="color:#888;margin:0 0 24px;">A new dining reservation has been submitted.</p>
        ${detailsTable}
        <p style="color:#777;font-size:14px;margin-top:16px;"><strong>Email:</strong> ${email}</p>
        ${actionButtons}
      `),
    }),
    // Customer confirmation
    resend.emails.send({
      from: FROM,
      to: email,
      subject: `Reservation Received — After 9 Bar & Kitchen`,
      html: emailWrapper(`
        <h2 style="color:#C23B5C;font-size:22px;margin:0 0 8px;">Reservation Received</h2>
        <p style="color:#888;margin:0 0 24px;">Hi ${name}, we have received your table reservation request. We will be in touch shortly to confirm.</p>
        ${detailsTable}
        <p style="color:#666;font-size:13px;margin-top:24px;">If you have any questions, text or WhatsApp us on <a href="https://wa.me/447552791612" style="color:#C23B5C;">07552 791612</a>.</p>
        <p style="color:#555;font-size:12px;margin-top:32px;">After 9 · 45-51 Stowell Street, Newcastle NE1 4YB</p>
      `),
    }),
  ])
}

export async function sendDiningConfirmation(payload: BookingPayload) {
  const { name, email, date, time, guests, reference, notes } = payload
  const detailsTable = buildDiningDetailsTable({ reference, name, date, time, guests, notes })
  await getResend().emails.send({
    from: FROM,
    to: email,
    subject: `Booking Confirmed — After 9 Bar & Kitchen`,
    html: emailWrapper(`
      <h2 style="color:#4CAF50;font-size:22px;margin:0 0 8px;">Booking Confirmed</h2>
      <p style="color:#888;margin:0 0 24px;">Hi ${name}, great news — your table reservation has been confirmed. We look forward to seeing you!</p>
      ${detailsTable}
      <p style="color:#666;font-size:13px;margin-top:24px;">If you have any questions or need to make changes, text or WhatsApp us on <a href="https://wa.me/447552791612" style="color:#C23B5C;">07552 791612</a>.</p>
      <p style="color:#555;font-size:12px;margin-top:8px;">After 9 · 45-51 Stowell Street, Newcastle NE1 4YB</p>
    `),
  })
}

export async function sendDiningDecline(payload: BookingPayload) {
  const { name, email, date, time } = payload
  await getResend().emails.send({
    from: FROM,
    to: email,
    subject: `Booking Update — After 9 Bar & Kitchen`,
    html: emailWrapper(`
      <h2 style="color:#C23B5C;font-size:22px;margin:0 0 8px;">Booking Update</h2>
      <p style="color:#888;margin:0 0 16px;">Hi ${name}, we're sorry to let you know that we are unable to accommodate your table reservation for <strong style="color:#ededed;">${date}</strong> at <strong style="color:#ededed;">${time}</strong>.</p>
      <p style="color:#888;margin:0 0 24px;">We'd love to find an alternative time that works for you. Please get in touch and we'll do our best to arrange something.</p>
      <p style="color:#666;font-size:13px;margin-top:8px;">Text or WhatsApp us on <a href="https://wa.me/447552791612" style="color:#C23B5C;">07552 791612</a> and we'll find a slot that suits you.</p>
      <p style="color:#555;font-size:12px;margin-top:32px;">After 9 · 45-51 Stowell Street, Newcastle NE1 4YB</p>
    `),
  })
}

function buildDiningDetailsTable({ reference, name, date, time, guests, notes }: {
  reference: string; name: string; date: string; time: string; guests: number; notes?: string
}) {
  return `
    <table style="width:100%;border-collapse:collapse;font-size:14px;color:#ccc;">
      <tr><td style="padding:8px 0;border-bottom:1px solid #2a2a2a;color:#777;width:140px;">Reference</td><td style="padding:8px 0;border-bottom:1px solid #2a2a2a;font-weight:600;color:#ededed;">${reference}</td></tr>
      <tr><td style="padding:8px 0;border-bottom:1px solid #2a2a2a;color:#777;">Name</td><td style="padding:8px 0;border-bottom:1px solid #2a2a2a;">${name}</td></tr>
      <tr><td style="padding:8px 0;border-bottom:1px solid #2a2a2a;color:#777;">Date</td><td style="padding:8px 0;border-bottom:1px solid #2a2a2a;">${date}</td></tr>
      <tr><td style="padding:8px 0;border-bottom:1px solid #2a2a2a;color:#777;">Time</td><td style="padding:8px 0;border-bottom:1px solid #2a2a2a;">${time}</td></tr>
      <tr><td style="padding:8px 0;${notes ? 'border-bottom:1px solid #2a2a2a;' : ''}color:#777;">Guests</td><td style="padding:8px 0;${notes ? 'border-bottom:1px solid #2a2a2a;' : ''}">${guests} ${guests > 1 ? 'people' : 'person'}</td></tr>
      ${notes ? `<tr><td style="padding:8px 0;color:#777;">Notes</td><td style="padding:8px 0;">${notes}</td></tr>` : ''}
    </table>
  `
}

// ── Legacy functions kept for existing /api/bookings/ktv route ──

export async function sendKtvEmails({
  customerEmail, customerName, reference, roomLabel,
  date, startTime, duration, totalAmount, depositAmount,
}: {
  customerEmail: string
  customerName: string
  reference: string
  roomLabel: string
  date: string
  startTime: string
  duration: number
  totalAmount: number
  depositAmount: number
}) {
  const details = `
    <table style="width:100%;border-collapse:collapse;font-size:14px;color:#ccc;">
      <tr><td style="padding:8px 0;border-bottom:1px solid #2a2a2a;color:#777;">Booking Ref</td><td style="padding:8px 0;border-bottom:1px solid #2a2a2a;font-weight:600;color:#ededed;">${reference}</td></tr>
      <tr><td style="padding:8px 0;border-bottom:1px solid #2a2a2a;color:#777;">Room</td><td style="padding:8px 0;border-bottom:1px solid #2a2a2a;">${roomLabel}</td></tr>
      <tr><td style="padding:8px 0;border-bottom:1px solid #2a2a2a;color:#777;">Date</td><td style="padding:8px 0;border-bottom:1px solid #2a2a2a;">${date}</td></tr>
      <tr><td style="padding:8px 0;border-bottom:1px solid #2a2a2a;color:#777;">Start Time</td><td style="padding:8px 0;border-bottom:1px solid #2a2a2a;">${startTime}</td></tr>
      <tr><td style="padding:8px 0;border-bottom:1px solid #2a2a2a;color:#777;">Duration</td><td style="padding:8px 0;border-bottom:1px solid #2a2a2a;">${duration} hour${duration > 1 ? 's' : ''}</td></tr>
      <tr><td style="padding:8px 0;border-bottom:1px solid #2a2a2a;color:#777;">Deposit Due</td><td style="padding:8px 0;border-bottom:1px solid #2a2a2a;color:#C9A84C;font-weight:600;">£${depositAmount}</td></tr>
      <tr><td style="padding:8px 0;color:#777;">Total</td><td style="padding:8px 0;font-weight:600;">£${totalAmount}</td></tr>
    </table>
  `

  const resend = getResend()
  await Promise.all([
    resend.emails.send({
      from: FROM,
      to: customerEmail,
      subject: `KTV Booking Confirmed — ${reference}`,
      html: emailWrapper(`
        <h2 style="color:#C9A84C;font-size:22px;margin:0 0 8px;">Booking Confirmed</h2>
        <p style="color:#888;margin:0 0 24px;">Hi ${customerName}, your KTV room is booked. See you soon!</p>
        ${details}
        <p style="color:#555;font-size:12px;margin-top:32px;">After 9 · 45-51 Stowell Street, Newcastle NE1 4YB · 07552 791612</p>
      `),
    }),
    resend.emails.send({
      from: FROM,
      to: getNotifyEmail(),
      subject: `[New KTV Booking] ${reference} — ${customerName}`,
      html: emailWrapper(`
        <h2 style="color:#C9A84C;font-size:22px;margin:0 0 8px;">New KTV Booking</h2>
        <p style="color:#888;margin:0 0 24px;">A new KTV booking has been made.</p>
        ${details}
        <p style="color:#777;font-size:14px;margin-top:16px;"><strong>Customer:</strong> ${customerName} &lt;${customerEmail}&gt;</p>
      `),
    }),
  ])
}

function emailWrapper(content: string) {
  return `
    <!DOCTYPE html>
    <html>
    <body style="margin:0;padding:0;background:#0a0a0a;font-family:Georgia,serif;">
      <div style="max-width:560px;margin:40px auto;background:#141414;border:1px solid #2a2a2a;border-radius:4px;overflow:hidden;">
        <div style="background:#0a0a0a;padding:24px 32px;border-bottom:1px solid #2a2a2a;">
          <span style="font-size:20px;color:#C9A84C;letter-spacing:0.05em;font-weight:400;">AFTER 9</span>
          <span style="font-size:12px;color:#555;margin-left:12px;letter-spacing:0.1em;">BAR & KITCHEN</span>
        </div>
        <div style="padding:32px;">
          ${content}
        </div>
      </div>
    </body>
    </html>
  `
}
