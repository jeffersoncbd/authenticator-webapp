import { H2 } from "./typography/headers"

interface Properties {
  children?: React.ReactNode
  title: string
}

const PageContainer: React.FC<Properties> = (properties) => {
  return (
    <div className="flex flex-col gap-4 px-4 w-full max-w-[1000px] mx-auto">
      <H2 className="text-center">{properties.title}</H2>

      {properties.children}
    </div>
  )
}

export default PageContainer

