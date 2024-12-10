'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export function DeleteAccountButton() {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm('Are you sure you want to delete your account? This action cannot be undone.')
    
    if (!confirmed) return

    try {
      setIsDeleting(true)
      const response = await fetch('/api/user/delete', {
        method: 'DELETE',
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to delete account')
      }

      router.push('/auth/login')
    } catch (error: unknown) {
      console.error('Error deleting account:', error)
      const message = error instanceof Error ? error.message : 'Failed to delete account'
      alert(`Failed to delete account: ${message}`)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <button
      onClick={handleDeleteAccount}
      disabled={isDeleting}
      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors disabled:opacity-50"
    >
      {isDeleting ? 'Deleting...' : 'Delete Account'}
    </button>
  )
} 