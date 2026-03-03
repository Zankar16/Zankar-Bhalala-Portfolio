import { useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { gsap } from '../../gsap-setup'
import { Calendar, Building2, MapPin } from 'lucide-react'
import { experience } from '../../data'

export default function Experience() {
  const sectionRef = useRef(null)
  const cardRefs = useRef([])
  const timelineLineRef = useRef(null)
  const dotRefs = useRef([])

  const handleCardMouse = useCallback((e, i) => {
    const card = cardRefs.current[i]
    if (!card) return
    const rect = card.getBoundingClientRect()
    card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
    card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Timeline line drawing animation */
      if (timelineLineRef.current) {
        gsap.fromTo(timelineLineRef.current,
          { scaleY: 0, transformOrigin: 'top center' },
          {
            scaleY: 1,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: { trigger: timelineLineRef.current, start: 'top 80%', once: true }
          }
        )
      }

      /* Timeline dots — scale in with stagger */
      dotRefs.current.forEach((dot, i) => {
        if (!dot) return
        gsap.fromTo(dot,
          { scale: 0, opacity: 0 },
          {
            scale: 1, opacity: 1,
            duration: 0.5,
            delay: 0.3 + i * 0.2,
            ease: 'back.out(1.5)',
            scrollTrigger: { trigger: dot, start: 'top 85%', once: true }
          }
        )
      })

      /* Card reveals — 3D rotateX entrance with staggered scale */
      cardRefs.current.forEach((card, i) => {
        if (!card) return
        gsap.fromTo(card,
          { opacity: 0, y: 40, scale: 0.97, rotateX: 10 },
          {
            opacity: 1, y: 0, scale: 1, rotateX: 0,
            duration: 0.7,
            delay: i * 0.15,
            ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 85%', once: true }
          }
        )
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="experience" ref={sectionRef} className="section" style={{ background: 'var(--bg)' }}>
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
          style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 5vw, 3.5rem)' }}
        >
          <span className="section-badge">Built With Passion</span>
          <h2>
            <span style={{ color: 'var(--text-muted)' }}>Professional</span>{' '}
            <span style={{ color: 'var(--primary)' }}>Journey</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line — animated draw-down */}
          <div ref={timelineLineRef} className="absolute left-6 top-0 bottom-0 w-px hidden lg:block"
               style={{ background: 'linear-gradient(180deg, var(--accent), var(--accent-purple), transparent)', transformOrigin: 'top center' }} />

          <div className="space-y-6">
            {experience.map((exp, i) => (
              <div key={i} className="relative lg:pl-16">
                {/* Timeline dot — animated scale-in */}
                <div className="absolute left-[18px] top-8 hidden lg:block" ref={el => dotRefs.current[i] = el} style={{ opacity: 0 }}>
                  <div className="timeline-dot" />
                </div>

                {/* Card */}
                <div
                  ref={el => cardRefs.current[i] = el}
                  onMouseMove={(e) => handleCardMouse(e, i)}
                  className="card group"
                  style={{ opacity: 0 }}
                >
                  {/* Top row */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
                    <div>
                      <h3 className="text-lg font-bold transition-colors duration-300 group-hover:text-purple-400" style={{ color: 'var(--text)' }}>
                        {exp.role}
                      </h3>
                      <div className="flex items-center gap-2 mt-2">
                        <Building2 size={14} style={{ color: 'var(--accent)' }} />
                        <span className="text-sm font-medium" style={{ color: 'var(--accent)' }}>
                          {exp.company}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-medium px-3 py-2 rounded-lg shrink-0"
                         style={{ fontFamily: 'var(--font-mono)', background: 'var(--bg-elevated)', color: 'var(--text-muted)', border: '1px solid var(--border)' }}>
                      <Calendar size={12} style={{ color: 'var(--accent)' }} />
                      {exp.period}
                    </div>
                  </div>

                  {/* Bullets */}
                  <ul className="space-y-3">
                    {exp.bullets.map((b, j) => (
                      <li key={j} className="flex items-start gap-3 text-sm leading-relaxed"
                          style={{ color: 'var(--text-secondary)' }}>
                        <span className="mt-2 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: 'var(--accent)' }} />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
