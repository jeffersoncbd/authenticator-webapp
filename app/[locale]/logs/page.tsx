'use client'

import { H2 } from "@/components/typography/headers"
import { useTranslations } from "next-intl"

const Logs: React.FC = () => {
    const t = useTranslations('pages.logs')

    return <H2 className="text-center">{t('title')}</H2>
}

export default Logs
