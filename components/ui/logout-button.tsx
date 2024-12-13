'use client'

import * as React from "react"
import { Button } from "@/components/ui/button"

export function LogoutButton() {
  const [isLoading, setIsLoading] = React.useState(false)

  const handleLogout = async () => {
    if (!confirm('Are you sure you want to logout?')) return

    try {
      setIsLoading(true)
      
      // Call logout API
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
        cache: 'no-store'
      })

      if (!response.ok) throw new Error('Logout failed')

      // Force a hard redirect to clear all state
      document.cookie = 'session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
      document.cookie = 'securesession=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
      window.location.href = '/auth/login'
      
    } catch (error) {
      console.error('Logout failed:', error)
      alert('Failed to logout. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button 
      variant="ghost" 
      className="w-full justify-start"
      onClick={handleLogout}
      disabled={isLoading}
    >
      {isLoading ? 'Logging out...' : 'Logout'}
    </Button>
  )
} 