import Link from "next/link";
import { Button } from "@/components/ui/button";
import { searchChildrenService } from "../children.service";

export default async function ChildrenList({
  searchString,
  classroomFilter,
}: {
  searchString?: string;
  classroomFilter?: number;
}) {
  const children = await searchChildrenService({
    search: searchString,
    classroomId: classroomFilter,
  });

  if (children.length == 0) {
    return (
      <section className="bg-secondary text-secondary-foreground rounded-lg">
        <p className="px-8 py-12 text-center">No se encontraron personas</p>
      </section>
    );
  }

  return (
    <section className="flex flex-col gap-1">
      {children.map((child) => (
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
      ))}
    </section>
  );
}
