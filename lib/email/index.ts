import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const STORE_EMAIL = 'Jiuhou2023@gmail.com'
const FROM = 'After 9 <onboarding@resend.dev>'

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
      <tr><td style="padding:8px 0;border-bottom:1px solid #2a2a2a;color:#777;">Deposit Due</td><td style="padding:8px 0;border-bottom:1px solid #2a2a2a;color:#E8601C;font-weight:600;">£${depositAmount}</td></tr>
      <tr><td style="padding:8px 0;color:#777;">Total</td><td style="padding:8px 0;font-weight:600;">£${totalAmount}</td></tr>
    </table>
  `

  const customerHtml = emailWrapper(`
    <h2 style="color:#E8601C;font-size:22px;margin:0 0 8px;">Booking Confirmed</h2>
    <p style="color:#888;margin:0 0 24px;">Hi ${customerName}, your KTV room is booked. See you soon!</p>
    ${details}
    <p style="color:#666;font-size:13px;margin-top:24px;">Deposit of <strong style="color:#E8601C;">£${depositAmount}</strong> is required to secure your booking. Free cancellation up to 48 hours before your session.</p>
    <p style="color:#555;font-size:12px;margin-top:32px;">After 9 · 45-51 Stowell Street, Newcastle NE1 4YB · 07552 791612</p>
  `)

  const storeHtml = emailWrapper(`
    <h2 style="color:#E8601C;font-size:22px;margin:0 0 8px;">New KTV Booking</h2>
    <p style="color:#888;margin:0 0 24px;">A new KTV booking has been made.</p>
    ${details}
    <p style="color:#777;font-size:14px;margin-top:16px;"><strong>Customer:</strong> ${customerName} &lt;${customerEmail}&gt;</p>
  `)

  await Promise.all([
    resend.emails.send({
      from: FROM,
      to: customerEmail,
      subject: `KTV Booking Confirmed — ${reference}`,
      html: customerHtml,
    }),
    resend.emails.send({
      from: FROM,
      to: STORE_EMAIL,
      subject: `[New KTV Booking] ${reference} — ${customerName}`,
      html: storeHtml,
    }),
  ])
}

export async function sendDiningEmails({
  customerEmail, customerName, reference,
  date, time, guests, dietaryNotes,
}: {
  customerEmail: string
  customerName: string
  reference: string
  date: string
  time: string
  guests: number
  dietaryNotes?: string
}) {
  const details = `
    <table style="width:100%;border-collapse:collapse;font-size:14px;color:#ccc;">
      <tr><td style="padding:8px 0;border-bottom:1px solid #2a2a2a;color:#777;">Booking Ref</td><td style="padding:8px 0;border-bottom:1px solid #2a2a2a;font-weight:600;color:#ededed;">${reference}</td></tr>
      <tr><td style="padding:8px 0;border-bottom:1px solid #2a2a2a;color:#777;">Date</td><td style="padding:8px 0;border-bottom:1px solid #2a2a2a;">${date}</td></tr>
      <tr><td style="padding:8px 0;border-bottom:1px solid #2a2a2a;color:#777;">Time</td><td style="padding:8px 0;border-bottom:1px solid #2a2a2a;">${time}</td></tr>
      <tr><td style="padding:8px 0;border-bottom:1px solid #2a2a2a;color:#777;">Guests</td><td style="padding:8px 0;border-bottom:1px solid #2a2a2a;">${guests} ${guests > 1 ? 'people' : 'person'}</td></tr>
      ${dietaryNotes ? `<tr><td style="padding:8px 0;color:#777;">Dietary Notes</td><td style="padding:8px 0;">${dietaryNotes}</td></tr>` : ''}
    </table>
  `

  const customerHtml = emailWrapper(`
    <h2 style="color:#E8601C;font-size:22px;margin:0 0 8px;">Reservation Confirmed</h2>
    <p style="color:#888;margin:0 0 24px;">Hi ${customerName}, your table is reserved. We look forward to seeing you!</p>
    ${details}
    <p style="color:#555;font-size:12px;margin-top:32px;">After 9 · 45-51 Stowell Street, Newcastle NE1 4YB · 07552 791612</p>
  `)

  const storeHtml = emailWrapper(`
    <h2 style="color:#E8601C;font-size:22px;margin:0 0 8px;">New Dining Reservation</h2>
    <p style="color:#888;margin:0 0 24px;">A new table reservation has been made.</p>
    ${details}
    <p style="color:#777;font-size:14px;margin-top:16px;"><strong>Customer:</strong> ${customerName} &lt;${customerEmail}&gt;</p>
  `)

  await Promise.all([
    resend.emails.send({
      from: FROM,
      to: customerEmail,
      subject: `Dining Reservation Confirmed — ${reference}`,
      html: customerHtml,
    }),
    resend.emails.send({
      from: FROM,
      to: STORE_EMAIL,
      subject: `[New Dining Reservation] ${reference} — ${customerName}`,
      html: storeHtml,
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
          <span style="font-size:20px;color:#E8601C;letter-spacing:0.05em;font-weight:400;">AFTER 9</span>
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
