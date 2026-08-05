import { useState } from 'react'
import { motion } from 'framer-motion'

export default function SkillCard({ icon: Icon, label, color = '#6366f1', level = '' }) {
  const [hov, setHov] = useState(false)

  return (
    <motion.div
      onHoverStart={() => setHov(true)}
      onHoverEnd={() => setHov(false)}
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 340, damping: 22 }}
      style={{
        background: hov ? `${color}0d` : 'rgba(255,255,255,0.03)',
        border: `1px solid ${hov ? `${color}44` : 'rgba(255,255,255,0.07)'}`,
        borderRadius: '14px',
        padding: '1rem 0.5rem 0.85rem',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.55rem',
        cursor: 'default',
        transition: 'background 0.25s, border-color 0.25s, box-shadow 0.25s, transform 0.18s',
        position: 'relative', overflow: 'hidden',
        boxShadow: hov ? `0 10px 30px ${color}22, inset 0 1px 0 rgba(255,255,255,0.02)` : 'none',
      }}
    >
      {/* Ambient glow */}
      <div style={{
        position: 'absolute', top: -6, left: '50%', transform: 'translateX(-50%)',
        width: 64, height: 64, borderRadius: '50%',
        background: `${color}14`, filter: 'blur(20px)',
        pointerEvents: 'none', opacity: hov ? 1 : 0.45,
        transition: 'opacity 0.25s, transform 0.2s',
      }} />

      {/* Icon box */}
      <motion.div
        animate={{ y: hov ? -2 : 0 }}
        transition={{ duration: 0.25 }}
        style={{
          width: 46, height: 46, borderRadius: '12px',
          background: `${color}12`,
          border: `1px solid ${color}26`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative', zIndex: 1,
          boxShadow: hov ? `0 6px 18px ${color}2a` : 'none',
          transition: 'box-shadow 0.25s',
        }}
      >
        <Icon size={22} color={color} />
      </motion.div>

      {/* Label */}
      <span style={{
        fontSize: '0.67rem', fontWeight: 700,
        color: hov ? color : '#64748b',
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
        position: 'relative', zIndex: 1,
        transition: 'color 0.25s',
        textAlign: 'center',
        lineHeight: 1.2,
      }}>
        {label}
      </span>

      {/* Skill level badge */}
      {level && (
        <span style={{
          fontSize: '0.62rem', fontWeight: 800,
          color: hov ? color : '#cbd5e1',
          background: hov ? `${color}16` : 'rgba(255,255,255,0.03)',
          border: `1px solid ${hov ? `${color}28` : 'rgba(255,255,255,0.06)'}`,
          borderRadius: '999px',
          padding: '0.12rem 0.6rem',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          position: 'relative', zIndex: 1,
          transition: 'all 0.22s ease',
        }}>
          {level}
        </span>
      )}
    </motion.div>
  )
}
