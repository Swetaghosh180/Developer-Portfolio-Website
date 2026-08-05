import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import PageWrapper from '../components/PageWrapper'
import { RiGithubLine, RiExternalLinkLine, RiArrowLeftLine } from 'react-icons/ri'

const ease = [0.22, 1, 0.36, 1]
const up = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, delay, ease },
})

function Section({ title, color = '#6366f1', children, delay = 0 }) {
  return (
    <motion.div {...up(delay)} style={{
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.07)',
      borderRadius: '18px',
      padding: '1.5rem',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 1,
        background: `linear-gradient(90deg, transparent, ${color}40, transparent)`,
        pointerEvents: 'none',
      }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', marginBottom: '1rem' }}>
        <div style={{ width: 3, height: 18, borderRadius: 2, background: `linear-gradient(to bottom, ${color}, ${color}60)`, boxShadow: `0 0 8px ${color}50` }} />
        <h2 style={{ fontSize: '0.75rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.15em' }}>{title}</h2>
      </div>
      {children}
    </motion.div>
  )
}

const stack = [
  { name: 'React',       color: '#61dafb', role: 'Frontend UI' },
  { name: 'Tailwind CSS',color: '#06b6d4', role: 'Styling' },
  { name: 'FastAPI',     color: '#009688', role: 'Backend API' },
  { name: 'Python',      color: '#3776ab', role: 'Core Logic' },
  { name: 'YOLOv8',      color: '#f59e0b', role: 'Object Detection' },
  { name: 'EasyOCR',     color: '#a78bfa', role: 'Text Extraction' },
  { name: 'BLIP',        color: '#ec4899', role: 'Image Captioning' },
  { name: 'OpenCV',      color: '#5c3ee8', role: 'Image Processing' },
  { name: 'SQLite',      color: '#22c55e', role: 'Analysis History' },
  { name: 'Netlify',     color: '#00c7b7', role: 'Deployment' },
]

const features = [
  { icon: 'scan-outline',         title: 'Object Detection',    desc: 'YOLOv8 detects and labels objects in any uploaded image with bounding box coordinates and confidence scores.' },
  { icon: 'text-outline',         title: 'Multilingual OCR',    desc: 'EasyOCR extracts printed and handwritten text from images, supporting multiple languages including English and Hindi.' },
  { icon: 'chatbubble-outline',   title: 'AI Image Captioning', desc: 'BLIP Transformer generates a natural-language description of the image content automatically.' },
  { icon: 'document-outline',     title: 'PDF Report Export',   desc: 'All analysis results — detections, extracted text, and caption — are compiled into a downloadable PDF report.' },
  { icon: 'time-outline',         title: 'Analysis History',    desc: 'SQLite database stores every analysis session so users can revisit past results without re-uploading.' },
  { icon: 'cloud-upload-outline', title: 'Drag & Drop Upload',  desc: 'React frontend supports drag-and-drop image upload with instant preview before sending to the API.' },
]

const challenges = [
  {
    challenge: 'Model loading latency on first request',
    solution: 'Implemented lazy model loading with a singleton pattern in FastAPI — models load once on first request and stay in memory, reducing subsequent response times to under 2 seconds.',
  },
  {
    challenge: 'CORS and file transfer between React and FastAPI',
    solution: 'Configured FastAPI CORS middleware and used multipart/form-data for image uploads, with proper error handling for oversized files.',
  },
  {
    challenge: 'BLIP and YOLOv8 running simultaneously on CPU',
    solution: 'Ran models sequentially rather than in parallel to avoid memory pressure on CPU-only environments, with clear loading states in the UI.',
  },
  {
    challenge: 'PDF generation with dynamic content',
    solution: 'Used ReportLab to programmatically build PDFs with the annotated image, detection table, OCR text, and caption — all formatted consistently.',
  },
]

const roadmap = [
  'Deploy FastAPI backend to Render or Railway for a fully live demo',
  'Add batch image processing — analyze multiple images in one session',
  'Integrate GPT-4 Vision for richer, context-aware image descriptions',
  'Add user authentication so each user has a private analysis history',
  'Export results as JSON in addition to PDF for developer use cases',
  'Mobile-optimised camera capture for real-time analysis on device',
]

