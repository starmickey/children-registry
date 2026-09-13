import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChildDto } from "../types";

export default async function ChildrenList({
  childItems,
}: {
  childItems: ChildDto[];
}) {
  if (childItems.length == 0) {
    return (
      <section className="bg-secondary text-secondary-foreground rounded-lg">
        <p className="px-8 py-12 text-center">No se encontraron personas</p>
      </section>
    );
  }

  return (
    <ul className="flex flex-col gap-1">
      {childItems.map((child) => (
        <li key={child.id}>
          <Link href={`/children/${child.id}`}>
            <Button
              variant="secondary"
              type="button"
              className="w-full justify-start truncate"
              size="lg"
            >
              {child.firstName} {child.lastName}
            </Button>
          </Link>
        </li>
      ))}
    </ul>
  );
}
