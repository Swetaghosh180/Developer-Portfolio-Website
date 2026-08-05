import { useState, useRef, memo } from 'react'
import { motion, useSpring, useTransform } from 'framer-motion'
import { RiGithubLine, RiExternalLinkLine } from 'react-icons/ri'

const ease = [0.22, 1, 0.36, 1]

const STATUS = {
  featured:   { label: '⭐ Featured',    bg: 'linear-gradient(135deg,#7c3aed,#6366f1)', color: '#fff',    glow: 'rgba(99,102,241,0.55)',  border: 'none' },
  inprogress: { label: '🚧 In Progress', bg: 'rgba(234,88,12,0.14)',                    color: '#fb923c', glow: 'rgba(234,88,12,0.4)',   border: '1px solid rgba(234,88,12,0.28)' },
  production: { label: '🚀 Production',  bg: 'rgba(22,163,74,0.12)',                    color: '#4ade80', glow: 'rgba(34,197,94,0.38)',  border: '1px solid rgba(34,197,94,0.24)' },
  live:       { label: '🟢 Live',        bg: 'rgba(34,197,94,0.12)',                    color: '#22c55e', glow: 'rgba(34,197,94,0.45)',  border: '1px solid rgba(34,197,94,0.28)' },
}

const CAT = {
  'AI/ML':            { color: '#a78bfa', bg: 'rgba(167,139,250,0.13)', border: 'rgba(167,139,250,0.28)' },
  'Machine Learning': { color: '#f59e0b', bg: 'rgba(245,158,11,0.11)',  border: 'rgba(245,158,11,0.26)'  },
  'Computer Vision':  { color: '#ec4899', bg: 'rgba(236,72,153,0.11)',  border: 'rgba(236,72,153,0.24)'  },
  'React':            { color: '#61dafb', bg: 'rgba(97,218,251,0.1)',   border: 'rgba(97,218,251,0.24)'  },
  'Vue':              { color: '#42b883', bg: 'rgba(66,184,131,0.11)',  border: 'rgba(66,184,131,0.24)'  },
  'JavaScript':       { color: '#fbbf24', bg: 'rgba(251,191,36,0.1)',   border: 'rgba(251,191,36,0.24)'  },
  'Portfolio':        { color: '#818cf8', bg: 'rgba(129,140,248,0.11)', border: 'rgba(129,140,248,0.24)' },
}

