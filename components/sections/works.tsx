'use client'

import { useRef, useState } from 'react'
import { useReveal } from '@/lib/gsap'
import { galleries, type Gallery } from '@/lib/content'
import { galleriesData, galleriesTotals } from '@/lib/galleries-data'
import { SectionHeading } from '@/components/ui/section-heading'
import { GalleryCard } from '@/components/ui/gallery-card'
import { GalleryModal } from '@/components/ui/gallery-modal'
import { Reveal } from '@/components/ui/reveal'
import { Button } from '@/components/ui/button'
import { Corner } from '@/components/ui/motifs'

export function Works() {
  const scope = useRef<HTMLElement>(null)
  const [open, setOpen] = useState<Gallery | null>(null)
  useReveal()

  const activeGroups = open ? galleriesData[open.id] ?? [] : []
  const totalCount = galleries.reduce(
    (sum, g) => sum + (galleriesTotals[g.id] ?? 0),
    0,
  )

  return (
    <section
      ref={scope}
      id="works"
      className="relative overflow-hidden bg-paper py-24 md:py-32"
      aria-label="Selected works"
    >
      <div className="texture-halftone absolute inset-0 opacity-50" aria-hidden="true" />
      <div className="texture-grain absolute inset-0 opacity-40" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          kicker="03 · Selected Works"
          title={
            <>
              A wall of <span className="font-display-italic text-crimson">collectibles</span> —
              <br />
              pull one off the shelf.
            </>
          }
          sub="Seven shelves, every print real — no filler, no stock. Click a frame to pull the whole shelf down."
        />

        <div className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {galleries.map((gallery, i) => (
            <Reveal key={gallery.id} delay={(i % 4) * 0.06}>
              <GalleryCard
                gallery={gallery}
                count={galleriesTotals[gallery.id] ?? 0}
                featured={i === 0}
                onOpen={() => setOpen(gallery)}
              />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-20">
          <div className="edge-ink relative bg-cream shadow-poster p-6 md:p-10">
            <Corner className="absolute left-3 top-3 h-12 w-12 text-crimson" />
            <Corner className="absolute right-3 top-3 h-12 w-12 -scale-x-100 text-crimson" />
            <Corner className="absolute bottom-3 right-3 h-12 w-12 rotate-180 text-crimson" />
            <Corner className="absolute bottom-3 left-3 h-12 w-12 rotate-180 -scale-x-100 text-crimson" />
            <div className="flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
              <div>
                <p className="font-body tracking-label text-crimson text-xs font-bold uppercase">
                  The studio ledger
                </p>
                <p className="font-display text-ink mt-2 text-2xl font-black italic md:text-3xl">
                  {totalCount} prints and reels — and counting.
                </p>
                <p className="font-body text-ink-soft mt-2 text-sm">
                  The full archive lives in the studio ledger. Request it and
                  the complete set walks your way.
                </p>
              </div>
              <Button
                href="#contact"
                variant="stamp"
                data-cursor-label="ask"
                className="shrink-0"
              >
                Request the full archive
              </Button>
            </div>
          </div>
        </Reveal>
      </div>

      {open ? (
        <GalleryModal
          gallery={open}
          groups={activeGroups}
          onClose={() => setOpen(null)}
        />
      ) : null}
    </section>
  )
}
