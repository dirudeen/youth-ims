import { Suspense } from "react";
import { getNyssPrograms } from "@/server/services/nyss-programs";
import { NyssProgramsActions } from "./nyss-programs-actions";
import { NyssProgramsTable } from "./nyss-programs-table";
import { NyssProgramsTableSkeleton } from "./nyss-programs-table-skeleton";

interface NyssProgramsWrapperProps {
  canEditData: boolean;
}

export async function NyssProgramsWrapper({
  canEditData,
}: NyssProgramsWrapperProps) {
  const data = await getNyssPrograms();

  return (
    <div className="space-y-4">
      {canEditData && <NyssProgramsActions />}
      <Suspense fallback={<NyssProgramsTableSkeleton />}>
        <NyssProgramsTable programs={data} canEditData={canEditData} />
      </Suspense>
    </div>
  );
}
