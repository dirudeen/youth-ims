"use client";

import { DataTable } from "@/components/data-table";
import { getColumns } from "./pia-students-columns";
import { PiaStudentsDialogs } from "./pia-students-dialogs";
import type { PiaStudentsType } from "@/db/schema";
import { bulkDeletePiaStudents } from "@/server/actions/pia-students";
import { usePiaStudentsStore } from "@/store/pia-students-store";
import { toast } from "sonner";

interface PiaStudentsTableProps {
  piaStudents: PiaStudentsType[];
  canEditData: boolean;
}

export function PiaStudentsTable({
  piaStudents,
  canEditData,
}: PiaStudentsTableProps) {
  const { setSelectedItem, setEditOpen, setDeleteOpen } = usePiaStudentsStore();

  const handleEdit = (item: PiaStudentsType) => {
    setSelectedItem(item);
    setEditOpen(true);
  };

  const handleBulkDelete = async (selectedRows: PiaStudentsType[]) => {
    const records = selectedRows.map((row) => ({
      id: row.id,
      version: row.version,
    }));
    const res = await bulkDeletePiaStudents(records);

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
        data={piaStudents}
        searchKey="department"
        enableRowSelection={canEditData}
        onBulkDelete={handleBulkDelete}
        exportRoute="pia-students"
      />
      <PiaStudentsDialogs />
    </>
  );
}
