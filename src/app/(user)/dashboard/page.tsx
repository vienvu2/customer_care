"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { User, ApiResponse } from "@/lib/types"
import styled from "styled-components"

export default function Home() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/users")
      const result: ApiResponse<User[]> = await response.json()

      if (result.success && result.data) {
        setUsers(result.data)
      }
    } catch (error) {
      console.error("Failed to fetch users:", error)
    } finally {
      setLoading(false)
    }
  }

  const createUser = async (name: string, email: string) => {
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email }),
      })

      const result: ApiResponse<User> = await response.json()

      if (result.success && result.data) {
        setUsers((prev) => [...prev, result.data!])
      }
    } catch (error) {
      console.error("Failed to create user:", error)
    }
  }

  return <Layout.Wrap>2132132</Layout.Wrap>
}

const Layout = {
  Wrap: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 20px;
  `,
}
