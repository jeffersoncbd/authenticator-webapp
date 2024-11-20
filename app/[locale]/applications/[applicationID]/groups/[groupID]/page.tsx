'use client'

import CopyToClipBoard from "@/components/CopyToClipboard"
import Loading from "@/components/Loading"
import PageContainer from "@/components/PageContainer"
import { H3 } from "@/components/typography/headers"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { useRouter } from "@/i18n/routing"
import { useApiService } from "@/services/api"
import { useStoreActions, useStoreSelects } from "@/store"
import { useTranslations } from "next-intl"
import { useEffect } from "react"

interface Properties {
  params: { applicationID: string, groupID: string }
}

function parsePermission(permission: number): [number, number, number] {
  const binary = permission.toString(2).padStart(3, '0')
  return binary.split('').reverse().map(Number) as [number, number, number]
}

const Group: React.FC<Properties> = ({ params: { applicationID, groupID } }) => {
  const t = useTranslations('pages.applications')
  const router = useRouter()
  const apiService = useApiService()
  const action = useStoreActions()

  const [applicationName, group] = useStoreSelects((s => {
    if (s.applications?.[applicationID].groups === undefined) {
      return [null, null]
    }
    return [
      s.applications?.[applicationID].name,
      s.applications?.[applicationID].groups?.[groupID]
    ]
  }))


  useEffect(() => {
    if (group === null) {
      action({
        type: 'update-groups-application',
        payload: { apiService, applicationID, possibleErrorTitle: t('view.tabs.groups.possibleErrorTitleOnList') }
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [group])

  if (group === null) {
    return <Loading />
  }

  if (group === undefined) {
    router.replace(`/applications/${applicationID}`)
    return null
  }

  return (
    <PageContainer
      title={group.name}
      breadcrumb={[
        { label: t('title'), href: '/applications' },
        { label: applicationName, href: `/applications/${applicationID}?tab=groups` },
        { label: group.name }
      ]}
    >
      <CopyToClipBoard reference={groupID}>
        {groupID}
      </CopyToClipBoard>
      <H3>Permissões</H3>
      {Object.keys(group.permissions).map((permission) => (
        <Card key={permission} className="p-4 flex justify-between items-center">
          <span>{permission}</span>
          <div className="flex gap-4">
            {parsePermission(group.permissions[permission]).map((permission, i) =>
              <Checkbox key={`${i}-${permission}`} checked={permission === 1} />
            )}
          </div>
        </Card>
      ))}
    </PageContainer>
  )
}

export default Group
