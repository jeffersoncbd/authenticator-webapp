import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useApiService } from "@/services/api"
import { useStoreActions, useStoreSelects } from "@/store"
import { useTranslations } from "next-intl"
import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { Permission } from "@/services/api/interfaces"
import { useToast } from "@/hooks/use-toast"
import PermissionForm from "./PermissionForm"

interface Properties {
  applicationId: string
  groupId: string
}

const NewPermission: React.FC<Properties> = ({ applicationId, groupId }) => {
  const action = useStoreActions()
  const apiService = useApiService()
  const { toast } = useToast()

  const t = useTranslations('pages.applications.view.tabs.groups.view.permissions.new')
  const permissions = useStoreSelects(s => s.applications?.[applicationId].groups?.[groupId].permissions)

  const closeRef = useRef<HTMLButtonElement>(null)

  const submitHandler = (newPermission: Permission, clearForm: () => void) => {
    if (permissions === undefined) {
      return
    }

    if (Object.keys(permissions).includes(newPermission.key)) {
      toast({ title: 'A chave informada já existe', style: { backgroundColor: 'yellow', color: 'black' } })
      return
    }
    if (newPermission.permission === 0) {
      toast({ title: 'Selecione ao menos uma permissão', style: { backgroundColor: 'yellow', color: 'black' } })
      return
    }

    action({ type: "add-permission", payload: { apiService, applicationId, groupId, newPermission, possibleErrorTitle: t('possibleErrorTitle') } })
    clearForm()
    closeRef.current?.click()
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex-1 min-[350px]:flex-none min-[350px]:w-[200px]">
          {t('buttonTriggerLabel')}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('title')}</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <PermissionForm handleSubmitData={submitHandler}>
          <Button className="self-end" type="submit">
            {t('submitButtonLabel')}
          </Button>
        </PermissionForm>
        <DialogClose ref={closeRef} hidden={true}><div /></DialogClose>
      </DialogContent>
    </Dialog>
  )
}

export default NewPermission
