import React, { HTMLAttributes } from "react"
import { twMerge } from 'tailwind-merge'

type Header = HTMLAttributes<HTMLHeadingElement>

export const H1: React.FC<Header> = (properties) => {
    return (
        <h1
            {...properties}
            className={twMerge(
                'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
                properties.className
            )}
        />
    )
}

export const H3: React.FC<Header> = (properties) => {
    return (
        <h3
            {...properties}
            className={twMerge(
                'scroll-m-20 text-2xl font-semibold tracking-tight',
                properties.className
            )}
        />
    )
}

export const H4: React.FC<Header> = (properties) => {
    return (
        <h4
            {...properties}
            className={twMerge(
                'scroll-m-20 text-xl font-semibold tracking-tight',
                properties.className
            )}
        />
    )
}