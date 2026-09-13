import { Button } from "@/components/ui/button";
import { ChildrenClassroomFilters } from "@/features/children/components/ChildrenClassroomFilters";
import ChildrenList from "@/features/children/components/ChildrenList";
import ChildrenSearchInput from "@/features/children/components/ChildrenSearchInput";
import ChildrenFetchAllRegisteredButton from "@/features/children/components/ChildrenFetchAllRegisteredButton";
import { getClassroomsByYear } from "@/features/children/services/getClassroomsByYear";
import { getRegisteredChildrenByYear } from "@/features/children/services/getRegisteredChildrenByYear";
import { DownloadIcon, Plus } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import z from "zod";
import { Typography } from "@/components/ui/typography";
import Header from "@/components/layout/header";
import { headers } from "next/headers";
import ChildrenDataTable from "@/features/children/components/ChildrenDataTable/table";
import { DownloadChildListExcelButton as DownloadExcelButton } from "@/features/children/components/DownloadChildListExcelButton";

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
  // 1. Determine if it is a mobile phone
  const headersList = await headers();
  const userAgent = headersList.get("user-agent") || "";

  // Basic regex check for mobile user agents
  const isMobile = /mobile|android|iphone|ipad|ipod/i.test(userAgent);

  // 2. Validate parameters
  const parseResult = searchParamsSchema.safeParse(await searchParams);

  if (!parseResult.success) {
    redirect("/children");
  }

  // 3. Fetch data
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

        <DownloadExcelButton>
          <Button variant="ghost" size="icon" type="button">
            <DownloadIcon />
          </Button>
        </DownloadExcelButton>

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

      {isMobile ? (
        <ChildrenList childItems={children} />
      ) : (
        <ChildrenDataTable childItems={children} />
      )}

      {searchQuery && !showAllYears && <ChildrenFetchAllRegisteredButton />}
    </main>
  );
}
