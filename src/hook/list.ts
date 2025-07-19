import { ApiResponse, UserCreate } from "@/lib/types"
import axios from "axios"
import { useEffect, useState } from "react"

const useList = <T> (source: string) => {
    const [list, setList] = useState<T[]>([])
    const [total, setTotal] = useState(0)
    const [loading, setLoading] = useState(true)
    const fetch = async (
        page: number = 1,
        limit: number = 10
    ) => {
        try {
            const query = {
                page: page.toString(),
                limit: limit.toString(),
            }
            const response = await axios.get("/api/" + source + '?' + new URLSearchParams(query).toString())
            console.log("Response:", response.data.data)
            setList(response.data.data as T[])

        } catch (error) {
            console.error("Failed to fetch users:", error)
        } finally {
            setLoading(false)
        }
    }


    useEffect(() => {
        fetch()
    }, [])


    return {
        fetch,
        list,
        loading,
        total,
    }
}

export default useList