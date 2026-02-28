// excel-builder.ts
import * as XLSX from "xlsx";

export function buildCsv(headers: string[], rows: any[][]): string {
  const worksheet = XLSX.utils.aoa_to_sheet([headers, ...rows]);
  return XLSX.utils.sheet_to_csv(worksheet);
}

export function buildXlsx(headers: string[], rows: any[][]): Buffer {
  const worksheet = XLSX.utils.aoa_to_sheet([headers, ...rows]);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Export");

  return XLSX.write(workbook, {
    bookType: "xlsx",
    type: "buffer",
  });
}
