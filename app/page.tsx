'use client'
import "./globals.css"
import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import GuestLanding from './components/pages/GuestLanding'

export default function Page() {
  const { user, loading } = useSelector((state: any) => state.auth)
  const router = useRouter()

  useEffect(() => {
    if (loading) return

    if (user) {
      router.replace('/admin-dashboard') // logged in → go dashboard
    }
  }, [user, loading, router])

  // While checking auth
  if (loading) {
    return (
      <div className="grid place-items-center min-h-screen">
        Loading...
      </div>
    )
  }

  // Not logged in → show landing
  return <GuestLanding />
}