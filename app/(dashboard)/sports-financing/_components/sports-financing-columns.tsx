"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { SportsFinancingType } from "@/db/schema";
import type { ColumnDef } from "@tanstack/react-table";
import { Edit, MoreHorizontal, Trash2 } from "lucide-react";

interface SportsFinancingColumnsProps {
  handleEdit: (item: SportsFinancingType) => void;
  handleDelete: (item: SportsFinancingType) => void;
  canManageActions: boolean;
}

export const getColumns = ({
  handleEdit,
  handleDelete,
  canManageActions,
}: SportsFinancingColumnsProps): ColumnDef<SportsFinancingType>[] => {
  const columns: ColumnDef<SportsFinancingType>[] = [
    {
      accessorKey: "associationName",
      header: "Association/Federation",
    },
    {
      accessorKey: "amount",
      header: "Amount (D)",
      cell: ({ row }) => {
        const amount = Number(row.getValue("amount") as string);
        return `D${amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
      },
    },
    {
      accessorKey: "year",
      header: "Year",
    },
    {
      accessorKey: "period",
      header: "Period",
    },
  ];

  if (canManageActions) {
    columns.push({
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const item = row.original;
        return (
          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleEdit(item)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-destructive"
                  onClick={() => handleDelete(item)}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    });
  }

  return columns;
};
