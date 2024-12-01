import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useApiService } from "@/services/api"
import { useStoreActions } from "@/store"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import { useRef } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form as ShadcnForm } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/Form"
import { Permission } from "@/services/api/interfaces"

interface Properties {
  applicationId: string
  groupId: string
}

const NewPermission: React.FC<Properties> = ({ applicationId, groupId }) => {
  const t = useTranslations('pages.applications.view.tabs.groups.view.permissions.new')
  const action = useStoreActions()
  const apiService = useApiService()

  const closeRef = useRef<HTMLButtonElement>(null)

  const formSchema = z.object({
    permissionKey: z.string({ message: t('keyInput.validations.required') }),
    read: z.boolean().optional(),
    write: z.boolean().optional(),
    delete: z.boolean().optional(),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    form.setValue('permissionKey', '')
    form.setValue('read', false)
    form.setValue('write', false)
    form.setValue('delete', false)

    const newPermission: Permission = {
      key: values.permissionKey,
      permission: 0
    }

    if (values.read) {
      newPermission.permission += 1
    }
    if (values.write) {
      newPermission.permission += 2
    }
    if (values.delete) {
      newPermission.permission += 4
    }

    action({ type: "add-permission", payload: { apiService, applicationId, groupId, newPermission, possibleErrorTitle: t('possibleErrorTitle') } })

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
          <DialogDescription>teste</DialogDescription>
        </DialogHeader>
        <ShadcnForm {...form}>
          <form
            className="flex flex-col gap-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <Form.Input
              name="permissionKey"
              control={form.control}
              label={t('keyInput.label')}
            />
            <div className="flex justify-around">
              <Form.Checkbox
                name="read"
                control={form.control}
                label={t('readCheckboxLabel')}
              />
              <Form.Checkbox
                name="write"
                control={form.control}
                label={t('writeCheckboxLabel')}
              />
              <Form.Checkbox
                name="delete"
                control={form.control}
                label={t('deleteCheckboxLabel')}
              />
            </div>
            <Button className="self-end" type="submit">
              {t('submitButtonLabel')}
            </Button>
          </form>
        </ShadcnForm>
        <DialogClose ref={closeRef} hidden={true}><div /></DialogClose>
      </DialogContent>
    </Dialog>
  )
}

export default NewPermission
