'use client'

import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { parsePermission } from "./utils"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Trash2 } from "lucide-react"
import { useTranslations } from "next-intl"
import { useState } from "react"
import NewPermission from "./NewPermission"
import EditPermission from "./EditPermission"
import DeletePermission from "./DeletePermission"
import { Permission } from "@/services/api/interfaces"
import { Button } from "@/components/ui/button"
import { H3 } from "@/components/typography/headers"

interface Properties {
  applicationID: string
  groupID: string,
  permissions: Record<string, number>
}

const PermissionsList: React.FC<Properties> = ({ applicationID, groupID, permissions }) => {
  const t = useTranslations('pages.applications.view.tabs.groups.view.permissions')

  const [permissionEdition, setPermissionEdition] = useState<Permission | undefined>()
  const [permissionExclusion, setPermissionExclusion] = useState<string | undefined>()

  const checkboxLabels = [
    t('readCheckboxLabel'),
    t('writeCheckboxLabel'),
    t('deleteCheckboxLabel')
  ]

  return (
    <div className="flex flex-col gap-4">
      <div className="mt-2 flex flex-wrap gap-4 justify-between">
        <H3 className="w-full text-center">{t('title')}</H3>
        <div />
        <NewPermission applicationId={applicationID} groupId={groupID} />
      </div>
      <EditPermission
        applicationId={applicationID}
        groupId={groupID}
        permission={permissionEdition}
        onClose={() => setPermissionEdition(undefined)}
      />
      <DeletePermission
        applicationID={applicationID}
        groupID={groupID}
        permissionKey={permissionExclusion}
        onClose={() => setPermissionExclusion(undefined)}
      />
      {Object.keys(permissions)
        .toSorted((a, b) => a.localeCompare(b))
        .map((permission) => (
          <Card
            key={permission}
            className="p-4 flex justify-between gap-6 items-center dark:hover:bg-gray-950 cursor-pointer"
            onClick={() => setPermissionEdition({ key: permission, permission: permissions[permission] })}
          >
            <p className="flex-1">{permission}</p>
            <div className="flex gap-4">
              {parsePermission(permissions[permission]).map((permission, i) => (
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
    </div>
  )
}

export default PermissionsList
