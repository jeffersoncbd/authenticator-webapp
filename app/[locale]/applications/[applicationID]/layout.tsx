'use client'

import Loading from "@/components/Loading"
import PageContainer from "@/components/PageContainer"
import { Card } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { usePathname, useRouter } from "@/i18n/routing"
import { useStoreSelects } from "@/store"
import { useTranslations } from "next-intl"
import { useEffect, useMemo } from "react"

interface Properties {
  params: { applicationID: string }
  children: React.ReactNode
}

const Application: React.FC<Properties> = ({ params: { applicationID }, children }) => {
  const router = useRouter()
  const t = useTranslations('pages.applications')
  const pathname = usePathname()

  const applications = useStoreSelects(s => s.applications.list)

  let application = useMemo(() =>
    applications.find((a) => a.id === applicationID),
    [JSON.stringify(applications), applicationID]
  )

  if (applications.length === 0) {
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

