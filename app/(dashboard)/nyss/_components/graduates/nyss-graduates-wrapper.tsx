import { Suspense } from "react";
import { getNyssGraduates } from "@/server/services/nyss-graduates";
import { NyssGraduatesActions } from "./nyss-graduates-actions";
import { NyssGraduatesTable } from "./nyss-graduates-table";
import { NyssGraduatesTableSkeleton } from "./nyss-graduates-table-skeleton";

interface NyssGraduatesWrapperProps {
  canEditData: boolean;
}

export async function NyssGraduatesWrapper({
  canEditData,
}: NyssGraduatesWrapperProps) {
  const data = await getNyssGraduates();

  return (
    <div className="space-y-4">
      {canEditData && <NyssGraduatesActions />}
      <Suspense fallback={<NyssGraduatesTableSkeleton />}>
        <NyssGraduatesTable graduates={data} canEditData={canEditData} />
      </Suspense>
    </div>
  );
}
