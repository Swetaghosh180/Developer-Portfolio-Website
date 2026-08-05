import { useState, useRef } from 'react'
import { motion, AnimatePresence, useSpring } from 'framer-motion'
import { Link } from 'react-router-dom'
import PageWrapper from '../components/PageWrapper'
import SkillCard from '../components/SkillCard'
import {
  RiGithubLine, RiLinkedinBoxLine, RiInstagramLine,
  RiCodeSSlashLine, RiSmartphoneLine, RiPaletteLine, RiSpeedLine,
  RiDownloadLine, RiArrowRightLine,
} from 'react-icons/ri'
import { RiHtml5Line, RiCss3Line, RiJavascriptLine, RiReactjsLine } from 'react-icons/ri'
import { SiTailwindcss, SiGit, SiFigma, SiVuedotjs, SiPython, SiPytorch, SiOpencv, SiFastapi } from 'react-icons/si'
import profileImg from '../assets/images/Photo1.jpeg'

const tech = [
  { icon: RiHtml5Line,      label: 'HTML5',      color: '#e34f26', level: 'Advanced' },
  { icon: RiCss3Line,       label: 'CSS3',       color: '#1572b6', level: 'Advanced' },
  { icon: RiJavascriptLine, label: 'JavaScript', color: '#f7df1e', level: 'Advanced' },
  { icon: RiReactjsLine,    label: 'React',      color: '#61dafb', level: 'Advanced' },
  { icon: SiTailwindcss,    label: 'Tailwind',   color: '#06b6d4', level: 'Advanced' },
  { icon: SiPython,         label: 'Python',     color: '#3776ab', level: 'Advanced' },
  { icon: SiFastapi,        label: 'FastAPI',    color: '#009688', level: 'Intermediate' },
  { icon: SiOpencv,         label: 'OpenCV',     color: '#5c3ee8', level: 'Intermediate' },
  { icon: SiPytorch,        label: 'PyTorch',    color: '#ee4c2c', level: 'Intermediate' },
  { icon: SiVuedotjs,       label: 'Vue.js',     color: '#42b883', level: 'Intermediate' },
  { icon: SiGit,            label: 'Git',        color: '#f05032', level: 'Intermediate' },
  { icon: SiFigma,          label: 'Figma',      color: '#f24e1e', level: 'Basic' },
]

const services = [
  { icon: RiCodeSSlashLine, title: 'AI Applications',      desc: 'Building intelligent web applications powered by Machine Learning, Computer Vision, FastAPI, and React — from image analysis to predictive systems.', color: '#6366f1' },
  { icon: RiSpeedLine,      title: 'Computer Vision',      desc: 'Developing image analysis systems using OpenCV, YOLOv8, EasyOCR, and Vision-Language Models (BLIP) for object detection, OCR, and captioning.',    color: '#ec4899' },
  { icon: RiPaletteLine,    title: 'Frontend Engineering', desc: 'Creating responsive, accessible, and scalable user interfaces with React, Tailwind CSS, and component-based architecture.',                        color: '#a78bfa' },
  { icon: RiSmartphoneLine, title: 'Machine Learning',     desc: 'Building predictive models, data pipelines, and AI-driven software solutions using Python, Scikit-learn, and PyTorch.',                          color: '#22c55e' },
]

const socials = [
  { icon: RiGithubLine,      href: 'https://github.com/Swetaghosh180',    color: '#f1f5f9',  label: 'GitHub',    ionIcon: 'logo-github' },
  { icon: RiLinkedinBoxLine, href: 'https://linkedin.com/in/swetaghosh05',  color: '#0a66c2',  label: 'LinkedIn',  ionIcon: 'logo-linkedin' },
  { icon: RiInstagramLine,   href: 'https://instagram.com/ms.swetaghosh', color: '#e1306c',  label: 'Instagram', ionIcon: 'logo-instagram' },
]

const staggerContainer = { animate: { transition: { staggerChildren: 0.09 } } }
const fadeSlide = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
}

