'use client'

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { useApiService } from "@/services/api"
import { useStoreActions } from "@/store"
import { useTranslations } from "next-intl"

interface Properties {
  applicationID: string
  groupID: string
  permissionKey?: string
  onClose: () => void
}

const DeletePermission: React.FC<Properties> = ({ applicationID, groupID, permissionKey, onClose }) => {
  const apiService = useApiService()
  const action = useStoreActions()
  const t = useTranslations('pages.applications.view.tabs.groups.view.permissions.delete')

  if (permissionKey === undefined) {
    return null
  }

  return (
    <AlertDialog
      open={permissionKey !== undefined}
      onOpenChange={(open) => {
        if (!open) {
          onClose()
        }
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t('dialog.title')}</AlertDialogTitle>
          <AlertDialogDescription>
            {t('dialog.description')}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            {t('dialog.cancel')}
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-600 dark:text-gray-200 hover:bg-red-500 dark:bg-red-600 dark:hover:bg-red-700"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              action({
                type: "delete-permission",
                payload: {
                  apiService,
                  applicationId: applicationID,
                  groupId: groupID,
                  permissionKey,
                  possibleErrorTitle: t('possibleErrorTitle')
                }
              })
              onClose()
            }}
          >
            {t('dialog.delete')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeletePermission
