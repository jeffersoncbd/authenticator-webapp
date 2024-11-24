'use client'

import CardItem from "@/components/CardItem"
import CopyToClipBoard from "@/components/CopyToClipboard"
import Loading from "@/components/Loading"
import { H3 } from "@/components/typography/headers"
import { Button } from "@/components/ui/button"
import { Link } from "@/i18n/routing"
import { useStoreSelects } from "@/store"
import { RefreshCcw } from "lucide-react"
import { useTranslations } from "next-intl"
import NewGroup from "./NewGroup"

interface Properties {
  applicationID: string
}

const GroupsList: React.FC<Properties> = ({ applicationID }) => {
  const t = useTranslations('pages.applications.view.tabs.groups')

  const groups = useStoreSelects((state) => state.applications?.[applicationID].groups)

  if (groups === undefined) {
    return <Loading />
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-4 justify-between">
        <H3 className="w-full text-center">{t('title')}</H3>
        <Button size="icon">
          <RefreshCcw />
        </Button>
        <NewGroup applicationId={applicationID} />
      </div>
      {Object.values(groups).map((group) => (
        <Link key={group.id} href={`/applications/${applicationID}/groups/${group.id}`}>
          <CardItem
            title={group.name}
            description={
              <CopyToClipBoard reference={group.id}>
                {group.id}
              </CopyToClipBoard>
            }
          />
        </Link>
      ))}
    </div>
  )
}

export default GroupsList
