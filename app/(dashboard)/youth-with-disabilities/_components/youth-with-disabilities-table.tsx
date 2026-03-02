"use client";

import { DataTable } from "@/components/data-table";
import { getColumns } from "./youth-with-disabilities-columns";
import { YouthWithDisabilitiesDialogs } from "./youth-with-disabilities-dialogs";

import type { YouthWithDisabilitiesType } from "@/db/schema";
import { useYouthWithDisabilitiesStore } from "@/store/youth-with-disabilities-store";

interface YouthWithDisabilitiesClientProps {
  youthWithDisabilities: YouthWithDisabilitiesType[];
  canEditData: boolean;
}

export function YouthWithDisabilitiesTable({
  youthWithDisabilities,
  canEditData,
}: YouthWithDisabilitiesClientProps) {
  const { setSelectedItem, setEditOpen, setDeleteOpen } =
    useYouthWithDisabilitiesStore();

  const handleEdit = (item: YouthWithDisabilitiesType) => {
    setSelectedItem(item);
    setEditOpen(true);
  };

  const handleBulkDelete = async (
    selectedRows: YouthWithDisabilitiesType[],
  ) => {
    const records = selectedRows.map((row) => ({
      id: row.id,
      version: row.version,
    }));
    // const res = await bulkDeleteYouthPopulation(records);
    // if (res.success) {
    //   toast("Success", {
    //     description: `${res.deleted} record${res.deleted === 1 ? "" : "s"} deleted successfully.`,
    //     richColors: true,
    //   });
    // } else {
    //   toast.error("Error", {
    //     description: res.message,
    //     richColors: true,
    //   });
    // }
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
        data={youthWithDisabilities}
        searchKey="ageGroup"
        enableRowSelection={canEditData}
        onBulkDelete={handleBulkDelete}
        exportRoute="youth-with-disabilities"
      />

      <YouthWithDisabilitiesDialogs />
    </>
  );
}
