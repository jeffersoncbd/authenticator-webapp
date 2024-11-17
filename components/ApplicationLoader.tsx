'use client'

import { useApiService } from "@/services/api"
import { useStoreActions, useStoreSelects } from "@/store"
import { useContext, useEffect } from "react"
import { SessionContext } from "@/contexts/Session"
import { usePathname } from "@/i18n/routing"
import Loading from "./Loading"
import { useTranslations } from "next-intl"

type Properties = { children: React.ReactNode }

const ApplicationLoader: React.FC<Properties> = ({ children }) => {
  const t = useTranslations('pages.applications')

  const pathName = usePathname()
  const { token, authenticated } = useContext(SessionContext)
  const apiService = useApiService()
  const action = useStoreActions()
  const applications = useStoreSelects((s) => s.applications)

  useEffect(() => {
    if (authenticated && applications === undefined) {
      action({ type: 'update-applications', payload: { apiService, possibleErrorTitle: t('possibleErrorTitleOnList') } })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticated, applications])


  if (!Boolean(token) && pathName !== '/' || applications === undefined) {
    return <Loading className="h-screen flex justify-center items-center" />
  }

  return children
}

export default ApplicationLoader

