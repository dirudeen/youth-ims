"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { NyssGraduatesType } from "@/db/schema";
import type { ColumnDef } from "@tanstack/react-table";
import { Edit, MoreHorizontal, Trash2 } from "lucide-react";

interface NyssGraduatesColumnsProps {
  handleEdit: (item: NyssGraduatesType) => void;
  handleDelete: (item: NyssGraduatesType) => void;
  canManageActions: boolean;
}

function getEmploymentStatusColor(status: string) {
  switch (status) {
    case "Employed":
      return "bg-green-100 text-green-800 border-green-200";
    case "Self-Employed":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "Seeking Employment":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "Further Education":
      return "bg-purple-100 text-purple-800 border-purple-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
}

export const getColumns = ({
  handleEdit,
  handleDelete,
  canManageActions,
}: NyssGraduatesColumnsProps): ColumnDef<NyssGraduatesType>[] => {
  const columns: ColumnDef<NyssGraduatesType>[] = [
    { accessorKey: "name", header: "Name" },
    { accessorKey: "age", header: "Age" },
    { accessorKey: "gender", header: "Gender" },
    { accessorKey: "region", header: "Region" },
    {
      accessorKey: "trainingProgram",
      header: "Training Program",
      cell: ({ row }) => (
        <div className="max-w-56 truncate" title={row.original.trainingProgram}>
          {row.original.trainingProgram}
        </div>
      ),
    },
    { accessorKey: "graduationYear", header: "Graduation Year" },
    {
      accessorKey: "employmentStatus",
      header: "Employment Status",
      cell: ({ row }) => (
        <Badge
          variant="outline"
          className={getEmploymentStatusColor(row.original.employmentStatus)}
        >
          {row.original.employmentStatus}
        </Badge>
      ),
    },
    { accessorKey: "sector", header: "Sector" },
  ];

  if (canManageActions) {
    columns.push({
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const item = row.original;
        return (
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
        );
      },
    });
  }

  return columns;
};

