import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useApiService } from "@/services/api"
import { useStoreActions, useStoreSelects } from "@/store"
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

  const permissions = useStoreSelects(s => s.applications?.[applicationId].groups?.[groupId].permissions)

  const closeRef = useRef<HTMLButtonElement>(null)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const permissionsValues = useMemo(() => parsePermission(permission?.permission ?? 0), [permission?.key])

  const submitHandler = (newPermission: Permission, clearForm: () => void) => {
    if (permissions === undefined) {
      return
    }
    if (newPermission.key !== permission?.key && Object.keys(permissions).includes(newPermission.key)) {
      toast({ title: 'Já existe uma permissão com esta chave', style: { backgroundColor: 'yellow', color: 'black' } })
      return
    }
    if (newPermission.permission === 0) {
      toast({ title: 'Selecione ao menos uma permissão', style: { backgroundColor: 'yellow', color: 'black' } })
      return
    }

    if (permission !== undefined) {
      action({ type: "update-permission", payload: { apiService, applicationId, groupId, permissionKey: permission.key, updatedPermission: newPermission, possibleErrorTitle: t('possibleErrorTitle') } })
      clearForm()
      closeRef.current?.click()
    }
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
            read: permissionsValues[0] === 1,
            write: permissionsValues[1] === 1,
            delete: permissionsValues[2] === 1,
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
