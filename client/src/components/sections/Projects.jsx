import { useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { gsap } from '../../gsap-setup'
import { ExternalLink, Github, FolderGit2, ArrowRight } from 'lucide-react'
import { projects } from '../../data'
import Tilt3D from '../Tilt3D'

export default function Projects() {
  const sectionRef = useRef(null)
  const cardRefs = useRef([])

  /* Mouse-follow glow — same as Experience/Contact */
  const handleCardMouse = useCallback((e, i) => {
    const card = cardRefs.current[i]
    if (!card) return
    const rect = card.getBoundingClientRect()
    card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
    card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardRefs.current.forEach((card, i) => {
        if (!card) return
        gsap.fromTo(card,
          { opacity: 0, y: 50, scale: 0.97, rotateX: 12 },
          {
            opacity: 1, y: 0, scale: 1, rotateX: 0,
            duration: 0.7,
            delay: i * 0.12,
            ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 88%', once: true }
          }
        )
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="projects" ref={sectionRef} className="section" style={{ background: 'var(--bg)' }}>
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
          style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 5vw, 3.5rem)' }}
        >
          <span className="section-badge">Projects Showcase</span>
          <h2>
            <span style={{ color: 'var(--text-muted)' }}>Featured</span>{' '}
            <span style={{ color: 'var(--primary)' }}>Creations</span>
          </h2>
          <p style={{ marginTop: '1rem', maxWidth: '42rem', marginInline: 'auto', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            A selection of high-impact digital solutions, built with focus on scalability,
            performance, and exceptional user experience.
          </p>
        </motion.div>

        {/* Project cards — compact grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
          gap: '1.5rem',
        }}>
          {projects.map((project, i) => (
            <Tilt3D key={i} maxRotation={8} perspective={800} scale={1.02} glare={true}>
            <div
              ref={el => cardRefs.current[i] = el}
              onMouseMove={(e) => handleCardMouse(e, i)}
              className="card group"
              style={{ padding: 0, overflow: 'hidden', opacity: 0 }}
            >
              {/* Compact color bar top */}
              <div style={{
                height: '4px',
                background: project.color || 'var(--accent)',
                opacity: 0.6,
              }} />

              {/* Content */}
              <div style={{ padding: '1.5rem' }}>
                {/* Icon + Title row */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--accent-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <FolderGit2 size={18} style={{ color: project.color || 'var(--accent)' }} />
                  </div>
                  <h3 style={{
                    fontSize: '1.125rem',
                    fontWeight: 700,
                    color: 'var(--text)',
                    lineHeight: 1.3,
                  }}>{project.title}</h3>
                </div>

                {/* Description */}
                <p style={{
                  fontSize: '0.8125rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.65,
                  marginBottom: '1rem',
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}>
                  {project.description}
                </p>

                {/* Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem', marginBottom: '1.25rem' }}>
                  {project.tags.slice(0, 4).map((tag, j) => (
                    <span key={j} className="skill-pill">{tag}</span>
                  ))}
                  {project.tags.length > 4 && (
                    <span className="skill-pill" style={{ background: 'var(--bg-elevated)' }}>
                      +{project.tags.length - 4}
                    </span>
                  )}
                </div>

                {/* Links */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                  {project.live && project.live !== '' && project.live !== '#' && (
                    <a href={project.live} target="_blank" rel="noreferrer" className="btn-primary"
                       style={{ padding: '8px 20px', fontSize: '0.6875rem' }}>
                      Live Demo
                      <ExternalLink size={12} />
                    </a>
                  )}
                  {project.source && project.source !== '' && project.source !== '#' && (
                    <a href={project.source} target="_blank" rel="noreferrer" className="btn-secondary"
                       style={{ padding: '8px 20px', fontSize: '0.6875rem' }}>
                      Source
                      <Github size={12} />
                    </a>
                  )}
                </div>
              </div>
            </div>
            </Tilt3D>
          ))}
        </div>

        {/* View More */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
          style={{ textAlign: 'center', marginTop: '4rem', paddingBottom: '2rem' }}
        >
          <a href="https://github.com/Zankar16" target="_blank" rel="noreferrer"
             className="btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            Explore Full Archive
            <ArrowRight size={15} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
