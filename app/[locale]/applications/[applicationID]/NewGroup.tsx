'use client'

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useTranslations } from "next-intl"
import { Form as ShadcnForm } from "@/components/ui/form"
import { useRef } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "@/components/Form"

const NewGroup: React.FC = () => {
  const t = useTranslations('pages.applications.view.tabs.groups.new')

  const closeRef = useRef<HTMLButtonElement>(null)

  const formSchema = z.object({
    name: z.string({ message: t('nameInput.validations.required') }),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values)
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
            <Button className="self-end" type="submit">
              {t('submitButtonLabel')}
            </Button>
          </form>
        </ShadcnForm>
      </DialogContent>
    </Dialog>
  )
}

export default NewGroup
