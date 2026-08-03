import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight, Play } from 'lucide-react'
import { caseStudies, site } from '@/lib/content'
import { Corner, Flourish } from '@/components/ui/motifs'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type Params = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const cs = caseStudies.find((c) => c.slug === slug)
  if (!cs) return {}
  return {
    title: cs.title,
    description: cs.subtitle,
    openGraph: {
      type: 'article',
      url: `${site.url}/work/${cs.slug}`,
      title: `${cs.title} — ${site.name}`,
      description: cs.subtitle,
      images: [{ url: cs.image }],
    },
  }
}

const themeConfig = {
  dark: {
    section: 'bg-indigo text-cream',
    texture: 'opacity-30',
    kicker: 'text-marigold',
    title: 'text-cream',
    subtitle: 'text-cream/70',
    body: 'text-cream/80',
    accentLine: 'bg-cream/20',
    accentText: 'text-marigold',
    num: 'text-cream/15',
    chip: 'border-cream/25 text-cream/80',
    metricValue: 'text-marigold',
    metricLabel: 'text-cream/60',
    card: 'border-cream/15 bg-cream/[0.06]',
    cardTitle: 'text-cream',
    cardBody: 'text-cream/75',
  },
  blush: {
    section: 'bg-blush text-ink',
    texture: 'opacity-40',
    kicker: 'text-rosewood',
    title: 'text-ink',
    subtitle: 'text-ink/70',
    body: 'text-ink/80',
    accentLine: 'bg-ink/20',
    accentText: 'text-rosewood',
    num: 'text-ink/10',
    chip: 'border-ink/30 text-ink/80',
    metricValue: 'text-rosewood',
    metricLabel: 'text-ink/60',
    card: 'border-ink/15 bg-cream/50',
    cardTitle: 'text-ink',
    cardBody: 'text-ink/75',
  },
  brownie: {
    section: 'bg-cocoa text-ink',
    texture: 'opacity-40',
    kicker: 'text-brownie',
    title: 'text-ink',
    subtitle: 'text-ink/70',
    body: 'text-ink/80',
    accentLine: 'bg-ink/20',
    accentText: 'text-brownie',
    num: 'text-ink/10',
    chip: 'border-ink/30 text-ink/80',
    metricValue: 'text-brownie',
    metricLabel: 'text-ink/60',
    card: 'border-ink/15 bg-cream/50',
    cardTitle: 'text-ink',
    cardBody: 'text-ink/75',
  },
} as const

function SectionLabel({
  num,
  label,
  theme,
}: {
  num: string
  label: string
  theme: keyof typeof themeConfig
}) {
  const t = themeConfig[theme]
  return (
    <div className="flex items-center gap-4">
      <span
        className={cn('font-display text-5xl font-black italic md:text-6xl', t.num)}
        aria-hidden="true"
      >
        {num}
      </span>
      <div>
        <p className={cn('font-body tracking-label text-xs font-bold uppercase', t.kicker)}>
          {label}
        </p>
        <span className={cn('mt-2 block h-0.5 w-16', t.accentText)} style={{ background: 'currentColor' }} />
      </div>
    </div>
  )
}

