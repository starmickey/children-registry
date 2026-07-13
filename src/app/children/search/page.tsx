import { Card, CardContent } from "@/components/ui/card";
import { Item } from "@/components/ui/item";
import { fetchChildrenService } from "@/features/children/services/getChildResume";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export default async function Page() {
  const children = await fetchChildrenService();

  return (
    <div className="base-layout list-layout">
      <header className="flex mb-4">
        <h1 className="title flex-1">Children</h1>
        <Button variant="ghost">
          <Search />
        </Button>
      </header>
      <main>
        <Card size="sm">
          <CardContent className="px-0">
            {children.map((child, idx) => (
              <div key={child.id}>
                <Item className="px-(--card-spacing)">
                  {child.firstName} {child.lastName}
                </Item>

                {idx !== children.length - 1 && <Separator />}
              </div>
            ))}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
