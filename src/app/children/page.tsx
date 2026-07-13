import { Card, CardContent } from "@/components/ui/card";
import { Item } from "@/components/ui/item";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { searchChildrenService } from "@/features/children/services/searchChildren";
import FetchChildHeader from "@/features/children/components/FetchChildHeader";

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
        <Card size="sm">
          <CardContent className="px-0">
            {children.length > 0 ? (
              children.map((child, idx) => (
                <div key={child.id}>
                  <Link href={`/children/${child.id}/resume`}>
                    <Item className="px-(--card-spacing)" role="button">
                      {child.firstName} {child.lastName}
                    </Item>
                  </Link>

                  {idx !== children.length - 1 && <Separator />}
                </div>
              ))
            ) : (
              <div className="p-8 text-center">No se encontraron personas</div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
