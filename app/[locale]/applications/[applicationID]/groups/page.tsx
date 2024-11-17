'use client'

import Loading from "@/components/Loading"
import { H3 } from "@/components/typography/headers"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { useStoreSelects } from "@/store"
import { useTranslations } from "next-intl"

interface Properties {
  params: { applicationID: string }
}

const ApplicationGroups: React.FC<Properties> = ({ params: { applicationID } }) => {
  const t = useTranslations('pages.applications.view.tabs.groups')

  const groups = useStoreSelects((state) => state.applications?.[applicationID].groups)

  if (groups === undefined) {
    return <Loading />
  }

  return (
    <>
      <H3>{t('title')}</H3>
      {Object.values(groups).map((group) => (
        <Card key={group.id}>
          <CardHeader>
            <CardTitle>{group.name}</CardTitle>
          </CardHeader>
        </Card>
      ))}
    </>
  )
}

export default ApplicationGroups
