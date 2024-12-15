'use client'

import CopyToClipBoard from "@/components/CopyToClipboard"
import Loading from "@/components/Loading"
import PageContainer from "@/components/PageContainer"
import { Button } from "@/components/ui/button"
import { SessionContext } from "@/contexts/Session"
import { useRouter } from "@/i18n/routing"
import { useApiService } from "@/services/api"
import { useStoreActions, useStoreSelects } from "@/store"
import { useTranslations } from "next-intl"
import { useContext, useEffect, useState } from "react"
import DeleteGroup from "./DeleteGroup"
import PermissionsList from "./permissions/List"

interface Properties {
  params: { applicationID: string, groupID: string }
}

const Group: React.FC<Properties> = ({ params: { applicationID, groupID } }) => {
  const { token } = useContext(SessionContext)

  const tApplications = useTranslations('pages.applications')
  const t = useTranslations('pages.applications.view.tabs.groups')
  const router = useRouter()
  const apiService = useApiService()
  const action = useStoreActions()

  const [groupExclusion, setGroupExclusion] = useState<string | undefined>()

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
    if (group === null && token !== null) {
      action({
        type: 'update-groups-application',
        payload: { apiService, applicationID, possibleErrorTitle: t('possibleErrorTitleOnList') }
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [group, token])

  if (group === null || applicationName === null) {
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
        { label: tApplications('title'), href: '/applications' },
        { label: applicationName, href: `/applications/${applicationID}?tab=groups` },
        { label: group.name }
      ]}
    >
      <CopyToClipBoard reference={groupID}>
        {groupID}
      </CopyToClipBoard>
      <Button
        className="self-center flex-1 min-[350px]:flex-none min-[350px]:w-[200px] bg-red-600 hover:bg-red-500 dark:bg-red-600 dark:hover:bg-red-700"
        onClick={() => setGroupExclusion(groupID)}
      >
        Excluir este grupo
      </Button>
      <DeleteGroup
        applicationID={applicationID}
        groupID={groupExclusion}
        onClose={() => setGroupExclusion(undefined)}
      />
      <PermissionsList applicationID={applicationID} groupID={group.id} permissions={group.permissions} />
    </PageContainer>
  )
}

export default Group
