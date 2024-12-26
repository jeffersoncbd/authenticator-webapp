'use client'

import CopyToClipBoard from "@/components/CopyToClipboard"
import Loading from "@/components/Loading"
import PageContainer from "@/components/PageContainer"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRouter } from "@/i18n/routing"
import { useApiService } from "@/services/api"
import { useStoreActions, useStoreSelects } from "@/store"
import { useTranslations } from "next-intl"
import { useEffect } from "react"
import GroupsList from "./groups/GroupsList"
import { useSearchParams } from "next/navigation"

interface Properties {
  params: { applicationID: string }
}

const Application: React.FC<Properties> = ({ params: { applicationID } }) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const t = useTranslations('pages.applications')
  const action = useStoreActions()
  const apiService = useApiService()

  const application = useStoreSelects(s => {
    console.log('select')
    if (s.applications === undefined) {
      return null
    }
    return s.applications?.[applicationID]
  })

  useEffect(() => {
    if (application !== undefined && application !== null && application.groups === undefined) {
      action({
        type: 'list-groups-application',
        payload: { applicationID, apiService, possibleErrorTitle: t('view.tabs.groups.possibleErrorTitleOnList') }
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(application)])

  if (application === null) {
    return <Loading />
  }

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
      <CopyToClipBoard reference={application.id}>
        {application.id}
      </CopyToClipBoard>
      <Tabs
        defaultValue={searchParams.get('tab') ?? 'groups'}
        onValueChange={(value) => router.replace(`/applications/${application.id}?tab=${value}`)}
        className="w-full my-4"
      >
        <TabsList className="w-full sm:w-1/2 mb-5">
          <TabsTrigger value="groups" className="w-1/2">{t('view.tabs.groups.title')}</TabsTrigger>
          <TabsTrigger value="users" className="w-1/2">{t('view.tabs.users.title')}</TabsTrigger>
        </TabsList>
        <TabsContent value="groups">
          <GroupsList applicationID={applicationID} />
        </TabsContent>
        <TabsContent value="users">Users</TabsContent>
      </Tabs>
    </PageContainer>
  )
}

export default Application

