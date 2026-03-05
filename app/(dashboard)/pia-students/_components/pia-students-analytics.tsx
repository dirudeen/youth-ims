import { Card } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { GraduationCap, Users } from "lucide-react";

export function PiaStudentsAnalytics({
  totalEnrolled,
  totalGraduated,
  totalMale,
  totalFemale,
}: {
  totalEnrolled: number;
  totalGraduated: number;
  totalMale: number;
  totalFemale: number;
}) {
  return (
    <TabsContent value="analytics" className="space-y-4">
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="p-6">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-blue-500" />
            <div>
              <p className="text-sm text-muted-foreground">Total Enrolled</p>
              <p className="text-2xl font-bold">
                {totalEnrolled.toLocaleString()}
              </p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-green-500" />
            <div>
              <p className="text-sm text-muted-foreground">Total Graduated</p>
              <p className="text-2xl font-bold">
                {totalGraduated.toLocaleString()}
              </p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-purple-500" />
            <div>
              <p className="text-sm text-muted-foreground">Male Students</p>
              <p className="text-2xl font-bold">{totalMale.toLocaleString()}</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-pink-500" />
            <div>
              <p className="text-sm text-muted-foreground">Female Students</p>
              <p className="text-2xl font-bold">
                {totalFemale.toLocaleString()}
              </p>
            </div>
          </div>
        </Card>
      </div>
    </TabsContent>
  );
}