export default async function CaseStudyPage({ params }: Params) {
  const { slug } = await params
  const index = caseStudies.findIndex((c) => c.slug === slug)
  if (index === -1) notFound()
  const cs = caseStudies[index]
  const t = themeConfig[cs.theme]
  const next = caseStudies[(index + 1) % caseStudies.length]

  return (
    <article className={cn('relative overflow-hidden', t.section)}>
      <div className={cn('texture-halftone absolute inset-0', t.texture)} aria-hidden="true" />
      <div className={cn('texture-grain absolute inset-0', t.texture)} aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-5 pb-24 pt-28 md:px-8 md:pt-36">
        <Link
          href="/#case-studies"
          className={cn(
            'group mb-14 inline-flex items-center gap-2 font-body text-xs font-bold uppercase tracking-poster transition-colors',
            t.kicker,
          )}
        >
          <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
          All case studies
        </Link>

        {/* ---------- header ---------- */}
        <header>
          <p className={cn('font-body tracking-label text-xs font-bold uppercase', t.kicker)}>
            {cs.index} · {cs.year} · {cs.industry}
          </p>
          <h1
            className={cn(
              'font-display mt-6 max-w-4xl text-[clamp(2.5rem,7vw,6rem)] leading-[0.95] font-black tracking-tight',
              t.title,
            )}
          >
            {cs.title}
          </h1>
          <p className={cn('font-display mt-5 max-w-2xl text-xl italic md:text-2xl', t.subtitle)}>
            {cs.subtitle}
          </p>

          <div className={cn('mt-10 flex flex-wrap gap-x-10 gap-y-4 border-t-2 pt-8', t.accentLine)}>
            {cs.credits.map((c) => (
              <div key={c.label}>
                <p className={cn('font-body tracking-poster text-[10px] font-bold uppercase', t.metricLabel)}>
                  {c.label}
                </p>
                <p className={cn('mt-1 font-body text-sm font-semibold', t.title)}>{c.value}</p>
              </div>
            ))}
          </div>
        </header>

        {/* ---------- hero visual ---------- */}
        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="edge-ink relative bg-cream p-3 shadow-poster md:p-5">
              <div
                className="relative overflow-hidden"
                style={{
                  background: `linear-gradient(165deg, ${cs.palette[0]} 0%, ${cs.palette[1]} 55%, ${cs.palette[2]} 100%)`,
                }}
              >
                <Image
                  src={cs.image}
                  alt={`${cs.title} — hero visual`}
                  width={1200}
                  height={1600}
                  priority
                  quality={82}
                  sizes="(max-width: 1024px) 94vw, 55vw"
                  className="h-auto w-full object-cover object-top"
                />
                <div className="texture-halftone absolute inset-0 opacity-25 mix-blend-multiply" aria-hidden="true" />
                <div className="texture-grain absolute inset-0 opacity-30 mix-blend-multiply" aria-hidden="true" />
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

          <div className="lg:col-span-5">
            <div className="grid h-full grid-rows-2 gap-8">
              <div className={cn('border-2 p-6 md:p-8', t.card)}>
                <p className={cn('font-body tracking-label text-xs font-bold uppercase', t.kicker)}>
                  The brief
                </p>
                <p className={cn('font-display mt-4 text-2xl leading-snug font-black italic md:text-3xl', t.title)}>
                  {cs.subtitle}
                </p>
                <p className={cn('mt-4 font-body text-sm leading-relaxed', t.body)}>
                  {cs.story}
                </p>
              </div>

              {cs.video ? (
                <figure>
                  <div className="edge-ink bg-cream p-3 shadow-poster md:p-4">
                    <div className="relative overflow-hidden border-2 border-ink bg-ink">
                      <video
                        src={cs.video.src}
                        controls
                        playsInline
                        preload="metadata"
                        className="aspect-video h-auto w-full object-cover"
                        aria-label={cs.video.title}
                      />
                      <div className="bg-ink/55 flex items-center gap-2 border-t border-cream/25 px-4 py-2">
                        <Play className="h-3 w-3 fill-cream" aria-hidden="true" />
                        <p className="font-body text-[10px] font-bold uppercase tracking-poster text-cream">
                          {cs.video.title}
                        </p>
                      </div>
                    </div>
                  </div>
                </figure>
              ) : null}
            </div>
          </div>
        </div>

        {/* ---------- metrics ---------- */}
        <section className="mt-20 md:mt-24" aria-label="Key results">
          <div className={cn('grid grid-cols-2 gap-8 border-t-2 pt-10 sm:grid-cols-4', t.accentLine)}>
            {cs.metrics.map((m) => (
              <div key={m.label}>
                <p className={cn('font-display text-4xl font-black italic md:text-5xl', t.metricValue)}>
                  {m.value}
                </p>
                <p className={cn('font-body mt-2 text-[10px] font-bold uppercase tracking-poster', t.metricLabel)}>
                  {m.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- challenge ---------- */}
        <section className="mt-24" aria-label="The challenge">
          <SectionLabel num="01" label="The Challenge" theme={cs.theme} />
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {cs.challenge.map((item, i) => (
              <div key={i} className={cn('relative border-2 p-6', t.card)}>
                <span className={cn('font-display text-3xl font-black italic', t.accentText)}>
                  0{i + 1}
                </span>
                <p className={cn('mt-3 font-body text-sm leading-relaxed', t.cardBody)}>{item}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- approach ---------- */}
        <section className="mt-24" aria-label="The approach">
          <SectionLabel num="02" label="The Approach" theme={cs.theme} />
          <div className="mt-10 space-y-4 border-l-4 pl-8" style={{ borderColor: 'currentColor' }}>
            {cs.approach.map((p, i) => (
              <p key={i} className={cn('max-w-3xl font-body text-base leading-relaxed md:text-lg', t.body)}>
                {p}
              </p>
            ))}
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
            {cs.process.map((step, i) => (
              <div key={step.title} className={cn('relative border-2 p-6 transition-transform duration-300 hover:-translate-y-1.5', t.card)}>
                <div className="flex items-center justify-between">
                  <span className={cn('font-body tracking-label text-[10px] font-bold uppercase', t.accentText)}>
                    Step 0{i + 1}
                  </span>
                  <span className={cn('font-display text-4xl font-black italic', t.num)} aria-hidden="true">
                    {i + 1}
                  </span>
                </div>
                <h3 className={cn('font-display mt-4 text-xl font-bold italic', t.cardTitle)}>
                  {step.title}
                </h3>
                <p className={cn('mt-2 font-body text-sm leading-relaxed', t.cardBody)}>{step.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- features ---------- */}
        <section className="mt-24" aria-label="Key features">
          <SectionLabel num="03" label="Built to Work" theme={cs.theme} />
          <div className="mt-10 space-y-6">
            {cs.features.map((f, i) => (
              <div
                key={f.title}
                className={cn('grid grid-cols-1 gap-4 border-2 p-6 md:grid-cols-12 md:items-baseline md:p-8', t.card)}
              >
                <span className={cn('font-display text-3xl font-black italic md:col-span-2', t.accentText)}>
                  0{i + 1}
                </span>
                <h3 className={cn('font-display text-xl font-bold italic md:col-span-4 md:text-2xl', t.cardTitle)}>
                  {f.title}
                </h3>
                <p className={cn('font-body text-sm leading-relaxed md:col-span-6', t.cardBody)}>{f.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- stack ---------- */}
        <section className="mt-24" aria-label="Tools used">
          <SectionLabel num="04" label="The Toolkit" theme={cs.theme} />
          <div className="mt-10 flex flex-wrap gap-3">
            {cs.stack.map((tool) => (
              <span
                key={tool}
                className={cn(
                  'font-body border-2 px-5 py-2.5 text-xs font-bold uppercase tracking-poster transition-colors',
                  t.chip,
                )}
              >
                {tool}
              </span>
            ))}
          </div>
        </section>

        {/* ---------- lessons ---------- */}
        <section className="mt-24" aria-label="Lessons learned">
          <SectionLabel num="05" label="Lessons from the Ledger" theme={cs.theme} />
          <div className={cn('mt-10 max-w-3xl space-y-6', t.card)}>
            {cs.lessons.map((lesson, i) => (
              <figure key={i} className={cn('border-l-4 p-6 md:p-8', t.card)} style={{ borderColor: 'currentColor' }}>
                <span className={cn('font-display text-5xl font-black italic leading-none', t.accentText)} aria-hidden="true">
                  &ldquo;
                </span>
                <blockquote className={cn('font-display mt-2 text-xl leading-snug italic md:text-2xl', t.cardTitle)}>
                  {lesson}
                </blockquote>
              </figure>
            ))}
          </div>
        </section>

        {/* ---------- next case study ---------- */}
        <nav className="mt-24 border-t-2 pt-10" aria-label="Next case study">
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div>
              <p className={cn('font-body tracking-label text-xs font-bold uppercase', t.kicker)}>
                Next from the ledger
              </p>
              <p className={cn('font-display mt-3 text-3xl font-black italic md:text-4xl', t.title)}>
                {next.title}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href={`/work/${next.slug}`}
                className={cn(
                  'group inline-flex items-center gap-3 border-2 px-7 py-4 font-body text-sm font-bold uppercase tracking-poster transition-colors',
                  t.chip,
                )}
              >
                View case study
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </nav>

        {/* ---------- CTA ---------- */}
        <section className="mt-20" aria-label="Start a project">
          <div className="relative border-2 border-ink bg-cream p-8 text-center text-ink shadow-poster md:p-14">
            <div className="texture-halftone absolute inset-0 opacity-40" aria-hidden="true" />
            <Corner className="absolute left-3 top-3 h-10 w-10 text-crimson" />
            <Corner className="absolute right-3 top-3 h-10 w-10 -scale-x-100 text-crimson" />
            <Corner className="absolute bottom-3 right-3 h-10 w-10 rotate-180 text-crimson" />
            <Corner className="absolute bottom-3 left-3 h-10 w-10 rotate-180 -scale-x-100 text-crimson" />
            <div className="relative">
              <h2 className="font-display text-3xl font-black italic leading-tight md:text-5xl">
                Ready to build your own{' '}
                <span className="font-display-italic text-crimson">keepsake?</span>
              </h2>
              <p className="mx-auto mt-4 max-w-xl font-body text-sm leading-relaxed text-ink-soft md:text-base">
                Every project in the ledger started as a brief and a deadline. Tell me about yours — I
                reply within a day.
              </p>
              <div className="mt-8">
                <Button href="/#contact" data-cursor-label="talk">
                  Start a Project
                </Button>
              </div>
              <div className="mt-10 flex justify-center">
                <Flourish className="text-crimson/70" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </article>
  )
}
