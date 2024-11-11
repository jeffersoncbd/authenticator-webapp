'use client'

import { useApiService } from "@/services/api"
import { useStoreActions, useStoreSelects } from "@/store"
import { useContext, useEffect } from "react"
import { SessionContext } from "@/contexts/Session"
import { usePathname } from "@/i18n/routing"
import Loading from "./Loading"

type Properties = { children: React.ReactNode }

const ApplicationLoader: React.FC<Properties> = ({ children }) => {
  const pathName = usePathname()
  const { token, authenticated } = useContext(SessionContext)
  const apiService = useApiService()
  const action = useStoreActions()
  const loading = useStoreSelects((s) => s.loading)

  useEffect(() => {
    if (authenticated) {
      action({ type: 'update-applications', payload: { apiService } })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticated])


  if (!Boolean(token) && pathName !== '/' || loading) {
    return <Loading className="h-screen flex justify-center items-center" />
  }

  console.log('ApplicationLoader', authenticated, pathName, loading)

  return children
}

export default ApplicationLoader

