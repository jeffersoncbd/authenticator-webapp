'use client'

import { usePathname, useRouter } from "@/i18n/routing"
import { X, Zap } from "lucide-react"
import { useTranslations } from "next-intl"
import { twMerge } from "tailwind-merge"
import { montserratThin } from "./typography/fonts"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { useContext } from "react"
import { SessionContext } from "@/contexts/Session"

const paths = ['dashboard', 'applications', 'logs'] as const
type Path = typeof paths[number]

interface Properties {
  open: boolean
  onClose: () => void
}

const MenuDrawer: React.FC<Properties> = (properties) => {
  const router = useRouter()
  const pathName = usePathname()

  const t = useTranslations('components.menuDrawer')

  const { endSession } = useContext(SessionContext)

  const menus: Record<Path, string> = {
    dashboard: t("dashboard"),
    applications: t('applications'),
    logs: t("logs")
  }

  return (
    <>
      {properties.open && (
        <div
          className="bg-black opacity-30 dark:opacity-90 absolute top-0 left-0 right-0 bottom-0 z-40"
          onClick={() => properties.onClose()}
        />
      )}
      <Card className={twMerge(
        "w-full max-w-[240px] h-[calc(100vh-2rem)]",
        "absolute z-50",
        properties.open ? 'translate-x-0' : '-translate-x-[calc(100%+2.5rem)]',
        'transition ease-in-out duration-300',
        'flex flex-col'
      )} onClick={(e) => e.stopPropagation()}>
        <CardHeader>
          <CardTitle className="flex justify-between">
            <span className={`${montserratThin.className} flex items-center`}>
              Auth
              <Zap size="24px" strokeWidth="1px" className="stroke-yellow-500 dark:stroke-yellow-300" />
              Thor
            </span>

            <Button variant="outline" size="icon" onClick={() => properties.onClose()}>
              <X />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col gap-4">
          <div className="flex-1 flex flex-col gap-4">
            {paths.map((path) => (
              <Button
                key={path}
                variant={pathName.includes(path) ? 'default' : 'outline'}
                className={pathName.includes(path) ? 'cursor-default' : 'cursor-pointer'}
                onClick={() => {
                  router.push(`/${path}`)
                  properties.onClose()
                }}
              >
                {menus[path]}
              </Button>
            ))}
          </div>
          <Button
            className="bg-red-600 hover:bg-red-500 dark:bg-red-600 dark:hover:bg-red-700"
            onClick={endSession}
          >
            {t('logoutButton')}
          </Button>
        </CardContent>
      </Card>
    </>
  )
}

export default MenuDrawer
