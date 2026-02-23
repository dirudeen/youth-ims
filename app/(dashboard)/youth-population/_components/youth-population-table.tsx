"use client";

import { DataTable } from "@/components/data-table";
import { useToast } from "@/hooks/use-toast";
import { optimisticUpdate } from "@/lib/optimistic-updates";
import { useState } from "react";
import { getColumns } from "./youth-population-columns";
import { YouthPopulationDialogs } from "./youth-population-dialogs";

import type { YouthPopulationType } from "@/db/schema";
import { useYouthPopulationStore } from "@/store/youth-population-store";

interface YouthPopulationClientProps {
  youthPopulation: YouthPopulationType[];
  canEditData: boolean;
}

export function YouthPopulationTable({
  youthPopulation,
  canEditData,
}: YouthPopulationClientProps) {
  const { data, setData, setSelectedItem, setEditOpen, setDeleteOpen } =
    useYouthPopulationStore();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    lga: "",
    totalPopulation: "",
    youthPopulation: "",
    youthShare: "",
    maleYouth: "",
    femaleYouth: "",
    urbanYouth: "",
    ruralYouth: "",
  });

  const handleEdit = (item: YouthPopulationType) => {
    setSelectedItem(item);
    setEditOpen(true);
  };

  const handleBulkDelete = async (selectedRows: YouthPopulationType[]) => {
    const ids = selectedRows.map((row) => ({ id: row.id }));

    const { success, error } = await optimisticUpdate(
      "youth_population",
      "delete",
      ids as any,
      data,
      setData,
      (item) => ({
        id: item.id.toString(),
        lga: item.lga,
        totalPopulation: item.total_population,
        youthPopulation: item.youth_population,
        youthShare: item.youth_share,
        maleYouth: item.male_youth,
        femaleYouth: item.female_youth,
        urbanYouth: item.urban_youth,
        ruralYouth: item.rural_youth,
      }),
    );

    if (success) {
      toast({
        title: "Success",
        description: `Successfully deleted ${selectedRows.length} ${selectedRows.length === 1 ? "entry" : "entries"}`,
      });
      // trackActivity("Delete", "Youth Population", `Bulk deleted ${selectedRows.length} entries`)
    } else {
      toast({
        variant: "destructive",
        title: "Error deleting data",
        description: error,
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
        data={youthPopulation}
        searchKey="lga"
        // filename="youth-population-data"
        enableRowSelection={canEditData}
        onBulkDelete={handleBulkDelete}
      />

      <YouthPopulationDialogs />
    </>
  );
}
