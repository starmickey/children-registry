import { createColumnHelper } from "@tanstack/react-table";
import { DataTableFeatures } from "./features";
import { RegisteredChildDto } from "../../services/getRegisteredChildrenByYear";
import { calculateAge } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

export const columnHelper = createColumnHelper<
  DataTableFeatures,
  RegisteredChildDto
>();

export const columns = columnHelper.columns([
  columnHelper.accessor("fullName", {
    header: "Nombre",
    cell: ({ row }) => (
      <Link href={`/children/${row.original.id}`}>{row.original.fullName}</Link>
    ),
  }),
  columnHelper.display({
    id: "age",
    header: "Edad",
    cell: ({ row }) => {
      const birthDate = row.original.birthDate;
      const age = birthDate ? calculateAge(birthDate) : null;
      return age && age > 0 ? age : "-";
    },
  }),
  columnHelper.accessor("classroomName", {
    header: "Sede",
  }),
  columnHelper.display({
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => (
      <Link href={`/children/${row.original.id}/edit`}>
        <Button variant="ghost" size="icon-sm">
          <Pencil />
        </Button>
      </Link>
    ),
  }),
]);
