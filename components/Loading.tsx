'use client'

import { useTranslations } from "next-intl"
import { DetailedHTMLProps, HTMLAttributes } from "react"
import { twMerge } from "tailwind-merge"

const Loading: React.FC<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>> = ({ className, ...properties }) => {
    const t = useTranslations('components.loading')

    return (
        <div {...properties} className={twMerge('flex-1 flex justify-center items-center', className)}>
            {t('label')}...
        </div>
    )
}

export default Loading