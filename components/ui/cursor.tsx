'use client'

import { useEffect, useRef } from 'react'
import { useFinePointer, useReducedMotion } from '@/hooks/use-media'

type CursorState = 'default' | 'hover' | 'press'

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const finePointer = useFinePointer()
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (!finePointer || reducedMotion) return

    const dot = dotRef.current
    const ring = ringRef.current
    const label = labelRef.current
    if (!dot || !ring || !label) return

    let state: CursorState = 'default'
    let x = -100
    let y = -100
    let rx = -100
    let ry = -100
    let raf = 0
    let visible = false

    const applyState = () => {
      const scale = state === 'hover' ? 1.7 : state === 'press' ? 0.8 : 1
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%) scale(${scale})`
    }

    const onMove = (e: MouseEvent) => {
      x = e.clientX
      y = e.clientY
      dot.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`
      if (!visible) {
        visible = true
        dot.style.opacity = '1'
        ring.style.opacity = '1'
      }
    }

    const loop = () => {
      rx += (x - rx) * 0.16
      ry += (y - ry) * 0.16
      applyState()
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    const onOver = (e: MouseEvent) => {
      const t = (e.target as HTMLElement).closest(
        'a, button, [role="button"], [data-cursor-label]',
      ) as HTMLElement | null
      if (t) {
        const l = t.dataset.cursorLabel
        label.textContent = l ?? ''
        label.style.display = l ? 'block' : 'none'
        state = 'hover'
      } else {
        label.textContent = ''
        label.style.display = 'none'
        state = 'default'
      }
      applyState()
    }
    const onDown = () => {
      state = 'press'
      applyState()
    }
    const onUp = () => {
      state = 'default'
      applyState()
    }
    const onLeave = () => {
      visible = false
      dot.style.opacity = '0'
      ring.style.opacity = '0'
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover', onOver)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    document.documentElement.addEventListener('mouseleave', onLeave)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      document.documentElement.removeEventListener('mouseleave', onLeave)
    }
  }, [finePointer, reducedMotion])

  return (
    <>
      <div
        ref={dotRef}
        className="bg-crimson pointer-events-none fixed top-0 left-0 z-[100] h-2 w-2 rounded-full opacity-0"
        aria-hidden="true"
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[100] flex h-10 w-10 items-center justify-center rounded-full opacity-0"
        style={{ border: '1.5px solid var(--color-crimson)' }}
        aria-hidden="true"
      >
        <span
          ref={labelRef}
          className="text-crimson hidden text-[8px] font-semibold tracking-[0.2em] uppercase"
          style={{ fontFamily: 'var(--font-schibsted)' }}
        />
      </div>
    </>
  )
}
