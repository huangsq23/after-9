import { ExternalLink } from 'lucide-react'

export const metadata = {
  title: 'Our Menu — After 9 Bar & Kitchen',
}

const menus = [
  {
    title: 'Classic Dinner Menu',
    href: '/Classic_Dinner_Menu.pdf',
  },
  {
    title: 'Authentic Chinese Food & BBQ',
    href: '/Authentic_Chinese_Food_and_BBQ_menu.pdf',
  },
  {
    title: 'Drinks Menu',
    href: null,
  },
]

export default function MenuPage() {
  return (
    <div className="bg-background min-h-screen">
      {/* Hero */}
      <section className="py-24 px-6" style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-6xl mx-auto">
          <p
            className="text-xs uppercase mb-6"
            style={{ color: 'var(--gold)', letterSpacing: '0.3em' }}
          >
            After 9 Bar &amp; Kitchen
          </p>
          <h1
            className="font-display font-light text-foreground"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
          >
            Our Menu
          </h1>
        </div>
      </section>

      {/* Cards grid */}
      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {menus.map((menu) => {
            if (menu.href) {
              return (
                <a
                  key={menu.title}
                  href={menu.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex flex-col items-center justify-center text-center transition-transform duration-300 hover:scale-[1.03]"
                  style={{
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    borderRadius: '2px',
                    padding: '3.5rem 2rem',
                    minHeight: '260px',
                    textDecoration: 'none',
                  }}
                >
                  {/* Gold border overlay on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      border: '1px solid var(--gold)',
                      borderRadius: '2px',
                      pointerEvents: 'none',
                    }}
                  />

                  <h2
                    className="font-display font-light text-foreground group-hover:text-gold transition-colors duration-300"
                    style={{
                      fontSize: 'clamp(1.4rem, 2.2vw, 1.875rem)',
                      lineHeight: 1.3,
                    }}
                  >
                    {menu.title}
                  </h2>

                  <div
                    className="mt-8 flex items-center gap-1.5 text-xs uppercase group-hover:text-gold transition-colors duration-300"
                    style={{ color: 'var(--text-muted)', letterSpacing: '0.18em' }}
                  >
                    <span>View Menu</span>
                    <ExternalLink size={11} />
                  </div>
                </a>
              )
            }

            return (
              <div
                key={menu.title}
                className="relative flex flex-col items-center justify-center text-center"
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: '2px',
                  padding: '3.5rem 2rem',
                  minHeight: '260px',
                  opacity: 0.45,
                  cursor: 'not-allowed',
                }}
              >
                <div className="absolute top-4 right-4">
                  <span
                    className="text-xs uppercase"
                    style={{
                      padding: '3px 8px',
                      background: 'var(--surface-2)',
                      border: '1px solid var(--border)',
                      color: 'var(--text-dim)',
                      letterSpacing: '0.12em',
                      borderRadius: '2px',
                    }}
                  >
                    Coming Soon
                  </span>
                </div>

                <h2
                  className="font-display font-light"
                  style={{
                    fontSize: 'clamp(1.4rem, 2.2vw, 1.875rem)',
                    color: 'var(--text-muted)',
                    lineHeight: 1.3,
                  }}
                >
                  {menu.title}
                </h2>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
