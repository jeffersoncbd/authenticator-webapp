import { Check, Copy } from "lucide-react"
import { useEffect, useState } from "react"
import { twMerge } from "tailwind-merge"

interface Properties {
  reference: string
  children: React.ReactNode
}

const CopyToClipBoard: React.FC<Properties> = (properties) => {
  const [value, setValue] = useState<null | string>(null)

  useEffect(() => {
    if (value !== null) {
      void navigator.clipboard.writeText(value)
      setTimeout(() => {
        setValue(null)
      }, 1000)
    }
  }, [value])

  return (
    <button
      type="button"
      className={twMerge(
        "bg-white bg-opacity-0 text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white",
        "flex gap-2 justify-center items-center",
        "cursor-pointer text-[10px] min-[380px]:text-sm"
      )}
      onClick={(e) => {
        e.stopPropagation()
        e.preventDefault()
        setValue(properties.reference)
      }}
    >
      {properties.children} {value !== properties.reference
        ? <Copy size={16} />
        : <Check size={16} />}
    </button>
  )
}

export default CopyToClipBoard
