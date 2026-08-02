'use client'

import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useGsap() {
  return gsap
}

let revealCtx: gsap.Context | null = null
let revealHolders = 0

function setupReveals(): gsap.Context {
  if (revealCtx) return revealCtx

  revealCtx = gsap.context(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const fadeEls = gsap.utils.toArray<HTMLElement>('.reveal-fade')
    fadeEls.forEach((el) => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      })
    })

    const maskEls = gsap.utils.toArray<HTMLElement>('.reveal-mask')
    maskEls.forEach((el) => {
      gsap.to(el.querySelector('.reveal-mask-inner'), {
        y: 0,
        duration: 1.1,
        ease: 'power4.out',
        scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      })
    })
  })

  return revealCtx
}

export function useReveal<T extends HTMLElement>() {
  const scope = useRef<T>(null)

  useLayoutEffect(() => {
    setupReveals()
    revealHolders++

    return () => {
      revealHolders--
      if (revealHolders === 0 && revealCtx) {
        revealCtx.revert()
        revealCtx = null
      }
    }
  }, [])

  return scope
}
