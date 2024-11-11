'use client'

import Loading from "@/components/Loading"
import PageContainer from "@/components/PageContainer"
import { useRouter } from "@/i18n/routing"
import { useStoreSelects } from "@/store"
import { useTranslations } from "next-intl"
import { useEffect, useMemo } from "react"

interface Properties {
  params: { applicationID: string }
}

const Application: React.FC<Properties> = ({ params: { applicationID } }) => {
  const router = useRouter()
  const t = useTranslations('pages.applications')

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
    </PageContainer>
  )
}

export default Application

