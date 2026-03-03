import { useRef, useCallback, useState, useEffect } from 'react'

export default function Tilt3D({
  children,
  maxRotation = 12,
  perspective = 800,
  scale = 1.03,
  speed = 500,
  glare = true,
  className = '',
  style = {},
  as: Tag = 'div',
  ...rest
}) {
  const ref = useRef(null)
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50 })
  const [hovered, setHovered] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  const raf = useRef(null)

  useEffect(() => {
    const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches
      || 'ontouchstart' in window
      || navigator.maxTouchPoints > 0
    setIsTouchDevice(isTouch)
  }, [])

  const handleMove = useCallback((e) => {
    const el = ref.current
    if (!el) return
    if (raf.current) cancelAnimationFrame(raf.current)
    raf.current = requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height
      const rotateY = (x - 0.5) * maxRotation * 2
      const rotateX = (0.5 - y) * maxRotation * 2
      setTilt({ rotateX, rotateY, glareX: x * 100, glareY: y * 100 })
    })
  }, [maxRotation])

  const handleEnter = useCallback(() => { if (!isTouchDevice) setHovered(true) }, [isTouchDevice])
  const handleLeave = useCallback(() => {
    setHovered(false)
    setTilt({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50 })
    if (raf.current) cancelAnimationFrame(raf.current)
  }, [])

  return (
    <Tag
      ref={ref}
      onMouseMove={isTouchDevice ? undefined : handleMove}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className={className}
      style={{
        perspective: isTouchDevice ? undefined : `${perspective}px`,
        ...style,
      }}
      {...rest}
    >
      <div
        style={{
          transform: (!isTouchDevice && hovered)
            ? `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`
            : 'none',
          transition: (!isTouchDevice && hovered)
            ? `transform ${speed * 0.4}ms cubic-bezier(0.03, 0.98, 0.52, 0.99)`
            : `transform ${speed}ms cubic-bezier(0.19, 1, 0.22, 1)`,
          transformStyle: isTouchDevice ? undefined : 'preserve-3d',
          willChange: isTouchDevice ? undefined : 'transform',
          width: '100%',
          height: '100%',
          position: 'relative',
        }}
      >
        {children}

        {glare && !isTouchDevice && (
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: 'inherit',
              pointerEvents: 'none',
              background: `radial-gradient(
                circle at ${tilt.glareX}% ${tilt.glareY}%,
                rgba(255, 255, 255, 0.07) 0%,
                transparent 60%
              )`,
              opacity: hovered ? 1 : 0,
              transition: `opacity ${speed * 0.6}ms ease`,
              zIndex: 2,
            }}
          />
        )}
      </div>
    </Tag>
  )
}
