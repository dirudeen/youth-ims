import { getYouthWithDisabilities } from "@/server/services/youth-with-disabilities";
import { Suspense } from "react";
import { YouthWithDisabilitiesActions } from "./youth-with-disabilities-actions";
import { YouthWithDisabilitiesTable } from "./youth-with-disabilities-table";
import { YouthWithDisabilitiesTableSkeleton } from "./youth-with-disabilities-table-skeleton";

interface Props {
  canEditData: boolean;
}

export async function YouthWithDisabilitiesWrapper({ canEditData }: Props) {
  const data = await getYouthWithDisabilities();
  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Youths With Disabilities Data</h1>
        {canEditData && <YouthWithDisabilitiesActions />}
      </div>

      <Suspense fallback={<YouthWithDisabilitiesTableSkeleton />}>
        <YouthWithDisabilitiesTable
          canEditData={canEditData}
          youthWithDisabilities={data}
        />
      </Suspense>
    </div>
  );
}
