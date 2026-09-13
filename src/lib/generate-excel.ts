import ExcelJS from "exceljs";

export interface WorksheetConfig<T> {
  name: string;
  columns: Partial<ExcelJS.Column>[];
  rows: T[];
}

interface GenerateExcelOptions<T> {
  worksheets: WorksheetConfig<T>[];
  fileName?: string;
}

export async function generateExcel<T>({
  worksheets,
}: GenerateExcelOptions<T>) {
  const workbook = new ExcelJS.Workbook();

  worksheets.forEach(({ name, columns, rows }) => {
    const worksheet = workbook.addWorksheet(name);

    // Set columns definition & headers
    worksheet.columns = columns;

    // Apply header styling to Row 1
    const headerRow = worksheet.getRow(1);
    headerRow.font = { bold: true, color: { argb: "FFFFFF" } };
    headerRow.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "0070C0" },
    };

    // Append data rows
    worksheet.addRows(rows);
  });

  // Write binary stream buffer
  const buffer = await workbook.xlsx.writeBuffer();

  return buffer;
}
