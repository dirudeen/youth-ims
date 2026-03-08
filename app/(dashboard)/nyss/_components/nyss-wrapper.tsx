import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getNyssGraduates } from "@/server/services/nyss-graduates";
import { getNyssPrograms } from "@/server/services/nyss-programs";
import { GraduationCap, TrendingUp, Users } from "lucide-react";
import { NyssGraduatesWrapper } from "./graduates/nyss-graduates-wrapper";
import { NyssProgramsWrapper } from "./programs/nyss-programs-wrapper";
import { NyssAnalytics } from "./nyss-analytics";

interface NyssWrapperProps {
  canEditData: boolean;
}

export async function NyssWrapper({ canEditData }: NyssWrapperProps) {
  const [programs, graduates] = await Promise.all([
    getNyssPrograms(),
    getNyssGraduates(),
  ]);
  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">NYSS</h1>
          <p className="text-muted-foreground">
            National Youth Service Scheme Programs and Graduates
          </p>
        </div>
      </div>

      <Tabs defaultValue="programs" className="space-y-4">
        <TabsList>
          <TabsTrigger value="programs" className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4" />
            Programs
          </TabsTrigger>
          <TabsTrigger value="graduates" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Graduates
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Analytics
          </TabsTrigger>
        </TabsList>
        <TabsContent value="programs">
          <NyssProgramsWrapper canEditData={canEditData} />
        </TabsContent>
        <TabsContent value="graduates">
          <NyssGraduatesWrapper canEditData={canEditData} />
        </TabsContent>
        <TabsContent value="analytics">
          <NyssAnalytics programs={programs} graduates={graduates} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
