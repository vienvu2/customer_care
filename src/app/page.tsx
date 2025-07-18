"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function Home() {
  const route = useRouter()
  useEffect(() => {
    route.push("/dashboard")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return <div>Đang phát triển tính năng Dashboard cho người dùng.</div>
}
