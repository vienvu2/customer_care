import { ApiResponse, UserCreate } from "@/lib/types"
import { User } from "@prisma/client"
import { useState } from "react"

const useList = () => {
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState(true)
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

    const createUser = async (data: UserCreate) => {
        try {
            const response = await fetch("/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })

            const result: ApiResponse<User> = await response.json()

            if (result.success && result.data) {
                setUsers((prev) => [...prev, result.data!])
            }
        } catch (error) {
            console.error("Failed to create user:", error)
        }
    }
    return {
        fetchUsers,
        createUser,
        users,
        loading,
    }
}

export default useList