'use client'

import Loading from "@/components/Loading"
import { H2 } from "@/components/typography/headers"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useApiService } from "@/services/api"
import { useStoreActions, useStoreSelects } from "@/store"
import { Check, Copy, RefreshCcw } from "lucide-react"
import { useTranslations } from "next-intl"
import { useEffect, useState } from "react"
import NewApplication from "./NewApplication"
import PageContainer from "@/components/PageContainer"
import { Link } from "@/i18n/routing"

const Applications: React.FC = () => {
  const t = useTranslations('pages.applications')
  const action = useStoreActions()
  const apiService = useApiService()
  const loading = useStoreSelects((store) => store.loading)
  const applications = useStoreSelects((store) => store.applications.list)

  const [copyId, setCopyId] = useState<null | string>(null)

  useEffect(() => {
    if (copyId !== null) {
      void navigator.clipboard.writeText(copyId)
      setTimeout(() => {
        setCopyId(null)
      }, 1000)
    }
  }, [copyId])

  return (
    <PageContainer title={t('title')}>

      <div className="flex gap-4 justify-between">
        <Button size="icon" onClick={() => action({ type: 'update-applications', payload: { apiService } })}>
          <RefreshCcw />
        </Button>
        <NewApplication />
      </div>

      {loading ? <Loading className="mt-10 flex justify-center items-center" /> : applications.map((application) => (
        <Link href={`/applications/${application.id}`}>
          <Card key={application.id} className="py-0">
            <CardHeader className="py-2">
              <CardTitle className="text-center">
                {application.name}
              </CardTitle>
              <CardDescription className="flex justify-center">
                <span className="cursor-pointer flex items-center gap-2 text-[10px] min-[380px]:text-sm" onClick={() => setCopyId(application.id)}>
                  {application.id} {copyId !== application.id
                    ? <Copy size={16} />
                    : <Check size={16} />}
                </span>
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>
      ))
      }

    </PageContainer >
  )
}

export default Applications
