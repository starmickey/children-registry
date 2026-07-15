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
    <div className="base-layout list-layout">
      <FetchChildHeader />
      <main>
        <section className="flex flex-col gap-2">
          {children.length > 0 ? (
            children.map((child) => (
              <div key={child.id}>
                <Link href={`/children/${child.id}/resume`}>
                  <Button
                    variant="outline"
                    type="button"
                    className="w-full justify-start"
                    size="lg"
                  >
                    {child.firstName} {child.lastName}
                  </Button>
                </Link>

                {/* {idx !== children.length - 1 && <Separator />} */}
              </div>
            ))
          ) : (
            <div className="p-8 text-center">No se encontraron personas</div>
          )}
        </section>
      </main>
    </div>
  );
}
