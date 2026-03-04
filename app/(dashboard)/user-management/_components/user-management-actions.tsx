"use client";
import { DataImportDialog } from "@/components/data-import-dialog";
import { Dialog } from "@/components/ui/dialog";

import { DialogTrigger } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { importYouthWithoutDisabilitiesData } from "@/feature/import-csv/action";
import { useUserManagementStore } from "@/store/user-management-store";

export function UserManagementActions() {
  const { createOpen, setCreateOpen } = useUserManagementStore();
  return (
    <div className="flex gap-2">
      {/* <DataImportDialog
        tableName="youth_without_disabilities"
        serverActionHander={importYouthWithoutDisabilitiesData}
      /> */}
      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogTrigger asChild>
          <Button className="flex items-center gap-1" variant="default">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New User
          </Button>
        </DialogTrigger>
      </Dialog>
    </div>
  );
}
