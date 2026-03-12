import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Kreatown — Where Creators Belong',
  description: 'Your town. Your fans. Your money. Build memberships, share exclusive content, and own your audience.',
  keywords: ['creator platform', 'membership', 'exclusive content', 'creator economy'],
  openGraph: {
    title: 'Kreatown',
    description: 'Where creators belong.',
    url: 'https://kreatown.com',
    siteName: 'Kreatown',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=DM+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@400,500,700,800,900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-brand-cream font-body antialiased">
        {children}
      </body>
    </html>
  )
}