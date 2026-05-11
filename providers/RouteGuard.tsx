'use client'

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAppSelector } from '@/store/hooks'

export default function RouteGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAppSelector((state) => state.auth)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (loading) return

    // Not logged in → block protected pages
    if (!user && pathname !== '/login' && pathname !== '/signup') {
      router.replace('/login')
      return
    }

    // Logged in → block auth pages
    if (user && (pathname === '/login' || pathname === '/signup')) {
      router.replace('/')
      return
    }

  }, [user, loading, pathname, router])

  if (loading) {
    return <div className="grid place-items-center min-h-screen">Loading...</div>
  }

  // Prevent flicker
  if (!user && pathname !== '/login' && pathname !== '/signup') {
    return null
  }

  return <>{children}</>
}