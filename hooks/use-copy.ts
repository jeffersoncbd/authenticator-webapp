import { useEffect, useState } from "react"

type UseCopyReturn = [string | null, (value: string) => void]

export function useCopy(): UseCopyReturn {
  const [value, setValue] = useState<null | string>(null)

  useEffect(() => {
    if (value !== null) {
      void navigator.clipboard.writeText(value)
      setTimeout(() => {
        setValue(null)
      }, 1000)
    }
  }, [value])

  return [value, setValue]
}
