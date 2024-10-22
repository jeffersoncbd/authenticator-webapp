import { montserratThin } from "@/components/typography/fonts";
import { H1 } from "@/components/typography/headers";
import { Card, CardContent } from "@/components/ui/card";
import { Zap } from "lucide-react";
import LoginForm from "./LoginForm";

const Home: React.FC = () => {

  return (
    <div className="p-4 flex-1 flex flex-col gap-4 justify-center items-center">
      <H1 className={`${montserratThin.className} flex items-center`}>
        Auth
        <Zap size="48px" strokeWidth="1px" className="stroke-yellow-500 dark:stroke-yellow-300" />
        Thor
      </H1>
      <Card className="w-full pt-5 max-w-[360px]">
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
}

export default Home
