import { getChildByIdService } from "@/features/children/children.service";
import { notFound } from "next/navigation";
import { Typography } from "@/components/ui/typography";
import ChildGeneralDataCard from "./ChildGeneralDataCard";
import ChildContactsList from "./ChildContactsList";
import ChildPinsList from "./ChildPinsList";
import ReturnButton from "@/components/buttons/return-button";
import ChildClassRoomBadge from "./ChildClassroomBadge";
import { CardSkeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import ChildPermissionList from "./ChildPermissionList";

export default async function ChildResume({ id }: { id: number }) {
  const child = await getChildByIdService(id);

  if (!child) {
    notFound();
  }

  return (
    <>
      <header className="header flex w-full justify-between items-center">
        <ReturnButton href="/children" />
        <ChildClassRoomBadge childId={child.id} />
      </header>

      <main className="container">
        <Typography level="h1" variant="main-title">
          {child.firstName} {child.lastName}
        </Typography>

        <section className="grid grid-cols-1 gap-4 w-full">
          <Suspense fallback={<CardSkeleton />}>
            <ChildGeneralDataCard child={child} />
          </Suspense>

          <Suspense fallback={<CardSkeleton />}>
            <ChildContactsList childId={child.id} />
          </Suspense>

          <Suspense fallback={<CardSkeleton />}>
            <ChildPinsList childId={child.id} />
          </Suspense>
          
          <Suspense fallback={<CardSkeleton />}>
            <ChildPermissionList childId={child.id} />
          </Suspense>o  
        </section>
      </main>
    </>
  );
}
