'use client'

import { H3 } from "@/components/typography/headers"
import { useTranslations } from "next-intl"

const Logs: React.FC = () => {
    const t = useTranslations('pages.logs')

    return <H3 className="text-center mt-4">{t('title')}</H3>
}

export default Logs
