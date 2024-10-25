'use client'

import { H2 } from "@/components/typography/headers"
import { useTranslations } from "next-intl"

const Dashboard: React.FC = () => {
    const t = useTranslations('pages.dashboard')

    return (
        <div className="flex flex-col gap-4 px-4">
            <H2 className="text-center">{t('title')}</H2>
        </div>
    )
}

export default Dashboard
