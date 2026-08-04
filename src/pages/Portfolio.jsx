import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PageWrapper from '../components/PageWrapper'
import ProjectCard from '../components/ProjectCard'

const ease = [0.22, 1, 0.36, 1]

const up = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, delay, ease },
})

const projects = [
  {
    id: 1,
    title: '★ VisionInspect AI — AI Image Analysis Platform',
    description: 'Built a production-ready AI platform that accepts any image and returns object detection results (YOLOv8), extracted text in multiple languages (EasyOCR), and an AI-generated caption (BLIP Transformer). Outputs a downloadable PDF report. React + Tailwind frontend, FastAPI backend, SQLite for analysis history. Deployed frontend on Netlify.',
    image: 'https://placehold.co/600x360/0d1220/6366f1?text=VisionInspect+AI',
    tags: ['Python', 'FastAPI', 'React', 'YOLOv8', 'EasyOCR', 'BLIP', 'OpenCV', 'SQLite', 'Tailwind CSS'],
    category: 'AI/ML',
    github: 'https://github.com/Swetaghosh180',
    demo: 'https://swetaghosh-portfolio.netlify.app/',
    featured: true,
  },
  {
    id: 2,
    title: 'AI Plant Doctor — Plant Disease Detection  ·  In Progress',
    description: 'Building a computer vision system that diagnoses plant diseases from leaf photographs using a PyTorch CNN model trained on a multi-class disease dataset. FastAPI serves predictions; React UI handles image upload, displays confidence scores, and recommends treatments. Goal: sub-2s inference on CPU.',
    image: 'https://placehold.co/600x360/0d1220/22c55e?text=AI+Plant+Doctor',
    tags: ['Python', 'PyTorch', 'CNN', 'OpenCV', 'FastAPI', 'React'],
    category: 'AI/ML',
    github: 'https://github.com/Swetaghosh180',
    demo: '#',
  },
  {
    id: 3,
    title: 'House Price Prediction — End-to-End ML App',
    description: 'End-to-end ML regression system: data cleaning, feature engineering, and model training with Linear Regression and Random Forest (Scikit-learn). Evaluated with MAE, RMSE, and R². Flask web app lets users input property features and receive instant price predictions. Demonstrates full ML pipeline ownership.',
    image: 'https://placehold.co/600x360/0d1220/f59e0b?text=House+Price+ML',
    tags: ['Python', 'Scikit-learn', 'Random Forest', 'Pandas', 'NumPy', 'Flask'],
    category: 'AI/ML',
    github: 'https://github.com/Swetaghosh180',
    demo: '#',
  },
  {
    id: 4,
    title: 'eBhakti — Digital Scripture Library',
    description: 'Vue 3 SPA devotional reading platform with dynamic routing for scriptures, stotras, mantras, and Bhagavad Gita verses. Supports 5 Indian languages via Vue reactivity. Premium editorial typography, distraction-free reading mode, and fully responsive mobile-first layout.',
    image: 'https://placehold.co/600x360/0d1220/f97316?text=eBhakti',
    tags: ['Vue.js', 'Vue Router', 'Tailwind CSS', 'JavaScript'],
    category: 'Vue',
    github: 'https://github.com/Swetaghosh180/eBhakti-Digital-Scripture-Library',
    demo: '#',
  },
  {
    id: 5,
    title: 'Developer Portfolio — React + Framer Motion',
    description: 'This portfolio — built with React, Tailwind CSS, and Framer Motion. Component-based architecture, React Router SPA, animated page transitions, spring-physics interactions, mobile-first responsive layout, and Netlify deployment. Demonstrates production-quality frontend engineering.',
    image: 'https://placehold.co/600x360/0d1220/818cf8?text=Portfolio',
    tags: ['React', 'Tailwind CSS', 'Framer Motion', 'Vite', 'JavaScript'],
    category: 'React',
    github: 'https://github.com/Swetaghosh180/Developer-Portfolio-Website',
    demo: 'https://swetaghosh-portfolio.netlify.app/',
  },
  {
    id: 6,
    title: "Shweta's Kitchen — Multilingual Recipe Website",
    description: 'Multi-page recipe website with a JavaScript-powered translation engine supporting 9 Indian languages. CSS glassmorphism UI, smooth animations, category-based navigation, and Bootstrap 5 mobile-first grid. Demonstrates vanilla JS architecture without frameworks.',
    image: 'https://placehold.co/600x360/0d1220/f59e0b?text=Kitchen+Recipe',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap 5'],
    category: 'JavaScript',
    github: 'https://github.com/Swetaghosh180/Shwetas_Kitchen-PremiumRecipes',
    demo: 'https://swetaghosh180.github.io/Shwetas_Kitchen-PremiumRecipes/',
  },
  {
    id: 7,
    title: 'Aurelia Luxe — Luxury E-Commerce Frontend',
    description: 'Premium jewelry e-commerce UI with a black-and-gold design system, hero sliders, animated product cards, sticky navigation, search overlay, and Bootstrap 5 responsive grid. Deployed on GitHub Pages with version-controlled release workflow.',
    image: 'https://placehold.co/600x360/0d1220/a78bfa?text=Aurelia+Luxe',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap 5'],
    category: 'JavaScript',
    github: 'https://github.com/Swetaghosh180/Aurelia_Luxe-Luxury-Jewelry-E-Commerce-Website',
    demo: '#',
  },
]

const filters = ['All', 'AI/ML', 'React', 'Vue', 'JavaScript']

export default function Portfolio() {
  const [active, setActive] = useState('All')
  const filtered = active === 'All' ? projects : projects.filter(p => p.category === active)

  return (
    <PageWrapper>
      <div className="page-content">

        {/* Header */}
        <motion.div {...up(0)} style={{ marginBottom: '2.5rem' }}>
          <p className="section-label">My work</p>
          <h1 className="section-title">
            Featured <span className="gradient-text-2">Projects</span>
          </h1>
          <p style={{ color: '#475569', fontSize: '0.92rem', lineHeight: 1.8, maxWidth: 480, marginTop: '0.5rem' }}>
            AI-powered applications, ML systems, and frontend projects — built end-to-end.
          </p>
        </motion.div>

        {/* Filter pills */}
        <motion.div {...up(0.1)} style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
          {filters.map(f => {
            const isActive = active === f
            return (
              <motion.button
                key={f}
                onClick={() => setActive(f)}
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                style={{
                  padding: '0.48rem 1.25rem',
                  borderRadius: '999px',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600,
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  border: isActive ? '1px solid rgba(99,102,241,0.45)' : '1px solid rgba(255,255,255,0.07)',
                  background: isActive
                    ? 'linear-gradient(135deg,#6366f1,#4f46e5)'
                    : 'rgba(255,255,255,0.03)',
                  color: isActive ? '#fff' : '#64748b',
                  boxShadow: isActive
                    ? '0 4px 20px rgba(99,102,241,0.45), inset 0 1px 0 rgba(255,255,255,0.15)'
                    : 'none',
                  letterSpacing: '-0.01em',
                  position: 'relative', overflow: 'hidden',
                }}
              >
                {f}
                {isActive && (
                  <motion.div
                    layoutId="filter-bg"
                    style={{
                      position: 'absolute', inset: 0, borderRadius: '999px',
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.1), transparent)',
                      pointerEvents: 'none',
                    }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </motion.button>
            )
          })}
        </motion.div>

        {/* Grid */}
        <motion.div
          layout
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: '1.3rem' }}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.85, y: -12 }}
                transition={{ duration: 0.38, delay: i * 0.06, ease }}
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
