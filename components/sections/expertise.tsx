'use client'

import { useRef } from 'react'
import { useReveal } from '@/lib/gsap'
import { SectionHeading } from '@/components/ui/section-heading'
import { Reveal } from '@/components/ui/reveal'
import { Stamp, Printer, Megaphone, Shirt } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

const services: {
  icon: LucideIcon
  title: string
  body: string
  note: string
}[] = [
  {
    icon: Stamp,
    title: 'Event Branding & Identity Systems',
    body: 'A complete event identity in one system — posters, credentials, stages and feeds — so your fest feels like a brand from day one.',
    note: 'One identity, every touchpoint',
  },
  {
    icon: Printer,
    title: 'Poster & Print Systems',
    body: 'Street-legible and screen-safe: grids and templates that ship fast and scale to any frame, from hoarding to thumbnail.',
    note: 'Legible from twenty feet',
  },
  {
    icon: Megaphone,
    title: 'Social & Motion Campaigns',
    body: 'Campaigns and reels engineered to hold the feed — a forty-plus frame set cut and posted on a production schedule.',
    note: '3,000+ views and counting',
  },
  {
    icon: Shirt,
    title: 'Merchandise Design',
    body: 'From first sketch to print production: apparel people actually wear, delivered under real commercial deadlines.',
    note: 'Worn, not just designed',
  },
]

export function Expertise() {
  const scope = useRef<HTMLElement>(null)
  useReveal()

  return (
    <section
      ref={scope}
      id="expertise"
      className="relative overflow-hidden bg-paper py-24 md:py-32"
      aria-label="What I do"
    >
      <div className="texture-halftone absolute inset-0 opacity-40" aria-hidden="true" />
      <div className="texture-grain absolute inset-0 opacity-40" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          kicker="01 · What I Do"
          title={
            <>
              Four shelves the studio
              <span className="font-display-italic text-crimson"> keeps stocked.</span>
            </>
          }
          sub="What you hire me for — and the value that comes with it. Every discipline runs on the same promise: a system, a deadline, a finished thing."
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => {
            const Icon = service.icon
            return (
              <Reveal key={service.title} delay={(i % 4) * 0.07}>
                <article className="group relative flex h-full flex-col border-2 border-ink bg-cream p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card">
                  <div className="texture-bands absolute inset-0 opacity-30" aria-hidden="true" />
                  <span
                    className="font-display absolute right-4 top-3 text-4xl font-black italic text-ink/10 transition-colors duration-300 group-hover:text-crimson/25"
                    aria-hidden="true"
                  >
                    0{i + 1}
                  </span>

                  <div className="relative">
                    <span className="flex h-12 w-12 items-center justify-center border-2 border-crimson bg-crimson/5 transition-colors duration-300 group-hover:bg-crimson">
                      <Icon
                        className="h-6 w-6 text-crimson transition-colors duration-300 group-hover:text-cream"
                        strokeWidth={2}
                        aria-hidden="true"
                      />
                    </span>
                  </div>

                  <h3 className="font-display relative mt-5 text-xl font-bold leading-snug text-ink">
                    {service.title}
                  </h3>
                  <p className="relative mt-3 flex-1 text-sm leading-relaxed text-ink-soft">
                    {service.body}
                  </p>
                  <p className="font-body relative mt-5 border-t-2 border-ink/15 pt-4 text-[10px] font-bold uppercase tracking-poster text-crimson">
                    {service.note}
                  </p>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
