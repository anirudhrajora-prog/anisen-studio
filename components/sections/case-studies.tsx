'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { useReveal } from '@/lib/gsap'
import { caseStudies, type CaseStudy } from '@/lib/content'
import { SectionHeading } from '@/components/ui/section-heading'
import { Reveal } from '@/components/ui/reveal'
import { Corner } from '@/components/ui/motifs'
import { ArrowUpRight, Play } from 'lucide-react'
import { cn } from '@/lib/utils'

type Theme = CaseStudy['theme']

const themeConfig: Record<
  Theme,
  {
    band: string
    texture: string
    partLabel: string
    partLine: string
    partNum: string
    kicker: string
    title: string
    subtitle: string
    body: string
    listIcon: string
    metricValue: string
    metricLabel: string
    creditsLabel: string
    creditsValue: string
    story: string
  }
> = {
  dark: {
    band: 'bg-indigo text-cream',
    texture: 'opacity-30',
    partLabel: 'text-marigold',
    partLine: 'bg-cream/20',
    partNum: 'text-cream/20',
    kicker: 'text-marigold',
    title: 'text-cream',
    subtitle: 'text-cream/70',
    body: 'text-cream/85',
    listIcon: 'text-marigold',
    metricValue: 'text-marigold',
    metricLabel: 'text-cream/60',
    creditsLabel: 'text-cream/60',
    creditsValue: 'text-cream',
    story: 'text-cream/85',
  },
  blush: {
    band: 'bg-blush text-ink',
    texture: 'opacity-40',
    partLabel: 'text-rosewood',
    partLine: 'bg-ink/20',
    partNum: 'text-ink/15',
    kicker: 'text-rosewood',
    title: 'text-ink',
    subtitle: 'text-ink/70',
    body: 'text-ink/80',
    listIcon: 'text-rosewood',
    metricValue: 'text-rosewood',
    metricLabel: 'text-ink/60',
    creditsLabel: 'text-ink/60',
    creditsValue: 'text-ink',
    story: 'text-ink/80',
  },
  brownie: {
    band: 'bg-cocoa text-ink',
    texture: 'opacity-40',
    partLabel: 'text-brownie',
    partLine: 'bg-ink/20',
    partNum: 'text-ink/15',
    kicker: 'text-brownie',
    title: 'text-ink',
    subtitle: 'text-ink/70',
    body: 'text-ink/80',
    listIcon: 'text-brownie',
    metricValue: 'text-brownie',
    metricLabel: 'text-ink/60',
    creditsLabel: 'text-ink/60',
    creditsValue: 'text-ink',
    story: 'text-ink/80',
  },
}

const partNames = [
  { label: 'PART 01', note: 'The Conference' },
  { label: 'PART 02', note: 'The Event Highlights' },
  { label: 'PART 03', note: 'The Merch' },
]

