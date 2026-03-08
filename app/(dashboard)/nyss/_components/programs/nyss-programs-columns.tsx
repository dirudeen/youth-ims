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
import type { NyssProgramsType } from "@/db/schema";
import type { ColumnDef } from "@tanstack/react-table";
import { Edit, MoreHorizontal, Trash2 } from "lucide-react";

interface NyssProgramsColumnsProps {
  handleEdit: (item: NyssProgramsType) => void;
  handleDelete: (item: NyssProgramsType) => void;
  canManageActions: boolean;
}

function getSectorColor(sector: string) {
  const colors: Record<string, string> = {
    "Business & Entrepreneurship": "bg-blue-100 text-blue-800 border-blue-200",
    "Information Technology": "bg-indigo-100 text-indigo-800 border-indigo-200",
    Agriculture: "bg-green-100 text-green-800 border-green-200",
    "Tourism & Hospitality": "bg-orange-100 text-orange-800 border-orange-200",
    Healthcare: "bg-red-100 text-red-800 border-red-200",
    "Renewable Energy": "bg-emerald-100 text-emerald-800 border-emerald-200",
    "Technical Skills": "bg-gray-100 text-gray-800 border-gray-200",
    "Creative Industries": "bg-purple-100 text-purple-800 border-purple-200",
    Construction: "bg-yellow-100 text-yellow-800 border-yellow-200",
  };
  return colors[sector] ?? "bg-gray-100 text-gray-800 border-gray-200";
}

export const getColumns = ({
  handleEdit,
  handleDelete,
  canManageActions,
}: NyssProgramsColumnsProps): ColumnDef<NyssProgramsType>[] => {
  const columns: ColumnDef<NyssProgramsType>[] = [
    {
      accessorKey: "programName",
      header: "Program Name",
      cell: ({ row }) => (
        <div className="max-w-56 truncate" title={row.original.programName}>
          {row.original.programName}
        </div>
      ),
    },
    { accessorKey: "institution", header: "Institution" },
    { accessorKey: "year", header: "Year" },
    { accessorKey: "region", header: "Region" },
    {
      accessorKey: "sector",
      header: "Sector",
      cell: ({ row }) => (
        <Badge variant="outline" className={getSectorColor(row.original.sector ?? "")}>
          {row.original.sector}
        </Badge>
      ),
    },
    {
      accessorKey: "totalGraduates",
      header: "Total",
      cell: ({ row }) =>
        new Intl.NumberFormat().format(Number(row.original.totalGraduates ?? 0)),
    },
    {
      accessorKey: "maleGraduates",
      header: "Male",
      cell: ({ row }) =>
        new Intl.NumberFormat().format(Number(row.original.maleGraduates ?? 0)),
    },
    {
      accessorKey: "femaleGraduates",
      header: "Female",
      cell: ({ row }) =>
        new Intl.NumberFormat().format(Number(row.original.femaleGraduates ?? 0)),
    },
    {
      accessorKey: "employmentRate",
      header: "Employment %",
      cell: ({ row }) => `${Number(row.original.employmentRate ?? 0).toFixed(1)}%`,
    },
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

