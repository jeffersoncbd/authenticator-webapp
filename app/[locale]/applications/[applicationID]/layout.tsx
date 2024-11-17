'use client'

import PageContainer from "@/components/PageContainer"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { usePathname, useRouter } from "@/i18n/routing"
import { useApiService } from "@/services/api"
import { useStoreActions, useStoreSelects } from "@/store"
import { useTranslations } from "next-intl"
import { useEffect } from "react"

interface Properties {
  params: { applicationID: string }
  children: React.ReactNode
}

const Application: React.FC<Properties> = ({ params: { applicationID }, children }) => {
  const router = useRouter()
  const t = useTranslations('pages.applications')
  const pathname = usePathname()
  const action = useStoreActions()
  const apiService = useApiService()

  const application = useStoreSelects(s => s.applications?.[applicationID])

  useEffect(() => {
    if (application !== undefined && application.groups === undefined) {
      action({
        type: 'update-groups-application',
        payload: { applicationID, apiService, possibleErrorTitle: t('view.tabs.groups.possibleErrorTitleOnList') }
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [application])

  if (application === undefined) {
    router.replace('/applications')
    return null
  }

  return (
    <PageContainer
      title={application.name}
      breadcrumb={[
        { label: t('title'), href: '/applications' },
        { label: application.name }
      ]}
    >
      <Tabs defaultValue={pathname.split('/')[3]} onValueChange={router.replace}>
        <TabsList>
          <TabsTrigger value="groups">{t('view.tabs.groups.title')}</TabsTrigger>
          <TabsTrigger value="users">{t('view.tabs.users.title')}</TabsTrigger>
        </TabsList>
      </Tabs>
      {children}
    </PageContainer>
  )
}

export default Application