function CaseArticle({
  cs,
  index,
  theme,
}: {
  cs: CaseStudy
  index: number
  theme: Theme
}) {
  const t = themeConfig[theme]
  const flip = index % 2 === 1
  const part = partNames[index]

  return (
    <article className="grid grid-cols-1 gap-12 lg:grid-cols-12">
      {/* part divider */}
      <div className="col-span-full mb-2 flex items-center gap-4">
        <span
          className={cn(
            'font-body tracking-label text-xs font-bold uppercase',
            t.partLabel,
          )}
        >
          {part.label} — {part.note}
        </span>
        <span className={cn('h-px flex-1', t.partLine)} aria-hidden="true" />
        <span
          className={cn('font-display text-6xl font-black italic md:text-7xl', t.partNum)}
          aria-hidden="true"
        >
          0{index + 1}
        </span>
      </div>

      {/* narrative */}
      <div className={flip ? 'lg:order-2 lg:col-span-7' : 'lg:col-span-7'}>
        <Reveal>
          <p
            className={cn(
              'font-body tracking-label text-xs font-bold uppercase',
              t.kicker,
            )}
          >
            {cs.index} · {cs.year}
          </p>
          <h3
            className={cn('font-display mt-4 text-3xl leading-tight font-black md:text-5xl', t.title)}
          >
            {cs.title}
          </h3>
          <p className={cn('font-display mt-2 text-lg italic md:text-xl', t.subtitle)}>
            {cs.subtitle}
          </p>
        </Reveal>

        {/* skinned toned tiles */}
        <div className="reveal-fade mt-8 space-y-6">
          {/* case study 1 */}
          {index === 0 && (
            <div className="skinned-tone-tile relative bg-cream/20 border-cream/15 rounded-lg p-5">
              <p className={cn('font-display text-ink mb-0 leading-relaxed', t.story)}>
                As the IT and Social Media Head for DAV Rohini MUN, I spearheaded the complete digital campaign and collateral ecosystem. From conceptualizing critical certificates, placards, and brochures to managing high-stakes social media outreach, I navigated tight deadlines and technical hurdles head-on. By maintaining absolute precision under pressure, I transformed creative chaos into a seamless, professional conference experience that empowered delegates and amplified our institutional reach.
              </p>
            </div>
          )}

          {/* case study 2 */}
          {index === 1 && (
            <div className="skinned-tone-tile relative bg-cream/20 border-cream/15 rounded-lg p-5">
              <p className={cn('font-display text-ink mb-0 leading-relaxed', t.story)}>
                Managing over 50 dynamic teams as the Tech Head for &ldquo;Shor&rdquo; demanded relentless energy and precision. I directed the entire social media campaign and produced high-retention promotional reels that drove massive digital engagement. Balancing multi-channel production schedules, technical troubleshooting, and team coordination taught me how to thrive in fast-paced environments, turning intense creative pressure into an unforgettable showcase of street theatre culture.
              </p>
            </div>
          )}

          {/* case study 3 */}
          {index === 2 && (
            <div className="skinned-tone-tile relative bg-cream/20 border-cream/15 rounded-lg p-5">
              <p className={cn('font-display text-ink mb-0 leading-relaxed', t.story)}>
                Working as an independent freelance designer for brand merchandise required complete ownership from concept to final production. I translated complex client visions into striking, market-ready apparel collections under strict commercial deadlines. By balancing creative storytelling with practical streetwear logic, I delivered distinctive brand identities that resonated deeply with audiences while proving my adaptability as an autonomous designer.
              </p>
            </div>
          )}
        </div>

        {/* metrics + studio field notes */}
        <div className="mt-10">
          <Reveal
            className={cn(
              'grid grid-cols-2 gap-4 border-t-2 pt-8 sm:grid-cols-4',
              index === 0 ? 'border-cream/15' : 'border-ink/15',
            )}
          >
            {cs.metrics.map((m) => (
              <div key={m.label}>
                <p className={cn('font-display text-3xl font-black italic md:text-4xl', t.metricValue)}>
                  {m.value}
                </p>
                <p className={cn('font-body tracking-poster mt-1 text-[10px] uppercase', t.metricLabel)}>
                  {m.label}
                </p>
              </div>
            ))}
          </Reveal>

          {/* studio field notes — moved under numerical data */}
          <Reveal>
            <figure
              className={cn(
                'relative mt-8 border-l-4 p-6 shadow-card',
                index === 0 ? 'border-marigold bg-cream' : 'bg-cream/80',
                index === 1 ? 'border-rosewood bg-cream/80' : '',
                index === 2 ? 'border-brownie bg-cream/80' : '',
              )}
            >
              <span
                className={cn(
                  'font-display absolute -top-4 -left-3 text-6xl font-black italic',
                  index === 0 ? 'text-marigold' : index === 1 ? 'text-rosewood' : 'text-brownie',
                )}
                aria-hidden="true"
              >
                &ldquo;
              </span>
              <blockquote className="font-display text-ink relative text-lg leading-snug italic">
                Studio field notes &mdash; the facts, from the ledger.
              </blockquote>
              <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3">
                {cs.credits.map((c) => (
                  <div key={c.label}>
                    <dt className="font-body tracking-poster text-[9px] font-bold uppercase text-ink/60">
                      {c.label}
                    </dt>
                    <dd className="font-body mt-0.5 text-sm font-semibold text-ink">
                      {c.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </figure>
          </Reveal>
        </div>
      </div>

      {/* exhibit panel */}
      <div className={flip ? 'lg:order-1 lg:col-span-5' : 'lg:col-span-5'}>
        <Reveal className="sticky top-28">
          <div className="edge-ink bg-cream text-ink shadow-poster relative rotate-[1.5deg] p-3 md:p-5">
            <div className="bg-indigo relative overflow-hidden">
              <div
                className="relative overflow-hidden"
                style={{
                  background: `linear-gradient(165deg, ${cs.palette[0]} 0%, ${cs.palette[1]} 55%, ${cs.palette[2]} 100%)`,
                }}
              >
                <Image
                  src={cs.image}
                  alt={`${cs.title} — case study exhibit`}
                  width={1000}
                  height={1414}
                  sizes="(max-width: 1024px) 92vw, 38vw"
                  className="h-auto w-full object-cover object-top"
                  quality={82}
                />
                <div
                  className="texture-halftone absolute inset-0 opacity-25 mix-blend-multiply"
                  aria-hidden="true"
                />
                <div
                  className="texture-grain absolute inset-0 opacity-30 mix-blend-multiply"
                  aria-hidden="true"
                />
                <div className="border-cream/45 absolute inset-3 border-2" aria-hidden="true" />
                <Corner className="text-cream/85 absolute top-1 left-1 h-7 w-7" />
                <Corner flip className="text-cream/85 absolute top-1 right-1 h-7 w-7" />
                <Corner className="text-cream/85 absolute right-1 bottom-1 h-7 w-7 rotate-180" />
                <Corner flip className="text-cream/85 absolute bottom-1 left-1 h-7 w-7 rotate-180" />

                <div className="bg-ink/55 font-body tracking-poster text-cream/90 absolute inset-x-0 bottom-0 flex justify-between px-4 py-2 text-[9px] uppercase backdrop-blur-[2px]">
                  <span>ANI STUDIO ARCHIVE</span>
                  <span>{cs.index}</span>
                </div>
              </div>
            </div>
          </div>

          {cs.video ? (
            <figure className="mt-8">
              <div className="edge-ink bg-cream text-ink shadow-poster relative rotate-[-1.5deg] p-3 md:p-4">
                <div className="border-ink/15 relative overflow-hidden border-2 bg-ink">
                  <video
                    src={cs.video.src}
                    controls
                    playsInline
                    preload="metadata"
                    className="aspect-video h-auto w-full object-cover"
                    aria-label={cs.video.title}
                  />
                  <div className="bg-ink/55 border-t border-cream/25 px-4 py-2">
                    <p className="font-body flex items-center gap-2 text-[10px] font-bold uppercase tracking-poster text-cream">
                      <Play className="h-3 w-3 fill-cream" aria-hidden="true" />
                      {cs.video.title}
                    </p>
                  </div>
                </div>
              </div>
            </figure>
          ) : null}
        </Reveal>
      </div>
    </article>
  )
}

export function CaseStudies() {
  const scope = useRef<HTMLElement>(null)
  useReveal()

  return (
    <section
      ref={scope}
      id="case-studies"
      className="relative"
      aria-label="Case studies"
    >
      {caseStudies.map((cs, i) => {
        const t = themeConfig[cs.theme]
        return (
          <div
            key={cs.id}
            className={cn('relative overflow-hidden py-24 md:py-32', t.band)}
          >
            <div className={cn('texture-halftone absolute inset-0', t.texture)} aria-hidden="true" />
            <div className={cn('texture-grain absolute inset-0', t.texture)} aria-hidden="true" />

            <div className="relative mx-auto max-w-7xl px-5 md:px-8">
              {i === 0 ? (
                <SectionHeading
                  kicker="03 · Case Studies"
                  tone="cream"
                  title={
                    <>
                      How a brief becomes
                      <span className="font-display-italic text-marigold">
                        {' '}
                        a keepsake.
                      </span>
                    </>
                  }
                  sub="Three stories from the ledger — the brief, the craft, and the proof that craft also ships."
                />
              ) : null}
              <CaseArticle cs={cs} index={i} theme={cs.theme} />
            </div>
          </div>
        )
      })}

      <div className="bg-indigo relative overflow-hidden py-16">
        <div className="texture-halftone absolute inset-0 opacity-30" aria-hidden="true" />
        <div className="texture-grain absolute inset-0 opacity-30" aria-hidden="true" />
        <div className="relative mx-auto flex max-w-7xl justify-center px-5">
          <a
            href="#contact"
            className="group border-cream/40 font-body tracking-poster text-cream hover:border-marigold hover:text-marigold inline-flex items-center gap-3 border-2 px-8 py-4 text-sm font-bold uppercase transition-colors"
          >
            Commission the next one
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </section>
  )
}