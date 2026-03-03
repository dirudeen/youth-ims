"use client";

import { DataTable } from "@/components/data-table";
import { getColumns } from "./youth-migration-columns";
import { YouthMigrationDialogs } from "./youth-migration-dialogs";

import type { YouthMigrationType } from "@/db/schema";
import { bulkDeleteYouthMigration } from "@/server/actions/youth-migration";
import { useYouthMigrationStore } from "@/store/youth-migration-store";
import { toast } from "sonner";

interface YouthMigrationClientProps {
  youthMigration: YouthMigrationType[];
  canEditData: boolean;
}

export function YouthMigrationTable({
  youthMigration,
  canEditData,
}: YouthMigrationClientProps) {
  const { setSelectedItem, setEditOpen, setDeleteOpen } =
    useYouthMigrationStore();

  const handleEdit = (item: YouthMigrationType) => {
    setSelectedItem(item);
    setEditOpen(true);
  };

  const handleBulkDelete = async (selectedRows: YouthMigrationType[]) => {
    const records = selectedRows.map((row) => ({
      id: row.id,
      version: row.version,
    }));
    const res = await bulkDeleteYouthMigration(records);
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
        data={youthMigration}
        searchKey="origin"
        enableRowSelection={canEditData}
        onBulkDelete={handleBulkDelete}
        exportRoute="youth-migration"
      />

      <YouthMigrationDialogs />
    </>
  );
}
