import Header from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { ChildrenClassroomFilters } from "@/features/children/components/ChildrenClassroomFilters";
import ChildrenList from "@/features/children/components/ChildrenList";
import ChildrenSearchInput from "@/features/children/components/ChildrenSearchInput";
import { getClassroomsByYear } from "@/features/children/services/getClassroomsByYear";
import { getRegisteredChildrenByYear } from "@/features/children/services/getRegisteredChildrenByYear";
import { Plus } from "lucide-react";
import Link from "next/link";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; cr?: number; y?: number }>;
}) {
  const params = await searchParams;

  const year = params.y ? Number(params.y) : new Date().getFullYear();
  const classroomId = params.cr ? Number(params.cr) : undefined;
  const searchQuery = params.q?.trim() || undefined;

  const [children, classrooms] = await Promise.all([
    getRegisteredChildrenByYear({
      searchQuery,
      classroomId,
      year,
    }),
    getClassroomsByYear(year),
  ]);

  return (
    <>
      <Header>
        <ChildrenSearchInput />
        <Link href="/children/new">
          <Button variant="ghost" size="icon" type="button">
            <Plus />
          </Button>
        </Link>
      </Header>

      <main className="container">
        <ChildrenClassroomFilters
          activeId={classroomId}
          classrooms={classrooms}
        />

        <ChildrenList childItems={children} />
      </main>
    </>
  );
}
