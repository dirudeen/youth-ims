"use client";

import { DataTable } from "@/components/data-table";
import type { NyssGraduatesType } from "@/db/schema";
import { bulkDeleteNyssGraduates } from "@/server/actions/nyss-graduates";
import { useNyssGraduatesStore } from "@/store/nyss-graduates-store";
import { toast } from "sonner";
import { getColumns } from "./nyss-graduates-columns";
import { NyssGraduatesDialogs } from "./nyss-graduates-dialogs";

interface NyssGraduatesTableProps {
  graduates: NyssGraduatesType[];
  canEditData: boolean;
}

export function NyssGraduatesTable({
  graduates,
  canEditData,
}: NyssGraduatesTableProps) {
  const { setSelectedItem, setEditOpen, setDeleteOpen } =
    useNyssGraduatesStore();

  const handleEdit = (item: NyssGraduatesType) => {
    setSelectedItem(item);
    setEditOpen(true);
  };

  const handleBulkDelete = async (selectedRows: NyssGraduatesType[]) => {
    const res = await bulkDeleteNyssGraduates(
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
        data={graduates}
        searchKey="name"
        enableRowSelection={canEditData}
        onBulkDelete={handleBulkDelete}
        exportRoute="nyss-graduates"
      />
      <NyssGraduatesDialogs />
    </>
  );
}
