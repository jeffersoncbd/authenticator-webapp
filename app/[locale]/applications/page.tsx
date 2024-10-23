'use client'

import { H3 } from "@/components/typography/headers"
import { useTranslations } from "next-intl"

const Applications: React.FC = () => {
    const t = useTranslations('pages.applications')

    return <H3 className="text-center mt-4">{t('title')}</H3>
}

export default Applications
