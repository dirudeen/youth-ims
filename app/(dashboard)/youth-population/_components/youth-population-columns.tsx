"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { YouthPopulationType } from "@/db/schema";
import type { ColumnDef } from "@tanstack/react-table";
import { Edit, MoreHorizontal, Trash2 } from "lucide-react";

interface YouthPopulationColumnsProps {
  handleEdit: (item: YouthPopulationType) => void;
  handleDelete: (item: YouthPopulationType) => void;
  canManageActions: boolean;
}

export const getColumns = ({
  handleEdit,
  handleDelete,
  canManageActions,
}: YouthPopulationColumnsProps): ColumnDef<YouthPopulationType>[] => {
  const columns: ColumnDef<YouthPopulationType>[] = [
    {
      accessorKey: "lga",
      header: "LGA",
    },
    {
      accessorKey: "totalPopulation",
      header: "Total Population",
      cell: ({ row }) => {
        return new Intl.NumberFormat().format(row.getValue("totalPopulation"));
      },
    },
    {
      accessorKey: "youthPopulation",
      header: "Youth Population",
      cell: ({ row }) => {
        return new Intl.NumberFormat().format(row.getValue("youthPopulation"));
      },
    },
    {
      accessorKey: "youthShare",
      header: "Youth Share (%)",
    },
    {
      accessorKey: "maleYouth",
      header: "Male Youth",
      cell: ({ row }) => {
        return new Intl.NumberFormat().format(row.getValue("maleYouth"));
      },
    },
    {
      accessorKey: "femaleYouth",
      header: "Female Youth",
      cell: ({ row }) => {
        return new Intl.NumberFormat().format(row.getValue("femaleYouth"));
      },
    },
    {
      accessorKey: "urbanYouth",
      header: "Urban Youth",
      cell: ({ row }) => {
        return new Intl.NumberFormat().format(row.getValue("urbanYouth"));
      },
    },
    {
      accessorKey: "ruralYouth",
      header: "Rural Youth",
      cell: ({ row }) => {
        return new Intl.NumberFormat().format(row.getValue("ruralYouth"));
      },
    },
    {
      accessorKey: "year",
      header: "Year",
      cell: ({ row }) => {
        const year = row.getValue<number>("year");

        if (!year) return "-";

        return year.toString();
      },
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
