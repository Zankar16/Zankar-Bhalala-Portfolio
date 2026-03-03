import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef(null)
  const followerRef = useRef(null)
  const pos = useRef({ x: 0, y: 0 })
  const followerPos = useRef({ x: 0, y: 0 })
  const rafRef = useRef(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const follower = followerRef.current
    if (!cursor || !follower) return

    const onMouseMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }
      cursor.style.left = e.clientX + 'px'
      cursor.style.top = e.clientY + 'px'
    }

    const animate = () => {
      followerPos.current.x += (pos.current.x - followerPos.current.x) * 0.12
      followerPos.current.y += (pos.current.y - followerPos.current.y) * 0.12
      follower.style.left = followerPos.current.x + 'px'
      follower.style.top = followerPos.current.y + 'px'
      rafRef.current = requestAnimationFrame(animate)
    }

    const onMouseEnterLink = () => {
      cursor.style.width = '20px'
      cursor.style.height = '20px'
      follower.style.width = '50px'
      follower.style.height = '50px'
      follower.style.borderColor = 'rgba(220,38,38,0.8)'
    }

    const onMouseLeaveLink = () => {
      cursor.style.width = '12px'
      cursor.style.height = '12px'
      follower.style.width = '32px'
      follower.style.height = '32px'
      follower.style.borderColor = 'rgba(220,38,38,0.5)'
    }

    document.addEventListener('mousemove', onMouseMove)
    rafRef.current = requestAnimationFrame(animate)

    document.querySelectorAll('a, button, [data-cursor]').forEach(el => {
      el.addEventListener('mouseenter', onMouseEnterLink)
      el.addEventListener('mouseleave', onMouseLeaveLink)
    })

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <>
      <div ref={cursorRef} className="cursor" />
      <div ref={followerRef} className="cursor-follower" />
    </>
  )
}
