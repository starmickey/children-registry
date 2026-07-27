
import Header from "@/components/layout/header";
import { ButtonSkeleton } from "@/components/ui/skeleton";

export default function PageSkeleton() {
  return (
    <>
      <main className="container">
        {/* Filters */}
        <Header className="justify-end gap-2">
          <ButtonSkeleton size="default" className="w-8" />
          <ButtonSkeleton size="default" className="w-8" />
        </Header>

        <ButtonSkeleton size="lg" className="mb-4 w-full" />
        {/* Children list */}
        <div className="flex flex-col gap-1">
          {Array.from({ length: 15 }).map((_, key) => (
            <ButtonSkeleton key={key} size="lg" />
          ))}
        </div>
      </main>
    </>
  );
}
