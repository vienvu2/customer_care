import { ApiResponse, UserCreate } from "@/lib/types"
import axios from "axios"
import { useEffect, useState } from "react"

const useCreate = <T> (source: string) => {

    const [saving, setSaving] = useState(false)
    const [error, setError] = useState<string | null>(null)


    const create = async (data: T) => {
        try {
            setSaving(true)
            setError(null)
            const response = await axios.post("/api/" + source, {
                ...data,
            })
            setSaving(false)

            const result: ApiResponse<T> = response.data
            return result

        } catch (error) {
            console.error("Failed to create user:", error)
        }
    }

    return {
        create,
        saving,
        error,
    }
}

export default useCreate