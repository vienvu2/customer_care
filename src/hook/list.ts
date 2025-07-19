import { ApiResponse, UserCreate } from "@/lib/types"
import axios from "axios"
import { useEffect, useState } from "react"

const useList = <T> (source: string) => {
    const [list, setList] = useState<T[]>([])
    const [total, setTotal] = useState(0)
    const [loading, setLoading] = useState(true)

    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(10)
    const fetch = async (
    ) => {

        try {
            const query = {
                page: page.toString(),
                limit: limit.toString(),
            }
            const response = await axios.get("/api/" + source + '?' + new URLSearchParams(query).toString())
            console.log("Response:", response.data.data)
            setTotal(response.data.total)
            setList(response.data.data as T[])

        } catch (error) {
            console.error("Failed to fetch users:", error)
        } finally {
            setLoading(false)
        }
    }


    useEffect(() => {
        fetch()
    }, [page, limit])

    const refetch = () => {
        setLoading(true)
        fetch()
    }


    return {
        fetch,
        refetch,
        list,
        loading,
        total,
        page,
        limit,
        setPage,
        setLimit,
    }
}

export default useList