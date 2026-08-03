'use client'

import { useEffect, useRef } from 'react'

const INK = [46, 33, 21]
const INDIGO = [35, 45, 79]

type Cell = { x: number; y: number }

export function BlueprintGrid({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf = 0
    let running = false
    let visible = true
    let width = 0
    let height = 0
    let dpr = 1
    let spacing = 96
    let cols = 0
    let rows = 0
    const cells: Cell[] = []

    const setup = () => {
      const rect = canvas.getBoundingClientRect()
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = rect.width
      height = rect.height
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      spacing = width < 640 ? 56 : width < 1024 ? 72 : 96
      cols = Math.floor(width / spacing) + 2
      rows = Math.floor(height / spacing) + 2
      cells.length = 0
      for (let i = 0; i <= cols; i++) {
        for (let j = 0; j <= rows; j++) {
          cells.push({ x: i * spacing, y: j * spacing })
        }
      }
    }

    const lineAlpha = (phase: number, t: number, speed: number) => {
      const p = (t * speed + phase) % 1
      const head = p * 1.05
      const edge = Math.max(0, 1 - head * 6)
      return edge * 0.28
    }

    const draw = (t: number) => {
      ctx.clearRect(0, 0, width, height)

      for (let i = 0; i < cols; i++) {
        const x = i * spacing
        const a = lineAlpha(i * 0.17, t, 0.05)
        if (a > 0.004) {
          ctx.strokeStyle = `rgba(${INK[0]},${INK[1]},${INK[2]},${a})`
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(x, 0)
          ctx.lineTo(x, height)
          ctx.stroke()
        }
      }

      for (let j = 0; j < rows; j++) {
        const y = j * spacing
        const a = lineAlpha(j * 0.23 + 0.4, t, 0.045)
        if (a > 0.004) {
          ctx.strokeStyle = `rgba(${INK[0]},${INK[1]},${INK[2]},${a})`
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(0, y)
          ctx.lineTo(width, y)
          ctx.stroke()
        }
      }

      const pulseA = (Math.sin(t * 0.9) + 1) / 2
      for (let i = 0; i < cells.length; i++) {
        const c = cells[i]
        const seed = (i * 2654435761) >>> 0
        const pulse = Math.sin(t * 0.7 + seed * 0.00001)
        if (pulse > 0.985) {
          const r = 1.5 + pulseA * 1.2
          ctx.fillStyle = `rgba(${INDIGO[0]},${INDIGO[1]},${INDIGO[2]},0.5)`
          ctx.beginPath()
          ctx.arc(c.x, c.y, r, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      const nodeCount = Math.min(cells.length, width < 640 ? 40 : 90)
      for (let i = 0; i < nodeCount; i++) {
        const c = cells[i * Math.floor(cells.length / nodeCount) + 1]
        if (!c) continue
        const seed = (i * 2246822519) >>> 0
        const a = (Math.sin(t * 0.5 + seed * 0.00001) + 1) / 2
        if (a > 0.82) {
          ctx.fillStyle = `rgba(${INK[0]},${INK[1]},${INK[2]},${(a - 0.82) * 1.4})`
          ctx.beginPath()
          ctx.arc(c.x, c.y, 1.4, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      const xEdge = Math.max(0, 1 - t * 0.15)
      if (xEdge > 0) {
        ctx.strokeStyle = `rgba(${INDIGO[0]},${INDIGO[1]},${INDIGO[2]},${xEdge * 0.35})`
        ctx.lineWidth = 2
        ctx.strokeRect(0, 0, width, height)
        ctx.strokeRect(14, 14, width - 28, height - 28)
      }

      if (reduced) {
        drawStatic()
        return
      }

      raf = requestAnimationFrame(draw)
    }

    const drawStatic = () => {
      ctx.clearRect(0, 0, width, height)
      ctx.strokeStyle = `rgba(${INK[0]},${INK[1]},${INK[2]},0.14)`
      ctx.lineWidth = 1
      for (let i = 0; i < cols; i++) {
        const x = i * spacing
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, height)
        ctx.stroke()
      }
      for (let j = 0; j < rows; j++) {
        const y = j * spacing
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(width, y)
        ctx.stroke()
      }
    }

    const start = () => {
      if (running) return
      running = true
      raf = requestAnimationFrame(draw)
    }

    const stop = () => {
      running = false
      cancelAnimationFrame(raf)
    }

    const onVisibility = (entries: IntersectionObserverEntry[]) => {
      visible = entries[0]?.isIntersecting ?? true
      if (visible) start()
      else stop()
    }

    setup()
    if (reduced) {
      drawStatic()
    } else {
      start()
    }

    const observer = new IntersectionObserver(onVisibility, { threshold: 0 })
    observer.observe(canvas)

    let resizeRaf = 0
    const onResize = () => {
      cancelAnimationFrame(resizeRaf)
      resizeRaf = requestAnimationFrame(() => {
        setup()
        if (reduced) drawStatic()
      })
    }
    window.addEventListener('resize', onResize, { passive: true })

    return () => {
      stop()
      cancelAnimationFrame(resizeRaf)
      observer.disconnect()
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden="true"
      style={{ width: '100%', height: '100%' }}
    />
  )
}
