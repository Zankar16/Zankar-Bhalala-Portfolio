import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from '../../gsap-setup'
import { ArrowRight, Download, Github, Linkedin } from 'lucide-react'
import { personal } from '../../data'
import Tilt3D from '../Tilt3D'

const codeLines = [
  { num: '01', code: 'const developer = {' },
  { num: '02', code: `  name: '${personal.name}',` },
  { num: '03', code: "  focus: 'Data & Full Stack'," },
  { num: '04', code: "  skills: ['Python', 'ML', 'MERN']," },
  { num: '05', code: '  passionate: true,' },
  { num: '06', code: '  motto: "Build with Purpose"' },
  { num: '07', code: '};' },
  { num: '08', code: 'developer.showcase();' },
]

const headlineContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
}
const wordReveal = {
  hidden: { opacity: 0, y: 30, filter: 'blur(4px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6, ease: [0.19, 1, 0.22, 1] } },
}

export default function Hero() {
  const sectionRef = useRef(null)
  const codeRef = useRef(null)
  const orb1Ref = useRef(null)
  const orb2Ref = useRef(null)
  const lineRefs = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (codeRef.current) {
        gsap.fromTo(codeRef.current,
          { opacity: 0, y: 30, rotateX: 12 },
          { opacity: 1, y: 0, rotateX: 0, duration: 1, ease: 'power3.out', delay: 0.5 }
        )
      }

      lineRefs.current.forEach((line, i) => {
        if (!line) return
        gsap.fromTo(line,
          { opacity: 0, x: -12 },
          { opacity: 1, x: 0, duration: 0.4, delay: 0.8 + i * 0.1, ease: 'power2.out' }
        )
      })

      if (orb1Ref.current) {
        gsap.to(orb1Ref.current, {
          y: -60, x: 20,
          scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom top', scrub: 1.2 },
        })
      }
      if (orb2Ref.current) {
        gsap.to(orb2Ref.current, {
          y: -40, x: -30,
          scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom top', scrub: 1.2 },
        })
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="section relative min-h-screen flex items-center grid-bg overflow-hidden"
      style={{ paddingTop: 'clamp(80px, 15vw, 120px)', paddingBottom: 'clamp(48px, 8vw, 80px)' }}
    >
      <div ref={orb1Ref} className="absolute top-1/4 -left-32 w-96 h-96 rounded-full pointer-events-none blur-3xl glow-orb"
           style={{ background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)' }} />
      <div ref={orb2Ref} className="absolute bottom-1/3 -right-32 w-80 h-80 rounded-full pointer-events-none blur-3xl glow-orb"
           style={{ background: 'radial-gradient(circle, var(--accent-purple) 0%, transparent 70%)' }} />

      <div className="container relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          <div className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.19, 1, 0.22, 1] }}
              className="mb-8"
            >
              <p className="text-base mb-2" style={{ color: 'var(--text-secondary)' }}>
                WELCOME TO MY UNIVERSE
              </p>
            </motion.div>

            <motion.h1
              variants={headlineContainer}
              initial="hidden"
              animate="visible"
              className="mb-6"
              style={{ lineHeight: 1.1 }}
            >
              <motion.span variants={wordReveal} style={{ display: 'inline-block', color: 'var(--text-muted)' }}>Crafting</motion.span>
              <br />
              <motion.span variants={wordReveal} style={{ display: 'inline-block', color: 'var(--primary)' }}>Data</motion.span>
              <motion.span variants={wordReveal} style={{ display: 'inline-block', color: 'var(--primary)' }}>-Driven</motion.span>
              <br />
              <motion.span variants={wordReveal} style={{ display: 'inline-block', color: 'var(--primary)' }}>Masterpieces</motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: [0.19, 1, 0.22, 1] }}
              className="text-base mb-8 max-w-lg"
              style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}
            >
              I'm <strong style={{ color: 'var(--primary)' }}>{personal.name}</strong>, a professional
              dedicated to building high-performance, data-driven web applications
              and intelligent ML solutions.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-3 mb-8"
            >
              {[
                { href: personal.github, icon: Github },
                { href: personal.linkedin, icon: Linkedin },
              ].map((s, i) => (
                <motion.a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="social-link"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.65 + i * 0.1, ease: [0.19, 1, 0.22, 1] }}
                >
                  <s.icon size={18} />
                </motion.a>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.75, ease: [0.19, 1, 0.22, 1] }}
              style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1rem', marginTop: '1.5rem' }}
            >
              <a href="#contact" className="btn-primary">
                Let's Collaborate
                <ArrowRight size={15} />
              </a>
              <a href={personal.resume} className="btn-secondary">
                Get Resume
                <Download size={15} />
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.19, 1, 0.22, 1] }}
            className="order-1 lg:order-2"
          >
            <Tilt3D maxRotation={10} perspective={900} scale={1.02} glare={true}>
              <div ref={codeRef} className="code-block w-full max-w-lg mx-auto lg:ml-auto" style={{ opacity: 0 }}>
              <div className="flex items-center gap-2 px-4 py-3" style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg-elevated)' }}>
                <div className="w-3 h-3 rounded-full" style={{ background: '#EF4444' }} />
                <div className="w-3 h-3 rounded-full" style={{ background: '#F59E0B' }} />
                <div className="w-3 h-3 rounded-full" style={{ background: '#22C55E' }} />
                <span className="ml-3 text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                  Portfolio.ts
                </span>
              </div>
              <div style={{ display: 'flex', fontFamily: 'var(--font-mono)', fontSize: 'clamp(0.7rem, 1.8vw, 0.8125rem)' }}>
                <div style={{ padding: '1.25rem 0.75rem 1.25rem 1rem', borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '0.35rem', userSelect: 'none', textAlign: 'right', minWidth: '2.5rem' }}>
                  {codeLines.map((line, i) => (
                    <span key={i} ref={el => lineRefs.current[i] = el} style={{ color: 'var(--text-muted)', fontSize: '0.75rem', lineHeight: '1.6', opacity: 0 }}>{line.num}</span>
                  ))}
                </div>
                <div style={{ padding: '1.25rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.35rem', flex: 1 }}>
                  {codeLines.map((line, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.9 + i * 0.1, ease: [0.19, 1, 0.22, 1] }}
                      style={{ lineHeight: '1.6', whiteSpace: 'pre' }}
                    >
                      {line.code.split("'").map((part, j) => {
                        if (j % 2 === 1) return <span key={j} style={{ color: 'var(--accent-green)' }}>'{part}'</span>
                        return <span key={j} style={{ color: 'var(--text-secondary)' }}>{part}</span>
                      })}
                    </motion.div>
                  ))}
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.8 }}
                    style={{ width: '0.5rem', height: '1.1rem', display: 'inline-block', background: 'var(--accent)' }}
                    className="cursor-blink"
                  />
                </div>
              </div>
              </div>
            </Tilt3D>

            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 'clamp(1.25rem, 4vw, 3rem)', marginTop: 'clamp(1.5rem, 3vw, 2.5rem)', paddingTop: 'clamp(1.25rem, 2.5vw, 2rem)', borderTop: '1px solid var(--border)' }}>
              {personal.stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 1.0 + i * 0.15, duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
                  style={{ textAlign: 'center' }}
                >
                  <div style={{ fontSize: 'clamp(1.25rem, 3.5vw, 1.75rem)', fontWeight: 700, color: 'var(--primary)' }}>
                    {stat.value}{stat.suffix}
                  </div>
                  <div style={{ fontSize: '0.625rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '0.25rem', color: 'var(--text-muted)' }}>
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
