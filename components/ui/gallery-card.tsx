'use client'

import Image from 'next/image'
import type { Gallery } from '@/lib/content'
import { cn } from '@/lib/utils'
import { Corner, Paisley } from '@/components/ui/motifs'

function PreviewFrame({ gallery }: { gallery: Gallery }) {
  const [c1, c2] = gallery.palette
  const frame = 'relative aspect-[4/5] w-full overflow-hidden'

  return (
    <div
      className={cn(frame)}
      style={{ background: `linear-gradient(160deg, ${c1} 0%, ${c2} 100%)` }}
    >
      {gallery.preview.type === 'video' ? (
        <video
          src={gallery.preview.src}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          preload="metadata"
          playsInline
          aria-hidden="true"
        />
      ) : (
        <Image
          src={gallery.preview.src}
          alt=""
          fill
          sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 30vw"
          className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          quality={82}
        />
      )}

      <div className="texture-halftone absolute inset-0 opacity-25 mix-blend-multiply" />
      <div className="texture-grain absolute inset-0 opacity-30 mix-blend-multiply" />

      <div className="border-cream/45 absolute inset-3 border-2" />
      <Corner className="text-cream/85 absolute top-1 left-1 h-7 w-7" />
      <Corner flip className="text-cream/85 absolute top-1 right-1 h-7 w-7" />
      <Corner className="text-cream/85 absolute right-1 bottom-1 h-7 w-7 rotate-180" />
      <Corner
        flip
        className="text-cream/85 absolute bottom-1 left-1 h-7 w-7 rotate-180"
      />

      <div className="border-cream/70 font-body tracking-poster text-cream/90 absolute top-2 right-2 rounded-sm border-2 px-2 py-1 text-[10px] font-bold">
        No. {gallery.index}
      </div>

      <div className="bg-ink/55 absolute inset-x-0 bottom-0 flex items-center justify-between px-4 py-2 backdrop-blur-[2px]">
        <span className="font-body tracking-poster text-cream/90 text-[9px] font-bold uppercase">
          ANI WORKS
        </span>
        <span className="font-body tracking-poster text-cream/90 text-[9px] font-bold uppercase">
          {gallery.series}
        </span>
      </div>

      {gallery.preview.type === 'video' ? (
        <span className="bg-ink/55 absolute inset-0 flex items-center justify-center">
          <span className="border-cream/80 shadow-stamp flex h-14 w-14 items-center justify-center rounded-full border-2 bg-cream/20 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
            <svg viewBox="0 0 24 24" className="ml-1 h-5 w-5 fill-cream" aria-hidden="true">
              <path d="M7 4.5 L19.5 12 L7 19.5 Z" />
            </svg>
          </span>
        </span>
      ) : null}

      <Paisley className="text-cream/35 absolute top-1/2 -right-2 h-8 w-8 -translate-y-1/2" />
      <Paisley className="text-cream/35 absolute top-1/2 -left-2 h-8 w-8 -translate-y-1/2 -scale-x-100" />
    </div>
  )
}

export function GalleryCard({
  gallery,
  count,
  featured,
  onOpen,
}: {
  gallery: Gallery
  count: number
  featured?: boolean
  onOpen: () => void
}) {
  return (
    <article className="group relative" data-cursor-label="open">
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Open ${gallery.title} gallery — ${count} items`}
        className="focus-visible:outline-crimson block w-full text-left focus-visible:outline-offset-8 focus-visible:outline-dashed"
      >
        <div className="transition-transform duration-500 ease-out group-hover:-translate-y-2">
          <div
            className={cn(
              'edge-ink bg-cream shadow-poster relative p-3 transition-transform duration-500 md:p-4',
              featured
                ? 'group-hover:rotate-0'
                : count % 2 === 0
                  ? 'rotate-[-1.2deg] group-hover:rotate-0'
                  : 'rotate-[1.2deg] group-hover:rotate-0',
            )}
          >
            <div className="texture-bands absolute inset-0 opacity-30" />
            <div className="border-ink/15 relative overflow-hidden border-2">
              <PreviewFrame gallery={gallery} />
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-baseline justify-between gap-4 px-1">
          <div>
            <h3 className="font-display text-ink text-xl font-bold md:text-2xl">
              {gallery.title}
            </h3>
            <p className="font-body tracking-label text-ink-soft mt-1 text-xs uppercase">
              {gallery.series} · {count} prints
            </p>
          </div>
          <span
            className="font-display text-crimson/30 group-hover:text-crimson text-3xl font-black italic transition-colors duration-300"
            aria-hidden="true"
          >
            {gallery.index}
          </span>
        </div>

        <p className="mt-3 px-1 text-sm leading-relaxed text-ink-soft">
          {gallery.blurb}
        </p>
      </button>
    </article>
  )
}
