'use client'

import { useRef } from 'react'
import { useReveal } from '@/lib/gsap'
import { skills, tools } from '@/lib/content'
import { SectionHeading } from '@/components/ui/section-heading'
import { Reveal } from '@/components/ui/reveal'
import { Lotus } from '@/components/ui/motifs'

export function Skills() {
  const scope = useRef<HTMLElement>(null)
  useReveal()

  return (
    <section
      ref={scope}
      id="skills"
      className="relative overflow-hidden bg-paper py-24 md:py-32"
      aria-label="Skills"
    >
      <div className="texture-halftone absolute inset-0 opacity-40" aria-hidden="true" />
      <div className="texture-grain absolute inset-0 opacity-40" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          kicker="04 · Skills"
          title={
            <>
              The toolkit —
              <span className="font-display-italic text-crimson"> what I reach for daily.</span>
            </>
          }
          sub="Four categories of tools, and the ones I pull from the drawers every day."
        />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-7">
            {skills.map((group, i) => (
              <Reveal key={group.group} delay={(i % 2) * 0.08}>
                <article className="group relative h-full border-2 border-ink bg-cream p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card">
                  <div className="texture-bands absolute inset-0 opacity-30" aria-hidden="true" />
                  <header className="relative flex items-center gap-3 border-b-2 border-ink/15 pb-4">
                    <Lotus className="h-6 w-6 text-crimson transition-transform duration-500 group-hover:rotate-90" />
                    <h3 className="font-display text-xl font-bold italic text-ink">
                      {group.group}
                    </h3>
                  </header>
                  <ul className="relative mt-4 space-y-3">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-3 font-body text-sm text-ink-soft"
                      >
                        <span className="text-crimson" aria-hidden="true">
                          ✦
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={0.1}>
              <div className="edge-ink relative border-2 border-ink bg-cream p-6 shadow-poster md:p-8">
                <header className="flex items-baseline justify-between border-b-2 border-ink/15 pb-4">
                  <h3 className="font-display text-xl font-bold italic text-ink">
                    Proficiency
                  </h3>
                  <span className="font-body text-[10px] uppercase tracking-poster text-ink-soft">
                    self-assessed
                  </span>
                </header>

                <ul className="mt-6 space-y-6">
                  {tools.map((tool) => (
                    <li key={tool.name}>
                      <div className="flex items-baseline justify-between">
                        <span className="font-body text-sm font-bold uppercase tracking-poster text-ink">
                          {tool.name}
                        </span>
                        <span className="font-display italic font-black text-crimson">
                          {tool.level}
                        </span>
                      </div>
                      <div
                        className="mt-2 h-3 border-2 border-ink bg-paper"
                        role="img"
                        aria-label={`${tool.name} proficiency ${tool.level}`}
                      >
                        <div
                          className="h-full bg-crimson"
                          style={{
                            width: tool.level === 'Advanced' ? '100%' : tool.level === 'Intermediate' ? '66%' : '33%',
                            backgroundImage:
                              'repeating-linear-gradient(135deg, rgba(251,246,234,0.35) 0 3px, transparent 3px 8px)',
                          }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>

                <p className="mt-8 border-t-2 border-ink/15 pt-4 font-body text-[10px] uppercase tracking-poster text-ink-soft">
                  Self-assessed · always learning
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}