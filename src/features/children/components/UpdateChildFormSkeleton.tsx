import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Item, ItemContent, ItemMedia, ItemTitle } from "@/components/ui/item";
import { Skeleton } from "@/components/ui/skeleton";
import Header, { ReturnButton } from "@/components/layout/header";

export default function UpdateChildFormSkeleton() {
  return (
    <main className="page">
      <Header className="justify-between">
        <ReturnButton href="/children" />
      </Header>

      <section className="flex flex-col gap-6 section-sm">
        <Card>
          <CardHeader>
            <CardTitle>
              <Skeleton className="h-4 w-2/3 bg-muted-dark" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Item size="sm">
              <ItemMedia variant="icon">
                <Skeleton className="h-4 w-4 bg-muted-dark rounded-full" />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>
                  <Skeleton className="h-4 w-24 bg-muted-dark" />
                </ItemTitle>
              </ItemContent>
            </Item>
            <Item size="sm">
              <ItemMedia variant="icon">
                <Skeleton className="h-4 w-4 bg-muted-dark rounded-full" />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>
                  <Skeleton className="h-4 w-24 bg-muted-dark" />
                </ItemTitle>
              </ItemContent>
            </Item>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle role="heading" aria-level={2}>
              <Skeleton className="h-4 w-2/3 bg-muted-dark" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            {Array.from({ length: 3 }).map((_, idx) => (
              <Item key={idx}>
                <ItemMedia variant="icon">
                  <Skeleton className="h-4 w-4 bg-muted-dark rounded-full" />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>
                    <Skeleton className="h-4 w-38 bg-muted-dark" />
                  </ItemTitle>
                  <Skeleton className="h-3 w-28 bg-muted-dark" />
                </ItemContent>
                <ItemMedia variant="icon">
                  <Skeleton className="h-4 w-4 bg-muted-dark rounded-full" />
                </ItemMedia>
                <ItemMedia variant="icon">
                  <Skeleton className="h-4 w-4 bg-muted-dark rounded-full" />
                </ItemMedia>
              </Item>
            ))}
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
