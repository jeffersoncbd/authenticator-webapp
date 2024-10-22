'use client'

import { Form } from '@/components/Form'
import { Button } from '@/components/ui/button'
import { Form as ShadcnForm } from '@/components/ui/form'
import { SessionContext } from '@/contexts/Session'
import { useApiService } from '@/services/api'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const LoginForm: React.FC = () => {
    const t = useTranslations('pages.login.form')
    const apiService = useApiService()
    const { startSession } = useContext(SessionContext)

    const formSchema = z.object({
        email: z.string({ message: t('emailInput.validations.required') })
            .email({ message: t('emailInput.validations.email') }),
        password: z.string({ message: t('passwordInput.validations.required') })
            .min(8, { message: t('passwordInput.validations.min') })
            .max(32, { message: t('passwordInput.validations.max') })
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema)
    })

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        apiService.login({ ...values })
            .then((response) => {
                startSession(response.token)
            })
            .catch(apiService.defaultErrorHandler)
    }

    return (
        <ShadcnForm {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-4"
            >
                <Form.Input
                    name="email"
                    placeholder="user@mail.com"
                    control={form.control}
                    label={t('emailInput.label')}
                />
                <Form.Input
                    type="password"
                    name="password"
                    control={form.control}
                    label={t('passwordInput.label')}
                />
                <Button type="submit">{t('submitButtonLabel')}</Button>
            </form>
        </ShadcnForm>
    )
}

export default LoginForm
