import { Suspense } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getPiaStudents } from "@/server/services/pia-students";
import { PiaStudentsActions } from "./pia-students-actions";
import { PiaStudentsTable } from "./pia-students-table";
import { PiaStudentsTableSkeleton } from "./pia-students-table-skeleton";
import { PiaStudentsAnalytics } from "./pia-students-analytics";
import { PiaStudentsType } from "@/db/schema";

interface PiaStudentsWrapperProps {
  canEditData: boolean;
}

export async function PiaStudentsWrapper({
  canEditData,
}: PiaStudentsWrapperProps) {
  const data = await getPiaStudents();

  const totalEnrolled = data.reduce(
    (sum, item) => sum + (item.enrolled || 0),
    0,
  );
  const totalGraduated = data.reduce(
    (sum, item) => sum + (item.graduated || 0),
    0,
  );
  const totalMale = data.reduce((sum, item) => sum + (item.male || 0), 0);
  const totalFemale = data.reduce((sum, item) => sum + (item.female || 0), 0);

  return (
    <Tabs defaultValue="student-data" className="space-y-4">
      <TabsList>
        <TabsTrigger value="student-data">Student Data</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
      </TabsList>

      <TabsContent value="student-data" className="space-y-4">
        {canEditData && <PiaStudentsActions />}
        <Suspense fallback={<PiaStudentsTableSkeleton />}>
          <PiaStudentsTable piaStudents={data} canEditData={canEditData} />
        </Suspense>
      </TabsContent>

      <PiaStudentsAnalytics
        totalEnrolled={totalEnrolled}
        totalGraduated={totalGraduated}
        totalMale={totalMale}
        totalFemale={totalFemale}
      />
    </Tabs>
  );
}
