import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card"

interface Properties {
  title: string
  description: React.ReactNode
}

const CardItem: React.FC<Properties> = (props) => (
  <Card className="py-0 hover:bg-gray-50 dark:hover:bg-gray-950">
    <CardHeader className="py-2">
      <CardTitle className="text-center">
        {props.title}
      </CardTitle>
      <CardDescription className="flex justify-center">
        {props.description}
      </CardDescription>
    </CardHeader>
  </Card>
)

export default CardItem
