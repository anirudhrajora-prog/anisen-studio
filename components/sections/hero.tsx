'use client'

import { useLayoutEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { hero, site } from '@/lib/content'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Marquee } from '@/components/ui/marquee'
import { BlueprintGrid } from '@/components/ui/blueprint-grid'
import { Sunburst, Lotus, Seal, Corner } from '@/components/ui/motifs'

export function Hero() {
  const scope = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      gsap.fromTo(
        '.hero-line-inner',
        { yPercent: 110 },
        { yPercent: 0, duration: 1.2, ease: 'power4.out', stagger: 0.12, delay: 0.15 },
      )
      gsap.fromTo(
        '.hero-fade',
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.12, delay: 0.7 },
      )
      gsap.fromTo(
        '.hero-art',
        { opacity: 0, y: 60, rotate: 3 },
        { opacity: 1, y: 0, rotate: 0, duration: 1.2, ease: 'power3.out', delay: 0.5 },
      )
      gsap.to('.hero-seal', {
        rotate: 360,
        duration: 40,
        ease: 'none',
        repeat: -1,
      })

      gsap.to('.hero-orn-sunburst', {
        yPercent: -40,
        ease: 'none',
        scrollTrigger: { trigger: scope.current, start: 'top top', end: 'bottom top', scrub: true },
      })
      gsap.to('.hero-orn-lotus', {
        yPercent: 60,
        ease: 'none',
        scrollTrigger: { trigger: scope.current, start: 'top top', end: 'bottom top', scrub: true },
      })
      gsap.to('.hero-copy', {
        yPercent: -12,
        opacity: 0.25,
        ease: 'none',
        scrollTrigger: { trigger: scope.current, start: 'top top', end: 'bottom top', scrub: true },
      })
    }, scope)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={scope}
      id="top"
      className="relative overflow-hidden bg-paper"
      aria-label="Introduction"
    >
      <div className="texture-halftone absolute inset-0" aria-hidden="true" />
      <div className="texture-grain absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="absolute inset-0 opacity-70">
        <BlueprintGrid />
      </div>

      <Sunburst
        className="hero-orn-sunburst absolute -right-24 top-24 h-72 w-72 text-marigold/25 md:h-96 md:w-96"
        rays={36}
      />
      <Sunburst
        className="absolute -left-28 bottom-32 h-64 w-64 text-crimson/10 md:h-80 md:w-80"
        rays={28}
      />
      <Lotus className="hero-orn-lotus absolute left-[45%] top-10 h-10 w-10 text-crimson/40 md:h-14 md:w-14" />
      <Corner className="absolute left-5 top-28 hidden h-16 w-16 text-ink/25 md:block" />
      <Corner className="absolute right-5 top-16 hidden h-16 w-16 -scale-x-100 text-ink/25 md:block" />

      <div className="relative mx-auto max-w-7xl px-5 pb-0 pt-28 md:px-8 md:pt-36">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
          <div className="hero-copy lg:col-span-7">
            <div className="hero-fade flex flex-wrap items-center gap-3">
              <Badge tone="crimson">{hero.kicker}</Badge>
          <span className="font-body text-xs font-bold uppercase tracking-label text-ink-soft whitespace-nowrap">
            {site.role}
          </span>
            </div>

            <h1 className="mt-8 font-display font-black leading-[0.95] tracking-tight text-ink">
              {hero.headlineLines.map((line, i) => (
                <span key={line} className="block overflow-hidden pb-1">
                  <span
                    className={
                      'hero-line-inner block text-[clamp(3rem,9vw,7.5rem)] ' +
                      (i === 1
                        ? 'font-display-italic text-crimson'
                        : '')
                    }
                  >
                    {line}
                  </span>
                </span>
              ))}
            </h1>

            <p className="hero-fade mt-8 max-w-md text-base leading-relaxed text-ink-soft md:text-lg">
              {hero.sub}
            </p>

            <div className="hero-fade mt-10 flex flex-wrap items-center gap-4">
              <Button href={hero.ctaPrimary.href} data-cursor-label="view">
                {hero.ctaPrimary.label}
              </Button>
              <Button href={hero.ctaSecondary.href} variant="outline">
                {hero.ctaSecondary.label}
              </Button>
            </div>

            <dl className="mt-14 grid grid-cols-3 gap-6 border-t-2 border-ink/15 pt-8 md:max-w-md">
              {hero.stats.map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <dd className="font-display text-3xl font-black italic text-ink md:text-4xl">
                    {stat.value}
                  </dd>
                  <dt className="mt-1 font-body text-[10px] uppercase tracking-poster text-ink-soft">
                    {stat.label}
                  </dt>
                </div>
              ))}
            </dl>
          </div>

          <div className="hero-art relative lg:col-span-5">
            <div className="relative mx-auto max-w-md">
              <div
                className="edge-ink absolute -inset-3 bg-cream shadow-poster"
                aria-hidden="true"
              />
              <div
                className="edge-ink absolute -inset-3 translate-x-2 translate-y-2 bg-parchment"
                aria-hidden="true"
              />
              <figure className="relative overflow-hidden">
                <Image
                  src={hero.portrait.src}
                  alt={hero.portrait.alt}
                  width={900}
                  height={1125}
                  priority
                  quality={82}
                  sizes="(max-width: 1024px) 80vw, 40vw"
                  className="h-auto w-full object-cover"
                />
                <div className="texture-grain absolute inset-0 opacity-25 mix-blend-multiply" aria-hidden="true" />
              </figure>
              <div className="absolute -right-4 -top-6 h-28 w-28 md:-right-8">
                <Seal
                  className="hero-seal h-full w-full text-crimson"
                  text="ANI · VISUAL STORYTELLER · NEW DELHI · ANI ·"
                />
              </div>
              <p className="mt-4 text-center font-body text-[10px] uppercase tracking-poster text-ink-soft">
                The designer, between rehearsals and deadlines
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative mt-16 border-y-2 border-ink bg-crimson py-3 text-cream md:mt-24">
        <Marquee
          items={[
            'Event Branding',
            'Poster Systems',
            'Social Campaigns',
            'Illustration',
            'Motion & Reels',
            'Print Production',
          ]}
          label="Disciplines"
          className="font-body text-sm font-bold uppercase tracking-poster"
        />
      </div>
    </section>
  )
}