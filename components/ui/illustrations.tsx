import { cn } from '@/lib/utils'

type SvgProps = {
  className?: string
  'aria-hidden'?: boolean
}

/* ------------------------------------------------------------------ */
/* StudioTable — the about artwork: a top-down view of the studio      */
/* table, with tools arranged like a still life.                       */
/* ------------------------------------------------------------------ */

export function StudioTable({
  className,
  ...rest
}: SvgProps & { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 440"
      className={cn('block h-auto w-full', className)}
      role="img"
      aria-label="Illustration of a studio table from above: brushes, an ink pot, a matchbox, letterpress plates, scissors and proofs"
      {...rest}
    >
      <rect width="400" height="440" fill="var(--color-parchment)" />
      <g opacity="0.5">
        <path
          d="M0 40 H400 M0 80 H400 M0 120 H400 M0 160 H400 M0 200 H400 M0 240 H400 M0 280 H400 M0 320 H400 M0 360 H400 M0 400 H400"
          stroke="var(--color-ink)"
          strokeWidth="0.6"
        />
        <path
          d="M40 0 V440 M80 0 V440 M120 0 V440 M160 0 V440 M200 0 V440 M240 0 V440 M280 0 V440 M320 0 V440 M360 0 V440"
          stroke="var(--color-ink)"
          strokeWidth="0.6"
        />
      </g>

      <g stroke="var(--color-ink)">
        {/* brushes */}
        <g transform="translate(28 52) rotate(18)">
          <rect
            x="0"
            y="0"
            width="14"
            height="150"
            rx="2"
            fill="var(--color-terracotta)"
          />
          <rect x="0" y="0" width="14" height="34" fill="var(--color-indigo)" />
          <path
            d="M2 34 C2 50 -2 62 0 74 C6 62 10 60 12 74 C14 62 12 50 12 34 Z"
            fill="var(--color-ink)"
          />
        </g>
        <g transform="translate(52 36) rotate(40)">
          <rect
            x="0"
            y="0"
            width="12"
            height="120"
            rx="2"
            fill="var(--color-emerald)"
          />
          <rect
            x="0"
            y="0"
            width="12"
            height="28"
            fill="var(--color-charcoal)"
          />
          <path
            d="M2 28 C2 42 -2 52 0 62 C5 52 9 50 11 62 C13 52 11 42 11 28 Z"
            fill="var(--color-ink)"
          />
        </g>

        {/* matchbox */}
        <g transform="translate(240 60) rotate(-6)">
          <rect
            x="0"
            y="0"
            width="130"
            height="76"
            fill="var(--color-paper)"
            strokeWidth="2.5"
          />
          <rect
            x="0"
            y="0"
            width="130"
            height="76"
            fill="none"
            strokeWidth="6"
            transform="translate(6 6) scale(0.92)"
            stroke="var(--color-crimson)"
          />
          <rect
            x="10"
            y="10"
            width="110"
            height="56"
            fill="none"
            stroke="var(--color-crimson)"
            strokeWidth="1.6"
          />
          <text
            x="65"
            y="42"
            textAnchor="middle"
            style={{
              fontFamily: 'var(--font-fraunces)',
              fontStyle: 'italic',
              fontSize: '26px',
              fill: 'var(--color-crimson)',
            }}
          >
            ani
          </text>
          <text
            x="65"
            y="56"
            textAnchor="middle"
            style={{
              fontFamily: 'var(--font-schibsted)',
              fontSize: '7px',
              letterSpacing: '0.3em',
              fill: 'var(--color-ink-soft)',
            }}
          >
            SAFETY · GRAND PRIX QUALITY
          </text>
          <path
            d="M130 0 L148 0 L148 76 L130 76 Z"
            fill="var(--color-indigo)"
            strokeWidth="2"
          />
          <text
            x="139"
            y="42"
            textAnchor="middle"
            transform="rotate(90 139 42)"
            style={{
              fontFamily: 'var(--font-schibsted)',
              fontSize: '7px',
              letterSpacing: '0.25em',
              fill: 'var(--color-cream)',
            }}
          >
            TIP: KEEP DRY
          </text>
        </g>

        {/* scissors */}
        <g transform="translate(300 130) rotate(30)">
          <circle cx="0" cy="0" r="9" fill="var(--color-marigold)" />
          <circle cx="0" cy="0" r="3.4" fill="var(--color-ink)" />
          <circle cx="26" cy="0" r="9" fill="var(--color-marigold)" />
          <circle cx="26" cy="0" r="3.4" fill="var(--color-ink)" />
          <path d="M8 2 L46 34 M18 2 L40 34" strokeWidth="4" />
        </g>

        {/* ink pot */}
        <g transform="translate(320 240)">
          <path
            d="M22 0 C16 8 14 22 14 40 L42 40 C42 22 40 8 34 0 C32 -4 24 -4 22 0 Z"
            fill="var(--color-indigo)"
            strokeWidth="2.5"
          />
          <ellipse
            cx="28"
            cy="-6"
            rx="12"
            ry="4"
            fill="var(--color-indigo-deep)"
            strokeWidth="2"
          />
          <ellipse
            cx="28"
            cy="40"
            rx="14"
            ry="4"
            fill="var(--color-indigo-deep)"
            strokeWidth="2"
          />
        </g>

        {/* letterpress plate */}
        <g transform="translate(52 190) rotate(-4)">
          <rect
            x="0"
            y="0"
            width="120"
            height="150"
            fill="var(--color-charcoal)"
            strokeWidth="2.5"
            rx="4"
          />
          <rect
            x="14"
            y="18"
            width="92"
            height="114"
            fill="none"
            stroke="var(--color-parchment)"
            strokeWidth="1.4"
          />
          <text
            x="60"
            y="70"
            textAnchor="middle"
            style={{
              fontFamily: 'var(--font-fraunces)',
              fontStyle: 'italic',
              fontSize: '34px',
              fill: 'var(--color-marigold-light)',
            }}
          >
            ani
          </text>
          <text
            x="60"
            y="92"
            textAnchor="middle"
            style={{
              fontFamily: 'var(--font-schibsted)',
              fontSize: '8px',
              letterSpacing: '0.3em',
              fill: 'var(--color-parchment)',
            }}
          >
            ANIRUDDHA SEN
          </text>
          <text
            x="60"
            y="106"
            textAnchor="middle"
            style={{
              fontFamily: 'var(--font-schibsted)',
              fontSize: '7px',
              fill: 'var(--color-parchment)',
            }}
          >
            VISUAL DESIGNER
          </text>
          <circle cx="60" cy="28" r="6" fill="var(--color-crimson)" />
        </g>

        {/* stamp */}
        <g transform="translate(292 320)">
          <path
            d="M0 26 L60 26 L60 74 L0 74 Z"
            fill="var(--color-marigold)"
            strokeWidth="2.5"
          />
          <path
            d="M60 0 L76 0 L76 76 L60 76 Z"
            fill="var(--color-marigold)"
            strokeWidth="2.5"
          />
          <path
            d="M68 10 L84 10 L84 74 L68 74 Z"
            fill="var(--color-marigold)"
            strokeWidth="2.5"
          />
          <path
            d="M0 88 L60 88 L60 102 L0 102 Z"
            fill="var(--color-marigold)"
            strokeWidth="2.5"
          />
          <text
            x="30"
            y="56"
            textAnchor="middle"
            style={{
              fontFamily: 'var(--font-fraunces)',
              fontStyle: 'italic',
              fontSize: '20px',
              fill: 'var(--color-crimson)',
            }}
          >
            hand made
          </text>
        </g>

        {/* proof sheet */}
        <g transform="translate(190 330) rotate(2)">
          <rect
            x="0"
            y="0"
            width="120"
            height="70"
            fill="var(--color-cream)"
            strokeWidth="2"
          />
          <path
            d="M0 26 H120 M0 52 H120"
            stroke="var(--color-ink)"
            strokeWidth="0.8"
          />
          <path
            d="M0 10 L120 10 M0 62 H120"
            stroke="var(--color-ink)"
            strokeWidth="0.8"
            opacity="0.4"
          />
          <text
            x="10"
            y="22"
            style={{
              fontFamily: 'var(--font-schibsted)',
              fontSize: '10px',
              fill: 'var(--color-ink)',
            }}
          >
            ADDA · issue 07
          </text>
          <text
            x="10"
            y="42"
            style={{
              fontFamily: 'var(--font-schibsted)',
              fontSize: '10px',
              fill: 'var(--color-ink)',
            }}
          >
            set in fraunces
          </text>
          <text
            x="10"
            y="60"
            style={{
              fontFamily: 'var(--font-schibsted)',
              fontSize: '9px',
              fontStyle: 'italic',
              fill: 'var(--color-ink-soft)',
            }}
          >
            proof no. 3 — keep
          </text>
        </g>
      </g>

      <g fill="var(--color-ink)">
        <circle cx="24" cy="404" r="6" />
        <circle cx="376" cy="404" r="6" />
        <circle cx="24" cy="24" r="6" />
        <circle cx="376" cy="24" r="6" />
      </g>
      <g
        stroke="var(--color-ink)"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      >
        <path
          d="M24 22 V6 M40 6 H60 M22 24 H8 M24 36 V16"
          transform="translate(0 0)"
        />
      </g>
    </svg>
  )
}
