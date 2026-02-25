"use server";

import { importSpreadsheet } from "@/lib/importer/import-engine";
import { youthPopulationImportConfig } from "./config";

export async function importYouthPoplationData(formData: FormData) {
  const file = formData.get("file") as File;

  return importSpreadsheet({
    file,
    config: youthPopulationImportConfig,
    path: "/youth-population",
  });
}
