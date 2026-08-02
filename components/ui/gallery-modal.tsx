'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { ArrowLeft, ArrowRight, ArrowUpRight, Play, X } from 'lucide-react'
import type { Gallery } from '@/lib/content'
import type { GalleryGroup } from '@/lib/galleries-data'
import { cn } from '@/lib/utils'
import { getYouTubeId, YouTubeEmbed } from '@/components/ui/youtube-embed'

function basename(src: string | undefined) {
  if (!src) return ''
  const parts = src.split('/')
  return parts[parts.length - 1]
}

function VideoTile({
  src,
  label,
  onOpen,
  className,
}: {
  src: string
  label: string
  onOpen?: () => void
  className?: string
}) {
  const [paused, setPaused] = useState(true)

  if (getYouTubeId(src)) {
    return (
      <div className={cn('group/vt relative bg-ink/10', className)}>
        <YouTubeEmbed src={src} className={cn('h-full w-full object-cover', className)} />
      </div>
    )
  }

  return (
    <div className={cn('group/vt relative bg-ink/10', className)}>
      <video
        src={src}
        className={cn('h-full w-full', className)}
        preload="metadata"
        playsInline
        controls
        style={{ objectFit: 'contain' }}
        onPlay={() => setPaused(false)}
        onPause={() => setPaused(true)}
      />
      {paused ? (
        <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span className="border-cream/80 shadow-stamp flex h-12 w-12 items-center justify-center rounded-full border-2 bg-ink/40 backdrop-blur-sm transition-transform duration-300 group-hover/vt:scale-110">
            <Play className="ml-0.5 h-4 w-4 fill-cream text-cream" aria-hidden="true" />
          </span>
        </span>
      ) : null}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          onOpen?.()
        }}
        className="border-cream/60 text-cream hover:bg-cream hover:text-ink absolute top-2 right-2 z-10 flex h-8 w-8 items-center justify-center border-2 bg-ink/50 backdrop-blur-sm transition-colors"
        aria-label={`${label} — open larger`}
      >
        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  )
}

