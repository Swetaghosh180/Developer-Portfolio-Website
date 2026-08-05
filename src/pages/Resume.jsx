import { useState } from 'react'
import { motion } from 'framer-motion'
import PageWrapper from '../components/PageWrapper'
import { RiDownloadLine, RiGraduationCapLine, RiBriefcaseLine, RiAwardLine } from 'react-icons/ri'

const ease = [0.22, 1, 0.36, 1]

const up = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, delay, ease },
})

const skillCategories = [
  {
    label: 'AI & Machine Learning',
    color: '#a78bfa',
    skills: ['Python', 'PyTorch', 'Scikit-learn', 'OpenCV', 'YOLOv8', 'EasyOCR', 'BLIP', 'NumPy', 'Pandas'],
  },
  {
    label: 'Backend & APIs',
    color: '#22c55e',
    skills: ['FastAPI', 'Flask', 'REST APIs', 'SQLite'],
  },
  {
    label: 'Frontend',
    color: '#61dafb',
    skills: ['React.js', 'Vue.js', 'JavaScript (ES6+)', 'HTML5', 'CSS3', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    label: 'Tools & Workflow',
    color: '#f59e0b',
    skills: ['Git & GitHub', 'Vite', 'Figma', 'VS Code', 'Netlify', 'GitHub Pages'],
  },
]

const education = [
  {
    title: 'Bachelor of Computer Applications (BCA)',
    sub: 'Netaji Subhas University, Jamshedpur, Jharkhand',
    year: 'Aug 2023 – Aug 2026',
    desc: 'Pursuing BCA with coursework in data structures, algorithms, web technologies, database systems, and software engineering. Applying academic foundations directly to real-world AI and web projects.',
  },
  {
    title: 'Higher Secondary Education (12th)',
    sub: 'Seemanta Mahavidyalaya, Mayurbhanj,Odisha',
    year: '2023',
    desc: 'Science stream. Developed analytical thinking and problem-solving skills that now underpin my approach to ML and software engineering.',
  },
  {
    title: 'Secondary Education (10th)',
    sub: 'TPS DAV Public School, Baharagora,Jharkhand',
    year: '2021',
    desc: 'Built early interest in computers and logical reasoning. Foundation for a self-driven journey into software development and AI.',
  },
]

const experience = [
  {
    title: 'Frontend Developer Intern',
    sub: 'Roadlyft Rideshare Pvt. Ltd.',
    year: 'Nov 2025 – Jan 2026',
    desc: 'Delivered responsive web interfaces using Vue.js, Tailwind CSS, HTML5, and JavaScript in a production codebase. Built reusable component library, integrated RESTful APIs to surface dynamic financial data, applied WCAG accessibility standards, and debugged cross-browser layout issues. Collaborated daily with designers and backend engineers in an Agile workflow.',
  },
]

const certs = [
  { name: 'TATA GenAI Powered Data Analytics Certificate', issuer: 'Tata / Forage',  year: '2025' },
  { name: 'Front-End Development with React.js and Angular', issuer: 'Simplilearn',  year: 'Jul 2025' },
  { name: 'Python Certification', issuer: 'freeCodeCamp', year: 'In Progress' },
]

function SectionLabel({ children, color = '#6366f1' }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', marginBottom: '1.2rem' }}>
      <div style={{
        width: 3, height: 18, borderRadius: 2,
        background: `linear-gradient(to bottom, ${color}, ${color}60)`,
        boxShadow: `0 0 8px ${color}50`,
      }} />
      <span style={{ fontSize: '0.68rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
        {children}
      </span>
    </div>
  )
}

function TimelineItem({ item, icon: Icon, color, index }) {
  const [hov, setHov] = useState(false)
  return (
    <motion.div {...up(0.08 * index)} style={{ display: 'flex', gap: '0.9rem', marginBottom: '1rem' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
        <motion.div
          whileHover={{ scale: 1.15 }}
          transition={{ type: 'spring', stiffness: 350, damping: 18 }}
          style={{
            width: 38, height: 38, borderRadius: '50%',
            background: `${color}12`,
            border: `1.5px solid ${color}40`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: `0 0 16px ${color}25`,
          }}
        >
          <Icon size={16} color={color} aria-hidden="true" />
        </motion.div>
        <div style={{
          width: 1, flex: 1,
          background: `linear-gradient(to bottom, ${color}35, transparent)`,
          marginTop: 4,
        }} />
      </div>

      <motion.div
        onHoverStart={() => setHov(true)}
        onHoverEnd={() => setHov(false)}
        animate={{ x: hov ? 4 : 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
        style={{
          background: hov ? `${color}06` : 'rgba(255,255,255,0.03)',
          border: `1px solid ${hov ? `${color}28` : 'rgba(255,255,255,0.07)'}`,
          borderRadius: '14px',
          padding: '1rem 1.2rem',
          flex: 1,
          transition: 'background 0.3s, border-color 0.3s',
          boxShadow: hov ? `0 8px 28px ${color}12` : 'none',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '0.25rem' }}>
          <h3 style={{ fontWeight: 700, fontSize: '0.9rem', color: '#e2e8f0', letterSpacing: '-0.015em' }}>{item.title}</h3>
          <span style={{
            fontSize: '0.67rem', color: color, fontWeight: 700,
            background: `${color}12`, padding: '0.15rem 0.65rem', borderRadius: 999,
            border: `1px solid ${color}25`,
          }}>
            {item.year}
          </span>
        </div>
        <p style={{ color: color, fontSize: '0.78rem', fontWeight: 600, marginBottom: '0.35rem', opacity: 0.85 }}>{item.sub}</p>
        <p style={{ color: '#475569', fontSize: '0.8rem', lineHeight: 1.8 }}>{item.desc}</p>
      </motion.div>
    </motion.div>
  )
}

export default function Resume() {
  return (
    <PageWrapper>
      <div className="page-content">

        {/* Header */}
        <motion.div {...up(0)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '3rem' }}>
          <div>
            <p className="section-label">My background</p>
            <h1 className="section-title">My <span className="gradient-text-2">Resume</span></h1>
            <p style={{ color: '#475569', fontSize: '0.9rem', marginTop: '0.25rem' }}>
              Education, experience, skills &amp; certifications.
            </p>
          </div>
          <motion.a
            href="/Sweta_Ghosh_AI_ML_CV_Engineer-CV.pdf" download
            className="btn-primary"
            aria-label="Download Sweta Ghosh's resume as PDF"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            <RiDownloadLine size={16} aria-hidden="true" /> Download CV
          </motion.a>
        </motion.div>

        {/* Professional Summary */}
        <motion.div {...up(0.05)} style={{
          background: 'rgba(99,102,241,0.05)',
          border: '1px solid rgba(99,102,241,0.14)',
          borderRadius: '16px',
          padding: '1.25rem 1.4rem',
          marginBottom: '3rem',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 1,
            background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.35), transparent)',
            pointerEvents: 'none',
          }} />
          <p style={{ fontSize: '0.62rem', color: '#6366f1', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '0.55rem' }}>Professional Summary</p>
          <p style={{ color: '#94a3b8', fontSize: '0.88rem', lineHeight: 1.85 }}>
            AI-Driven Frontend Developer and Aspiring AI Engineer with hands-on experience in
            Machine Learning, Computer Vision, and full-stack AI application development.
            Skilled in building end-to-end intelligent systems using Python, FastAPI, OpenCV,
            YOLOv8, EasyOCR, React, and Scikit-learn. Passionate about developing real-world
            AI solutions and continuously expanding expertise in Deep Learning and Computer Vision.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '3rem' }}>

          {/* Left column */}
          <div>
            <SectionLabel color="#6366f1">Education</SectionLabel>
            {education.map((item, i) => <TimelineItem key={i} item={item} index={i} icon={RiGraduationCapLine} color="#6366f1" />)}

            <div style={{ marginTop: '2.2rem' }}>
              <SectionLabel color="#22c55e">Experience</SectionLabel>
              {experience.map((item, i) => <TimelineItem key={i} item={item} index={i} icon={RiBriefcaseLine} color="#22c55e" />)}
            </div>
          </div>

          {/* Right column */}
          <div>
            <SectionLabel color="#a78bfa">Technical Skills</SectionLabel>
            <div style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '18px',
              padding: '1.5rem',
              marginBottom: '2.2rem',
              position: 'relative', overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 1,
                background: 'linear-gradient(90deg, transparent, rgba(167,139,250,0.3), transparent)',
                pointerEvents: 'none',
              }} />
              {skillCategories.map(({ label, color, skills }, ci) => (
                <div key={label} style={{ marginBottom: ci < skillCategories.length - 1 ? '1.35rem' : 0 }}>
                  <p style={{ fontSize: '0.6rem', color: '#475569', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.65rem' }}>
                    {label}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                    {skills.map((skill, si) => (
                      <motion.span
                        key={skill}
                        initial={{ opacity: 0, scale: 0.85 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.03 * si }}
                        style={{
                          display: 'inline-flex',
                          background: `${color}0e`,
                          border: `1px solid ${color}28`,
                          borderRadius: '8px',
                          padding: '0.28rem 0.7rem',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          color,
                          letterSpacing: '0.01em',
                        }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <SectionLabel color="#f59e0b">Certifications</SectionLabel>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {certs.map((c, i) => (
                <motion.div key={i} {...up(0.07 * i)}
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: '13px',
                    padding: '0.9rem 1.15rem',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem',
                    transition: 'border-color 0.25s, box-shadow 0.25s',
                    position: 'relative', overflow: 'hidden',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'rgba(245,158,11,0.28)'
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(245,158,11,0.08)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{
                      width: 32, height: 32, borderRadius: '9px', flexShrink: 0,
                      background: 'rgba(245,158,11,0.1)',
                      border: '1px solid rgba(245,158,11,0.2)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <RiAwardLine size={15} color="#f59e0b" aria-hidden="true" />
                    </div>
                    <div>
                      <p style={{ fontWeight: 600, fontSize: '0.85rem', color: '#e2e8f0', letterSpacing: '-0.01em' }}>{c.name}</p>
                      <p style={{ fontSize: '0.73rem', color: '#6366f1', fontWeight: 600, marginTop: '0.1rem' }}>{c.issuer}</p>
                    </div>
                  </div>
                  <span style={{
                    fontSize: '0.7rem', color: '#f59e0b', fontWeight: 700,
                    background: 'rgba(245,158,11,0.1)', padding: '0.18rem 0.65rem', borderRadius: 999,
                    border: '1px solid rgba(245,158,11,0.22)',
                  }}>
                    {c.year}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </PageWrapper>
  )
}
