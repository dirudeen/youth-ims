export type ExportColumn<T> = {
  key: keyof T;
  header: string;
  required?: boolean;
  transform?: (value: any, row: T) => any;
};

export type ExportFormat = "csv" | "xlsx" | "pdf";

export type ExportConfig<T> = {
  columns: ExportColumn<T>[];
  excludeFields?: (keyof T)[];
};
