import { Hero } from '@/components/sections/hero'
import { About } from '@/components/sections/about'
import { Works } from '@/components/sections/works'
import { CaseStudies } from '@/components/sections/case-studies'
import { Skills } from '@/components/sections/skills'
import { Experience } from '@/components/sections/experience'
import { Contact } from '@/components/sections/contact'

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Works />
      <CaseStudies />
      <Skills />
      <Experience />
      <Contact />
    </>
  )
}