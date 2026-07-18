import FetchChildHeader from "@/features/children/components/FetchChildHeader";
import ChildrenList from "@/features/children/components/ChildrenList";
import { ChildrenListSkeleton } from "@/features/children/components/ChildrenListSkeleton";
import { Suspense } from "react";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>;
}) {
  const { search: searchString } = await searchParams;

  return (
    <>
      <FetchChildHeader />
      <main className="container">
        <Suspense fallback={<ChildrenListSkeleton />}>
          <ChildrenList searchString={searchString} />
        </Suspense>
      </main>
    </>
  );
}