/* Section card */
function Card({ children, style = {}, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className="shimmer-card"
      style={{
        background: 'rgba(255,255,255,0.035)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '22px',
        transition: 'border-color 0.35s, box-shadow 0.35s',
        position: 'relative', overflow: 'hidden',
        ...style,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'rgba(99,102,241,0.22)'
        e.currentTarget.style.boxShadow = '0 0 0 1px rgba(99,102,241,0.08), 0 20px 56px rgba(99,102,241,0.07), inset 0 1px 0 rgba(255,255,255,0.04)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent)',
        pointerEvents: 'none',
      }} />
      {children}
    </motion.div>
  )
}

/* Section heading */
function SectionHeading({ children }) {
  return (
    <div style={{ marginBottom: '1.4rem' }}>
      <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#f1f5f9', marginBottom: '0.45rem', letterSpacing: '-0.025em' }}>
        {children}
      </h2>
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: 40 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{ height: 3, background: 'linear-gradient(90deg,#f59e0b,#fbbf24)', borderRadius: 3, boxShadow: '0 0 10px rgba(245,158,11,0.35)' }}
      />
    </div>
  )
}

/* Service card — tilt only on desktop */
function ServiceCard({ icon: Icon, title, desc, color, index }) {
  const ref = useRef(null)
  const rotateX = useSpring(0, { stiffness: 250, damping: 22 })
  const rotateY = useSpring(0, { stiffness: 250, damping: 22 })
  const [hov, setHov] = useState(false)
  const isDesktop = typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches

  const onMove = e => {
    if (!isDesktop) return
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    rotateX.set(((e.clientY - rect.top)  / rect.height - 0.5) * -8)
    rotateY.set(((e.clientX - rect.left) / rect.width  - 0.5) *  8)
  }
  const onLeave = () => { rotateX.set(0); rotateY.set(0); setHov(false) }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.92, y: 16 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.42, delay: 0.07 * index, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={onMove}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={onLeave}
      style={{
        rotateX, rotateY,
        transformStyle: 'preserve-3d',
        transformPerspective: 700,
        padding: '1.15rem',
        background: hov ? `${color}09` : 'rgba(255,255,255,0.03)',
        border: `1px solid ${hov ? `${color}38` : 'rgba(255,255,255,0.07)'}`,
        borderRadius: '16px',
        cursor: 'default',
        transition: 'background 0.3s, border-color 0.3s, box-shadow 0.3s',
        boxShadow: hov ? `0 10px 28px ${color}15` : 'none',
        willChange: 'transform',
      }}
    >
      <motion.div
        animate={hov ? { rotate: [0, -8, 8, 0], y: -2 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{
          width: 44, height: 44, borderRadius: '12px',
          background: `${color}18`, border: `1px solid ${color}28`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: '0.85rem',
          boxShadow: hov ? `0 4px 14px ${color}28` : 'none',
          transition: 'box-shadow 0.3s',
        }}
      >
        <Icon size={21} color={color} />
      </motion.div>
      <h3 style={{ fontWeight: 700, fontSize: '0.88rem', color: '#e2e8f0', marginBottom: '0.35rem', letterSpacing: '-0.01em' }}>{title}</h3>
      <p style={{ color: '#64748b', fontSize: '0.79rem', lineHeight: 1.75 }}>{desc}</p>
    </motion.div>
  )
}

/* Profile avatar — photo with initials fallback */
function ProfileAvatar() {
  const [imgError, setImgError] = useState(false)
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      style={{
        width: 72, height: 72, borderRadius: 18, padding: 6,
        background: 'linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))',
        border: '1px solid rgba(255,255,255,0.06)',
        boxShadow: '0 8px 30px rgba(99,102,241,0.06)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      }}
      className="avatar-ring"
    >
      <div style={{
        width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden',
        boxShadow: '0 6px 18px rgba(167,139,250,0.06), inset 0 1px 0 rgba(255,255,255,0.02)'
      }} className="avatar-inner">
        {!imgError ? (
          <img
            src={profileImg}
            alt="Sweta Ghosh — AI-Driven Frontend Developer, profile photo"
            onError={() => setImgError(true)}
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }}
          />
        ) : (
          <span style={{
            fontSize: '1.85rem', fontWeight: 900,
            background: 'linear-gradient(135deg,#6366f1,#a78bfa)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            display: 'inline-block', lineHeight: 1
          }}>SG</span>
        )}
      </div>
    </motion.div>
  )
}

