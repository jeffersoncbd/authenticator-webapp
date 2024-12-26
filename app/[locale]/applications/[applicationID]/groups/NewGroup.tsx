'use client'

import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useFormCreator } from "@/hooks/use-form-creator"
import { useApiService } from "@/services/api"
import { useStoreActions } from "@/store"
import { useTranslations } from "next-intl"
import { useRef } from "react"
import { z } from "zod"

interface Properties {
  applicationId: string
}

const NewGroup: React.FC<Properties> = ({ applicationId }) => {
  const t = useTranslations('pages.applications.view.tabs.groups.new')
  const action = useStoreActions()
  const apiService = useApiService()

  const closeRef = useRef<HTMLButtonElement>(null)

  const Form = useFormCreator({
    name: z.string({ message: t('nameInput.validations.required') }),
  })

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
        </DialogHeader>
        <Form.Container onSubmit={(values) => {
          action({ type: 'add-group', payload: { apiService, applicationId, groupName: values.name, possibleErrorTitle: t('possibleErrorTitle') } })
          Form.setValue('name', '')
          closeRef.current?.click()
        }}>
          <Form.Input
            name="name"
            label={t('nameInput.label')}
            onChange={(e) => e.target.value = e.target.value.replace(/[^a-zA-Z0-9 ]/g, "")}
          />
          <Button className="self-end" type="submit">
            {t('submitButtonLabel')}
          </Button>
        </Form.Container>
        <DialogClose ref={closeRef} hidden={true}><div /></DialogClose>
      </DialogContent>
    </Dialog>
  )
}

export default NewGroup
