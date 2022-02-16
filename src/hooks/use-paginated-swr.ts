import { useEffect, useState } from 'react'
import useSwr from 'swr'
import { fetcher } from '../fetcher'

interface Pagination {
  next: number
  previous: number
  currentPage: number
  pageCount: number
}

export const usePaginatedSwr = <T>(url: string) => {
  const { data: response, error } = useSwr(url, fetcher)
  const [data, setData] = useState<T[]>()
  const [pagination, setPagination] = useState<Pagination>({
    next: 0,
    previous: 0,
    pageCount: 1,
    currentPage: 1
  })

  useEffect(() => {
    setPagination(() => {
      return response?.pagination ? response.pagination : pagination
    })
  }, [response, pagination])

  useEffect(() => {
    setData(() => (response?.data ? response.data : data))
  }, [response, data])

  return { data, error, pagination: pagination as Pagination } as const
}
