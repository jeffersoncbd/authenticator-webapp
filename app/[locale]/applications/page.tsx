'use client'

import { H2 } from "@/components/typography/headers"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useStoreSelects } from "@/store"
import { Check, Copy } from "lucide-react"
import { useTranslations } from "next-intl"
import { useEffect, useState } from "react"

const Applications: React.FC = () => {
    const t = useTranslations('pages.applications')
    const applications = useStoreSelects((store) => store.applications.list)

    const [copyId, setCopyId] = useState<null | string>(null)

    useEffect(() => {
        if (copyId !== null) {
            void navigator.clipboard.writeText(copyId)
            setTimeout(() => {
                setCopyId(null)
            }, 1000)
        }
    }, [copyId])

    return (
        <div className="flex flex-col gap-4 px-4 w-full max-w-[1000px] mx-auto">
            <H2 className="text-center">{t('title')}</H2>

            <Button className="w-full min-[400px]:w-[200px] min-[400px]:self-end">Adicionar</Button>

            {applications.map((application) => (
                <Card key={application.id} className="py-0">
                    <CardHeader className="py-2">
                        <CardTitle className="text-center">
                            {application.name}
                        </CardTitle>
                        <CardDescription className="flex justify-center">
                            <span className="cursor-pointer flex items-center gap-2 text-[10px] min-[380px]:text-sm" onClick={() => setCopyId(application.id)}>
                                {application.id} {copyId === null
                                    ? <Copy size={16} />
                                    : <Check size={16} />}
                            </span>
                        </CardDescription>
                    </CardHeader>
                </Card>
            ))}
        </div>
    )
}

export default Applications
