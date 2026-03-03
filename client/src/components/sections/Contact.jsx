import { useState, useRef, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { gsap } from '../../gsap-setup'
import { Mail, Phone, MapPin, Send, ArrowUpRight } from 'lucide-react'
import { personal, socialLinks } from '../../data'
import Tilt3D from '../Tilt3D'

export default function Contact() {
  const sectionRef = useRef(null)
  const cardRefs = useRef([])
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState(null)

  /* Mouse-follow glow — same pattern as Experience/Projects cards */
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
          { opacity: 0, y: 40, scale: 0.97, rotateX: 10 },
          {
            opacity: 1, y: 0, scale: 1, rotateX: 0, duration: 0.7, delay: i * 0.15,
            ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 85%', once: true }
          }
        )
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('http://localhost:3001/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      if (res.ok) {
        setStatus('sent')
        setForm({ name: '', email: '', message: '' })
        setTimeout(() => setStatus(null), 3500)
      } else setStatus('error')
    } catch { setStatus('error') }
  }

  const contactItems = [
    { icon: Mail, label: 'Email', value: personal.email, href: `mailto:${personal.email}` },
    { icon: Phone, label: 'Phone', value: personal.phone, href: `tel:${personal.phone}` },
    { icon: MapPin, label: 'Location', value: personal.location }
  ]

  return (
    <section id="contact" ref={sectionRef} className="section" style={{ background: 'var(--bg-alt)' }}>
      <div className="container">
        {/* ── Section Header — matches About / Experience / Projects pattern ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
          style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 5vw, 3.5rem)' }}
        >
          <span className="section-badge">Get In Touch</span>
          <h2>
            <span style={{ color: 'var(--text-muted)' }}>Let's</span>{' '}
            <span style={{ color: 'var(--primary)' }}>Connect</span>
          </h2>
        </motion.div>

        {/* ── Two-column grid ────────────────────────────────────────────── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))',
          gap: '1.5rem',
          alignItems: 'start',
        }}>
          {/* ── LEFT: Form Card — uses .card class like Experience ─────── */}
          <Tilt3D maxRotation={5} perspective={900} scale={1.01} glare={true}>
          <div
            ref={el => cardRefs.current[0] = el}
            onMouseMove={e => handleCardMouse(e, 0)}
            className="card"
            style={{ padding: 'clamp(1.25rem, 3vw, 2rem)', opacity: 0 }}
          >
            <h3 style={{ marginBottom: '0.25rem' }}>Send A Message</h3>
            <p className="text-sm" style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              Fill in the form below and I'll get back to you shortly.
            </p>

            <form onSubmit={handleSubmit}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '1rem',
                marginBottom: '1rem',
              }}>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'var(--text-muted)',
                    marginBottom: '0.5rem',
                  }}>Name</label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="Your name"
                    value={form.name}
                    onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'var(--text-muted)',
                    marginBottom: '0.5rem',
                  }}>Email</label>
                  <input
                    type="email"
                    className="input-field"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{
                  display: 'block',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                  marginBottom: '0.5rem',
                }}>Message</label>
                <textarea
                  className="input-field"
                  style={{ minHeight: '140px', resize: 'vertical' }}
                  placeholder="Tell me about your project or idea..."
                  value={form.message}
                  onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                  required
                />
              </div>

              {/* CTA — uses .btn-primary class, same as Hero/Projects */}
              <button
                type="submit"
                className="btn-primary"
                disabled={status === 'sending'}
                style={{ width: '100%', justifyContent: 'center' }}
              >
                {status === 'sending' ? 'Sending...' : status === 'sent' ? 'Message Sent ✓' : (
                  <>Send Message <Send size={14} /></>
                )}
              </button>

              {status === 'error' && (
                <p style={{
                  fontSize: '0.8125rem',
                  textAlign: 'center',
                  color: '#ef4444',
                  marginTop: '0.75rem',
                }}>
                  Something went wrong. Please try again.
                </p>
              )}
            </form>
          </div>
          </Tilt3D>

          {/* ── RIGHT: Info Card — single .card, same style ──────────── */}
          <Tilt3D maxRotation={5} perspective={900} scale={1.01} glare={true}>
          <div
            ref={el => cardRefs.current[1] = el}
            onMouseMove={e => handleCardMouse(e, 1)}
            className="card"
            style={{ padding: 'clamp(1.25rem, 3vw, 2rem)', display: 'flex', flexDirection: 'column', opacity: 0 }}
          >
            {/* Direct Contact */}
            <h3 style={{ marginBottom: '0.25rem' }}>Direct Contact</h3>
            <p className="text-sm" style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              Reach out directly — I'm always open to conversations.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
              {contactItems.map((item, i) => {
                const Wrapper = item.href ? 'a' : 'div'
                return (
                  <Wrapper
                    key={i}
                    {...(item.href ? { href: item.href } : {})}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '0.875rem 1rem',
                      borderRadius: 'var(--radius-sm)',
                      background: 'var(--bg-elevated)',
                      border: '1px solid var(--border)',
                      textDecoration: 'none',
                      transition: 'all var(--duration) var(--ease)',
                      cursor: item.href ? 'pointer' : 'default',
                    }}
                  >
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
                      <item.icon size={16} style={{ color: 'var(--accent)' }} />
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <p style={{
                        fontSize: '0.6875rem',
                        fontWeight: 600,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        color: 'var(--text-muted)',
                        marginBottom: '0.125rem',
                      }}>{item.label}</p>
                      <p style={{
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        color: 'var(--text)',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}>{item.value}</p>
                    </div>
                  </Wrapper>
                )
              })}
            </div>

            {/* Divider — simple, like borders used elsewhere */}
            <div style={{
              height: '1px',
              background: 'var(--border)',
              marginBottom: '2rem',
            }} />

            {/* Social — uses .social-link style icons + labels */}
            <h4 style={{
              fontSize: '0.75rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: 'var(--text-muted)',
              marginBottom: '0.75rem',
            }}>Social Presence</h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {socialLinks.map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--bg-elevated)',
                    border: '1px solid var(--border)',
                    textDecoration: 'none',
                    transition: 'all var(--duration) var(--ease)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <link.icon size={16} style={{ color: 'var(--text-muted)' }} />
                    <span style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text)' }}>
                      {link.label}
                    </span>
                  </div>
                  <ArrowUpRight size={14} style={{ color: 'var(--text-muted)' }} />
                </a>
              ))}
            </div>
          </div>
          </Tilt3D>
        </div>
      </div>
    </section>
  )
}
