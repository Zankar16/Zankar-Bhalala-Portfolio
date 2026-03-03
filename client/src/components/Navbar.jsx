import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { personal } from '../data'

const navLinks = ['About', 'Experience', 'Skills', 'Projects', 'Contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      const sections = navLinks.map(l => document.getElementById(l.toLowerCase()))
      const scrollPos = window.scrollY + window.innerHeight / 3
      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i] && sections[i].offsetTop <= scrollPos) {
          setActive(navLinks[i])
          return
        }
      }
      setActive('')
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id) => {
    const el = document.getElementById(id.toLowerCase())
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    setIsOpen(false)
  }

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        height: '72px',
        background: scrolled ? 'rgba(10, 10, 15, 0.9)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
      }}
    >
      <div className="container h-full flex items-center justify-between">
        <div
          className="flex items-center gap-2 cursor-pointer z-51 select-none"
          onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setIsOpen(false) }}
        >
          <span className="text-lg font-bold tracking-tight" style={{ color: 'var(--primary)' }}>
            {personal.name.split(' ')[0]}
            <span style={{ color: 'var(--accent)' }}> {personal.name.split(' ')[1]}</span>
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(link)}
              className={`nav-link ${active === link ? 'active' : ''}`}
            >
              {link}
            </button>
          ))}
        </nav>

        <a href="#contact" className="hidden md:inline-flex btn-primary" style={{ padding: '8px 20px', fontSize: '0.75rem' }}>
          Let's Talk
        </a>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 z-51"
          style={{ color: 'var(--text)', background: 'none', border: 'none' }}
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-48 md:hidden"
            style={{
              background: 'rgba(10, 10, 15, 0.97)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
            }}
          >
            <motion.button
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsOpen(false)}
              style={{
                position: 'absolute',
                top: '22px',
                right: '20px',
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border)',
                borderRadius: '50%',
                width: '44px',
                height: '44px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text)',
                cursor: 'pointer',
              }}
            >
              <X size={20} />
            </motion.button>

            <nav style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              gap: '0.5rem',
              padding: '0 2rem',
            }}>
              {navLinks.map((link, i) => (
                <motion.button
                  key={link}
                  initial={{ opacity: 0, y: 30, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: 0.1 + i * 0.07, duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
                  onClick={() => scrollTo(link)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '0.75rem 2rem',
                    fontSize: active === link ? '1.5rem' : '1.35rem',
                    fontWeight: active === link ? 700 : 500,
                    color: active === link ? 'var(--accent)' : 'var(--text-secondary)',
                    letterSpacing: '-0.02em',
                    transition: 'color 0.3s, transform 0.3s',
                    position: 'relative',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = 'var(--accent)'
                    e.currentTarget.style.transform = 'scale(1.08)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = active === link ? 'var(--accent)' : 'var(--text-secondary)'
                    e.currentTarget.style.transform = 'scale(1)'
                  }}
                >
                  <span style={{
                    display: 'inline-block',
                    fontSize: '0.65rem',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--accent)',
                    opacity: 0.5,
                    marginRight: '0.5rem',
                    verticalAlign: 'middle',
                  }}>0{i + 1}</span>
                  {link}
                </motion.button>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.1 + navLinks.length * 0.07 + 0.1, duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
                style={{ marginTop: '2rem', width: '100%', maxWidth: '260px' }}
              >
                <a
                  href="#contact"
                  onClick={() => setIsOpen(false)}
                  className="btn-primary"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    padding: '14px 24px',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    borderRadius: 'var(--radius-full)',
                  }}
                >
                  Let's Talk
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
