'use client'

import { useRef } from 'react'
import { useReveal } from '@/lib/gsap'
import { experience, education } from '@/lib/content'
import { SectionHeading } from '@/components/ui/section-heading'
import { Reveal } from '@/components/ui/reveal'
import { Lotus } from '@/components/ui/motifs'

export function Experience() {
  const scope = useRef<HTMLElement>(null)
  useReveal()

  return (
    <section
      ref={scope}
      id="experience"
      className="relative overflow-hidden bg-parchment py-24 md:py-32"
      aria-label="Experience"
    >
      <div className="texture-weave absolute inset-0" aria-hidden="true" />
      <div className="texture-grain absolute inset-0 opacity-40" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          kicker="05 · Experience"
          title={
            <>
              The ledger —
              <span className="font-display-italic text-crimson"> positions, internships, education.</span>
            </>
          }
          sub="From student society leadership to agency internships — every role taught me something about deadlines, people, and craft."
        />

        <ol className="relative space-y-0">
          <span
            className="absolute bottom-6 left-4 top-2 w-0.5 bg-ink/20 md:left-1/2 md:-translate-x-1/2"
            aria-hidden="true"
          />
          {experience.map((job, i) => {
            const even = i % 2 === 0
            return (
              <li key={job.role} className="relative pb-16 last:pb-0 md:pb-20">
                <span
                  className="absolute left-4 top-1 z-10 -translate-x-1/2 bg-parchment p-1 md:left-1/2"
                  aria-hidden="true"
                >
                  <Lotus className="h-6 w-6 text-crimson" />
                </span>

                <Reveal
                  className={
                    'md:w-[calc(50%-3rem)] ' +
                    (even ? 'md:mr-auto md:pl-0 md:pr-0' : 'md:ml-auto')
                  }
                >
                  <article
                    className={
                      'group relative border-2 border-ink bg-paper p-6 shadow-card transition-transform duration-300 hover:-translate-y-1 md:p-8 ' +
                      (even ? '' : 'md:-rotate-1 md:hover:rotate-0')
                    }
                  >
                    <div className="texture-bands absolute inset-0 opacity-25" aria-hidden="true" />
                    <div className="relative">
                      <p className="font-display text-2xl font-black italic text-crimson md:text-3xl">
                        {job.period}
                      </p>
                      <h3 className="mt-3 font-display text-xl font-bold leading-snug text-ink md:text-2xl">
                        {job.role}
                      </h3>
                      <p className="mt-1 font-body text-xs font-bold uppercase tracking-poster text-ink-soft">
                        {job.org}
                      </p>
                      <p className="mt-4 leading-relaxed text-ink-soft">{job.body}</p>
                      <ul className="mt-5 flex flex-wrap gap-2">
                        {job.tags.map((tag) => (
                          <li
                            key={tag}
                            className="border border-ink/25 px-2.5 py-1 font-body text-[10px] uppercase tracking-poster text-ink-soft transition-colors duration-300 group-hover:border-crimson group-hover:text-crimson"
                          >
                            {tag}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                </Reveal>
              </li>
            )
          })}

          {education.map((edu, i) => {
            const even = (experience.length + i) % 2 === 0
            return (
              <li key={edu.degree} className="relative pb-16 last:pb-0 md:pb-20">
                <span
                  className="absolute left-4 top-1 z-10 -translate-x-1/2 bg-parchment p-1 md:left-1/2"
                  aria-hidden="true"
                >
                  <Lotus className="h-6 w-6 text-emerald" />
                </span>

                <Reveal
                  className={
                    'md:w-[calc(50%-3rem)] ' +
                    (even ? 'md:mr-auto md:pl-0 md:pr-0' : 'md:ml-auto')
                  }
                >
                  <article
                    className={
                      'group relative border-2 border-ink bg-emerald/5 p-6 shadow-card transition-transform duration-300 hover:-translate-y-1 md:p-8 ' +
                      (even ? '' : 'md:-rotate-1 md:hover:rotate-0')
                    }
                  >
                    <div className="texture-bands absolute inset-0 opacity-25" aria-hidden="true" />
                    <div className="relative">
                      <p className="font-display text-2xl font-black italic text-emerald md:text-3xl">
                        {edu.period}
                      </p>
                      <h3 className="mt-3 font-display text-xl font-bold leading-snug text-ink md:text-2xl">
                        {edu.degree}
                      </h3>
                      <p className="mt-1 font-body text-xs font-bold uppercase tracking-poster text-ink-soft">
                        {edu.org}
                      </p>
                      {edu.body && <p className="mt-4 leading-relaxed text-ink-soft">{edu.body}</p>}
                    </div>
                  </article>
                </Reveal>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}