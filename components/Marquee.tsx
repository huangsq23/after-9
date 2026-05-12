'use client'

const SEGMENT = 'BOOK YOUR KTV ROOM ◆ DINE WITH US TONIGHT ◆ OPEN 5PM – 2AM ◆ '

export default function Marquee() {
  return (
    <div style={{ overflow: 'hidden', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '18px 0', background: 'var(--surface)' }}>
      <div
        className="marquee-track"
        style={{
          color: 'var(--gold)',
          fontSize: '0.8125rem',
          letterSpacing: '0.2em',
          fontWeight: 500,
          opacity: 0.8,
          whiteSpace: 'nowrap',
        }}
      >
        {SEGMENT.repeat(12)}
      </div>
    </div>
  )
}
