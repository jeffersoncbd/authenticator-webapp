import { Check, Copy } from "lucide-react"
import { useEffect, useState } from "react"

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
    <p
      className="flex gap-2 justify-center items-center cursor-pointer text-[10px] min-[380px]:text-sm"
      onClick={(e) => {
        e.stopPropagation()
        setValue(properties.reference)
      }}
    >
      {properties.children} {value !== properties.reference
        ? <Copy size={16} />
        : <Check size={16} />}
    </p>
  )
}

export default CopyToClipBoard
