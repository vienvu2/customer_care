import { ApiResponse, UserCreate } from "@/lib/types"
import axios from "axios"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

const useList = <T> (source: string) => {

    const router = useRouter()
    const searchParams = useSearchParams()
    const pageParam = searchParams.get('page') || '1'
    const limitParam = searchParams.get('limit') || '25'


    const [list, setList] = useState<T[]>([])
    const [total, setTotal] = useState(0)
    const [loading, setLoading] = useState(true)

    const fetch = async () => {
        try {
            const query = {
                page: pageParam,
                limit: limitParam,
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
    }, [source, pageParam, limitParam])


    const [page, setPage] = useState(parseInt(pageParam, 10))
    const [limit, setLimit] = useState(parseInt(limitParam, 10))

    useEffect(() => {
        router.push(`/${source}?page=${page}&limit=${limit}`)
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