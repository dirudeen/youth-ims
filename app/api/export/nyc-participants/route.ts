export const runtime = "nodejs";

import { db } from "@/db";
import { nycParticipants } from "@/db/schema";
import { nycParticipantsExportConfig } from "@/feature/export/config";
import { exportData } from "@/lib/exporter/export-engine";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const format = searchParams.get("format") as "csv" | "xlsx" | "pdf";

  try {
    const result = await exportData({
      queryFn: async () => await db.select().from(nycParticipants),
      config: nycParticipantsExportConfig as any,
      format,
    });

    return new Response(result.data as any, {
      headers: {
        "Content-Type": result.mime,
        "Content-Disposition": `attachment; filename=${result.filename}`,
      },
    });
  } catch {
    return new Response(JSON.stringify({ message: "Export failed." }), {
      status: 500,
    });
  }
}
