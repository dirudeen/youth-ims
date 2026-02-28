import PDFDocument from "pdfkit";

export async function buildPdf(
  headers: string[],
  rows: any[][],
): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({
        margin: 40,
        size: "A4",
      });

      const buffers: Buffer[] = [];
      doc.on("data", buffers.push.bind(buffers));
      doc.on("end", () => resolve(Buffer.concat(buffers)));
      doc.on("error", reject);

      const pageWidth =
        doc.page.width - doc.page.margins.left - doc.page.margins.right;

      const columnWidth = pageWidth / headers.length;
      let y = doc.y;

      // Title
      doc.fontSize(16).text("Report", { align: "left" });
      doc.moveDown();

      // Header Row
      doc.fontSize(10).font("Helvetica-Bold");

      headers.forEach((header, i) => {
        doc.text(header, doc.page.margins.left + i * columnWidth, y, {
          width: columnWidth,
          align: "left",
        });
      });

      y += 20;

      doc.font("Helvetica");

      // Rows
      for (const row of rows) {
        if (y > doc.page.height - 50) {
          doc.addPage();
          y = doc.y;
        }

        row.forEach((cell, i) => {
          doc.text(
            cell !== null && cell !== undefined ? String(cell) : "",
            doc.page.margins.left + i * columnWidth,
            y,
            {
              width: columnWidth,
              align: "left",
            },
          );
        });

        y += 18;
      }

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
}
