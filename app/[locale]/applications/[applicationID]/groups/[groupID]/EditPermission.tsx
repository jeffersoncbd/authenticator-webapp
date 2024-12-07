import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useApiService } from "@/services/api"
import { useStoreActions } from "@/store"
import { useTranslations } from "next-intl"
import { useMemo, useRef } from "react"
import { Permission } from "@/services/api/interfaces"
import { useToast } from "@/hooks/use-toast"
import PermissionForm from "./PermissionForm"
import { parsePermission } from "./utils"
import { Button } from "@/components/ui/button"

interface Properties {
  applicationId: string
  groupId: string
  permission?: Permission
  onClose: () => void
}

const EditPermission: React.FC<Properties> = ({ applicationId, groupId, permission, onClose }) => {
  const action = useStoreActions()
  const apiService = useApiService()
  const { toast } = useToast()

  const t = useTranslations('pages.applications.view.tabs.groups.view.permissions.edit')

  const closeRef = useRef<HTMLButtonElement>(null)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const permissions = useMemo(() => parsePermission(permission?.permission ?? 0), [permission?.key])

  const submitHandler = (newPermission: Permission, clearForm: () => void) => {
    if (newPermission.permission === 0) {
      toast({ title: 'Selecione ao menos uma permissão', style: { backgroundColor: 'yellow', color: 'black' } })
      return
    }

    action({ type: "set-permission", payload: { apiService, applicationId, groupId, newPermission, possibleErrorTitle: t('possibleErrorTitle') } })
    clearForm()
    closeRef.current?.click()
  }

  if (permission === undefined) {
    return null
  }

  return (
    <Dialog
      open={permission !== undefined}
      onOpenChange={(open) => {
        if (!open) {
          onClose()
        }
      }}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('title')}</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <PermissionForm
          initialValues={{
            permissionKey: permission.key,
            read: permissions[0] === 1,
            write: permissions[1] === 1,
            delete: permissions[2] === 1,
          }}
          handleSubmitData={submitHandler}
        >
          <Button className="self-end" type="submit">
            {t('submitButtonLabel')}
          </Button>
        </PermissionForm>
        <DialogClose ref={closeRef} hidden={true}><div /></DialogClose>
      </DialogContent>
    </Dialog>
  )
}

export default EditPermission
