import Link from "next/link";
import { searchChildrenService } from "@/features/children/services/searchChildren";
import FetchChildHeader from "@/features/children/components/FetchChildHeader";
import { Button } from "@/components/ui/button";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ search: string }>;
}) {
  const { search: searchString } = await searchParams;
  const children = await searchChildrenService(searchString);

  return (
    <>
      <FetchChildHeader />
      <main className="container">
        <section className="flex flex-col gap-1">
          {children.length > 0 ? (
            children.map((child) => (
              <Link key={child.id} href={`/children/${child.id}/resume`}>
                <Button
                  variant="secondary"
                  type="button"
                  className="w-full justify-start"
                  size="lg"
                >
                  {child.firstName} {child.lastName}
                </Button>
              </Link>
            ))
          ) : (
            <p className="p-8 text-center">No se encontraron personas</p>
          )}
        </section>
      </main>
    </>
  );
}
