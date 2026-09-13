import { getRegisteredChildrenByYear } from "@/features/children/services/getRegisteredChildrenByYear";
import { generateExcel } from "@/lib/generate-excel";
import { NextResponse } from "next/server";

export async function GET() {
  const rows = await getRegisteredChildrenByYear();

  const buffer = await generateExcel({
    worksheets: [
      {
        name: "Alumnos",
        columns: [
          { header: "ID", key: "id", width: 10 },
          { header: "Nombre", key: "firstName", width: 20 },
          { header: "Apellido", key: "lastName", width: 20 },
          { header: "Cumpleaños", key: "birthDate", width: 10 },
          { header: "Sede", key: "classroomName", width: 20 },
        ],
        rows,
      },
    ],
  });

  return new NextResponse(buffer, {
    status: 200,
    headers: {
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment`,
    },
  });
}
