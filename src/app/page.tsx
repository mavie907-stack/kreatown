// @ts-nocheck
import type { Metadata } from 'next'
import LandingPage from '@/components/layout/LandingPage'

export const metadata: Metadata = {
  title: 'KreaTown — Where Creators Belong',
  description: 'Build your membership. Own your audience.',
}

export default function HomePage() {
  return <LandingPage />
}
