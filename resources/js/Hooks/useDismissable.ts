import { useCallback, useState } from 'react'

export const useDismissable = (key: string): [boolean, () => void] => {
  const [isDismissed, setIsDismissed] = useState(
    localStorage.getItem(key) === '1',
  )

  const dismiss = useCallback(() => {
    localStorage.setItem(key, '1')
    setIsDismissed(true)
  }, [key])

  return [isDismissed, dismiss]
}
