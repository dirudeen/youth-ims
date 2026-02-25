import * as XLSX from "xlsx";

export function parseSpreadsheet(buffer: Buffer, fileName: string) {
  const workbook = XLSX.read(buffer, {
    type: "buffer",
    raw: false,
  });

  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];

  return XLSX.utils.sheet_to_json<Record<string, any>>(worksheet, {
    defval: null,
  });
}
