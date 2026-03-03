import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from '../../gsap-setup'
import { skillsRow1, skillsRow2 } from '../../data'
import { BarChart3, FileSpreadsheet } from 'lucide-react'
import {
  SiCplusplus, SiPython, SiOpenjdk, SiHtml5, SiCss, SiJavascript,
  SiReact, SiNodedotjs, SiExpress, SiMongodb, SiPhp, SiTailwindcss,
  SiBootstrap, SiGit, SiTensorflow, SiPytorch,
} from 'react-icons/si'

const skillIcons = {
  'C/C++': SiCplusplus,
  'Python': SiPython,
  'Java': SiOpenjdk,
  'HTML': SiHtml5,
  'CSS': SiCss,
  'JavaScript': SiJavascript,
  'React.js': SiReact,
  'Node.js': SiNodedotjs,
  'Express.js': SiExpress,
  'MongoDB': SiMongodb,
  'PHP': SiPhp,
  'Tailwind CSS': SiTailwindcss,
  'Bootstrap': SiBootstrap,
  'Power BI': BarChart3,
  'Excel': FileSpreadsheet,
  'Git': SiGit,
  'Machine Learning': SiTensorflow,
  'Deep Learning': SiPytorch,
}

const skillColors = {
  'C/C++': '#00599C',
  'Python': '#3776AB',
  'Java': '#ED8B00',
  'HTML': '#E34F26',
  'CSS': '#1572B6',
  'JavaScript': '#F7DF1E',
  'React.js': '#61DAFB',
  'Node.js': '#339933',
  'Express.js': '#FFFFFF',
  'MongoDB': '#47A248',
  'PHP': '#777BB4',
  'Tailwind CSS': '#06B6D4',
  'Bootstrap': '#7952B3',
  'Power BI': '#F2C811',
  'Excel': '#217346',
  'Git': '#F05032',
  'Machine Learning': '#FF6F00',
  'Deep Learning': '#EE4C2C',
}

function MarqueeRow({ items, direction = 'left' }) {
  const doubled = [...items, ...items]
  return (
    <div className="marquee-container py-4">
      <div className={`marquee-track ${direction === 'left' ? 'marquee-left' : 'marquee-right'}`}>
        {doubled.map((skill, i) => {
          const Icon = skillIcons[skill]
          const color = skillColors[skill] || 'var(--accent)'
          return (
            <div key={i} className="marquee-item">
              <div className="w-8 h-8 rounded-md flex items-center justify-center"
                   style={{ background: 'var(--accent-subtle)' }}>
                {Icon ? <Icon size={20} color={color} /> : (
                  <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--accent)' }}>
                    {skill.slice(0, 2).toUpperCase()}
                  </span>
                )}
              </div>
              <div>
                <span className="tech-name">{skill}</span>
                <span className="tech-label block">Technology</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default function Skills() {
  const sectionRef = useRef(null)
  const row1Ref = useRef(null)
  const row2Ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (row1Ref.current) {
        gsap.fromTo(row1Ref.current,
          { opacity: 0, x: -60, rotateY: 6 },
          {
            opacity: 1, x: 0, rotateY: 0,
            duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: row1Ref.current, start: 'top 88%', once: true }
          }
        )
      }
      if (row2Ref.current) {
        gsap.fromTo(row2Ref.current,
          { opacity: 0, x: 60, rotateY: -6 },
          {
            opacity: 1, x: 0, rotateY: 0,
            duration: 0.8, delay: 0.15, ease: 'power3.out',
            scrollTrigger: { trigger: row2Ref.current, start: 'top 88%', once: true }
          }
        )
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="skills" ref={sectionRef} className="section" style={{ background: 'var(--bg-alt)' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
          style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 5vw, 3.5rem)' }}
        >
          <span className="section-badge">Inventory</span>
          <h2>
            <span style={{ color: 'var(--text-muted)' }}>The</span>{' '}
            <span style={{ color: 'var(--primary)' }}>Tech Stack</span>
          </h2>
        </motion.div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', perspective: '1000px' }}>
        <div ref={row1Ref} style={{ opacity: 0 }}>
          <MarqueeRow items={skillsRow1} direction="left" />
        </div>
        <div ref={row2Ref} style={{ opacity: 0 }}>
          <MarqueeRow items={skillsRow2} direction="right" />
        </div>
      </div>
    </section>
  )
}
