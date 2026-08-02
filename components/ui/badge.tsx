import { cn } from '@/lib/utils'
import { Star } from 'lucide-react'

type BadgeProps = {
  children: React.ReactNode
  className?: string
  tone?: 'crimson' | 'indigo' | 'emerald' | 'ink'
}

const tones = {
  crimson: 'border-crimson text-crimson',
  indigo: 'border-indigo text-indigo',
  emerald: 'border-emerald text-emerald',
  ink: 'border-ink text-ink',
}

export function Badge({ children, className, tone = 'crimson' }: BadgeProps) {
  return (
    <span
      className={cn(
        'font-body tracking-label inline-flex items-center gap-2 border-2 px-4 py-2 text-[11px] font-bold uppercase',
        tones[tone],
        className,
      )}
    >
      <Star className="h-3 w-3 fill-current" aria-hidden="true" />
      <span>{children}</span>
      <Star className="h-3 w-3 fill-current" aria-hidden="true" />
    </span>
  )
}
