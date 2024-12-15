import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { useApiService } from "@/services/api"
import { useStoreActions } from "@/store"
import { useTranslations } from "next-intl"

interface Properties {
  applicationID: string
  groupID?: string
  onClose: () => void
}

const DeleteGroup: React.FC<Properties> = ({ applicationID, groupID, onClose }) => {
  const apiService = useApiService()
  const action = useStoreActions()
  const t = useTranslations('pages.applications.view.tabs.groups.delete')

  if (groupID === undefined) {
    return null
  }

  return (
    <AlertDialog
      open={groupID !== undefined}
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
                type: "remove-group-from-application",
                payload: { apiService, applicationID, groupID, possibleErrorTitle: t('possibleErrorTitle') }
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

export default DeleteGroup
