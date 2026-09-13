import { Button } from "@/components/ui/button";
import { ChildrenClassroomFilters } from "@/features/children/components/ChildrenClassroomFilters";
import ChildrenList from "@/features/children/components/ChildrenList";
import ChildrenSearchInput from "@/features/children/components/ChildrenSearchInput";
import ChildrenFetchAllRegisteredButton from "@/features/children/components/ChildrenFetchAllRegisteredButton";
import { getClassroomsByYear } from "@/features/children/services/getClassroomsByYear";
import { getRegisteredChildrenByYear } from "@/features/children/services/getRegisteredChildrenByYear";
import { Plus } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import z from "zod";
import { Typography } from "@/components/ui/typography";
import Header from "@/components/layout/header";

const currentYear = () => new Date().getFullYear();

const searchParamsSchema = z.object({
  q: z
    .string()
    .optional()
    .transform((q) => q?.trim()),
  cr: z.coerce.number().min(1).optional(),
  y: z.coerce.number().min(1).optional().default(currentYear()),
  ya: z.coerce.boolean().default(false),
});

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<z.input<typeof searchParamsSchema>>;
}) {
  const parseResult = searchParamsSchema.safeParse(await searchParams);

  if (!parseResult.success) {
    redirect("/children");
  }

  const year = parseResult.data.y;
  const classroomId = parseResult.data.cr;
  const searchQuery = parseResult.data.q;
  const showAllYears = parseResult.data.ya;

  const [children, classrooms] = await Promise.all([
    getRegisteredChildrenByYear({
      searchQuery,
      classroomId,
      year: !showAllYears ? year : undefined,
    }),
    getClassroomsByYear(year),
  ]);

  return (
    <main className="page">
      <Header className="flex-wrap">
        <Typography
          variant="H1"
          className={searchQuery != null ? "hidden sm:block" : ""}
        >
          Infancia Misionera
        </Typography>

        <ChildrenSearchInput
          className={`ml-auto ${searchQuery != null ? "flex-1 sm:flex-0" : ""}`}
        />

        <Link aria-label="Registrar niño" href="/children/new">
          <Button aria-hidden="true" variant="ghost" size="icon" type="button">
            <Plus />
          </Button>
        </Link>

        <ChildrenClassroomFilters
          activeId={classroomId}
          classrooms={classrooms}
          className="w-full sm:w-auto sm:ml-8"
        />
      </Header>

      <ChildrenList childItems={children} />

      {searchQuery && !showAllYears && <ChildrenFetchAllRegisteredButton />}
    </main>
  );
}
