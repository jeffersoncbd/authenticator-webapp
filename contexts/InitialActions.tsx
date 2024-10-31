'use client'

import { useApiService } from "@/services/api"
import { useStoreActions } from "@/store"
import { useContext, useEffect } from "react"
import { SessionContext } from "./Session"

const InitialActions: React.FC = () => {
    const { authenticated } = useContext(SessionContext)
    const apiService = useApiService()
    const action = useStoreActions()

    useEffect(() => {
        if (authenticated) {
            action({ type: 'update-applications', payload: { apiService } })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authenticated])

    return null
}

export default InitialActions