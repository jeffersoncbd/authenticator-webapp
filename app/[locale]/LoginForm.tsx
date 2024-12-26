'use client'

import { useFormCreator } from '@/hooks/use-form-creator'
import { Button } from '@/components/ui/button'
import { SessionContext } from '@/contexts/Session'
import { useApiService } from '@/services/api'
import { useTranslations } from 'next-intl'
import { useContext } from 'react'
import { z } from 'zod'

const LoginForm: React.FC = () => {
  const t = useTranslations('pages.login.form')
  const apiService = useApiService()
  const { startSession } = useContext(SessionContext)

  const Form = useFormCreator({
    email: z.string({ message: t('emailInput.validations.required') })
      .email({ message: t('emailInput.validations.email') }),
    password: z.string({ message: t('passwordInput.validations.required') })
      .min(8, { message: t('passwordInput.validations.min') })
      .max(32, { message: t('passwordInput.validations.max') })
  })

  return (
    <Form.Container onSubmit={(values) => {
      apiService.login({ ...values })
        .then((response) => {
          startSession(response.token)
        })
        .catch(apiService.defaultErrorHandler)
    }}>
      <Form.Input
        name="email"
        placeholder="user@mail.com"
        label={t('emailInput.label')}
      />
      <Form.Input
        type="password"
        name="password"
        label={t('passwordInput.label')}
      />
      <Button type="submit">{t('submitButtonLabel')}</Button>
    </Form.Container>
  )
}

export default LoginForm
