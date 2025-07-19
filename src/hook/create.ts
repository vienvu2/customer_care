import { ApiResponse, UserCreate } from "@/lib/types"
import axios from "axios"
import { useEffect, useState } from "react"

const useCreate = <T> (source: string) => {

    const [saving, setSaving] = useState(false)
    const [error, setError] = useState<string | null>(null)


    const create = async (data: Partial<T>, onSuccess: (d: T) => void,
        onError?: (error: string) => void
    ) => {
        try {
            setSaving(true)
            setError(null)
            const response = await axios.post("/api/" + source, {
                ...data,
            })
            setSaving(false)

            const result: ApiResponse<T> = response.data
            onSuccess(result.data as T)
            return result

        } catch (error) {
            console.error("Failed to create user:", error)
            setSaving(false)
            setError(error instanceof Error ? error.message : 'Unknown error')
            if (onError) {
                onError(error instanceof Error ? error.message : 'Unknown error')
            }
            return null
        }
    }

    const createMany = async (data: Partial<T>[], onSuccess: (d: T[]) => void,
        onError?: (error: string) => void
    ) => {
        try {
            setSaving(true)
            setError(null)
            const response = await axios.post("/api/" + source + "/import", data)
            setSaving(false)
            const result: ApiResponse<T[]> = response.data
            onSuccess(result.data as T[])
            return result
        } catch (error) {
            console.error("Failed to create users:", error)
            setSaving(false)
            setError(error instanceof Error ? error.message : 'Unknown error')
        }
    }

    return {
        create,
        saving,
        error,
        createMany
    }
}

export default useCreate