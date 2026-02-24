import { getYouthPopulation } from "@/server/services/youth-population";
import { Suspense } from "react";
import YouthPopulationActions from "./youth-population-actions";
import { YouthPopulationTable } from "./youth-population-table";
import { YouthPopulationTableSkeleton } from "./youth-population-table-skeleton";

interface Props {
  canEditData: boolean;
}

export default async function YouthPopulationTableWrapper({
  canEditData,
}: Props) {
  const data = await getYouthPopulation();
  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Youth Population Data</h1>
        {canEditData && <YouthPopulationActions />}
      </div>

      <Suspense fallback={<YouthPopulationTableSkeleton />}>
        <YouthPopulationTable
          canEditData={canEditData}
          youthPopulation={data}
        />
      </Suspense>
    </div>
  );
}
