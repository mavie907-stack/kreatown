// src/app/layout.tsx
import type { Metadata } from 'next'
import { Playfair_Display, DM_Sans, DM_Mono } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-dm-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'KreaTown — Where Creators Belong',
  description: 'Build your world. Grow your empire. The creator platform where your audience builds your home.',
  keywords: ['creator platform', 'membership', 'KreaTown', 'Patreon alternative'],
  openGraph: {
    title: 'KreaTown',
    description: 'Build your world. Grow your empire.',
    images: ['/og-image.jpg'],
    type: 'website',
  },
  // PWA
  manifest: '/manifest.json',
  themeColor: '#f4732a',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'KreaTown',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable} ${dmMono.variable}`}>
      <body className="font-sans bg-cream text-brown antialiased">
        {children}
      </body>
    </html>
  )
}
