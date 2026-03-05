"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { PiaStudentsType } from "@/db/schema";
import type { ColumnDef } from "@tanstack/react-table";
import { Edit, MoreHorizontal, Trash2 } from "lucide-react";

interface PiaStudentsColumnsProps {
  handleEdit: (item: PiaStudentsType) => void;
  handleDelete: (item: PiaStudentsType) => void;
  canManageActions: boolean;
}

export const getColumns = ({
  handleEdit,
  handleDelete,
  canManageActions,
}: PiaStudentsColumnsProps): ColumnDef<PiaStudentsType>[] => {
  const columns: ColumnDef<PiaStudentsType>[] = [
    {
      accessorKey: "department",
      header: "Department",
    },
    {
      accessorKey: "year",
      header: "Academic Year",
    },
    {
      accessorKey: "male",
      header: "Male",
      cell: ({ row }) => new Intl.NumberFormat().format(row.getValue("male")),
    },
    {
      accessorKey: "female",
      header: "Female",
      cell: ({ row }) =>
        new Intl.NumberFormat().format(row.getValue("female")),
    },
    {
      accessorKey: "enrolled",
      header: "Enrolled",
      cell: ({ row }) =>
        new Intl.NumberFormat().format(row.getValue("enrolled")),
    },
    {
      accessorKey: "graduated",
      header: "Graduated",
      cell: ({ row }) =>
        new Intl.NumberFormat().format(row.getValue("graduated")),
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
