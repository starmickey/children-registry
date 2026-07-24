import Header from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import ChildrenClassroomFilters from "@/features/children/components/ChildrenClassroomFilters";
import ChildrenList from "@/features/children/components/ChildrenList";
import { ChildrenListSkeleton } from "@/features/children/components/ChildrenListSkeleton";
import SearchChildrenInput from "@/features/children/components/SearchChildrenInput";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ search?: string, cr?: number }>;
}) {
  const { search: searchString , cr: classroomId } = await searchParams;

  const classroomFilter = classroomId ? Number(classroomId) : undefined

  return (
    <>
      <Header>
        <SearchChildrenInput />
        <Link href="/children/new">
          <Button variant="ghost" size="icon" type="button">
            <Plus />
          </Button>
        </Link>
      </Header>

      <main className="container">
        <Suspense fallback={<ChildrenListSkeleton />}>
          <ChildrenClassroomFilters activeId={classroomFilter} />

          <ChildrenList searchString={searchString} classroomFilter={classroomFilter} />
        </Suspense>
      </main>
    </>
  );
}
