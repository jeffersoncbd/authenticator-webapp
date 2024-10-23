'use client'

import { Link, Locale, locales, localesData } from "@/i18n/routing"
import Image from "next/image"
import { usePathname as useNavigationPathname } from "next/navigation"
import { Button } from "./ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"

const LocaleToggle: React.FC = () => {
    const locale = useNavigationPathname().split('/')[1] as Locale

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                    <Image src={localesData[locale].flag} alt={locale} width={24} height={24} />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {locales.map((locale) => (
                    <Link key={locale} href="/" locale={locale}>
                        <DropdownMenuItem >
                            <Image src={localesData[locale].flag} alt={locale} width={20} height={20} /> {localesData[locale].label}
                        </DropdownMenuItem>
                    </Link>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default LocaleToggle