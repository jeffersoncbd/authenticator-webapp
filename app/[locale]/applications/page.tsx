'use client'

import Loading from "@/components/Loading"
import { Button } from "@/components/ui/button"
import { useApiService } from "@/services/api"
import { useStoreActions, useStoreSelects } from "@/store"
import { RefreshCcw } from "lucide-react"
import { useTranslations } from "next-intl"
import NewApplication from "./NewApplication"
import PageContainer from "@/components/PageContainer"
import { Link } from "@/i18n/routing"
import CopyToClipBoard from "@/components/CopyToClipboard"
import CardItem from "@/components/CardItem"

const Applications: React.FC = () => {
  const t = useTranslations('pages.applications')
  const action = useStoreActions()
  const apiService = useApiService()
  const loading = useStoreSelects((store) => store.loading)
  const applications = useStoreSelects((store) => store.applications)

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
          <Link key={application.id} href={`/applications/${application.id}?tab=groups`}>
            <CardItem
              title={application.name}
              description={
                <CopyToClipBoard reference={application.id}>
                  {application.id}
                </CopyToClipBoard>
              }
            />
          </Link>
        ))
      }
    </PageContainer >
  )
}

export default Applications
