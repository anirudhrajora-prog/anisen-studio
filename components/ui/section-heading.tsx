import { cn } from '@/lib/utils'
import { Flourish } from '@/components/ui/motifs'

type SectionHeadingProps = {
  kicker: string
  title: React.ReactNode
  sub?: string
  align?: 'left' | 'center'
  tone?: 'ink' | 'cream'
  className?: string
}

export function SectionHeading({
  kicker,
  title,
  sub,
  align = 'left',
  tone = 'ink',
  className,
}: SectionHeadingProps) {
  const isInk = tone === 'ink'
  return (
    <div
      className={cn(
        'mb-14 max-w-3xl md:mb-20',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      <div
        className={cn(
          'reveal-fade flex items-center gap-3',
          align === 'center' && 'justify-center',
        )}
      >
        <span
          className={cn('h-px w-10', isInk ? 'bg-crimson' : 'bg-marigold')}
          aria-hidden="true"
        />
        <p
          className={cn(
            'font-body tracking-label text-xs font-bold uppercase',
            isInk ? 'text-crimson' : 'text-marigold',
          )}
        >
          {kicker}
        </p>
      </div>

      <h2
        className={cn(
          'reveal-mask font-display mt-5 text-4xl leading-[1.02] font-black tracking-tight md:text-6xl',
          isInk ? 'text-ink' : 'text-cream',
        )}
      >
        <span className="reveal-mask-inner text-balance">{title}</span>
      </h2>

      {sub ? (
        <p
          className={cn(
            'reveal-fade mt-6 max-w-xl text-base leading-relaxed md:text-lg',
            isInk ? 'text-ink-soft' : 'text-cream/80',
            align === 'center' && 'mx-auto',
          )}
        >
          {sub}
        </p>
      ) : null}

      <div
        className={cn(
          'reveal-fade mt-8',
          align === 'center' && 'mx-auto max-w-md',
        )}
      >
        <Flourish className={isInk ? 'text-crimson/70' : 'text-marigold/80'} />
      </div>
    </div>
  )
}
