'use client'

import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'

/*
  Lightweight scroll-triggered reveal (fade + rise) built on IntersectionObserver.
  No Framer Motion in this project, so this is the shared primitive for
  "premium motion" across the redesign. Content is fully visible with no JS —
  the reveal class is only ever ADDED once the browser confirms JS is running
  and the viewport intersects, so nothing is ever hidden from a no-JS visitor.
*/
export function EditableScrollReveal({
  children,
  className = '',
  delayMs = 0,
}: {
  children: ReactNode
  className?: string
  delayMs?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [armed, setArmed] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return
    setArmed(true)
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true)
            observer.disconnect()
          }
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`${armed ? 'scroll-reveal--armed' : ''} ${visible ? 'scroll-reveal--in' : ''} ${className}`}
      style={delayMs ? { transitionDelay: `${delayMs}ms` } : undefined}
    >
      {children}
    </div>
  )
}
