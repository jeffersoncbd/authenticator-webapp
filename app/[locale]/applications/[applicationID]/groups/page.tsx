'use client'

import CopyToClipBoard from "@/components/CopyToClipboard"
import Loading from "@/components/Loading"
import { H3 } from "@/components/typography/headers"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
        <Card key={group.id} className="py-0">
          <CardHeader className="py-2">
            <CardTitle className="text-center">{group.name}</CardTitle>
            <CardDescription>
              <CopyToClipBoard reference={group.id}>
                {group.id}
              </CopyToClipBoard>
            </CardDescription>
          </CardHeader>
        </Card>
      ))}
    </>
  )
}

export default ApplicationGroups
