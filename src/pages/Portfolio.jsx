import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PageWrapper from '../components/PageWrapper'
import ProjectCard from '../components/ProjectCard'
import kitchenImg       from '../assets/images/SwetasKitchen.png'
import portfolioImg     from '../assets/images/Portfolio.png'
import ebhaktiImg       from '../assets/images/EBhakti_Image.png'
import housePriceImg    from '../assets/images/HousePricePrediction_Project.png'
import visionInspectImg from '../assets/images/VisionInspectAI.png'
import aureliaImg       from '../assets/images/AurelioLuxe.png'

const ease = [0.22, 1, 0.36, 1]

const up = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.52, delay, ease },
})

const projects = [
  {
    id: 1,
    title: 'VisionInspect AI',
    shortDesc: 'End-to-end AI platform for Object Detection, OCR, and Image Captioning with PDF export.',
    image: visionInspectImg,
    tags: ['Python', 'FastAPI', 'React', 'YOLOv8', 'EasyOCR', 'BLIP', 'OpenCV'],
    highlights: ['Object Detection', 'Multilingual OCR', 'AI Captioning', 'PDF Reports'],
    category: 'AI/ML',
    status: 'featured',
    accentColor: '#6366f1',
    github: 'https://github.com/Swetaghosh180/VisionInspect-AI',
    demo: 'https://swetaghosh-portfolio.netlify.app/',
  },
  {
    id: 2,
    title: 'AI Plant Doctor',
    shortDesc: 'Deep Learning app for plant disease detection from leaf photographs using PyTorch CNN.',
    image: 'https://placehold.co/600x400/061a10/22c55e?text=AI+Plant+Doctor',
    tags: ['Python', 'PyTorch', 'CNN', 'OpenCV', 'FastAPI', 'React'],
    highlights: ['CNN Model', 'Disease Detection', 'Confidence Scores', 'Treatment Advice'],
    category: 'AI/ML',
    status: 'inprogress',
    accentColor: '#22c55e',
    github: 'https://github.com/Swetaghosh180',
    demo: null,
  },
  {
    id: 3,
    title: 'House Price Prediction',
    shortDesc: 'Full ML pipeline — data cleaning, feature engineering, model training and Flask prediction app.',
    image: housePriceImg,
    tags: ['Python', 'Scikit-learn', 'Random Forest', 'Pandas', 'Flask'],
    highlights: ['ML Pipeline', 'Random Forest', 'MAE / R² Metrics', 'Flask Web App'],
    category: 'Machine Learning',
    status: 'production',
    accentColor: '#f59e0b',
    github: 'https://github.com/Swetaghosh180/House-Price-Prediction',
    demo: null,
  },
  {
    id: 4,
    title: 'Developer Portfolio',
    shortDesc: 'Modern React portfolio with Framer Motion animations, SPA routing, and Netlify deployment.',
    image: portfolioImg,
    tags: ['React', 'Tailwind CSS', 'Framer Motion', 'Vite'],
    highlights: ['React SPA', 'Spring Animations', 'Responsive UI', 'Netlify Deploy'],
    category: 'Portfolio',
    status: 'live',
    accentColor: '#818cf8',
    github: 'https://github.com/Swetaghosh180/Developer-Portfolio-Website',
    demo: 'https://swetaghosh-portfolio.netlify.app/',
  },
  {
    id: 5,
    title: 'eBhakti',
    shortDesc: 'Vue 3 SPA digital scripture library supporting 5 Indian languages with distraction-free reading.',
    image: ebhaktiImg,
    tags: ['Vue.js', 'Vue Router', 'Tailwind CSS', 'JavaScript'],
    highlights: ['Multilingual', 'Vue Router', 'Responsive Design', 'SPA'],
    category: 'Vue',
    status: 'production',
    accentColor: '#42b883',
    github: 'https://github.com/Swetaghosh180/eBhakti-Digital-Scripture-Library',
    demo: 'https://ebhakti-digital-scripture-library.netlify.app/',
  },
  {
    id: 6,
    title: "Shweta's Kitchen",
    shortDesc: 'Multilingual recipe website with a JS translation engine supporting 9 Indian languages.',
    image: kitchenImg,
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap 5'],
    highlights: ['9 Languages', 'Glassmorphism UI', 'Category Nav', 'Vanilla JS'],
    category: 'JavaScript',
    status: 'production',
    accentColor: '#f97316',
    github: 'https://github.com/Swetaghosh180/Shwetas_Kitchen-PremiumRecipes',
    demo: 'https://swetaghosh180.github.io/Shwetas_Kitchen-PremiumRecipes/',
  },
  {
    id: 7,
    title: 'Aurelia Luxe',
    shortDesc: 'Premium luxury jewelry e-commerce UI with black-and-gold design system and hero sliders.',
    image: aureliaImg,
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap 5'],
    highlights: ['E-Commerce UI', 'Hero Sliders', 'Product Cards', 'GitHub Pages'],
    category: 'JavaScript',
    status: 'production',
    accentColor: '#a78bfa',
    github: 'https://github.com/Swetaghosh180/Aurelia_Luxe-Luxury-Jewelry-E-Commerce-Website',
    demo: 'https://aurelialuxe-ecommercejewelry.netlify.app/',
  },
]

