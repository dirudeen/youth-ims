"use client";

import { DataTable } from "@/components/data-table";
import type { NyssProgramsType } from "@/db/schema";
import { bulkDeleteNyssPrograms } from "@/server/actions/nyss-programs";
import { useNyssProgramsStore } from "@/store/nyss-programs-store";
import { toast } from "sonner";
import { getColumns } from "./nyss-programs-columns";
import { NyssProgramsDialogs } from "./nyss-programs-dialogs";

interface NyssProgramsTableProps {
  programs: NyssProgramsType[];
  canEditData: boolean;
}

export function NyssProgramsTable({
  programs,
  canEditData,
}: NyssProgramsTableProps) {
  const { setSelectedItem, setEditOpen, setDeleteOpen } =
    useNyssProgramsStore();

  const handleEdit = (item: NyssProgramsType) => {
    setSelectedItem(item);
    setEditOpen(true);
  };

  const handleBulkDelete = async (selectedRows: NyssProgramsType[]) => {
    const res = await bulkDeleteNyssPrograms(
      selectedRows.map((row) => ({ id: row.id, version: row.version })),
    );
    if (res.success) {
      toast.success("Success", {
        description: `${res.data.deleted} record${res.data.deleted === 1 ? "" : "s"} deleted successfully.`,
        richColors: true,
      });
    } else {
      toast.error("Error", {
        description: res.error,
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
        data={programs}
        searchKey="programName"
        enableRowSelection={canEditData}
        onBulkDelete={handleBulkDelete}
        exportRoute="nyss-programs"
      />
      <NyssProgramsDialogs />
    </>
  );
}
