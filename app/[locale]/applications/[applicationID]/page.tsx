import PageContainer from "@/components/PageContainer"

interface Properties {
  params: { applicationID: string }
}

const Application: React.FC<Properties> = (properties) => {
  return (
    <PageContainer title={properties.params.applicationID}>
    </PageContainer>
  )
}

export default Application

