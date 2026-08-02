'use client'

import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useReveal } from '@/lib/gsap'
import { contact, site } from '@/lib/content'
import { SectionHeading } from '@/components/ui/section-heading'
import { Reveal } from '@/components/ui/reveal'
import { Corner, Flourish, Sunburst } from '@/components/ui/motifs'
import { Button } from '@/components/ui/button'
import { MapPin, Clock, Mail, Sparkles } from 'lucide-react'

const inputClass =
  'w-full border-b-2 border-ink/25 bg-transparent px-1 py-3 font-body text-base text-ink placeholder:text-ink-soft/70 transition-colors focus:border-crimson focus:outline-none'

export function Contact() {
  const scope = useRef<HTMLElement>(null)
  useReveal()
  const [sent, setSent] = useState(false)

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const subject = encodeURIComponent(
      `New project enquiry — ${data.get('name') || 'friend'}`,
    )
    const body = encodeURIComponent(
      `Name: ${data.get('name')}\nEmail: ${data.get('email')}\n\n${data.get('message')}`,
    )
    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`
    setSent(true)
  }

  return (
    <section
      ref={scope}
      id="contact"
      className="relative overflow-hidden bg-paper py-24 md:py-32"
      aria-label="Contact"
    >
      <div className="texture-halftone absolute inset-0 opacity-50" aria-hidden="true" />
      <div className="texture-grain absolute inset-0 opacity-40" aria-hidden="true" />
      <Sunburst className="absolute -bottom-24 -right-24 h-80 w-80 text-marigold/20" rays={32} />
      <Sunburst className="absolute -left-32 top-40 h-72 w-72 text-crimson/10" rays={24} />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          kicker={contact.kicker}
          title={
            <>
              Have a brief that needs a
              <span className="font-display-italic text-crimson"> deadline?</span>
            </>
          }
          sub={contact.body}
        />

        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center border-2 border-ink bg-cream">
                    <Mail className="h-5 w-5 text-crimson" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-body text-xs font-bold uppercase tracking-poster text-ink-soft">
                      Post a letter
                    </p>
                    <a
                      href={`mailto:${contact.email}`}
                      className="mt-1 block font-display text-2xl font-bold italic text-ink underline decoration-crimson decoration-2 underline-offset-4 transition-colors hover:text-crimson"
                    >
                      {contact.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center border-2 border-ink bg-cream">
                    <MapPin className="h-5 w-5 text-crimson" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-body text-xs font-bold uppercase tracking-poster text-ink-soft">
                      The studio
                    </p>
                    <p className="mt-1 font-display text-xl font-bold italic text-ink">
                      {contact.location}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center border-2 border-ink bg-cream">
                    <Clock className="h-5 w-5 text-crimson" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-body text-xs font-bold uppercase tracking-poster text-ink-soft">
                      Studio hours
                    </p>
                    <p className="mt-1 font-display text-xl font-bold italic text-ink">
                      {contact.hours}
                    </p>
                  </div>
                </div>

                <div className="border-2 border-dashed border-emerald bg-cream/60 px-5 py-4">
                  <p className="flex items-center gap-2 font-body text-xs font-bold uppercase tracking-poster text-emerald">
                    <Sparkles className="h-4 w-4" aria-hidden="true" />
                    {contact.availability}
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1} className="mt-12">
              <p className="font-body text-sm leading-relaxed text-ink-soft">
                Walking clients welcome — the tea is strong, the proofs are
                wet, and the neighbourhood cats guard the entrance. Also reachable
                via{' '}
                <a
                  href={site.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-crimson underline underline-offset-4"
                >
                  LinkedIn
                </a>{' '}
                or{' '}
                <a
                  href={site.socials.behance}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-crimson underline underline-offset-4"
                >
                  Behance
                </a>
                .
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={0.05}>
              <div className="edge-ink relative bg-cream p-6 shadow-poster md:p-10">
                <Corner className="absolute left-3 top-3 h-12 w-12 text-crimson" />
                <Corner className="absolute right-3 top-3 h-12 w-12 -scale-x-100 text-crimson" />
                <Corner className="absolute bottom-3 right-3 h-12 w-12 rotate-180 text-crimson" />
                <Corner className="absolute bottom-3 left-3 h-12 w-12 rotate-180 -scale-x-100 text-crimson" />

                <form
                  onSubmit={onSubmit}
                  className="relative mx-auto max-w-xl space-y-8"
                  aria-label="Contact form"
                >
                  <div>
                    <p className="font-body text-[10px] font-bold uppercase tracking-poster text-crimson">
                      To the studio of {site.name}
                    </p>
                    <h3 className="mt-2 font-display text-3xl font-black italic text-ink">
                      {sent ? 'Letter posted. Namaste.' : 'Write me a letter.'}
                    </h3>
                  </div>

                  <AnimatePresence mode="wait" initial={false}>
                    {sent ? (
                      <motion.div
                        key="sent"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.45, ease: 'easeOut' }}
                      >
                        <p className="font-body leading-relaxed text-ink-soft">
                          Your mail client should have opened with the letter
                          pre-addressed. If not, write to{' '}
                          <a
                            href={`mailto:${contact.email}`}
                            className="font-semibold text-crimson underline underline-offset-4"
                          >
                            {contact.email}
                          </a>{' '}
                          directly — I reply within a day.
                        </p>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="form"
                        className="space-y-8"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.45, ease: 'easeOut' }}
                      >
                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                          <div>
                            <label
                              htmlFor="name"
                              className="font-body text-[10px] font-bold uppercase tracking-poster text-ink-soft"
                            >
                              Your name
                            </label>
                            <input
                              id="name"
                              name="name"
                              required
                              autoComplete="name"
                              placeholder={contact.formPlaceholders.name}
                              className={inputClass}
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="email"
                              className="font-body text-[10px] font-bold uppercase tracking-poster text-ink-soft"
                            >
                              Your email
                            </label>
                            <input
                              id="email"
                              name="email"
                              type="email"
                              required
                              autoComplete="email"
                              placeholder={contact.formPlaceholders.email}
                              className={inputClass}
                            />
                          </div>
                        </div>

                        <div>
                          <label
                            htmlFor="message"
                            className="font-body text-[10px] font-bold uppercase tracking-poster text-ink-soft"
                          >
                            The brief
                          </label>
                          <textarea
                            id="message"
                            name="message"
                            required
                            rows={5}
                            placeholder={contact.formPlaceholders.message}
                            className={inputClass + ' resize-none'}
                          />
                        </div>

                        <div className="flex items-center justify-between gap-4">
                          <p className="hidden font-body text-[10px] uppercase tracking-poster text-ink-soft sm:block">
                            No PDFs, no decks — just the brief.
                          </p>
                          <Button type="submit" data-cursor-label="post">
                            {contact.formPlaceholders.send}
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <Flourish className="text-crimson/50" />
                </form>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}