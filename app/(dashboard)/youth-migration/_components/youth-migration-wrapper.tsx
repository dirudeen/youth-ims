import { getYouthMigration } from "@/server/services/youth-migration";
import { Suspense } from "react";
import { YouthMigrationActions } from "./youth-migration-actions";
import { YouthMigrationTable } from "./youth-migration-table";
import { YouthMigrationTableSkeleton } from "./youth-migration-table-skeleton";

interface Props {
  canEditData: boolean;
}

export async function YouthMigrationWrapper({ canEditData }: Props) {
  const data = await getYouthMigration();
  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Youth Migration Data</h1>
        {canEditData && <YouthMigrationActions />}
      </div>

      <Suspense fallback={<YouthMigrationTableSkeleton />}>
        <YouthMigrationTable canEditData={canEditData} youthMigration={data} />
      </Suspense>
    </div>
  );
}
