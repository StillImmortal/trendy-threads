import { useCallback } from "react"
import { ReadonlyURLSearchParams } from "next/navigation"

const useCreateQueryString = (searchParams: ReadonlyURLSearchParams) => {
  return useCallback(
    (params: Record<string, string | number | null>) => {
      const newSearchParams = new URLSearchParams(searchParams?.toString())

      for (const [key, value] of Object.entries(params)) {
        if (value === null) newSearchParams.delete(key)
        else newSearchParams.set(key, String(value))
      }

      return newSearchParams.toString()
    },
    [searchParams]
  )
}

export default useCreateQueryString
