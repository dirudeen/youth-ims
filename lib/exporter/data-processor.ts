import { ExportConfig } from "./types";

export function processExportData<T extends Record<string, any>>(
  data: T[],
  config: ExportConfig<T>,
) {
  const { columns, excludeFields = [] } = config;

  const activeColumns = columns.filter(
    (col) => !excludeFields.includes(col.key),
  );

  // Required validation
  for (const col of activeColumns) {
    if (col.required) {
      const missing = data.some(
        (row) => row[col.key] === null || row[col.key] === undefined,
      );

      if (missing) {
        throw new Error(
          `Required column "${String(col.key)}" contains missing values.`,
        );
      }
    }
  }

  const headers = activeColumns.map((col) => col.header);

  const rows = data.map((row) =>
    activeColumns.map((col) =>
      col.transform ? col.transform(row[col.key], row) : row[col.key],
    ),
  );

  return { headers, rows };
}
