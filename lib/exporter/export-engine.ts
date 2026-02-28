import { processExportData } from "./data-processor";
import { buildCsv, buildXlsx } from "./excel-builder";
import { buildPdf } from "./pdf-builder";
import { ExportConfig } from "./types";

export async function exportData<T extends Record<string, any>>({
  queryFn,
  config,
  format,
}: {
  queryFn: () => Promise<T[]>;
  config: ExportConfig<T>;
  format: "csv" | "xlsx" | "pdf";
}): Promise<{ data: Buffer | string; mime: string; filename: string }> {
  try {
    const rawData = await queryFn();

    if (!rawData.length) {
      throw new Error("No data available for export.");
    }

    const { headers, rows } = processExportData(rawData, config);

    switch (format) {
      case "csv":
        return {
          data: buildCsv(headers, rows),
          mime: "text/csv",
          filename: "export.csv",
        };

      case "xlsx":
        return {
          data: buildXlsx(headers, rows),
          mime: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          filename: "export.xlsx",
        };

      case "pdf":
        return {
          data: await buildPdf(headers, rows),
          mime: "application/pdf",
          filename: "export.pdf",
        };

      default:
        throw new Error("Unsupported export format.");
    }
  } catch (error) {
    console.error("Export error:", error);
    throw new Error("Failed to export data.");
  }
}
