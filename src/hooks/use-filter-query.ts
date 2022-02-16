import { InputHTMLAttributes, useCallback, useEffect, useState } from 'react'
import qs from 'query-string'

export const useFilterQuery = (key: string, initial: string[] = []) => {
  const [activeQueries, setActiveQuery] = useState<string[]>(initial)
  const [isActive, setIsActive] = useState(activeQueries.length > 0)
  const [queryString, setQueryString] = useState(
    qs.stringify({
      [key]: initial
    })
  )

  const add = (toAdd: string) =>
    setActiveQuery((current) => [...current, toAdd])

  const remove = (toRemove: string) =>
    setActiveQuery((current) => current.filter((i) => i !== toRemove))

  const exists = (query: string) => activeQueries.includes(query)

  const mutate = (value: string) => {
    switch (exists(value)) {
      case true:
        remove(value)
        break
      case false:
        add(value)
        break
    }
  }

  const clearAll = useCallback(() => {
    setActiveQuery(() => [])
  }, [])

  useEffect(() => {
    setQueryString(() =>
      activeQueries.length < 1
        ? ''
        : '&' +
          qs.stringify({
            [key]: activeQueries
          })
    )
  }, [activeQueries, key])

  const setProps = (key: string): InputHTMLAttributes<HTMLInputElement> => {
    return {
      onChange: () => mutate(key),
      value: key,
      checked: activeQueries.includes(key)
    }
  }

  useEffect(() => {
    setIsActive(() => activeQueries.length > 0)
  }, [activeQueries])

  return {
    activeQueries,
    mutate,
    setProps,
    isActive,
    clearAll,
    queryString
  } as const
}
