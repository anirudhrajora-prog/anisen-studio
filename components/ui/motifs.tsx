import { useId } from 'react'
import { cn } from '@/lib/utils'

type SvgProps = {
  className?: string
  'aria-hidden'?: boolean
}

export function Sunburst({
  className,
  rays = 24,
  ...rest
}: SvgProps & { rays?: number }) {
  const step = (Math.PI * 2) / rays
  const points = Array.from({ length: rays }, (_, i) => {
    const a1 = i * step
    const a2 = (i + 0.5) * step
    const r1 = i % 2 === 0 ? 30 : 20
    const x1 = (Math.cos(a1) * r1).toFixed(2)
    const y1 = (Math.sin(a1) * r1).toFixed(2)
    const x2 = (Math.cos(a2) * 46).toFixed(2)
    const y2 = (Math.sin(a2) * 46).toFixed(2)
    const x3 = (Math.cos(a1) * 46).toFixed(2)
    const y3 = (Math.sin(a1) * 46).toFixed(2)
    return `${x1},${y1} ${x2},${y2} ${x3},${y3}`
  }).join(' ')

  return (
    <svg
      viewBox="-50 -50 100 100"
      className={cn('block', className)}
      aria-hidden="true"
      {...rest}
    >
      <polygon points={points} fill="currentColor" />
      <circle r="13" fill="currentColor" />
      <circle r="5.5" fill="var(--color-paper)" />
    </svg>
  )
}

export function Lotus({
  className,
  ...rest
}: SvgProps & { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={cn('block', className)}
      aria-hidden="true"
      {...rest}
    >
      <g fill="currentColor">
        <path d="M20 3 C20 12 13 19 6 20.5 C11 27.5 16 32 20 38 C24 32 29 27.5 34 20.5 C27 19 20 12 20 3 Z" />
        <path d="M5.5 20.8 C3.5 27 4.5 33 8 38 C10.8 35.8 12.8 31.5 13.2 26.8 C10.4 24.4 8 23 5.5 20.8 Z" />
        <path d="M34.5 20.8 C36.5 27 35.5 33 32 38 C29.2 35.8 27.2 31.5 26.8 26.8 C29.6 24.4 32 23 34.5 20.8 Z" />
      </g>
      <path
        d="M6 22.5 C14 27 26 27 34 22.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </svg>
  )
}

export function Paisley({
  className,
  ...rest
}: SvgProps & { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={cn('block', className)}
      aria-hidden="true"
      {...rest}
    >
      <path
        d="M24 46 C10 44 4 33 4.5 21 C5 9.5 14 2.5 23.5 4.5 C30 6 35 10.5 36 16 C37 21 33.5 24.5 29.5 23.5 C27.5 23 27.5 20.8 29.8 20.8 C31.6 20.8 31.2 22.6 29.8 22.6 C28.9 22.6 28.9 21.7 29.8 21.7 C33 22 37 28 35.5 36 C34.5 41 30 44.5 24 46 Z"
        fill="currentColor"
      />
      <circle cx="29.5" cy="14.5" r="1.6" fill="var(--color-paper)" />
    </svg>
  )
}

export function Corner({
  className,
  classNameInner,
  flip = false,
  ...rest
}: SvgProps & { classNameInner?: string; flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 60 60"
      className={cn('block', className, flip && '-scale-x-100')}
      aria-hidden="true"
      {...rest}
    >
      <g fill="none" stroke="currentColor">
        <path d="M2 58 C2 27 27 2 58 2" strokeWidth="3" strokeLinecap="round" />
        <path
          className={classNameInner}
          d="M2 47 C2 22 22 2 47 2"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M2 33 C2 16 16 2 33 2"
          strokeWidth="1.2"
          strokeDasharray="2 4"
          strokeLinecap="round"
        />
        <path
          d="M2 58 L2 53 M53 2 L58 2 M2 58 L8 58 M58 2 L58 8"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>
      <g fill="currentColor">
        <circle cx="2" cy="58" r="3" />
        <circle cx="58" cy="2" r="3" />
        <path d="M15 4.5 L18 10 L23 10.5 L19.5 14 L20.5 19 L15 16.5 L9.5 19 L10.5 14 L7 10.5 L12 10 Z" />
      </g>
    </svg>
  )
}

export function Diamond({
  className,
  ...rest
}: SvgProps & { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn('block', className)}
      aria-hidden="true"
      {...rest}
    >
      <g fill="currentColor">
        <path d="M12 1 L23 12 L12 23 L1 12 Z" />
        <path d="M12 6 L18 12 L12 18 L6 12 Z" fill="var(--color-paper)" />
        <circle cx="12" cy="12" r="2.2" />
      </g>
    </svg>
  )
}

export function Seal({
  className,
  text,
  center,
  ...rest
}: SvgProps & {
  text: string
  center?: React.ReactNode
  className?: string
}) {
  const pathId = useId()
  return (
    <svg
      viewBox="0 0 120 120"
      className={cn('block', className)}
      aria-hidden="true"
      {...rest}
    >
      <defs>
        <path
          id={pathId}
          d="M60,60 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0"
        />
      </defs>
      <circle
        cx="60"
        cy="60"
        r="58"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle
        cx="60"
        cy="60"
        r="46"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="1 5"
      />
      <text
        className="uppercase"
        style={{
          fontFamily: 'var(--font-schibsted)',
          fontSize: '11.5px',
          letterSpacing: '0.32em',
          fill: 'currentColor',
        }}
      >
        <textPath href={`#${pathId}`}>{text}</textPath>
      </text>
      <g transform="translate(60,60)">
        {center ?? <Lotus className="h-8 w-8 -translate-x-4 -translate-y-4" />}
      </g>
    </svg>
  )
}

export function Flourish({
  className,
  ...rest
}: SvgProps & { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 24"
      className={cn('block h-6 w-full', className)}
      aria-hidden="true"
      {...rest}
    >
      <path
        d="M4 12 H78 M122 12 H196"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M4 12 H88 M112 12 H196"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeDasharray="1 4"
        strokeLinecap="round"
      />
      <g transform="translate(100 12)">
        <Lotus className="h-7 w-7 -translate-x-3.5 -translate-y-3.5" />
      </g>
      <g transform="translate(84 12)" fill="currentColor">
        <circle r="2.2" />
        <Paisley className="h-6 w-6 -translate-x-3 -translate-y-3" />
      </g>
      <g transform="translate(116 12)" fill="currentColor">
        <circle r="2.2" />
        <Paisley className="h-6 w-6 -translate-x-3 -translate-y-3 -scale-x-100" />
      </g>
    </svg>
  )
}
