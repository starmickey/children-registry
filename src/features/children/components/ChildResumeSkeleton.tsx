import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import Link from "next/link";
import { ChevronLeft as ArrowLeft } from "lucide-react";
import { Skeleton, TypographySkeleton } from "@/components/ui/skeleton";

export default async function ChildResumeSkeleton() {
  return (
    <>
      <header className="header flex w-full justify-between items-center">
        <Link href="/children">
          <Button variant="ghost" size="icon-sm">
            <ArrowLeft />
          </Button>
        </Link>
      </header>

      <main className="container">
        <div className="mb-10 mt-8 ">
          <TypographySkeleton variant="main-title" />
        </div>

        <section className="grid grid-cols-1 gap-4 w-full">
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
                    <ItemDescription className="flex flex-col gap-1">
                      <Skeleton className="h-3 w-28 bg-muted-dark" />
                    </ItemDescription>
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
    </>
  );
}
