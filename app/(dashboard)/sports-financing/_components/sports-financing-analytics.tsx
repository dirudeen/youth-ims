import { Card } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { DollarSign, TrendingUp, Trophy } from "lucide-react";

export const SportsFinancingAnalytics = ({
  totalFinancingAmount,
  avarageFinancingAmount,
  AssociationsLength,
}: {
  totalFinancingAmount: number;
  avarageFinancingAmount: number;
  AssociationsLength: number;
}) => {
  return (
    <TabsContent value="analytics" className="space-y-4">
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-6">
          <div className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-green-500" />
            <div>
              <p className="text-sm text-muted-foreground">Total Financing</p>
              <p className="text-2xl font-bold">
                D{totalFinancingAmount.toLocaleString()}
              </p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-orange-500" />
            <div>
              <p className="text-sm text-muted-foreground">
                Associations Supported
              </p>
              <p className="text-2xl font-bold">{AssociationsLength}</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-500" />
            <div>
              <p className="text-sm text-muted-foreground">Average Support</p>
              <p className="text-2xl font-bold">
                D{Math.round(avarageFinancingAmount).toLocaleString()}
              </p>
            </div>
          </div>
        </Card>
      </div>
    </TabsContent>
  );
};
