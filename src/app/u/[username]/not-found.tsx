// @ts-nocheck
// src/app/u/[username]/not-found.tsx
import Link from 'next/link'

export default function CreatorNotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4"
      style={{ background: '#0e0c0a', color: '#f0ece4' }}>
      <p className="text-6xl mb-4">🏚</p>
      <h1 className="text-3xl font-semibold mb-2"
        style={{ fontFamily: 'Playfair Display, serif' }}>
        This town doesn&apos;t exist
      </h1>
      <p className="text-sm mb-6" style={{ color: '#9c8878' }}>
        The creator you&apos;re looking for hasn&apos;t set up their town yet — or the username is wrong.
      </p>
      <Link
        href="/"
        className="px-5 py-2.5 rounded-xl text-sm font-semibold"
        style={{ background: '#f4732a', color: '#fff' }}
      >
        Back to Kreatown
      </Link>
    </div>
  )
}
