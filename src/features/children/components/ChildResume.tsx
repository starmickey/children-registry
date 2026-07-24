import { getChildByIdService } from "@/features/children/children.service";
import { notFound } from "next/navigation";
import { Typography } from "@/components/ui/typography";
import ChildGeneralDataCard from "./ChildGeneralDataCard";
import ChildContactsList from "./ChildContactsList";
import ChildPinsList from "./ChildPinsList";
import ChildClassRoomBadge from "./ChildClassroomBadge";
import ChildPermissionList from "./ChildPermissionList";
import Header, { ReturnButton } from "@/components/layout/header";

export default async function ChildResume({ id }: { id: number }) {
  const child = await getChildByIdService(id);

  if (!child) {
    notFound();
  }

  return (
    <>
      <Header className="justify-between">
        <ReturnButton href="/children" />
        <ChildClassRoomBadge childId={child.id} />
      </Header>

      <main className="container">
        <Typography level="h1" variant="main-title">
          {child.firstName} {child.lastName}
        </Typography>

        <section className="grid grid-cols-1 gap-4 w-full">
            <ChildGeneralDataCard child={child} />

            <ChildContactsList childId={child.id} />

            <ChildPinsList childId={child.id} />
          
            <ChildPermissionList childId={child.id} />
        </section>
      </main>
    </>
  );
}
