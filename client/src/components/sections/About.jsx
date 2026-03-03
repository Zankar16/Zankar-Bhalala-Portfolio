import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from '../../gsap-setup'
import { personal } from '../../data'
import { GraduationCap, Award, Users, Newspaper, Code2, Database } from 'lucide-react'

import Tilt3D from '../Tilt3D'

const highlights = [
  { icon: Code2, label: 'Full Stack Development', desc: 'MERN stack, PHP, REST APIs' },
  { icon: Database, label: 'Data & ML', desc: 'Python, clustering, forecasting, deep learning' },
  { icon: GraduationCap, label: 'Education', desc: 'B.Tech @ PDEU — CGPA 9.3/10' },
]

const responsibilities = [
  { icon: Users, label: 'ACM Society — Committee Member' },
  { icon: Newspaper, label: 'CSE Newsletter — VP & Graphic Designer' },
  { icon: Award, label: 'Science & Tech Committee — Designer Head' },
]

const certifications = [
  '1st Prize — Pre-Nova PDEU',
  'Reinforcement Learning (Elite) — NPTEL',
  'Machine Learning — Internshala',
  'Problem Solving & SQL — HackerRank',
]

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
}
const fadeSlideUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.19, 1, 0.22, 1] } },
}

export default function About() {
  const sectionRef = useRef(null)
  const bioRef = useRef(null)
  const highlightRefs = useRef([])
  const pillRefs = useRef([])
  const certRefs = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (bioRef.current) {
        gsap.fromTo(bioRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
            scrollTrigger: { trigger: bioRef.current, start: 'top 82%', once: true }
          }
        )
      }

      highlightRefs.current.forEach((card, i) => {
        if (!card) return
        gsap.fromTo(card,
          { opacity: 0, y: 40, scale: 0.97, rotateX: 10 },
          {
            opacity: 1, y: 0, scale: 1, rotateX: 0,
            duration: 0.65, delay: i * 0.12, ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 85%', once: true }
          }
        )
      })

      pillRefs.current.forEach((pill, i) => {
        if (!pill) return
        gsap.fromTo(pill,
          { opacity: 0, y: 16, scale: 0.9 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 0.4, delay: i * 0.08, ease: 'power2.out',
            scrollTrigger: { trigger: pill, start: 'top 90%', once: true }
          }
        )
      })

      certRefs.current.forEach((cert, i) => {
        if (!cert) return
        gsap.fromTo(cert,
          { opacity: 0, x: -20 },
          {
            opacity: 1, x: 0,
            duration: 0.5, delay: i * 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: cert, start: 'top 90%', once: true }
          }
        )
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="about" ref={sectionRef} className="section" style={{ background: 'var(--bg-alt)' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
          style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 5vw, 3.5rem)' }}
        >
          <span className="section-badge">Discovery</span>
          <h2>
            <span style={{ color: 'var(--text-muted)' }}>About</span>{' '}
            <span style={{ color: 'var(--primary)' }}>The Architect</span>
          </h2>
        </motion.div>

        <div>
          {/* Bio + Skills + Certifications */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Bio */}
            <p ref={bioRef} className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)', lineHeight: 1.8, opacity: 0 }}>
              {personal.bio}
            </p>

            {/* Highlights */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: '1rem' }}>
              {highlights.map((item, i) => {
                const Icon = item.icon
                return (
                  <Tilt3D key={i} maxRotation={8} perspective={800} scale={1.02} glare={true}>
                    <div ref={el => highlightRefs.current[i] = el} style={{ padding: '1.25rem', borderRadius: '0.75rem', background: 'var(--bg-card)', border: '1px solid var(--border)', transition: 'all 550ms cubic-bezier(0.19, 1, 0.22, 1)', opacity: 0, cursor: 'default' }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(167,139,250,0.15)'; e.currentTarget.style.transform = 'translateY(-6px) scale(1.02)' }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'none' }}
                    >
                      <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--accent-subtle)', color: 'var(--accent)', marginBottom: '0.75rem' }}>
                        <Icon size={18} />
                      </div>
                      <p style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text)', marginBottom: '0.25rem' }}>{item.label}</p>
                      <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{item.desc}</p>
                    </div>
                  </Tilt3D>
                )
              })}
            </div>

            {/* Responsibilities */}
            <div>
              <h4 style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                Responsibilities
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.625rem' }}>
                {responsibilities.map((r, i) => {
                  const Icon = r.icon
                  return (
                    <span key={i} ref={el => pillRefs.current[i] = el} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.5rem 1rem', borderRadius: '9999px', fontSize: '0.8125rem', border: '1px solid var(--border)', color: 'var(--text-secondary)', background: 'var(--bg-card)', opacity: 0, transition: 'all 400ms cubic-bezier(0.19, 1, 0.22, 1)' }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(167,139,250,0.2)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'none' }}
                    >
                      <Icon size={14} style={{ color: 'var(--accent)' }} />
                      {r.label}
                    </span>
                  )
                })}
              </div>
            </div>

            {/* Certifications */}
            <div>
              <h4 style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                Certifications
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: '0.625rem' }}>
                {certifications.map((cert, i) => (
                  <div key={i} ref={el => certRefs.current[i] = el} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.625rem 1rem', borderRadius: '0.5rem', fontSize: '0.8125rem', background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-secondary)', opacity: 0, transition: 'all 400ms cubic-bezier(0.19, 1, 0.22, 1)' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(167,139,250,0.15)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'none' }}
                  >
                    <span style={{ color: 'var(--accent)', fontSize: '0.75rem' }}>▸</span>
                    {cert}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
