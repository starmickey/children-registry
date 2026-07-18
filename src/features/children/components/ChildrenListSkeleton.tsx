import { ButtonSkeleton } from "@/components/ui/skeleton";

export function ChildrenListSkeleton() {
  return (
    <div className="flex flex-col gap-1">
      {Array.from({ length: 15 }).map((_, key) => (
        <ButtonSkeleton key={key} size="lg" />
      ))}
    </div>
  );
}
