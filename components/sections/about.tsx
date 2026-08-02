'use client'

import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Image from 'next/image'
import { useReveal } from '@/lib/gsap'
import { about } from '@/lib/content'
import { SectionHeading } from '@/components/ui/section-heading'
import { Reveal } from '@/components/ui/reveal'
import { Corner, Paisley, Lotus } from '@/components/ui/motifs'

const accents = [
  { icon: 'text-crimson', word: 'text-crimson', ghost: 'text-crimson/10' },
  { icon: 'text-terracotta', word: 'text-terracotta', ghost: 'text-terracotta/10' },
  { icon: 'text-emerald', word: 'text-emerald', ghost: 'text-emerald/10' },
]

export function About() {
  const scope = useRef<HTMLElement>(null)
  useReveal()

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      gsap.to('.about-art', {
        rotate: -1.2,
        ease: 'none',
        scrollTrigger: { trigger: scope.current, start: 'top bottom', end: 'bottom top', scrub: true },
      })
    }, scope)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={scope}
      id="about"
      className="relative overflow-hidden bg-parchment py-24 md:py-32"
      aria-label="About"
    >
      <div className="texture-weave absolute inset-0" aria-hidden="true" />
      <div className="texture-grain absolute inset-0 opacity-40" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading kicker={about.kicker} title={about.title} />

        {/* Part 1 — introduction */}
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="about-art relative mx-auto max-w-md lg:mx-0">
              <Corner className="absolute -left-4 -top-4 z-10 h-16 w-16 text-crimson" />
              <Corner className="absolute -bottom-4 -right-4 z-10 h-16 w-16 rotate-180 text-crimson" />
              <figure className="edge-ink relative border-[3px] border-ink bg-cream shadow-poster">
                <Image
                  src="/images/work.png"
                  alt={about.portrait.alt}
                  width={900}
                  height={1125}
                  quality={82}
                  sizes="(max-width: 1024px) 80vw, 38vw"
                  className="h-auto w-full object-cover"
                />
                <figcaption className="border-t-2 border-ink/15 px-4 py-3 font-body text-[10px] uppercase tracking-poster text-ink-soft">
                  Plate no. 03 — the designer, between rehearsals and deadlines
                </figcaption>
              </figure>
              <Paisley className="absolute -right-6 top-1/2 h-12 w-12 -translate-y-1/2 text-crimson/50" />
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="space-y-6">
              {about.body.map((para) => (
                <Reveal key={para.slice(0, 24)}>
                  <p className="text-lg leading-relaxed text-ink md:text-xl">
                    {para}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* Part 2 — the promise, big */}
        <div className="mt-24 border-t-2 border-ink/15 pt-16 md:mt-28">
          <div className="reveal-fade flex items-center gap-3">
            <span className="bg-crimson h-px w-10" aria-hidden="true" />
            <p className="font-body tracking-label text-crimson text-xs font-bold uppercase">
              {about.promiseKicker}
            </p>
          </div>
          <h2 className="font-display text-ink mt-5 text-4xl leading-[1.02] font-black italic md:text-6xl">
            {about.promiseTitle}
          </h2>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {about.principles.map((p, i) => {
              const accent = accents[i] ?? accents[0]
              return (
                <Reveal key={p.title} delay={i * 0.08}>
                  <article className="group border-ink/90 relative h-full overflow-hidden border-2 bg-paper p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card">
                    <span
                      className={`font-display pointer-events-none absolute -right-3 -bottom-7 text-[8rem] leading-none font-black italic select-none ${accent.ghost}`}
                      aria-hidden="true"
                    >
                      0{i + 1}
                    </span>
                    <Lotus
                      className={`h-8 w-8 transition-transform duration-500 group-hover:rotate-45 ${accent.icon}`}
                    />
                    <h3
                      className={`font-display mt-8 text-3xl leading-[0.95] font-black italic md:text-4xl ${accent.word}`}
                    >
                      {p.title}
                    </h3>
                    <p className="relative mt-4 text-sm leading-relaxed text-ink-soft">
                      {p.body}
                    </p>
                    <span
                      className={`absolute bottom-0 left-0 h-1.5 w-0 transition-all duration-500 group-hover:w-full ${accent.icon}`}
                      aria-hidden="true"
                    />
                  </article>
                </Reveal>
              )
            })}
          </div>

          <Reveal className="mt-10">
            <p className="font-body text-ink-soft text-center text-sm uppercase tracking-poster">
              Deadline first · Bazaar logic · Iterate in public — that&apos;s the
              whole method.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
