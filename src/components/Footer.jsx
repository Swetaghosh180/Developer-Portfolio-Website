import { motion } from 'framer-motion'
import { RiGithubLine, RiLinkedinBoxLine, RiMailLine, RiHeartFill, RiExternalLinkLine } from 'react-icons/ri'

const socials = [
  { icon: RiGithubLine,      href: 'https://github.com/Swetaghosh180',       label: 'GitHub',   color: '#f1f5f9' },
  { icon: RiLinkedinBoxLine, href: 'https://linkedin.com/in/swetaghosh05',    label: 'LinkedIn', color: '#0a66c2' },
  { icon: RiMailLine,        href: 'mailto:swetaghosh665@gmail.com',          label: 'Email',    color: '#6366f1' },
  { icon: RiExternalLinkLine, href: '/portfolio',                            label: 'Portfolio', color: '#818cf8' },
]

const stack = ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vite', 'FastAPI']

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid rgba(255,255,255,0.06)',
      padding: '2.5rem 1.5rem 2rem',
      position: 'relative',
    }}>
      {/* Top accent line */}
      <div style={{
        position: 'absolute', top: 0, left: '10%', right: '10%', height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.3), transparent)',
        pointerEvents: 'none',
      }} />

      <div style={{
        maxWidth: 880, margin: '0 auto',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem',
      }}>

        {/* Built with */}
        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center', gap: '0.4rem' }}>
          <span style={{ fontSize: '0.68rem', color: '#334155', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            Built with
          </span>
          {stack.map((s, i) => (
            <span key={s} style={{
              fontSize: '0.68rem', fontWeight: 700,
              color: '#475569',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '6px',
              padding: '0.15rem 0.55rem',
              letterSpacing: '0.02em',
            }}>{s}</span>
          ))}
        </div>

        {/* Socials */}
        <div style={{ display: 'flex', gap: '0.65rem' }}>
          {socials.map(({ icon: Icon, href, label, color }) => (
            <motion.a
              key={label}
              href={href}
              target={href.startsWith('mailto') ? undefined : '_blank'}
              rel="noreferrer"
              aria-label={label}
              whileHover={{ y: -3, scale: 1.1 }}
              whileTap={{ scale: 0.92 }}
              transition={{ type: 'spring', stiffness: 380, damping: 20 }}
              style={{
                width: 36, height: 36, borderRadius: '10px',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.07)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#475569', textDecoration: 'none',
                transition: 'color 0.2s, border-color 0.2s, background 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = color
                e.currentTarget.style.borderColor = `${color}40`
                e.currentTarget.style.background = `${color}10`
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = '#475569'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
                e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
              }}
            >
              <Icon size={15} />
            </motion.a>
          ))}
        </div>

        {/* Copyright */}
        <p style={{
          fontSize: '0.75rem', color: '#1e293b',
          display: 'flex', alignItems: 'center', gap: '0.35rem',
          letterSpacing: '0.01em',
        }}>
          © 2026 Sweta Ghosh · Made with <RiHeartFill size={11} color="#6366f1" /> and lots of coffee
        </p>

      </div>
    </footer>
  )
}