const FILTERS = [
  { label: 'All',              value: 'All' },
  { label: 'AI / ML',         value: 'AI/ML' },
  { label: 'Machine Learning', value: 'Machine Learning' },
  { label: 'React',            value: 'React' },
  { label: 'Vue',              value: 'Vue' },
  { label: 'JavaScript',       value: 'JavaScript' },
  { label: 'Portfolio',        value: 'Portfolio' },
]

const STATS = [
  { value: '7',    label: 'Projects' },
  { value: '3',    label: 'AI / ML' },
  { value: '10+',  label: 'Technologies' },
  { value: '100%', label: 'End-to-End' },
]

/* Inject focus ring CSS once */
const FOCUS_STYLE = `
  .card-focus-ring { opacity: 0 !important; }
  article:focus-visible .card-focus-ring { opacity: 1 !important; }
  article:focus { outline: none; }
`

export default function Portfolio() {
  const [active, setActive] = useState('All')

  const filtered = active === 'All'
    ? projects
    : projects.filter(p => p.category === active)

  return (
    <PageWrapper>
      <style>{FOCUS_STYLE}</style>
      <div className="page-content">

        {/* ── HEADER ── */}
        <motion.div {...up(0)} style={{ marginBottom: '1.75rem' }}>
          <p className="section-label">My work</p>
          <h1 className="section-title">
            AI &amp; Frontend <span className="gradient-text-2">Engineering</span>
          </h1>
          <p style={{
            color: '#475569', fontSize: '0.88rem', lineHeight: 1.82,
            maxWidth: 530, marginTop: '0.5rem',
          }}>
            A curated collection of production-ready AI, Machine Learning, Computer Vision,
            and Frontend applications demonstrating modern software engineering practices.
          </p>
        </motion.div>

        {/* ── STATS ROW ── */}
        <motion.div {...up(0.06)} style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '0.65rem',
          marginBottom: '1.75rem',
        }}>
          {STATS.map(({ value, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.06 + i * 0.05, ease }}
              whileHover={{ y: -2, borderColor: 'rgba(99,102,241,0.22)' }}
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '14px',
                padding: '0.85rem 0.75rem',
                textAlign: 'center',
                transition: 'border-color 0.25s, box-shadow 0.25s',
              }}
            >
              <p style={{
                fontSize: 'clamp(1.1rem, 3vw, 1.4rem)',
                fontWeight: 800, color: '#f1f5f9',
                letterSpacing: '-0.03em', lineHeight: 1, margin: 0,
              }}>{value}</p>
              <p style={{
                fontSize: '0.6rem', color: '#475569', fontWeight: 600,
                marginTop: '0.28rem', letterSpacing: '0.05em',
                textTransform: 'uppercase', margin: '0.28rem 0 0',
              }}>{label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* ── FILTER PILLS ── */}
        <motion.div
          {...up(0.1)}
          role="group"
          aria-label="Filter projects by category"
          style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1.75rem' }}
        >
          {FILTERS.map(({ label, value }) => {
            const isActive = active === value
            return (
              <motion.button
                key={value}
                onClick={() => setActive(value)}
                whileHover={{ scale: 1.04, y: -1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 420, damping: 20 }}
                aria-pressed={isActive}
                style={{
                  padding: '0.4rem 1rem',
                  borderRadius: '8px',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600,
                  fontSize: '0.76rem',
                  cursor: 'pointer',
                  border: isActive
                    ? '1px solid rgba(99,102,241,0.5)'
                    : '1px solid rgba(255,255,255,0.07)',
                  background: isActive
                    ? 'linear-gradient(135deg,#6366f1,#4f46e5)'
                    : 'rgba(255,255,255,0.03)',
                  color: isActive ? '#fff' : '#64748b',
                  boxShadow: isActive
                    ? '0 4px 16px rgba(99,102,241,0.38), inset 0 1px 0 rgba(255,255,255,0.12)'
                    : 'none',
                  letterSpacing: '-0.01em',
                  transition: 'all 0.2s ease',
                  outline: 'none',
                }}
                onFocus={e => { e.currentTarget.style.boxShadow = `0 0 0 2px rgba(99,102,241,0.5)` }}
                onBlur={e => {
                  e.currentTarget.style.boxShadow = isActive
                    ? '0 4px 16px rgba(99,102,241,0.38), inset 0 1px 0 rgba(255,255,255,0.12)'
                    : 'none'
                }}
              >
                {label}
              </motion.button>
            )
          })}
        </motion.div>

        {/* ── PROJECT COUNT ── */}
        <motion.p
          key={active}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          style={{
            fontSize: '0.72rem', color: '#334155', fontWeight: 600,
            letterSpacing: '0.06em', textTransform: 'uppercase',
            marginBottom: '1.1rem',
          }}
        >
          {filtered.length} project{filtered.length !== 1 ? 's' : ''}
          {active !== 'All' ? ` · ${active}` : ''}
        </motion.p>

        {/* ── GRID ── */}
        <motion.div
          layout
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(295px, 1fr))',
            gap: '1.15rem',
            alignItems: 'start',
          }}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.93, y: 18 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -10 }}
                transition={{ duration: 0.32, delay: i * 0.045, ease }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </PageWrapper>
  )
}
