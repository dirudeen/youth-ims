"use client";

import { DataTable } from "@/components/data-table";
import { getColumns } from "./sports-financing-columns";
import { SportsFinancingDialogs } from "./sports-financing-dialogs";

import type { SportsFinancingType } from "@/db/schema";
import { bulkDeleteSportFinancing } from "@/server/actions/sports-financing";
import { useSportsFinancingStore } from "@/store/sports-financing.store";
import { toast } from "sonner";

interface SportsFinancingClientProps {
  sportsFinancing: SportsFinancingType[];
  canEditData: boolean;
}

export function SportsFinancingTable({
  sportsFinancing,
  canEditData,
}: SportsFinancingClientProps) {
  const { setSelectedItem, setEditOpen, setDeleteOpen } =
    useSportsFinancingStore();

  const handleEdit = (item: SportsFinancingType) => {
    setSelectedItem(item);
    setEditOpen(true);
  };

  const handleBulkDelete = async (selectedRows: SportsFinancingType[]) => {
    const records = selectedRows.map((row) => ({
      id: row.id,
      version: row.version,
    }));
    const res = await bulkDeleteSportFinancing(records);
    if (res.success) {
      toast.success("Success", {
        description: `${res.deleted} record${res.deleted === 1 ? "" : "s"} deleted successfully.`,
        richColors: true,
      });
    } else {
      toast.error("Error", {
        description: res.message,
        richColors: true,
      });
    }
  };

  const columns = getColumns({
    handleEdit,
    canManageActions: canEditData,
    handleDelete: (item) => {
      setSelectedItem(item);
      setDeleteOpen(true);
    },
  });

  return (
    <>
      <DataTable
        columns={columns}
        data={sportsFinancing}
        searchKey="associationName"
        enableRowSelection={canEditData}
        onBulkDelete={handleBulkDelete}
        exportRoute="sport-financing"
      />

      <SportsFinancingDialogs />
    </>
  );
}
