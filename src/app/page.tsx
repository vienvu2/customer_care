"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { AuthGuard } from "@/components/auth/AuthGuard"

export default function Home() {
  const router = useRouter()
  
  useEffect(() => {
    router.push("/dashboard")
  }, [router])

  return (
    <AuthGuard>
      <div>Redirecting to dashboard...</div>
    </AuthGuard>
  )
}
