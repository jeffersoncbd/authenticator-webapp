import { Link } from "@/i18n/routing"
import { H2 } from "./typography/headers"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "./ui/breadcrumb"

interface BreadcrumbData {
  label: string
  href?: string
}

interface Properties {
  children?: React.ReactNode
  title: string
  breadcrumb?: BreadcrumbData[]
}

const PageContainer: React.FC<Properties> = (properties) => {
  return (
    <div className="flex flex-col gap-4 px-4 w-full max-w-[1000px] mx-auto">
      {properties.breadcrumb !== undefined && (
        <Breadcrumb>
          <BreadcrumbList>
            {properties.breadcrumb.map((item, i) => (
              <>
                <BreadcrumbItem key={item.label}>
                  {item.href === undefined ? item.label : (
                    <Link href={item.href} className="hover:text-white">
                      {item.label}
                    </Link>
                  )}
                </BreadcrumbItem>
                {properties.breadcrumb?.length !== i + 1 && (
                  <BreadcrumbSeparator key={`${item.label}-separator`} />
                )}
              </>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      )}
      <H2 className="text-center">{properties.title}</H2>

      {properties.children}
    </div>
  )
}

export default PageContainer

