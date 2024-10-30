'use client'

import { useTranslations } from "next-intl"
import { DetailedHTMLProps, HTMLAttributes } from "react"

const Loading: React.FC<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>> = (properties) => {
    const t = useTranslations('components.loading')

    return <div {...properties}>{t('label')}...</div>
}

export default Loading