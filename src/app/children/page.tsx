import SearchChildrenInput from "@/features/children/components/SearchChildrenInput";
import ChildrenList from "@/features/children/components/ChildrenList";
import { ChildrenListSkeleton } from "@/features/children/components/ChildrenListSkeleton";
import { Suspense } from "react";
import Header from "@/components/layout/header";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>;
}) {
  const { search: searchString } = await searchParams;

  return (
    <>
      <Header>
        <SearchChildrenInput />
      </Header>
      
      <main className="container">
        <Suspense fallback={<ChildrenListSkeleton />}>
          <ChildrenList searchString={searchString} />
        </Suspense>
      </main>
    </>
  );
}
