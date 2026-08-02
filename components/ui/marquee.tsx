'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { cn } from '@/lib/utils'

type MarqueeProps = {
  items: string[]
  className?: string
  separator?: React.ReactNode
  reverse?: boolean
  speed?: number
  label?: string
}

export function Marquee({
  items,
  className,
  separator = '✦',
  reverse = false,
  speed = 22,
  label,
}: MarqueeProps) {
  const outerRef = useRef<HTMLDivElement>(null)
  const tweenRef = useRef<gsap.core.Tween | null>(null)

  useEffect(() => {
    const el = outerRef.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const dist = () => el.scrollWidth / 2 + 8
    const tween = gsap.to(el, {
      x: reverse ? dist() : -dist(),
      duration: speed,
      ease: 'none',
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x) => {
          const d = dist()
          return reverse
            ? parseFloat(x) > d
              ? -d
              : x
            : parseFloat(x) < -d
              ? d
              : x
        }),
      },
    })
    tweenRef.current = tween

    const onEnter = () => tween.timeScale(0.25)
    const onLeave = () => tween.timeScale(1)
    el.addEventListener('mouseenter', onEnter)
    el.addEventListener('mouseleave', onLeave)

    return () => {
      tween.kill()
      el.removeEventListener('mouseenter', onEnter)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [reverse, speed])

  return (
    <div
      className={cn('overflow-hidden', className)}
      aria-label={label}
      role="presentation"
    >
      <div ref={outerRef} className="flex w-max">
        {[0, 1].map((group) => (
          <div key={group} className="marquee-track" aria-hidden="true">
            {[...items, ...items].map((item, i) => (
              <span
                key={`${group}-${i}`}
                className="flex shrink-0 items-center gap-6 px-3"
              >
                <span className="whitespace-nowrap">{item}</span>
                <span className="text-marigold" aria-hidden="true">
                  {separator}
                </span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
