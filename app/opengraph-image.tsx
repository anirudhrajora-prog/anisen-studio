import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { site } from '@/lib/content'

export const alt = `${site.name} — ${site.role}`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OgImage() {
  const [frauncesItalic, schibsted] = await Promise.all([
    readFile(join(process.cwd(), 'fonts/fraunces-900.ttf')),
    readFile(join(process.cwd(), 'fonts/schibsted-400.ttf')),
  ])

  const rays = Array.from({ length: 24 }, (_, i) => {
    const a1 = (i * 15 * Math.PI) / 180
    const a2 = ((i + 0.5) * 15 * Math.PI) / 180
    const r1 = i % 2 === 0 ? 140 : 90
    const x1 = 940 + Math.cos(a1) * r1
    const y1 = 315 + Math.sin(a1) * r1
    const x2 = 940 + Math.cos(a2) * 230
    const y2 = 315 + Math.sin(a2) * 230
    const x3 = 940 + Math.cos(a1) * 230
    const y3 = 315 + Math.sin(a1) * 230
    return `${x1},${y1} ${x2},${y2} ${x3},${y3}`
  }).join(' ')

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#f4ecdb',
          color: '#2e2115',
          fontFamily: 'Schibsted',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            border: '16px solid #2e2115',
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 28,
            left: 28,
            right: 28,
            bottom: 28,
            border: '3px solid #9e1b1b',
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 44,
            left: 44,
            right: 44,
            bottom: 44,
            border: '1px solid #9e1b1b',
            display: 'flex',
          }}
        />

        <div
          style={{
            position: 'absolute',
            right: -40,
            top: 85,
            width: 460,
            height: 460,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg width="460" height="460" viewBox="-50 -50 100 100">
            <polygon points={rays} fill="#e8a20c" opacity="0.85" />
            <circle r="13" fill="#e8a20c" />
            <circle r="5.5" fill="#f4ecdb" />
          </svg>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '80px 88px',
            maxWidth: 760,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <div
              style={{
                width: 46,
                height: 46,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '3px solid #9e1b1b',
                background: '#fbf6ea',
              }}
            >
              <span
                style={{
                  fontFamily: 'Fraunces',
                  fontStyle: 'italic',
                  fontSize: 30,
                  fontWeight: 900,
                  color: '#9e1b1b',
                }}
              >
                ANI
              </span>
            </div>
            <span
              style={{
                fontSize: 22,
                letterSpacing: 6,
                fontWeight: 700,
                textTransform: 'uppercase',
                color: '#9e1b1b',
              }}
            >
              Tech Head, Rudra · New Delhi
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', marginTop: 46 }}>
            <span
              style={{
                fontFamily: 'Fraunces',
                fontStyle: 'italic',
                fontSize: 132,
                fontWeight: 900,
                lineHeight: 0.95,
                letterSpacing: -2,
                color: '#9e1b1b',
              }}
            >
              Designing
            </span>
            <span
              style={{
                fontFamily: 'Fraunces',
                fontSize: 132,
                fontWeight: 900,
                lineHeight: 0.95,
                letterSpacing: -2,
              }}
            >
              Collectibles
            </span>
            <span
              style={{
                fontFamily: 'Fraunces',
                fontStyle: 'italic',
                fontSize: 132,
                fontWeight: 900,
                lineHeight: 0.95,
                letterSpacing: -2,
              }}
            >
              of Delhi
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              marginTop: 48,
            }}
          >
            <div style={{ width: 60, height: 3, background: '#9e1b1b' }} />
            <span
              style={{
                fontSize: 22,
                letterSpacing: 5,
                fontWeight: 700,
                textTransform: 'uppercase',
                color: '#5a4632',
              }}
            >
              Event Branding · Poster · Video · Merch
            </span>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0 88px 44px',
          }}
        >
          <span
            style={{
              fontSize: 18,
              letterSpacing: 4,
              fontWeight: 700,
              textTransform: 'uppercase',
              color: '#5a4632',
            }}
          >
            {site.name} · Visual Storyteller
          </span>
          <span
            style={{
              fontSize: 18,
              letterSpacing: 4,
              fontWeight: 700,
              textTransform: 'uppercase',
              color: '#9e1b1b',
            }}
          >
            anirudhrajora.vercel.app
          </span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Fraunces',
          data: frauncesItalic,
          style: 'italic',
          weight: 900,
        },
        { name: 'Schibsted', data: schibsted, style: 'normal', weight: 400 },
      ],
    },
  )
}