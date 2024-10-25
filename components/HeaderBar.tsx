'use client'

import { SessionContext } from "@/contexts/Session"
import { Menu, Zap } from "lucide-react"
import { useContext, useState } from "react"
import LocaleToggle from "./LocaleToggle"
import MenuDrawer from "./MenuDrawer"
import { montserratThin } from "./typography/fonts"
import { H4 } from "./typography/headers"
import { Button } from "./ui/button"
import { ThemeToggle } from "./ui/theme-toggle"


const HeaderBar: React.FC = () => {
    const { authenticated } = useContext(SessionContext)

    const [openMenu, setOpenMenu] = useState(false)

    return (
        <div className={'p-4 flex gap-2'}>
            {authenticated && (
                <>
                    <div className="flex-1">
                        <Button variant="outline" size="icon" onClick={() => setOpenMenu(!openMenu)}>
                            <Menu />
                        </Button>
                    </div>
                    <H4 className={`${montserratThin.className} flex items-center`}>
                        Auth
                        <Zap size="24px" strokeWidth="1px" className="stroke-yellow-500 dark:stroke-yellow-300" />
                        Thor
                    </H4>
                    <MenuDrawer open={openMenu} onClose={() => setOpenMenu(false)} />
                </>
            )}
            <div className="flex-1 flex justify-end gap-2">
                <LocaleToggle />
                <ThemeToggle />
            </div>
        </div>
    )
}

export default HeaderBar
