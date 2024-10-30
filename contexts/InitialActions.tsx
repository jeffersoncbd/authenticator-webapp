'use client'

import { useApiService } from "@/services/api"
import { useStoreActions } from "@/store"
import { useEffect } from "react"

const InitialActions: React.FC = () => {
    const apiService = useApiService()
    const action = useStoreActions()

    useEffect(() => {
        action({ type: 'update-applications', payload: apiService })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return null
}

export default InitialActions