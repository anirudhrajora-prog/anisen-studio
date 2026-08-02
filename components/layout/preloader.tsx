'use client'

import { useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { Lotus } from '@/components/ui/motifs'

export function Preloader() {
  const rootRef = useRef<HTMLDivElement>(null)
  const [gone, setGone] = useState(false)

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduced) {
      root.style.display = 'none'
      return
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => setGone(true),
      })

      tl.set('.preloader-ink', { yPercent: 100 })
        .fromTo(
          '.preloader-paper',
          { yPercent: 0 },
          { yPercent: -100, duration: 1.0, ease: 'power4.inOut', delay: 1.05 },
        )
        .to(
          '.preloader-ink',
          { yPercent: 0, duration: 0.9, ease: 'power4.inOut' },
          '-=0.55',
        )
        .to(
          '.preloader-ink',
          { yPercent: -100, duration: 0.9, ease: 'power4.inOut' },
          '+=0.35',
        )

      tl.fromTo(
        '.preloader-seal',
        { scale: 2.6, opacity: 0, rotate: -14 },
        {
          scale: 1,
          opacity: 1,
          rotate: -6,
          duration: 0.6,
          ease: 'back.out(2)',
        },
        0.15,
      ).to(
        '.preloader-seal',
        { rotate: 0, duration: 0.5, ease: 'power2.out' },
        0.7,
      )

      tl.fromTo(
        '.preloader-word',
        { yPercent: 120 },
        { yPercent: 0, duration: 0.7, ease: 'power3.out', stagger: 0.08 },
        0.1,
      )
    }, root)

    return () => ctx.revert()
  }, [])

  if (gone) return null

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[95]"
      role="status"
      aria-label="Loading the portfolio"
    >
      <div className="preloader-paper absolute inset-0 flex flex-col items-center justify-center bg-paper">
        <div className="texture-halftone absolute inset-0" aria-hidden="true" />
        <Lotus className="h-10 w-10 text-crimson" />
        <div className="mt-4 overflow-hidden">
          <p className="preloader-word font-display text-5xl font-black italic leading-none text-ink md:text-7xl">
            ANI
          </p>
        </div>
        <div className="overflow-hidden">
          <p className="preloader-word mt-3 font-body text-[10px] font-bold uppercase tracking-poster text-ink-soft md:text-xs">
            visual storyteller · new delhi
          </p>
        </div>
      </div>

      <div
        className="preloader-ink absolute inset-0 flex items-center justify-center bg-charcoal"
        aria-hidden="true"
      >
        <div
          className="preloader-seal flex h-40 w-40 flex-col items-center justify-center rounded-full border-2 border-dashed border-marigold/80 text-center"
        >
          <span className="font-display text-4xl font-black italic text-cream">
            ANI
          </span>
          <span className="mt-1 font-body text-[9px] font-bold uppercase tracking-poster text-marigold">
            pressing
            <br />
            the press
          </span>
        </div>
      </div>
    </div>
  )
}