export default function VisionInspectCase() {
  return (
    <PageWrapper>
      <div className="page-content" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

        {/* Back link */}
        <motion.div {...up(0)}>
          <Link
            to="/portfolio"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
              fontSize: '0.8rem', fontWeight: 600, color: '#475569',
              textDecoration: 'none', transition: 'color 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.color = '#818cf8'}
            onMouseLeave={e => e.currentTarget.style.color = '#475569'}
          >
            <RiArrowLeftLine size={14} aria-hidden="true" /> Back to Projects
          </Link>
        </motion.div>

        {/* Hero */}
        <motion.div {...up(0.04)} style={{
          background: 'rgba(99,102,241,0.05)',
          border: '1px solid rgba(99,102,241,0.18)',
          borderRadius: '22px',
          padding: '2rem',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 1,
            background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.5), rgba(167,139,250,0.4), transparent)',
            pointerEvents: 'none',
          }} />
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.25)', borderRadius: '999px', padding: '0.28rem 0.85rem', marginBottom: '1rem' }}>
            <span style={{ fontSize: '0.68rem', fontWeight: 700, color: '#818cf8', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Flagship Project · Case Study</span>
          </div>
          <h1 style={{ fontSize: 'clamp(1.4rem, 4vw, 2rem)', fontWeight: 800, color: '#f1f5f9', letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: '0.65rem' }}>
            VisionInspect AI
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: 1.8, maxWidth: 580, marginBottom: '1.4rem' }}>
            A production-ready AI image analysis platform combining object detection, multilingual OCR, and AI captioning — built end-to-end with React, FastAPI, and three computer vision models.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
            <a href="https://github.com/Swetaghosh180" target="_blank" rel="noreferrer"
              className="btn-primary"
              aria-label="View VisionInspect AI source code on GitHub (opens in new tab)"
              style={{ fontSize: '0.82rem', padding: '0.5rem 1.2rem' }}
            >
              <RiGithubLine size={15} aria-hidden="true" /> View on GitHub
            </a>
            <a href="https://swetaghosh-portfolio.netlify.app/" target="_blank" rel="noreferrer"
              className="btn-ghost"
              aria-label="View VisionInspect AI live demo (opens in new tab)"
              style={{ fontSize: '0.82rem', padding: '0.5rem 1.2rem' }}
            >
              <RiExternalLinkLine size={15} aria-hidden="true" /> Live Demo
            </a>
          </div>
        </motion.div>

        {/* Executive Summary */}
        <Section title="Executive Summary" color="#6366f1" delay={0.06}>
          <p style={{ color: '#94a3b8', fontSize: '0.88rem', lineHeight: 1.9 }}>
            VisionInspect AI is a full-stack AI application that accepts any image and runs three
            computer vision models in sequence: <strong style={{ color: '#e2e8f0' }}>YOLOv8</strong> for
            object detection, <strong style={{ color: '#e2e8f0' }}>EasyOCR</strong> for multilingual text
            extraction, and <strong style={{ color: '#e2e8f0' }}>BLIP Transformer</strong> for natural-language
            image captioning. Results are displayed in a React UI and exported as a structured PDF report.
            The project demonstrates end-to-end ownership: UI design, REST API architecture, AI model
            integration, database persistence, and frontend deployment.
          </p>
        </Section>

        {/* Problem + Business Value side by side */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
          <Section title="Problem Statement" color="#ec4899" delay={0.08}>
            <p style={{ color: '#94a3b8', fontSize: '0.86rem', lineHeight: 1.85 }}>
              Manually analysing images for content — identifying objects, reading text, and
              describing scenes — is time-consuming and requires domain expertise. Existing tools
              are either siloed (one model per tool) or require cloud API keys with usage costs.
              There was no single open-source tool that combined all three capabilities with a
              clean UI and exportable output.
            </p>
          </Section>
          <Section title="Business Value" color="#22c55e" delay={0.1}>
            <ul style={{ color: '#94a3b8', fontSize: '0.86rem', lineHeight: 2, paddingLeft: '1.1rem' }}>
              <li>Reduces manual image review time from minutes to <strong style={{ color: '#22c55e' }}>under 5 seconds</strong></li>
              <li>Runs entirely on CPU — <strong style={{ color: '#22c55e' }}>no GPU or cloud API costs</strong></li>
              <li>PDF export makes results shareable and audit-ready</li>
              <li>History feature enables longitudinal analysis across sessions</li>
              <li>Open-source stack — fully customisable for enterprise use cases</li>
            </ul>
          </Section>
        </div>

        {/* AI Workflow */}
        <Section title="AI Workflow" color="#a78bfa" delay={0.12}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {[
              { step: '01', label: 'Image Upload',       desc: 'User uploads image via React drag-and-drop UI. Sent as multipart/form-data to FastAPI.',         color: '#6366f1' },
              { step: '02', label: 'Object Detection',   desc: 'YOLOv8 runs inference — returns detected class labels, bounding boxes, and confidence scores.',   color: '#f59e0b' },
              { step: '03', label: 'Text Extraction',    desc: 'EasyOCR scans the image for printed/handwritten text across multiple languages.',                  color: '#a78bfa' },
              { step: '04', label: 'Image Captioning',   desc: 'BLIP Transformer generates a natural-language sentence describing the full image content.',        color: '#ec4899' },
              { step: '05', label: 'Result Aggregation', desc: 'FastAPI collects all three outputs, stores them in SQLite, and returns a unified JSON response.',  color: '#22c55e' },
              { step: '06', label: 'PDF Generation',     desc: 'ReportLab compiles the annotated image, detection table, OCR text, and caption into a PDF.',      color: '#61dafb' },
            ].map(({ step, label, desc, color }, i, arr) => (
              <div key={step} style={{ display: 'flex', gap: '1rem', position: 'relative' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
                    background: `${color}15`, border: `1.5px solid ${color}40`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.65rem', fontWeight: 800, color,
                  }}>{step}</div>
                  {i < arr.length - 1 && (
                    <div style={{ width: 1, flex: 1, minHeight: 20, background: `linear-gradient(to bottom, ${color}40, transparent)`, margin: '3px 0' }} />
                  )}
                </div>
                <div style={{ paddingBottom: i < arr.length - 1 ? '0.85rem' : 0, paddingTop: '0.45rem' }}>
                  <p style={{ fontSize: '0.84rem', fontWeight: 700, color: '#e2e8f0', marginBottom: '0.2rem' }}>{label}</p>
                  <p style={{ fontSize: '0.78rem', color: '#475569', lineHeight: 1.75 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Tech Stack */}
        <Section title="Technology Stack" color="#61dafb" delay={0.14}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '0.6rem' }}>
            {stack.map(({ name, color, role }) => (
              <div key={name} style={{
                background: `${color}08`, border: `1px solid ${color}22`,
                borderRadius: '10px', padding: '0.7rem 0.85rem',
              }}>
                <p style={{ fontSize: '0.82rem', fontWeight: 700, color, marginBottom: '0.15rem' }}>{name}</p>
                <p style={{ fontSize: '0.7rem', color: '#475569' }}>{role}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Features */}
        <Section title="Key Features" color="#f59e0b" delay={0.16}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.75rem' }}>
            {features.map(({ icon, title, desc }) => (
              <div key={title} style={{
                background: 'rgba(255,255,255,0.025)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '12px', padding: '0.9rem',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                  <ion-icon name={icon} aria-hidden="true" style={{ fontSize: '15px', color: '#f59e0b' }} />
                  <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#e2e8f0' }}>{title}</span>
                </div>
                <p style={{ fontSize: '0.76rem', color: '#475569', lineHeight: 1.75 }}>{desc}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Folder Structure */}
        <Section title="Project Structure" color="#22c55e" delay={0.18}>
          <pre style={{
            background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '10px', padding: '1.1rem', overflowX: 'auto',
            fontSize: '0.76rem', lineHeight: 1.9, color: '#94a3b8',
            fontFamily: "'Fira Code', 'Cascadia Code', monospace",
          }}>{`visioninspect-ai/
├── frontend/                 # React + Tailwind
│   ├── src/
│   │   ├── components/       # ImageUploader, ResultPanel, PDFButton
│   │   ├── pages/            # Home, History
│   │   └── App.jsx
│   └── package.json
├── backend/                  # FastAPI
│   ├── main.py               # API routes
│   ├── models/
│   │   ├── detector.py       # YOLOv8 wrapper
│   │   ├── ocr.py            # EasyOCR wrapper
│   │   └── captioner.py      # BLIP wrapper
│   ├── database.py           # SQLite via SQLAlchemy
│   ├── pdf_generator.py      # ReportLab PDF builder
│   └── requirements.txt
└── README.md`}</pre>
        </Section>

        {/* Challenges */}
        <Section title="Challenges & Solutions" color="#ec4899" delay={0.2}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {challenges.map(({ challenge, solution }) => (
              <div key={challenge} style={{
                background: 'rgba(255,255,255,0.025)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '12px', padding: '1rem',
              }}>
                <p style={{ fontSize: '0.82rem', fontWeight: 700, color: '#ec4899', marginBottom: '0.35rem' }}>⚠ {challenge}</p>
                <p style={{ fontSize: '0.79rem', color: '#64748b', lineHeight: 1.8 }}>✓ {solution}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Lessons Learned */}
        <Section title="Lessons Learned" color="#818cf8" delay={0.22}>
          <ul style={{ color: '#94a3b8', fontSize: '0.86rem', lineHeight: 2.1, paddingLeft: '1.1rem' }}>
            <li>Running multiple ML models in a single API requires careful memory management — singleton loading is essential.</li>
            <li>FastAPI's async capabilities are powerful but CPU-bound ML inference should run in a thread pool to avoid blocking the event loop.</li>
            <li>User feedback during long inference (loading states, progress indicators) is as important as the result itself.</li>
            <li>Structuring the backend with separate model wrappers made testing and swapping models significantly easier.</li>
          </ul>
        </Section>

        {/* Future Roadmap */}
        <Section title="Future Roadmap" color="#f59e0b" delay={0.24}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {roadmap.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                <span style={{
                  flexShrink: 0, marginTop: '0.15rem',
                  width: 20, height: 20, borderRadius: '50%',
                  background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.25)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.6rem', fontWeight: 800, color: '#f59e0b',
                }}>{i + 1}</span>
                <p style={{ fontSize: '0.83rem', color: '#64748b', lineHeight: 1.75 }}>{item}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* CTA */}
        <motion.div {...up(0.26)} style={{
          background: 'rgba(99,102,241,0.05)',
          border: '1px solid rgba(99,102,241,0.15)',
          borderRadius: '18px', padding: '1.5rem',
          display: 'flex', flexWrap: 'wrap', alignItems: 'center',
          justifyContent: 'space-between', gap: '1rem',
        }}>
          <div>
            <p style={{ fontSize: '0.95rem', fontWeight: 700, color: '#e2e8f0', marginBottom: '0.25rem' }}>Interested in this project?</p>
            <p style={{ fontSize: '0.82rem', color: '#475569' }}>View the source code or reach out to discuss the implementation.</p>
          </div>
          <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
            <a href="https://github.com/Swetaghosh180" target="_blank" rel="noreferrer"
              className="btn-primary"
              aria-label="View source code on GitHub (opens in new tab)"
              style={{ fontSize: '0.82rem', padding: '0.5rem 1.2rem' }}
            >
              <RiGithubLine size={15} aria-hidden="true" /> GitHub
            </a>
            <Link to="/contact" className="btn-ghost" style={{ fontSize: '0.82rem', padding: '0.5rem 1.2rem' }}>
              Get In Touch
            </Link>
          </div>
        </motion.div>

      </div>
    </PageWrapper>
  )
}
