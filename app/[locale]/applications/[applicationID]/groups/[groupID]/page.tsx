'use client'

import CopyToClipBoard from "@/components/CopyToClipboard"
import Loading from "@/components/Loading"
import PageContainer from "@/components/PageContainer"
import { H3 } from "@/components/typography/headers"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { SessionContext } from "@/contexts/Session"
import { useRouter } from "@/i18n/routing"
import { useApiService } from "@/services/api"
import { Permission } from "@/services/api/interfaces"
import { useStoreActions, useStoreSelects } from "@/store"
import { RefreshCcw, Trash2 } from "lucide-react"
import { useTranslations } from "next-intl"
import { useContext, useEffect, useState } from "react"
import EditPermission from "./EditPermission"
import NewPermission from "./NewPermission"
import { parsePermission } from "./utils"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import DeletePermission from "./DeletePermission"
import DeleteGroup from "./DeleteGroup"

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

  const [permissionEdition, setPermissionEdition] = useState<Permission | undefined>()
  const [permissionExclusion, setPermissionExclusion] = useState<string | undefined>()

  const [applicationName, group] = useStoreSelects((s => {
    if (s.applications?.[applicationID].groups === undefined) {
      return [null, null]
    }
    return [
      s.applications?.[applicationID].name,
      s.applications?.[applicationID].groups?.[groupID]
    ]
  }))

  const checkboxLabels = [
    t('view.permissions.readCheckboxLabel'),
    t('view.permissions.writeCheckboxLabel'),
    t('view.permissions.deleteCheckboxLabel')
  ]

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
      <div className="mt-2 flex flex-wrap gap-4 justify-between">
        <H3 className="w-full text-center">{t('view.permissions.title')}</H3>
        <Button size="icon">
          <RefreshCcw />
        </Button>
        <NewPermission applicationId={applicationID} groupId={group.id} />
        <EditPermission
          applicationId={applicationID}
          groupId={group.id}
          permission={permissionEdition}
          onClose={() => setPermissionEdition(undefined)}
        />
        <DeletePermission
          applicationID={applicationID}
          groupID={group.id}
          permissionKey={permissionExclusion}
          onClose={() => setPermissionExclusion(undefined)}
        />
      </div>
      {Object.keys(group.permissions)
        .toSorted((a, b) => a.localeCompare(b))
        .map((permission) => (
          <Card
            key={permission}
            className="p-4 flex justify-between gap-6 items-center dark:hover:bg-gray-950 cursor-pointer"
            onClick={() => setPermissionEdition({ key: permission, permission: group.permissions[permission] })}
          >
            <p className="flex-1">{permission}</p>
            <div className="flex gap-4">
              {parsePermission(group.permissions[permission]).map((permission, i) => (
                <Tooltip key={`${i}-${permission}`}>
                  <TooltipTrigger asChild>
                    <div className="flex justify-center items-center">
                      <Checkbox checked={permission === 1} />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    {checkboxLabels[i]}
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
            <Button variant="secondary" size="icon" onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setPermissionExclusion(permission)
            }}>
              <Trash2 className="stroke-red-700" />
            </Button>
          </Card>
        ))}
    </PageContainer>
  )
}

export default Group
