import Link from 'next/link'
import { ArrowUp } from 'lucide-react'
import { footer, site } from '@/lib/content'
import { Corner, Flourish } from '@/components/ui/motifs'

function BehanceIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 6h4.5a2.5 2.5 0 0 1 0 5H4v-5Z" />
      <path d="M4 11h5a2.5 2.5 0 0 1 0 5H4v-5Z" />
      <path d="M15 8h5" />
      <path d="M16.5 12a2.5 2.5 0 0 1 2.5-2.5c1.5 0 2.5 1 2.5 2.5v3H16.5A2.5 2.5 0 0 1 16.5 12Z" />
    </svg>
  )
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="4" />
      <path d="M7 10v7" />
      <path d="M7 7v.01" />
      <path d="M12 17v-4a2.5 2.5 0 0 1 5 0v4" />
    </svg>
  )
}

const socials = [
  { label: 'Behance', href: site.socials.behance, icon: BehanceIcon },
  { label: 'LinkedIn', href: site.socials.linkedin, icon: LinkedinIcon },
]

export function Footer() {
  return (
    <footer className="relative bg-charcoal text-cream">
      <div className="texture-halftone absolute inset-0 opacity-30" aria-hidden="true" />
      <div className="texture-grain absolute inset-0 opacity-30" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-5 pt-20 md:px-8 md:pt-28">
        <div className="flex justify-center">
          <a
            href="#top"
            className="group flex h-14 w-14 items-center justify-center rounded-full border-2 border-marigold/70 text-marigold transition-colors hover:bg-marigold hover:text-charcoal"
            aria-label="Back to top"
          >
            <ArrowUp className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-1" />
          </a>
        </div>

        <div className="mt-16 flex justify-center">
          <Corner className="h-14 w-14 -scale-x-100 text-marigold/70" />
          <span
            className="select-none px-4 font-display text-6xl font-black italic leading-none text-marigold/25 md:text-8xl"
            aria-hidden="true"
          >
            ANI
          </span>
          <Corner className="h-14 w-14 rotate-180 text-marigold/70" />
        </div>

        <p className="mt-8 text-center font-body text-sm uppercase tracking-poster text-cream/70">
          {footer.note}
        </p>

        <h2 className="mt-10 text-balance text-center font-display text-4xl font-black leading-[1.05] text-cream md:text-6xl">
          Let&apos;s make something
          <span className="block italic text-marigold">worth keeping.</span>
        </h2>

        <div className="mt-10 text-center">
          <a
            href={`mailto:${site.email}`}
            className="font-display text-2xl font-bold italic text-cream underline decoration-marigold decoration-2 underline-offset-8 transition-colors hover:text-marigold md:text-4xl"
          >
            {site.email}
          </a>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
          {socials.map(({ label, href, icon: Icon }) => (
            <Link
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 border border-cream/25 px-4 py-2 font-body text-xs font-bold uppercase tracking-poster text-cream/80 transition-colors hover:border-marigold hover:text-marigold"
            >
              <Icon className="h-3.5 w-3.5" aria-hidden="true" />
              {label}
              <span
                className="text-marigold transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              >
                ↗
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-16">
          <Flourish className="text-marigold/60" />
        </div>

        <div className="flex flex-col items-center justify-between gap-4 py-8 text-center font-body text-[10px] uppercase tracking-poster text-cream/50 md:flex-row md:text-left">
          <p>
            © {new Date().getFullYear()} {site.name}. {footer.rights}
          </p>
          <p>{footer.credits}</p>
        </div>
      </div>
    </footer>
  )
}