import { useFormCreator } from "@/hooks/use-form-creator"
import { Permission } from "@/services/api/interfaces"
import { useTranslations } from "next-intl"
import { z } from "zod"

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

    const Form = useFormCreator({
      permissionKey: z.string({ message: t('keyInput.validations.required') }),
      read: z.boolean().optional(),
      write: z.boolean().optional(),
      delete: z.boolean().optional(),
    }, initialValues)

    const clearForm = () => {
      Form.setValue('permissionKey', '')
      Form.setValue('read', false)
      Form.setValue('write', false)
      Form.setValue('delete', false)
    }

    return (
      <Form.Container onSubmit={(values) => {

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
      }}>
        <Form.Input
          name="permissionKey"
          label={t('keyInput.label')}
          onChange={(e) => e.target.value = e.target.value.replace(/[^a-zA-Z0-9 ]/g, "")}
        />
        <div className="flex justify-around">
          <Form.Checkbox
            name="read"
            label={t('readCheckboxLabel')}
          />
          <Form.Checkbox
            name="write"
            label={t('writeCheckboxLabel')}
          />
          <Form.Checkbox
            name="delete"
            label={t('deleteCheckboxLabel')}
          />
        </div>
        {children}
      </Form.Container>
    )
  }

export default PermissionForm
