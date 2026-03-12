'use client'

import { useUser } from '@/hooks'
import DashboardOverview from '@/components/dashboard/DashboardOverview'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function DashboardPage() {
  const { user, loading } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) router.push('/auth/login')
  }, [user, loading, router])

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-brand-muted font-bold text-sm animate-pulse">
          ⏳ Loading your town...
        </p>
      </div>
    )
  }

  return <DashboardOverview profile={user} />
}