const ProjectCard = memo(function ProjectCard({ project }) {
  const {
    title, shortDesc, image, tags, github, demo,
    status = 'production', category, highlights,
    accentColor = '#6366f1',
  } = project

  const [hov, setHov] = useState(false)
  const cardRef  = useRef(null)
  const isDesk   = useRef(
    typeof window !== 'undefined' &&
    window.matchMedia('(hover: hover) and (min-width: 768px)').matches
  )

  /* Spring values */
  const rotX  = useSpring(0,  { stiffness: 160, damping: 26 })
  const rotY  = useSpring(0,  { stiffness: 160, damping: 26 })
  const glowX = useSpring(50, { stiffness: 110, damping: 24 })
  const glowY = useSpring(50, { stiffness: 110, damping: 24 })
  const lift  = useSpring(0,  { stiffness: 200, damping: 22 })

  const onMove = e => {
    if (!isDesk.current) return
    const el = cardRef.current
    if (!el) return
    const r  = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top)  / r.height
    rotX.set((py - 0.5) * -5)
    rotY.set((px - 0.5) *  5)
    glowX.set(px * 100)
    glowY.set(py * 100)
  }
  const onEnter = () => { setHov(true);  lift.set(-6) }
  const onLeave = () => {
    setHov(false); lift.set(0)
    rotX.set(0); rotY.set(0)
    glowX.set(50); glowY.set(50)
  }

  const glowBg = useTransform(
    [glowX, glowY],
    ([x, y]) => `radial-gradient(circle at ${x}% ${y}%, ${accentColor}1a 0%, transparent 58%)`
  )

  const st  = STATUS[status] || STATUS.production
  const cat = CAT[category]  || CAT['Portfolio']
  const isFeatured = status === 'featured'

  return (
    <motion.article
      ref={cardRef}
      onMouseMove={onMove}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      tabIndex={0}
      aria-label={`Project: ${title}`}
      onFocus={onEnter}
      onBlur={onLeave}
      style={{
        y: lift,
        rotateX: rotX,
        rotateY: rotY,
        transformStyle: 'preserve-3d',
        transformPerspective: 1100,
        /* Featured card gets a subtle accent border at rest */
        background: isFeatured
          ? 'rgba(99,102,241,0.04)'
          : 'rgba(13,18,32,0.85)',
        border: hov
          ? `1px solid ${accentColor}45`
          : isFeatured
            ? '1px solid rgba(99,102,241,0.22)'
            : '1px solid rgba(255,255,255,0.07)',
        borderRadius: '20px',
        overflow: 'hidden',
        display: 'flex', flexDirection: 'column', height: '100%',
        boxShadow: hov
          ? `0 0 0 1px ${accentColor}20, 0 28px 70px rgba(0,0,0,0.55), 0 8px 28px ${accentColor}18`
          : isFeatured
            ? `0 4px 32px rgba(99,102,241,0.12), 0 2px 8px rgba(0,0,0,0.3)`
            : '0 2px 14px rgba(0,0,0,0.28)',
        transition: 'border-color 0.28s, box-shadow 0.28s, background 0.28s',
        position: 'relative',
        willChange: 'transform',
        outline: 'none',
        cursor: 'default',
      }}
      /* Keyboard focus ring */
      onKeyDown={e => {
        if (e.key === 'Enter' && github) window.open(github, '_blank', 'noreferrer')
      }}
    >
      {/* Focus ring — visible only on keyboard nav */}
      <div style={{
        position: 'absolute', inset: -2, borderRadius: '22px',
        border: `2px solid ${accentColor}`,
        opacity: 0, pointerEvents: 'none', zIndex: 10,
        transition: 'opacity 0.2s',
      }} className="card-focus-ring" />

      {/* Cursor-tracked glow */}
      <motion.div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1,
        background: glowBg, borderRadius: 'inherit',
        opacity: hov ? 1 : 0, transition: 'opacity 0.3s',
      }} />

      {/* Top shimmer line */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 1, zIndex: 2,
        background: hov
          ? `linear-gradient(90deg, transparent, ${accentColor}70, rgba(167,139,250,0.45), transparent)`
          : isFeatured
            ? 'linear-gradient(90deg, transparent, rgba(99,102,241,0.35), transparent)'
            : 'linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)',
        transition: 'background 0.3s', pointerEvents: 'none',
      }} />

      {/* ── IMAGE AREA ── */}
      <div style={{
        height: 196, overflow: 'hidden', position: 'relative', flexShrink: 0,
        background: `linear-gradient(135deg, ${accentColor}18, rgba(13,18,32,0.9))`,
      }}>
        <motion.img
          src={image}
          alt={`${title} — project screenshot`}
          loading="lazy"
          decoding="async"
          animate={{
            scale: hov ? 1.07 : 1,
            filter: hov ? 'brightness(1.1) saturate(1.05)' : 'brightness(0.88) saturate(0.95)',
          }}
          transition={{ duration: 0.48, ease }}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          onError={e => { e.currentTarget.style.opacity = '0' }}
        />

        {/* Gradient overlay — stronger at bottom */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'linear-gradient(to top, rgba(13,18,32,0.98) 0%, rgba(13,18,32,0.35) 50%, rgba(13,18,32,0.05) 100%)',
        }} />

        {/* Category pill — top left */}
        <div style={{
          position: 'absolute', top: '0.7rem', left: '0.7rem', zIndex: 4,
          display: 'inline-flex', alignItems: 'center',
          background: cat.bg,
          border: `1px solid ${cat.border}`,
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          borderRadius: '6px',
          padding: '0.2rem 0.58rem',
          fontSize: '0.62rem', fontWeight: 700, color: cat.color,
          letterSpacing: '0.05em', textTransform: 'uppercase',
          userSelect: 'none',
        }}>
          {category}
        </div>

        {/* Status badge — top right */}
        <motion.div
          animate={{
            boxShadow: hov
              ? `0 0 16px ${st.glow}, 0 0 6px ${st.glow}`
              : '0 0 0px transparent',
          }}
          transition={{ duration: 0.28 }}
          style={{
            position: 'absolute', top: '0.7rem', right: '0.7rem', zIndex: 4,
            display: 'inline-flex', alignItems: 'center',
            background: st.bg,
            border: st.border || 'none',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            borderRadius: '6px',
            padding: '0.2rem 0.62rem',
            fontSize: '0.62rem', fontWeight: 700, color: st.color,
            letterSpacing: '0.03em',
            userSelect: 'none',
          }}
        >
          {st.label}
        </motion.div>
      </div>

      {/* ── CARD BODY ── */}
      <div style={{
        padding: '1.15rem 1.2rem 1.2rem',
        display: 'flex', flexDirection: 'column', gap: '0.8rem',
        flex: 1, position: 'relative', zIndex: 1,
      }}>

        {/* Title */}
        <h3 style={{
          margin: 0,
          fontWeight: 800, fontSize: '1.01rem',
          color: '#f1f5f9', letterSpacing: '-0.025em', lineHeight: 1.22,
        }}>
          {title}
        </h3>

        {/* Short description — hard 2-line clamp */}
        <p style={{
          margin: 0,
          fontSize: '0.8rem', color: '#64748b', lineHeight: 1.68,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}>
          {shortDesc}
        </p>

        {/* Highlights — 2×2 grid */}
        {highlights?.length > 0 && (
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr',
            gap: '0.28rem 0.6rem',
          }}>
            {highlights.slice(0, 4).map(h => (
              <div key={h} style={{ display: 'flex', alignItems: 'center', gap: '0.32rem' }}>
                <span style={{
                  color: accentColor, fontSize: '0.68rem',
                  fontWeight: 900, flexShrink: 0, lineHeight: 1,
                }}>✓</span>
                <span style={{
                  fontSize: '0.71rem', color: '#94a3b8',
                  fontWeight: 500, letterSpacing: '-0.005em',
                  whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                }}>{h}</span>
              </div>
            ))}
          </div>
        )}

        {/* Tech stack pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.28rem', marginTop: 'auto' }}>
          {tags.map(t => (
            <motion.span
              key={t}
              whileHover={{ scale: 1.1, y: -1 }}
              transition={{ type: 'spring', stiffness: 420, damping: 18 }}
              style={{
                background: hov ? `${accentColor}12` : 'rgba(255,255,255,0.04)',
                color: hov ? accentColor : '#475569',
                border: `1px solid ${hov ? `${accentColor}28` : 'rgba(255,255,255,0.07)'}`,
                padding: '0.16rem 0.52rem',
                borderRadius: '5px',
                fontSize: '0.63rem',
                fontWeight: 600,
                letterSpacing: '0.025em',
                transition: 'color 0.22s, border-color 0.22s, background 0.22s',
                cursor: 'default',
                userSelect: 'none',
              }}
            >{t}</motion.span>
          ))}
        </div>

        {/* Separator */}
        <div style={{
          height: 1,
          background: hov
            ? `linear-gradient(90deg, transparent, ${accentColor}25, transparent)`
            : 'rgba(255,255,255,0.05)',
          transition: 'background 0.3s',
        }} />

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {github && (
            <motion.a
              href={github}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`View ${title} source code on GitHub (opens in new tab)`}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 380, damping: 20 }}
              style={{
                flex: 1,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.38rem',
                padding: '0.5rem 0.7rem',
                borderRadius: '9px',
                fontSize: '0.74rem', fontWeight: 700,
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#94a3b8',
                textDecoration: 'none',
                transition: 'color 0.2s, border-color 0.2s, background 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = '#f1f5f9'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'
                e.currentTarget.style.background = 'rgba(255,255,255,0.08)'
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(255,255,255,0.06)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = '#94a3b8'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
                e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <RiGithubLine size={13} aria-hidden="true" />
              Source Code
            </motion.a>
          )}

          {demo && demo !== '#' && (
            <motion.a
              href={demo}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`View ${title} live demo (opens in new tab)`}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 380, damping: 20 }}
              style={{
                flex: 1,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.38rem',
                padding: '0.5rem 0.7rem',
                borderRadius: '9px',
                fontSize: '0.74rem', fontWeight: 700,
                background: `linear-gradient(135deg, ${accentColor} 0%, #4f46e5 100%)`,
                color: '#fff',
                textDecoration: 'none',
                boxShadow: `0 3px 12px ${accentColor}30`,
                transition: 'box-shadow 0.22s, filter 0.22s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow = `0 6px 22px ${accentColor}55`
                e.currentTarget.style.filter = 'brightness(1.08)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = `0 3px 12px ${accentColor}30`
                e.currentTarget.style.filter = 'none'
              }}
            >
              <RiExternalLinkLine size={13} aria-hidden="true" />
              Live Demo
            </motion.a>
          )}
        </div>
      </div>
    </motion.article>
  )
})

export default ProjectCard
