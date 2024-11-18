'use client'

import Loading from "@/components/Loading"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useApiService } from "@/services/api"
import { useStoreActions, useStoreSelects } from "@/store"
import { Check, Copy, RefreshCcw } from "lucide-react"
import { useTranslations } from "next-intl"
import NewApplication from "./NewApplication"
import PageContainer from "@/components/PageContainer"
import { Link } from "@/i18n/routing"
import { useCopy } from "@/hooks/use-copy"

const Applications: React.FC = () => {
  const t = useTranslations('pages.applications')
  const action = useStoreActions()
  const apiService = useApiService()
  const loading = useStoreSelects((store) => store.loading)
  const applications = useStoreSelects((store) => store.applications)

  const [currentValue, copyValue] = useCopy()

  return (
    <PageContainer title={t('title')}>

      <div className="flex gap-4 justify-between">
        <Button size="icon" onClick={() => action({
          type: 'update-applications',
          payload: { apiService, possibleErrorTitle: t('possibleErrorTitleOnList') }
        })}>
          <RefreshCcw />
        </Button>
        <NewApplication />
      </div>

      {loading || applications === undefined
        ? <Loading className="mt-10 flex justify-center items-center" />
        : Object.values(applications).map((application) => (
          <Link key={application.id} href={`/applications/${application.id}/groups`}>
            <Card className="py-0">
              <CardHeader className="py-2">
                <CardTitle className="text-center">
                  {application.name}
                </CardTitle>
                <CardDescription className="flex justify-center">
                  <span
                    className="cursor-pointer flex items-center gap-2 text-[10px] min-[380px]:text-sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      copyValue(application.id)
                    }}
                  >
                    {application.id} {currentValue !== application.id
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
