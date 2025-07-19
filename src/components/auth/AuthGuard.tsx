"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store/auth"

interface AuthGuardProps {
  children: React.ReactNode
  requireAuth?: boolean
  redirectTo?: string
  allowedRoles?: string[]
}

export const AuthGuard = ({
  children,
  requireAuth = true,
  redirectTo = "/login",
  allowedRoles,
}: AuthGuardProps) => {
  const { isAuthenticated, isLoading, user } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading) {
      if (requireAuth && !isAuthenticated) {
        router.push(redirectTo)
        return
      }

      if (!requireAuth && isAuthenticated) {
        router.push("/dashboard")
        return
      }

      // Check role-based access
      if (requireAuth && isAuthenticated && allowedRoles && user) {
        if (!allowedRoles.includes(user.role)) {
          router.push("/unauthorized")
          return
        }
      }
    }
  }, [
    isAuthenticated,
    isLoading,
    requireAuth,
    redirectTo,
    router,
    allowedRoles,
    user,
  ])

  // Show loading while checking auth
  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        Loading...
      </div>
    )
  }

  // Don't render children if auth check fails
  if (requireAuth && !isAuthenticated) {
    return null
  }

  if (!requireAuth && isAuthenticated) {
    return null
  }

  // Check role access
  if (requireAuth && isAuthenticated && allowedRoles && user) {
    if (!allowedRoles.includes(user.role)) {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          Bạn không có quyền truy cập trang này
        </div>
      )
    }
  }

  return <>{children}</>
}
