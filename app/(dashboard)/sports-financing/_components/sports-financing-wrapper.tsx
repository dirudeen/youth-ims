import { Suspense } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getsportsFinancing } from "@/server/services/sports-financing";
import { SportsFinancingActions } from "./sports-financing-actions";
import { SportsFinancingTable } from "./sports-financing-table";
import { SportsFinancingTableSkeleton } from "./sports-financing-table-skeleton";
import { SportsFinancingAnalytics } from "./sports-financing-analytics";

interface SportsFinancingWrapperProps {
  canEditData: boolean;
}

export async function SportsFinancingWrapper({
  canEditData,
}: SportsFinancingWrapperProps) {
  const data = await getsportsFinancing();

  const totalFinancingAmount = data.reduce(
    (sum, f) => sum + (Math.ceil(Number(f.amount)) || 0),
    0,
  );
  const avarageFinancingAmount =
    Math.floor(totalFinancingAmount / data.length) || 0;

  return (
    <Tabs defaultValue="financing-data" className="space-y-4">
      <TabsList>
        <TabsTrigger value="financing-data">Financing Data</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
      </TabsList>

      <TabsContent value="financing-data" className="space-y-4">
        {canEditData && <SportsFinancingActions />}
        <Suspense fallback={<SportsFinancingTableSkeleton />}>
          <SportsFinancingTable
            sportsFinancing={data}
            canEditData={canEditData}
          />
        </Suspense>
      </TabsContent>

      <SportsFinancingAnalytics
        totalFinancingAmount={totalFinancingAmount}
        avarageFinancingAmount={avarageFinancingAmount}
        AssociationsLength={data.length}
      />
    </Tabs>
  );
}
