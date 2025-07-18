"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import styles from "./page.module.css"
import { ApiResponse } from "@/lib/types"
import { User } from "@prisma/client"
import { useRouter } from "next/navigation"

export default function Home() {
  const route = useRouter()
  useEffect(() => {
    route.push("/dashboard")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return <div>Đang phát triển tính năng Dashboard cho người dùng.</div>
}
