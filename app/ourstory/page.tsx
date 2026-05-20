import Image from 'next/image'
import venueImg from '../../public/venue2.png'

export const metadata = {
  title: 'Our Story — After 9 Bar & Kitchen',
}

const paragraphs = [
  'After 9 was born from a simple belief: that great food, great drinks, and great company belong together — especially after dark.',
  'Nestled in the heart of Newcastle\'s Chinatown on Stowell Street, After 9 is more than just a restaurant. It\'s a place where memorable nights begin with a meal and never have to end too early.',
  'We set out to build something Newcastle hadn\'t seen before — a space where authentic Chinese cuisine meets late-night energy, where private karaoke suites sit alongside a full-service bar, and where every detail is designed to make you stay a little longer.',
  'Our interior draws inspiration from the neon-lit energy of modern Chinese nightlife, blending bold colours, plush seating, and striking design elements to create an atmosphere that feels both luxurious and effortlessly fun. Every corner of After 9 is crafted to be a backdrop for celebrations, catch-ups, and spontaneous nights out.',
  'Whether you\'re sharing plates with friends, singing your heart out in a private room, or simply unwinding at the bar with a cocktail — After 9 is where the night truly begins.',
]

export default function OurStoryPage() {
  return (
    <div className="bg-background min-h-screen">
      {/* Hero */}
      <section className="py-24 px-6" style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-3xl mx-auto">
          <p
            className="text-xs uppercase mb-6"
            style={{ color: 'var(--gold)', letterSpacing: '0.3em' }}
          >
            After 9 Bar &amp; Kitchen
          </p>
          <h1
            className="font-display font-light text-foreground mb-8 leading-tight"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
          >
            Our Story
          </h1>
          {/* Subtitle — gold, larger */}
          <p
            className="font-display font-light leading-snug"
            style={{
              fontSize: 'clamp(1.25rem, 2.5vw, 1.625rem)',
              color: 'var(--gold)',
              borderLeft: '3px solid var(--gold-dark)',
              paddingLeft: '1.25rem',
            }}
          >
            Bringing authentic Chinese flavours and vibrant nightlife to Newcastle.
          </p>
        </div>
      </section>

      {/* Venue image */}
      <section className="px-6 py-12">
        <div className="max-w-3xl mx-auto">
          <div
            className="overflow-hidden w-full"
            style={{ borderRadius: '2px', border: '1px solid var(--border)', maxHeight: '420px' }}
          >
            <Image
              src={venueImg}
              alt="After 9 venue interior"
              className="w-full object-cover"
              style={{ maxHeight: '420px' }}
              priority
            />
          </div>
        </div>
      </section>

      {/* Body copy */}
      <section className="px-6 pb-24">
        <div className="max-w-3xl mx-auto flex flex-col gap-7">
          {paragraphs.map((p, i) => (
            <p
              key={i}
              className="text-text-muted leading-relaxed"
              style={{ fontSize: '1.0625rem', lineHeight: '1.85' }}
            >
              {p}
            </p>
          ))}
        </div>
      </section>
    </div>
  )
}
