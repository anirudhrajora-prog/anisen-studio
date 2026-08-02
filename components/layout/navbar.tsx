'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { Menu, X } from 'lucide-react'
import { navLinks, site } from '@/lib/content'
import { cn } from '@/lib/utils'

function Brand() {
  return (
    <a
      href="#top"
      className="group flex items-center gap-3 focus-visible:outline-dashed focus-visible:outline-offset-4 focus-visible:outline-crimson"
      aria-label={`${site.brand} — back to top`}
    >
      <span className="flex h-10 w-10 items-center justify-center border-2 border-crimson bg-crimson/5 transition-colors duration-300 group-hover:bg-crimson">
        <span className="font-display text-lg font-black italic leading-none text-crimson transition-colors duration-300 group-hover:text-cream">
          ANI
        </span>
      </span>
      <span className="font-display text-base font-bold leading-none tracking-tight text-ink whitespace-nowrap">
        {site.name}
      </span>
    </a>
  )
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const lastFocused = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : ''
    return () => {
      document.documentElement.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    lastFocused.current = document.activeElement as HTMLElement
    menuRef.current?.querySelector<HTMLElement>('a')?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      lastFocused.current?.focus()
    }
  }, [open])

  useEffect(() => {
    const menu = menuRef.current
    if (!menu || !open) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.menu-link',
        { yPercent: 120 },
        { yPercent: 0, duration: 0.8, ease: 'power4.out', stagger: 0.06 },
      )
      gsap.fromTo(
        '.menu-panel',
        { clipPath: 'inset(0 0 100% 0)' },
        { clipPath: 'inset(0 0 0% 0)', duration: 0.8, ease: 'power4.inOut' },
      )
    }, menu)

    return () => ctx.revert()
  }, [open])

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-[80] transition-all duration-300',
          scrolled && !open
            ? 'border-b-2 border-ink/10 bg-paper/90 backdrop-blur-sm'
            : 'bg-transparent',
        )}
      >
        <nav
          className="mx-auto flex max-w-7xl items-center justify-end gap-8 px-5 py-4 md:px-8"
          aria-label="Primary"
        >
          <span className="mr-auto"><Brand /></span>

          <ul className="hidden items-center gap-7 lg:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="group relative py-2 font-body text-xs font-bold uppercase tracking-poster text-ink transition-colors hover:text-crimson focus-visible:outline-dashed focus-visible:outline-offset-4 focus-visible:outline-crimson"
                >
                  {link.label}
                  <span
                    className="absolute -bottom-0.5 left-0 h-0.5 w-full origin-left scale-x-0 bg-crimson transition-transform duration-300 group-hover:scale-x-100"
                    aria-hidden="true"
                  />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="hidden border-2 border-ink px-4 py-2 font-body text-xs font-bold uppercase tracking-poster text-ink transition-all duration-200 hover:bg-ink hover:text-cream md:inline-block"
            >
              Hire Me
            </a>
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="site-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="flex h-10 w-10 items-center justify-center border-2 border-ink bg-paper transition-colors hover:bg-ink hover:text-cream lg:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </header>

      <div
        id="site-menu"
        ref={menuRef}
        className={cn(
          'menu-panel fixed inset-0 z-[70] flex flex-col justify-between bg-charcoal px-6 pb-8 pt-28 transition-opacity duration-300 lg:hidden',
          open ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
        hidden={!open}
      >
        <div className="texture-halftone absolute inset-0 opacity-40" aria-hidden="true" />
        <nav aria-label="Menu" className="relative">
          <ul className="space-y-1">
            {navLinks.map((link) => (
              <li key={link.href} className="overflow-hidden">
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="menu-link flex items-baseline gap-4 border-b border-cream/10 py-3 font-display text-4xl font-black italic text-cream transition-colors hover:text-marigold"
                >
                  <span className="font-body text-xs font-bold not-italic tracking-poster text-marigold">
                    0{navLinks.indexOf(link) + 1}
                  </span>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <p className="relative font-body text-[10px] uppercase tracking-poster text-cream/50">
          {site.city} · {site.email}
        </p>
      </div>
    </>
  )
}