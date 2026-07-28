import Header, { ReturnButton } from "@/components/layout/header";
import { Badge } from "@/components/ui/badge";
import { Typography } from "@/components/ui/typography";
import ChildContactsList from "@/features/children/components/ChildContactsList";
import ChildDiseasesList from "@/features/children/components/ChildDeseasesList";
import ChildGeneralDataCard from "@/features/children/components/ChildGeneralDataCard";
import ChildPermissionList from "@/features/children/components/ChildPermissionList";
import ChildPinsList from "@/features/children/components/ChildPinsList";
import { getChildResume } from "@/features/children/services/getChildResume";
import { notFound } from "next/navigation";
import z from "zod";

export default async function ResumePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const parsing = z.coerce.number().safeParse(id);

  if (!parsing.success) {
    return notFound();
  }

  const childId = parsing.data;

  const child = await getChildResume(childId);

  if (!child) {
    notFound();
  }

  return (
    <>
      <Header className="justify-between">
        <ReturnButton href="/children" />
        <Badge>{child.classroomName}</Badge>
      </Header>

      <main className="container">
        <Typography level="h1" variant="main-title">
          {child.fullName}
        </Typography>

        <section className="grid grid-cols-1 gap-4 w-full">
          <ChildGeneralDataCard child={child} />

          {child.contacts.length > 0 && (
            <ChildContactsList contacts={child.contacts} />
          )}

          <ChildPinsList
            pins={child.pins}
            firstClassDate={child.firstClassDate}
          />

          <ChildPermissionList permissions={child.permissions} />

          <ChildDiseasesList diseases={child.diseases} />
        </section>
      </main>
    </>
  );
}
