import type { Metadata } from 'next'
import Link from 'next/link'
import { Lotus } from '@/components/ui/motifs'
import { site } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Page Not Found',
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <section className="bg-paper relative flex min-h-screen items-center justify-center overflow-hidden px-5 py-32">
      <div
        className="texture-halftone absolute inset-0 opacity-50"
        aria-hidden="true"
      />
      <div
        className="texture-grain absolute inset-0 opacity-40"
        aria-hidden="true"
      />

      <div className="relative text-center">
        <Lotus className="text-crimson mx-auto h-12 w-12" />
        <p className="font-body tracking-label text-crimson mt-6 text-xs font-bold uppercase">
          Misprinted · Error 404
        </p>
        <h1 className="font-display text-ink mt-4 text-7xl leading-none font-black italic md:text-9xl">
          Lost
          <span className="text-crimson block">in the bazaar</span>
        </h1>
        <p className="font-body text-ink-soft mx-auto mt-6 max-w-md leading-relaxed">
          This page ran out of ink. The presses are fine — this one just never
          made it to print.
        </p>
        <Link
          href="/"
          className="border-ink font-body tracking-poster text-ink hover:bg-ink hover:text-cream mt-10 inline-block border-2 px-8 py-4 text-sm font-bold uppercase transition-colors"
        >
          Back to the {site.brand} archive
        </Link>
      </div>
    </section>
  )
}
