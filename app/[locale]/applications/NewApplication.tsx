'use client'

import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useTranslations } from "next-intl"
import { Form as ShadcnForm } from '@/components/ui/form'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "@/components/Form"
import { useForm } from "react-hook-form"
import { useStoreActions } from "@/store"
import { useApiService } from "@/services/api"
import { useRef } from "react"

interface Properties {
  teste: 'string'
}

const NewApplication: React.FC<Properties> = () => {
  const t = useTranslations('pages.applications.new')
  const action = useStoreActions()
  const apiService = useApiService()

  const closeRef = useRef<HTMLButtonElement>(null)

  const formSchema = z.object({
    name: z.string({ message: t('nameInput.validations.required') }),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    action({
      type: "add-application",
      payload: { apiService, name: values.name, possibleErrorTitle: t('possibleErrorTitle') }
    })
    closeRef.current?.click()
  }

  return (
    <Dialog>
      <DialogTrigger asChild={true}>
        <Button className="flex-1 min-[350px]:flex-none min-[350px]:w-[200px]">Adicionar</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('title')}</DialogTitle>
        </DialogHeader>
        <ShadcnForm {...form}>
          <form
            className="flex flex-col gap-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <Form.Input
              name="name"
              control={form.control}
              label={t('nameInput.label')}
            />
            <Button className="self-end" type="submit">{t('submitButtonLabel')}</Button>
          </form>
        </ShadcnForm>
        <DialogClose ref={closeRef} hidden={true}><div /></DialogClose>
      </DialogContent>
    </Dialog>
  )
}

export default NewApplication

