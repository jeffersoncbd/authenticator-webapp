'use client'

import { usePathname, useRouter } from "@/i18n/routing"
import { X, Zap } from "lucide-react"
import { useTranslations } from "next-intl"
import { twMerge } from "tailwind-merge"
import { montserratThin } from "./typography/fonts"
import { H4 } from "./typography/headers"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

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

    const menus: Record<Path, string> = {
        dashboard: t("dashboard"),
        applications: t('applications'),
        logs: t("logs")
    }

    return (
        <>
            {properties.open && (
                <div
                    className="bg-black opacity-90 absolute top-0 left-0 right-0 bottom-0 z-40"
                    onClick={() => properties.onClose()}
                />
            )}
            <Card className={twMerge(
                "w-full max-w-[280px] h-[calc(100vh-2rem)]",
                "absolute z-50",
                properties.open ? 'translate-x-0' : '-translate-x-[calc(100%+2.5rem)]',
                'transition ease-in-out duration-300'
            )} onClick={(e) => e.stopPropagation()}>
                <CardHeader>
                    <CardTitle className="flex justify-between">
                        <H4 className={`${montserratThin.className} flex items-center`}>
                            Auth
                            <Zap size="24px" strokeWidth="1px" className="stroke-yellow-500 dark:stroke-yellow-300" />
                            Thor
                        </H4>

                        <Button variant="outline" size="icon" onClick={() => properties.onClose()}>
                            <X />
                        </Button>
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                    {paths.map((path) => (
                        <Button
                            key={path}
                            variant={pathName.includes(path) ? 'default' : 'outline'}
                            className={pathName.includes(path) ? 'cursor-default' : 'cursor-pointer'}
                            onClick={() => {
                                router.push(path)
                                properties.onClose()
                            }}
                        >
                            {menus[path]}
                        </Button>
                    ))}
                </CardContent>
            </Card>
        </>
    )
}

export default MenuDrawer