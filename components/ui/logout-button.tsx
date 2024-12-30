'use client'

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { LogOut } from "lucide-react" // Make sure to install lucide-react

export function LogoutButton() {
  const [isLoading, setIsLoading] = React.useState(false)

  const handleLogout = async () => {
    try {
      setIsLoading(true)
      
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
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="sm" className="w-full justify-start gap-2">
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to logout?</AlertDialogTitle>
          <AlertDialogDescription>
            You will be redirected to the login page.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleLogout}
            disabled={isLoading}
            className="bg-red-500 hover:bg-red-600"
          >
            {isLoading ? "Logging out..." : "Logout"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
} 