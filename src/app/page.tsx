"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function Home() {
  const route = useRouter()
  useEffect(() => {
    route.push("/dashboard")
  }, [])
  return <div>   phát triển tính năng Dashboard cho người dùng.</div>
}
