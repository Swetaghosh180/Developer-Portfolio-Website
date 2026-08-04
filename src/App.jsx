import { useEffect, useRef, useState, lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useSpring } from 'framer-motion'
import Navbar from './components/Navbar'
import ScrollToTop from './components/ScrollToTop'
import About from './pages/About'

const Resume          = lazy(() => import('./pages/Resume'))
const Portfolio       = lazy(() => import('./pages/Portfolio'))
const Contact         = lazy(() => import('./pages/Contact'))

function PageLoader() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
      <div style={{
        width: 36, height: 36,
        border: '2.5px solid rgba(99,102,241,0.2)',
        borderTopColor: '#6366f1',
        borderRadius: '50%',
        animation: 'spin 0.7s linear infinite',
      }} />
    </div>
  )
}

/* Spring-based cursor glow — desktop/hover-capable only */
function CursorGlow() {
  const x = useSpring(-999, { stiffness: 80, damping: 22, mass: 0.5 })
  const y = useSpring(-999, { stiffness: 80, damping: 22, mass: 0.5 })
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    /* Only activate on devices that support hover (not touch-primary) */
    const mq = window.matchMedia('(hover: hover) and (min-width: 768px)')
    if (!mq.matches) return

    const move = e => {
      x.set(e.clientX)
      y.set(e.clientY)
      if (!visible) setVisible(true)
    }
    const hide = () => setVisible(false)

    window.addEventListener('mousemove', move)
    document.addEventListener('mouseleave', hide)
    return () => {
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseleave', hide)
    }
  }, [x, y, visible])

  return (
    <motion.div
      className="cursor-glow"
      style={{ left: x, top: y, opacity: visible ? 1 : 0 }}
    />
  )
}

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<PageLoader />}>
        <Routes location={location} key={location.pathname}>
          <Route path="/"                           element={<About />} />
          <Route path="/about"                      element={<About />} />
          <Route path="/resume"                     element={<Resume />} />
          <Route path="/portfolio"                  element={<Portfolio />} />
          <Route path="/contact"                    element={<Contact />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      {/* Ambient background blobs */}
      <div className="blob-field" aria-hidden="true">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
      </div>
      <CursorGlow />
      <Navbar />
      <main role="main" style={{ minHeight: '100vh' }}>
        <AnimatedRoutes />
      </main>
      <ScrollToTop />
    </BrowserRouter>
  )
}