export function GalleryModal({
  gallery,
  groups,
  onClose,
}: {
  gallery: Gallery
  groups: GalleryGroup[]
  onClose: () => void
}) {
  const [groupIndex, setGroupIndex] = useState(0)
  const [viewer, setViewer] = useState<number | null>(null)

  const activeGroup = groups[groupIndex] ?? groups[0]
  const items = activeGroup?.items ?? []
  const total = useMemo(() => groups.reduce((s, g) => s + g.items.length, 0), [groups])
  const totalVideos = useMemo(
    () => groups.reduce((s, g) => s + g.items.filter((i) => i.type === 'video').length, 0),
    [groups],
  )

  useEffect(() => {
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (viewer === null) {
        if (e.key === 'Escape') onClose()
        return
      }
      if (e.key === 'Escape') setViewer(null)
      if (e.key === 'ArrowRight') setViewer((v) => (v! + 1) % items.length)
      if (e.key === 'ArrowLeft') setViewer((v) => (v! - 1 + items.length) % items.length)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [viewer, items.length, onClose])

  const active = viewer !== null ? items[viewer] : null

  const gridSizes = useMemo(
    () => '(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw',
    [],
  )

  return (
    <div
      className="bg-charcoal/90 fixed inset-0 z-[90] overflow-y-auto backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={`${gallery.title} gallery`}
      onClick={onClose}
    >
      <div
        className="relative mx-auto flex min-h-full max-w-7xl flex-col px-5 py-6 md:px-8"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="font-body tracking-label text-marigold text-xs font-bold uppercase">
              Wall No. {gallery.index} · {gallery.series}
            </p>
            <h2 className="font-display text-cream mt-2 text-3xl font-black italic md:text-5xl">
              {gallery.title}
            </h2>
            <p className="font-body tracking-poster text-cream/60 mt-2 text-[10px] uppercase">
              {total} prints
              {totalVideos > 0 ? ` · ${totalVideos} reels` : ''} · audio on
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="border-cream/40 text-cream hover:border-marigold hover:text-marigold flex shrink-0 items-center gap-2 border-2 px-4 py-2 font-body text-xs font-bold uppercase tracking-poster transition-colors"
            aria-label="Close gallery"
          >
            <X className="h-4 w-4" aria-hidden="true" />
            Close
          </button>
        </header>

        {/* sub-shelf tabs */}
        {groups.length > 1 ? (
          <nav
            className="scrollbar-none -mx-5 mt-8 flex gap-2 overflow-x-auto px-5 pb-1 md:-mx-8 md:px-8"
            aria-label="Sub-galleries"
          >
            {groups.map((group, i) => {
              const isActive = i === groupIndex
              return (
                <button
                  key={group.folder}
                  type="button"
                  onClick={() => {
                    setGroupIndex(i)
                    setViewer(null)
                  }}
                  className={cn(
                    'font-body flex shrink-0 items-center gap-2 border-2 px-4 py-2 text-xs font-bold uppercase tracking-poster transition-colors',
                    isActive
                      ? 'border-marigold bg-marigold text-charcoal'
                      : 'border-cream/30 text-cream/70 hover:border-marigold/60 hover:text-marigold',
                  )}
                  aria-pressed={isActive}
                >
                  {group.label}
                  <span
                    className={cn(
                      'rounded-full border px-1.5 py-0.5 text-[9px]',
                      isActive ? 'border-charcoal/30 text-charcoal/70' : 'border-cream/30 text-cream/50',
                    )}
                  >
                    {group.items.length}
                  </span>
                </button>
              )
            })}
          </nav>
        ) : null}

        <div className="mt-6 flex items-center gap-4">
          <span className="font-body tracking-label text-marigold text-[10px] font-bold uppercase">
            Shelf · {activeGroup.label}
          </span>
          <span className="bg-cream/20 h-px flex-1" aria-hidden="true" />
          <span className="font-body text-cream/50 text-[10px] uppercase tracking-poster">
            {activeGroup.items.length} items
          </span>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {items.map((item, i) => {
            if (!item.src) return null
            const label = basename(item.src)
            if (item.type === 'video') {
              return (
                <VideoTile
                  key={`${item.src}-${i}`}
                  src={item.src}
                  label={`${gallery.id}-${groupIndex}-${i}`}
                  onOpen={() => setViewer(i)}
                  className="aspect-[3/4]"
                />
              )
            }
            return (
              <button
                key={`${item.src}-${i}`}
                type="button"
                onClick={() => setViewer(i)}
                className="group/tile relative aspect-[3/4] overflow-hidden bg-ink/10"
                aria-label={`Print ${i + 1}: ${label}`}
              >
                <Image
                  src={item.src}
                  alt={label}
                  fill
                  loading="lazy"
                  sizes={gridSizes}
                  className="object-cover transition-transform duration-500 group-hover/tile:scale-105"
                  quality={75}
                />
                <span className="border-cream/25 absolute inset-2 border transition-colors duration-300 group-hover/tile:border-cream/70" />
              </button>
            )
          })}
        </div>

        <p className="font-body text-cream/40 mt-10 text-center text-[10px] uppercase tracking-poster">
          Every print is real work from the studio ledger — click to look closer.
        </p>
      </div>

      {active && active.src ? (
        <div
          className="fixed inset-0 z-[100] flex flex-col bg-ink/95"
          onClick={(e) => {
            e.stopPropagation()
            setViewer(null)
          }}
        >
          <div className="flex items-center justify-between gap-4 px-5 py-4 md:px-10">
            <p className="font-body tracking-poster text-cream/70 text-[10px] uppercase">
              {active.type === 'video' ? 'Reel' : 'Print'} {viewer! + 1} / {items.length} ·{' '}
              {activeGroup.label}
            </p>
            <button
              type="button"
              onClick={() => setViewer(null)}
              className="border-cream/40 text-cream hover:border-marigold hover:text-marigold flex items-center gap-2 border px-3 py-1.5 font-body text-xs font-bold uppercase tracking-poster transition-colors"
            >
              <X className="h-4 w-4" aria-hidden="true" />
              Back to wall
            </button>
          </div>

          <div className="relative flex flex-1 items-center justify-center overflow-hidden px-5 md:px-20">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                setViewer((v) => (v! - 1 + items.length) % items.length)
              }}
              className="border-cream/40 text-cream hover:border-marigold hover:text-marigold absolute left-3 z-10 flex h-11 w-11 items-center justify-center rounded-full border-2 transition-colors md:left-6"
              aria-label="Previous item"
            >
              <ArrowLeft className="h-5 w-5" aria-hidden="true" />
            </button>

            <div
              className="relative flex h-[78vh] w-full items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {active.type === 'image' ? (
                <div className="relative h-full w-full">
                  <Image
                    src={active.src}
                    alt={basename(active.src)}
                    fill
                    sizes="(max-width: 1024px) 100vw, 70vw"
                    className="object-contain"
                    quality={90}
                  />
                </div>
              ) : getYouTubeId(active.src) ? (
                <YouTubeEmbed
                  src={active.src}
                  autoPlay
                  className="aspect-video h-full w-full max-h-[78vh] object-contain"
                />
              ) : (
                <video
                  src={active.src}
                  className="max-h-[78vh] max-w-full object-contain"
                  controls
                  autoPlay
                  playsInline
                />
              )}
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                setViewer((v) => (v! + 1) % items.length)
              }}
              className="border-cream/40 text-cream hover:border-marigold hover:text-marigold absolute right-3 z-10 flex h-11 w-11 items-center justify-center rounded-full border-2 transition-colors md:right-6"
              aria-label="Next item"
            >
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <p className="border-t border-cream/15 px-6 py-4 text-center">
            <span className="font-display text-cream text-sm italic md:text-base">
              {basename(active.src)}
            </span>
          </p>
        </div>
      ) : null}
    </div>
  )
}
