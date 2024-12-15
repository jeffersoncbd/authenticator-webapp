import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form as ShadcnForm } from "@/components/ui/form"
import { Form } from "@/components/Form"
import { Permission } from "@/services/api/interfaces"

interface Properties {
  children?: React.ReactNode
  initialValues?: {
    permissionKey: string,
    read?: boolean,
    write?: boolean,
    delete?: boolean,
  }
  handleSubmitData: (permission: Permission, clearForm: () => void) => void
}

const PermissionForm
  : React.FC<Properties> = ({ initialValues, handleSubmitData, children }) => {

    const t = useTranslations('pages.applications.view.tabs.groups.view.permissions')

    const formSchema = z.object({
      permissionKey: z.string({ message: t('keyInput.validations.required') }),
      read: z.boolean().optional(),
      write: z.boolean().optional(),
      delete: z.boolean().optional(),
    })

    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema), values: initialValues
    })

    const clearForm = () => {
      form.setValue('permissionKey', '')
      form.setValue('read', false)
      form.setValue('write', false)
      form.setValue('delete', false)
    }

    const onSubmit = (values: z.infer<typeof formSchema>) => {

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

      handleSubmitData(newPermission, clearForm)
    }

    return (
      <ShadcnForm {...form}>
        <form
          className="flex flex-col gap-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <Form.Input
            name="permissionKey"
            control={form.control}
            label={t('keyInput.label')}
            onChange={(e) => e.target.value = e.target.value.replace(/[^a-zA-Z0-9 ]/g, "")}
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
          {children}
        </form>
      </ShadcnForm>
    )
  }

export default PermissionForm
