'use client'

import { useToast } from "@/hooks/use-toast";
import { usePathname, useRouter } from "@/i18n/routing";
import React, { createContext, useContext, useEffect, useState } from "react";

interface ContextProperties {
    startSession: (token: string) => void
    endSession: () => void
    token: string | null
    authenticated: boolean
}

export const SessionContext = createContext<ContextProperties>({
    startSession: () => null,
    endSession: () => null,
    token: null,
    authenticated: false
})

export const SessionChecker: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { token } = useContext(SessionContext)
    const pathName = usePathname()

    if (!Boolean(token) && pathName !== '/') {
        return (
            <div className="flex-1 flex justify-center items-center">
                carregando...
            </div>
        )
    }

    return children
}

const SessionContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const router = useRouter()
    const pathName = usePathname()
    const { toast } = useToast()

    const [token, setToken] = useState<null | string>()

    useEffect(() => {
        setToken(sessionStorage.getItem('token'))
    }, [])

    useEffect(() => {
        if (token !== undefined) {
            if (Boolean(token) && pathName === '/') {
                router.push('/dashboard')
            }
            if (!Boolean(token) && pathName !== '/') {
                router.replace('/')
            }
        }
    }, [token, router, pathName])

    const startSession = (token: string) => {
        setToken(token)
        sessionStorage.setItem('token', token)
        setTimeout(() => {
            toast({
                title: 'Sessão iniciada',
                style: { backgroundColor: "green" },
            });
        }, 300)
    }
    const endSession = () => {
        setToken(null)
        sessionStorage.removeItem('token')
    }

    return (
        <SessionContext.Provider value={{ token: token || null, startSession, authenticated: Boolean(token), endSession }}>
            {children}
        </SessionContext.Provider>
    )
}

export default SessionContextProvider
