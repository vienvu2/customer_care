"use client"

import { useEffect } from "react"
import { useAuthStore } from "@/store/auth"

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { setLoading, login, logout, setToken } = useAuthStore()

  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true)
      
      try {
        // Check if user has valid token
        const token = localStorage.getItem('auth-token')
        
        if (token) {
          // Verify token with API
          const response = await fetch('/api/auth/verify', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
          
          if (response.ok) {
            const result = await response.json()
            if (result.success && result.data) {
              login(result.data, token)
            } else {
              // Token invalid, remove it
              localStorage.removeItem('auth-token')
              logout()
            }
          } else {
            // Token invalid, remove it
            localStorage.removeItem('auth-token')
            logout()
          }
        } else {
          logout()
        }
      } catch (error) {
        console.error('Auth check failed:', error)
        logout()
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [setLoading, login, logout, setToken])

  return <>{children}</>
}
