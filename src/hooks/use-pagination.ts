import { useCallback, useState } from 'react'

export const usePagination = (currentPage: number = 1) => {
  const [page, setPage] = useState(currentPage)

  const nextPage = useCallback(() => {
    setPage((page) => page + 1)
  }, [])

  const previousPage = useCallback(() => {
    setPage((page) => Math.max(1, page - 1))
  }, [])

  return { nextPage, previousPage, page } as const
}
