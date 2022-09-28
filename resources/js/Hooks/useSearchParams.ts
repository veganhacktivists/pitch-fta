import { useMemo } from 'react'

export const useSearchParams = () => {
  return useMemo(() => {
    return new Proxy<any>(new URLSearchParams(window.location.search), {
      get: (searchParams: URLSearchParams, prop: string) =>
        searchParams.get(prop) || '',
    })
  }, [])
}
