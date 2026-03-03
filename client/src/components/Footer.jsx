import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from '../gsap-setup'
import { Mail, Heart, ArrowUp } from 'lucide-react'
import { personal, socialLinks } from '../data'

export default function Footer() {
  const footerRef = useRef(null)
  const contentRef = useRef(null)

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (contentRef.current) {
        gsap.fromTo(contentRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0,
            duration: 0.7, ease: 'power3.out',
            scrollTrigger: { trigger: contentRef.current, start: 'top 92%', once: true }
          }
        )
      }
    }, footerRef)
    return () => ctx.revert()
  }, [])

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' }
  ]

  return (
    <footer ref={footerRef} style={{ background: 'var(--bg-alt)', borderTop: '1px solid var(--border)' }}>
      <div ref={contentRef} style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(2rem, 5vw, 3.5rem) clamp(1rem, 3vw, 1.5rem) clamp(1.25rem, 3vw, 2rem)', opacity: 0 }}>

        {/* Top section */}
        <div className="footer-grid" style={{ display: 'grid', gap: 'clamp(1.5rem, 4vw, 3rem)', marginBottom: 'clamp(1.5rem, 4vw, 3rem)' }}>

          {/* Brand */}
          <div>
            <a href="#hero" style={{ textDecoration: 'none', display: 'inline-block', marginBottom: '0.75rem' }}>
              <span style={{ color: 'var(--text)', fontSize: '1.25rem', fontWeight: 700 }}>Zankar</span>
              <span style={{ color: 'var(--primary)', fontSize: '1.25rem', fontWeight: 700 }}> Bhalala</span>
            </a>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.7, maxWidth: 320 }}>
              {personal.role} crafting robust, user-centric digital experiences.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 style={{ color: 'var(--text)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '1.25rem' }}>
              Navigation
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {navLinks.map((l, i) => (
                <a key={i} href={l.href}
                   style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', textDecoration: 'none', transition: 'color 0.2s' }}
                   onMouseEnter={e => e.target.style.color = 'var(--accent)'}
                   onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}>
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          {/* Connect */}
          <div>
            <h4 style={{ color: 'var(--text)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '1.25rem' }}>
              Connect
            </h4>
            <a href={`mailto:${personal.email}`}
               style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.875rem', textDecoration: 'none', marginBottom: '1.25rem', transition: 'color 0.2s' }}
               onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
               onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}>
              <Mail size={14} /> {personal.email}
            </a>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              {socialLinks.map((link, i) => (
                <a key={i} href={link.href} target="_blank" rel="noreferrer"
                   style={{
                     display: 'flex', alignItems: 'center', justifyContent: 'center',
                     width: 40, height: 40, borderRadius: 8,
                     background: 'var(--bg-elevated)', color: 'var(--text-muted)',
                     textDecoration: 'none', transition: 'all 0.2s'
                   }}
                   onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.background = 'var(--accent-subtle)' }}
                   onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.background = 'var(--bg-elevated)' }}>
                  <link.icon size={17} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom" style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', margin: 0 }}>
            © {new Date().getFullYear()} Zankar Bhalala. All rights reserved.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', margin: 0, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              Made with <Heart size={12} style={{ fill: '#ef4444', color: '#ef4444' }} /> in India
            </p>
            <button onClick={scrollTop}
                    style={{
                      width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center',
                      borderRadius: 8, border: 'none', cursor: 'pointer',
                      background: 'var(--bg-elevated)', color: 'var(--text-secondary)',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.color = '#fff' }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'var(--bg-elevated)'; e.currentTarget.style.color = 'var(--text-secondary)' }}>
              <ArrowUp size={16} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
