'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { checkAuth } from '../../src/auth/config'
import AppShell from '../../src/components/AppShell'

export default function AppLayout({ children }) {
  const router = useRouter()
  
  useEffect(() => {
    const isAuthenticated = checkAuth()
    const hasCompletedOnboarding = localStorage.getItem('onboardingComplete') === 'true'
    
    if (!isAuthenticated) {
      router.push('/login')
      return
    }
    
    if (!hasCompletedOnboarding) {
      router.push('/onboarding')
      return
    }
  }, [router])

  return <AppShell>{children}</AppShell>
}