export default function About() {
  const [expanded, setExpanded] = useState(false)

  return (
    <PageWrapper>
      <div className="page-content" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

        {/* ══ PROFILE CARD ══ */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className={`profile-card ${expanded ? 'expanded' : ''}`}
            style={{ position: 'relative' }}
          >
            <div style={{
              background: 'rgba(13,18,32,0.85)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              border: '1px solid rgba(255,255,255,0.09)',
              borderRadius: '22px',
              padding: '1.4rem',
              overflow: 'hidden',
              position: 'relative',
              zIndex: 1,
            }}>
              {/* Top shimmer line */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 1,
                background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.35), rgba(167,139,250,0.28), transparent)',
                pointerEvents: 'none',
              }} />
              {/* Corner lighting */}
              <div style={{
                position: 'absolute', top: -30, left: -30,
                width: 160, height: 160, borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)',
                pointerEvents: 'none',
              }} />
              <div style={{
                position: 'absolute', bottom: -20, right: -20,
                width: 120, height: 120, borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(167,139,250,0.08) 0%, transparent 70%)',
                pointerEvents: 'none',
              }} />

              {/* ── Top row: avatar + name + chevron ── */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: expanded ? '1.25rem' : 0, position: 'relative', zIndex: 1 }}>

                <ProfileAvatar />

                {/* Name + role badge */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <motion.h1
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15, duration: 0.4 }}
                    style={{ fontSize: '1.35rem', fontWeight: 800, color: '#f1f5f9', letterSpacing: '-0.025em', marginBottom: '0.45rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                  >
                    Sweta Ghosh
                  </motion.h1>
                  <motion.span
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25, duration: 0.4 }}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                      padding: '0.26rem 0.8rem',
                      fontSize: '0.78rem', fontWeight: 600, color: '#cbd5e1',
                    }}
                  >
                    <span style={{
                      width: 6, height: 6, borderRadius: '50%',
                      background: '#22c55e', boxShadow: '0 0 6px #22c55e',
                      animation: 'pulse-dot 2s ease-in-out infinite', flexShrink: 0,
                    }} />
                    AI-Driven Frontend Developer
                  </motion.span>
                </div>

                {/* Chevron toggle */}
                <motion.button
                  onClick={() => setExpanded(e => !e)}
                  animate={{ rotate: expanded ? 180 : 0 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.88 }}
                  transition={{ type: 'spring', stiffness: 320, damping: 22 }}
                  style={{
                    alignSelf: 'flex-start', flexShrink: 0,
                    width: 32, height: 32, borderRadius: '9px',
                    background: expanded ? 'rgba(245,158,11,0.15)' : 'rgba(245,158,11,0.08)',
                    border: `1px solid ${expanded ? 'rgba(245,158,11,0.4)' : 'rgba(245,158,11,0.25)'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', color: '#f59e0b',
                    transition: 'background 0.25s, border-color 0.25s',
                  }}
                >
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </motion.button>
              </div>

              {/* ── Collapsible details ── */}
              <AnimatePresence initial={false}>
                {expanded && (
                  <motion.div
                    key="details"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.38, ease: [0.4, 0, 0.2, 1] }}
                    style={{ overflow: 'hidden', position: 'relative', zIndex: 1 }}
                  >
                    <div style={{ height: 1, background: 'rgba(255,255,255,0.07)', marginBottom: '1.1rem' }} />

                    {/* Contact info rows */}
                    <motion.div
                      variants={staggerContainer}
                      initial="initial"
                      animate="animate"
                      style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem', marginBottom: '1.1rem' }}
                    >
                      {[
                        { ionIcon: 'mail-outline',      label: 'EMAIL',    value: 'swetaghosh665@gmail.com',   href: 'mailto:swetaghosh665@gmail.com' },
                        { ionIcon: 'call-outline',      label: 'PHONE',    value: '+91 7484963888',             href: 'tel:+917484963888' },
                        { ionIcon: 'location-outline',  label: 'LOCATION', value: 'Jharkhand, India',           href: null },
                        { ionIcon: 'briefcase-outline', label: 'STATUS',   value: 'Open to Internship & Full-Time', href: null, highlight: true },
                        { ionIcon: 'time-outline',      label: 'RESPONSE', value: 'Within 24 hours',                href: null },
                      ].map(({ ionIcon, label, value, href, highlight }) => (
                        <motion.div key={label} variants={fadeSlide}
                          style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}
                        >
                          <div style={{
                            width: 38, height: 38, borderRadius: '10px', flexShrink: 0,
                            background: 'rgba(255,255,255,0.05)',
                            border: '1px solid rgba(255,255,255,0.08)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                          }}>
                            {/* Ionicons web component */}
                            <ion-icon
                              name={ionIcon}
                              aria-hidden="true"
                              style={{ fontSize: '16px', color: '#94a3b8' }}
                            />
                          </div>
                          <div>
                            <p style={{ fontSize: '0.62rem', color: '#475569', fontWeight: 700, letterSpacing: '0.1em', marginBottom: '0.08rem' }}>{label}</p>
                            {href ? (
                              <a href={href} style={{ fontSize: '0.86rem', color: '#818cf8', fontWeight: 500, textDecoration: 'none' }}
                                onMouseEnter={e => e.currentTarget.style.color = '#a78bfa'}
                                onMouseLeave={e => e.currentTarget.style.color = '#818cf8'}
                              >{value}</a>
                            ) : (
                              <p style={{
                                fontSize: '0.86rem',
                                color: highlight ? '#22c55e' : '#cbd5e1',
                                fontWeight: highlight ? 700 : 500,
                              }}>{value}</p>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>

                    <div style={{ height: 1, background: 'rgba(255,255,255,0.07)', marginBottom: '1rem' }} />

                    {/* Social links using Ionicons */}
                    <div style={{ display: 'flex', gap: '0.6rem' }}>
                      {socials.map(({ ionIcon, href, color, label }, i) => (
                        <motion.a key={i} href={href} target="_blank" rel="noreferrer"
                          aria-label={`${label} profile (opens in new tab)`}
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.07 * i, type: 'spring', stiffness: 300, damping: 16 }}
                          whileHover={{ scale: 1.15, y: -3 }}
                          whileTap={{ scale: 0.88 }}
                          style={{
                            width: 38, height: 38, borderRadius: '10px',
                            background: 'rgba(255,255,255,0.05)',
                            border: '1px solid rgba(255,255,255,0.08)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: '#64748b', textDecoration: 'none',
                            transition: 'color 0.2s, border-color 0.2s, background 0.2s, box-shadow 0.2s',
                          }}
                          onMouseEnter={e => {
                            e.currentTarget.style.borderColor = `${color}50`
                            e.currentTarget.style.background = `${color}12`
                            e.currentTarget.style.boxShadow = `0 4px 14px ${color}28`
                            e.currentTarget.querySelector('ion-icon').style.color = color
                          }}
                          onMouseLeave={e => {
                            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                            e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
                            e.currentTarget.style.boxShadow = 'none'
                            e.currentTarget.querySelector('ion-icon').style.color = '#64748b'
                          }}
                        >
                          <ion-icon name={ionIcon} aria-hidden="true" style={{ fontSize: '17px', color: '#64748b', transition: 'color 0.2s' }} />
                        </motion.a>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* ══ HERO HEADLINE BLOCK ══ */}
        <Card delay={0.02} style={{ padding: '1.6rem' }}>

          {/* Availability badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.45rem',
            background: 'rgba(34,197,94,0.08)',
            border: '1px solid rgba(34,197,94,0.22)',
            borderRadius: '999px',
            padding: '0.3rem 0.9rem',
            marginBottom: '1rem',
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: '50%',
              background: '#22c55e', boxShadow: '0 0 6px #22c55e',
              animation: 'pulse-dot 2s ease-in-out infinite', flexShrink: 0,
            }} />
            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#22c55e', letterSpacing: '0.04em' }}>
              Available for AI/ML &amp; Frontend Opportunities
            </span>
          </div>

          {/* Main headline */}
          <h2 style={{
            fontSize: 'clamp(1.35rem, 3.5vw, 1.9rem)',
            fontWeight: 800,
            color: '#f1f5f9',
            letterSpacing: '-0.03em',
            lineHeight: 1.15,
            marginBottom: '0.55rem',
          }}>
            AI-Driven Frontend Developer &amp; Aspiring AI Engineer
          </h2>

          {/* Subtitle row */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '0.9rem' }}>
            {[
              'Aspiring AI Engineer',
              'Machine Learning Enthusiast',
              'Computer Vision Enthusiast',
              'Python Developer',
            ].map((t, i) => (
              <span key={t} style={{
                fontSize: '0.72rem', fontWeight: 600,
                color: i === 0 ? '#818cf8' : '#64748b',
                letterSpacing: '0.01em',
              }}>
                {i > 0 && <span style={{ marginRight: '0.4rem', color: '#334155' }}>•</span>}
                {t}
              </span>
            ))}
          </div>

          {/* Description */}
          <p style={{
            color: '#64748b',
            fontSize: '0.9rem',
            lineHeight: 1.85,
            marginBottom: '1rem',
          }}>
            I build intelligent web applications by combining React, Python, FastAPI,
            Machine Learning, and Computer Vision to solve real-world problems through
            scalable AI-powered software.
          </p>

          {/* Tech chips */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
            {[
              { label: 'React',            color: '#61dafb' },
              { label: 'Python',           color: '#3776ab' },
              { label: 'FastAPI',          color: '#009688' },
              { label: 'Machine Learning', color: '#a78bfa' },
              { label: 'Computer Vision',  color: '#ec4899' },
              { label: 'YOLOv8',           color: '#f59e0b' },
              { label: 'OpenCV',           color: '#5c3ee8' },
              { label: 'PyTorch',          color: '#ee4c2c' },
            ].map(({ label, color }) => (
              <span key={label} style={{
                display: 'inline-flex',
                background: `${color}10`,
                border: `1px solid ${color}28`,
                borderRadius: '7px',
                padding: '0.22rem 0.65rem',
                fontSize: '0.68rem', fontWeight: 700,
                color,
                letterSpacing: '0.02em',
              }}>
                {label}
              </span>
            ))}
          </div>

          {/* CTA row */}
          <div style={{ marginTop: '1.1rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
            <a
              href="/Sweta_Ghosh_AI_ML_CV_Engineer-CV.pdf"
              download
              className="btn-primary"
              aria-label="Download Sweta Ghosh's resume as PDF"
              style={{ fontSize: '0.8rem', padding: '0.5rem 1.2rem' }}
            >
              <RiDownloadLine size={14} aria-hidden="true" />
              Download Resume
            </a>
            <Link
              to="/portfolio"
              className="btn-ghost"
              aria-label="View my projects"
              style={{ fontSize: '0.8rem', padding: '0.5rem 1.2rem' }}
            >
              View Projects <RiArrowRightLine size={14} aria-hidden="true" />
            </Link>
            <a
              href="https://github.com/Swetaghosh180"
              target="_blank"
              rel="noreferrer"
              className="btn-ghost"
              aria-label="Visit Sweta Ghosh's GitHub profile (opens in new tab)"
              style={{ fontSize: '0.8rem', padding: '0.5rem 1.2rem' }}
            >
              <RiGithubLine size={14} aria-hidden="true" /> GitHub
            </a>
          </div>

        </Card>

        {/* ══ ABOUT ME CARD ══ */}
        <Card delay={0.05} style={{ padding: '1.6rem' }}>
          <SectionHeading>About Me</SectionHeading>
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
            style={{ color: '#94a3b8', lineHeight: 1.9, fontSize: '0.91rem', marginBottom: '0.9rem' }}
          >
            I am an <strong style={{ color: '#e2e8f0', fontWeight: 600 }}>AI-Driven Frontend Developer</strong> with
            a strong foundation in modern web development and a growing specialization in
            <strong style={{ color: '#e2e8f0', fontWeight: 600 }}> Artificial Intelligence</strong>,
            <strong style={{ color: '#e2e8f0', fontWeight: 600 }}> Machine Learning</strong>, and
            <strong style={{ color: '#e2e8f0', fontWeight: 600 }}> Computer Vision</strong>.
            My journey began with building responsive, scalable, and accessible web applications
            using React, JavaScript, Tailwind CSS, and REST APIs — including production work
            during my internship at Roadlyft Rideshare Pvt. Ltd.
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.14 }}
            style={{ color: '#94a3b8', lineHeight: 1.9, fontSize: '0.91rem', marginBottom: '0.9rem' }}
          >
            Driven by curiosity and a passion for solving real-world problems, I expanded into
            <strong style={{ color: '#e2e8f0', fontWeight: 600 }}> Python</strong>,
            <strong style={{ color: '#e2e8f0', fontWeight: 600 }}> Machine Learning</strong>,
            <strong style={{ color: '#e2e8f0', fontWeight: 600 }}> Deep Learning</strong>,
            <strong style={{ color: '#e2e8f0', fontWeight: 600 }}> FastAPI</strong>,
            <strong style={{ color: '#e2e8f0', fontWeight: 600 }}> OpenCV</strong>,
            <strong style={{ color: '#e2e8f0', fontWeight: 600 }}> YOLOv8</strong>, and
            <strong style={{ color: '#e2e8f0', fontWeight: 600 }}> PyTorch</strong>.
            Today I build complete AI-powered applications — owning the full stack:
            UI, REST API, AI model integration, and deployment.
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.18 }}
            style={{ color: '#94a3b8', lineHeight: 1.9, fontSize: '0.91rem', marginBottom: '1.2rem' }}
          >
            I am actively seeking opportunities to collaborate with experienced engineers,
            contribute to impactful AI products, and grow into a professional
            <strong style={{ color: '#e2e8f0', fontWeight: 600 }}> AI Engineer</strong> while
            continuously improving my software engineering and machine learning skills.
          </motion.p>

          <p style={{ fontSize: '0.62rem', color: '#475569', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '0.65rem' }}>Core Focus</p>
          {/* Core Focus tags */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.22, duration: 0.4 }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}
          >
            {[
              { icon: 'hardware-chip-outline',  label: 'AI-Powered Web Apps' },
              { icon: 'analytics-outline',       label: 'Machine Learning' },
              { icon: 'eye-outline',             label: 'Computer Vision' },
              { icon: 'logo-python',             label: 'Python Development' },
              { icon: 'code-slash-outline',      label: 'React & Frontend' },
              { icon: 'server-outline',          label: 'FastAPI Backend' },
              { icon: 'layers-outline',          label: 'End-to-End AI' },
            ].map(({ icon, label }) => (
              <span key={label} style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
                background: 'rgba(99,102,241,0.08)',
                border: '1px solid rgba(99,102,241,0.18)',
                borderRadius: '999px',
                padding: '0.28rem 0.75rem',
                fontSize: '0.72rem', fontWeight: 600, color: '#818cf8',
                letterSpacing: '0.02em',
              }}>
                <ion-icon name={icon} style={{ fontSize: '12px' }} />
                {label}
              </span>
            ))}
          </motion.div>
        </Card>

        {/* ══ WHAT I'M DOING CARD ══ */}
        <Card delay={0.1} style={{ padding: '1.6rem' }}>
          <SectionHeading>What I'm Doing</SectionHeading>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.85rem' }}>
            {services.map((s, i) => <ServiceCard key={s.title} {...s} index={i} />)}
          </div>
        </Card>

        {/* ══ TECHNOLOGIES CARD ══ */}
        <Card delay={0.15} style={{ padding: '1.6rem' }}>
          <SectionHeading>Technologies</SectionHeading>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(86px, 1fr))', gap: '0.7rem' }}>
            {tech.map(({ icon, label, color, level }, i) => (
              <motion.div key={label}
                initial={{ opacity: 0, scale: 0.78, y: 10 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.38, delay: 0.045 * i, type: 'spring', stiffness: 220, damping: 18 }}
              >
                <SkillCard icon={icon} label={label} color={color} level={level} />
              </motion.div>
            ))}
          </div>
        </Card>

        {/* ══ CURRENTLY LEARNING CARD ══ */}
        <Card delay={0.18} style={{ padding: '1.6rem' }}>
          <SectionHeading>Currently Learning</SectionHeading>
          <p style={{ color: '#64748b', fontSize: '0.84rem', lineHeight: 1.75, marginBottom: '1.25rem' }}>
            Actively deepening expertise across these areas — each tied to a real project or goal.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[
              {
                label: 'Deep Learning & Neural Networks',
                detail: 'CNNs, transfer learning, model fine-tuning with PyTorch',
                color: '#ee4c2c',
                status: 'Building Production Projects',
                statusColor: '#22c55e',
              },
              {
                label: 'LLM Integration & Prompt Engineering',
                detail: 'Connecting open-source LLMs to FastAPI backends',
                color: '#a78bfa',
                status: 'Learning in Progress',
                statusColor: '#a78bfa',
              },
              {
                label: 'MLOps & Model Deployment',
                detail: 'Docker, model serving, CI/CD for ML pipelines',
                color: '#22c55e',
                status: 'Currently Exploring',
                statusColor: '#f59e0b',
              },
              {
                label: 'Data Structures & Algorithms',
                detail: 'Consistent LeetCode practice for engineering interviews',
                color: '#f59e0b',
                status: 'Hands-on Learning',
                statusColor: '#61dafb',
              },
            ].map(({ label, detail, color, status, statusColor }) => (
              <motion.div
                key={label}
                whileHover={{ x: 3, borderColor: `${color}28` }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                style={{
                  background: 'rgba(255,255,255,0.025)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '12px',
                  padding: '1rem 1.1rem',
                  display: 'flex', justifyContent: 'space-between',
                  alignItems: 'flex-start', gap: '0.75rem',
                  flexWrap: 'wrap',
                }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                    <span style={{
                      width: 6, height: 6, borderRadius: '50%',
                      background: color, flexShrink: 0,
                      boxShadow: `0 0 6px ${color}`,
                    }} />
                    <span style={{ fontSize: '0.84rem', fontWeight: 700, color: '#e2e8f0' }}>{label}</span>
                  </div>
                  <p style={{ fontSize: '0.75rem', color: '#475569', paddingLeft: '0.9rem' }}>{detail}</p>
                </div>
                <span style={{
                  fontSize: '0.65rem', fontWeight: 700,
                  color: statusColor,
                  background: `${statusColor}12`,
                  border: `1px solid ${statusColor}28`,
                  borderRadius: '999px',
                  padding: '0.2rem 0.65rem',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                }}>
                  ✦ {status}
                </span>
              </motion.div>
            ))}
          </div>
        </Card>

        {/* ══ ENGINEERING PRINCIPLES CARD ══ */}
        <Card delay={0.2} style={{ padding: '1.6rem' }}>
          <SectionHeading>Engineering Principles</SectionHeading>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem' }}>
            {[
              { icon: 'construct-outline',    title: 'Build to Learn',         desc: 'Every project is a deliberate exercise in a new skill — not just shipping, but understanding why.' },
              { icon: 'layers-outline',       title: 'End-to-End Ownership',   desc: 'I own the full stack: UI, API, ML model, and deployment. No black boxes.' },
              { icon: 'people-outline',       title: 'User-First Thinking',    desc: 'AI features only matter if users can understand and trust them. UX is not optional.' },
              { icon: 'git-branch-outline',   title: 'Iterative Improvement',  desc: 'Ship a working v1, measure, then improve. Perfection is the enemy of progress.' },
            ].map(({ icon, title, desc }) => (
              <div key={title} style={{
                background: 'rgba(99,102,241,0.04)',
                border: '1px solid rgba(99,102,241,0.12)',
                borderRadius: '14px',
                padding: '1rem',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', marginBottom: '0.45rem' }}>
                  <ion-icon name={icon} aria-hidden="true" style={{ fontSize: '16px', color: '#818cf8' }} />
                  <span style={{ fontSize: '0.83rem', fontWeight: 700, color: '#e2e8f0' }}>{title}</span>
                </div>
                <p style={{ fontSize: '0.76rem', color: '#475569', lineHeight: 1.75 }}>{desc}</p>
              </div>
            ))}
          </div>
        </Card>

      </div>
    </PageWrapper>
  )
}
