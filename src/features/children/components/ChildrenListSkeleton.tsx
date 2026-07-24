import { ButtonSkeleton } from "@/components/ui/skeleton";

export function ChildrenListSkeleton() {
  return (
    <>
      {/* Filters */}
      <ButtonSkeleton size="lg" className="mb-4" />

      {/* Children list */}
      <div className="flex flex-col gap-1">
        {Array.from({ length: 15 }).map((_, key) => (
          <ButtonSkeleton key={key} size="lg" />
        ))}
      </div>
    </>
  );
}
