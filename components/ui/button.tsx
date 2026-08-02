import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'

type ButtonProps = {
  children: React.ReactNode
  href?: string
  variant?: 'solid' | 'outline' | 'stamp'
  className?: string
  type?: 'button' | 'submit' | 'reset'
  'data-cursor-label'?: string
}

export function Button({
  children,
  href,
  variant = 'solid',
  className,
  type,
  ...rest
}: ButtonProps) {
  const base = cn(
    'group inline-flex items-center gap-3 rounded-[10px] px-7 py-4',
    'font-body text-sm font-semibold uppercase tracking-poster',
    'transition-all duration-200 ease-out will-change-transform',
    'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dashed focus-visible:outline-crimson',
  )

  const variants: Record<string, string> = {
    solid: cn(
      'bg-crimson text-cream shadow-stamp',
      'hover:bg-crimson-deep hover:shadow-stamp active:translate-y-[3px] active:shadow-none',
    ),
    outline: cn(
      'border-2 border-ink bg-transparent text-ink',
      'hover:bg-ink hover:text-cream active:translate-y-[2px]',
    ),
    stamp: cn(
      'border-2 border-dashed border-crimson bg-paper text-crimson',
      'hover:bg-crimson hover:text-cream hover:border-crimson',
      '-rotate-1 transition-transform duration-200 hover:rotate-0',
    ),
  }

  const inner = (
    <>
      <span>{children}</span>
      <ArrowUpRight
        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        strokeWidth={2.5}
        aria-hidden="true"
      />
    </>
  )

  if (type) {
    return (
      <button
        type={type}
        className={cn(base, variants[variant], className)}
        {...rest}
      >
        {inner}
      </button>
    )
  }

  if (href?.startsWith('#')) {
    return (
      <a
        href={href}
        className={cn(base, variants[variant], className)}
        {...rest}
      >
        {inner}
      </a>
    )
  }

  return (
    <Link
      href={href ?? '#'}
      className={cn(base, variants[variant], className)}
      {...rest}
    >
      {inner}
    </Link>
  )
}
