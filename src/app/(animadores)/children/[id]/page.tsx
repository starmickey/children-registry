import Header, { ReturnButton } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import ChildContactsList from "@/features/children/components/ChildContactsList";
import ChildDiseasesList from "@/features/children/components/ChildDeseasesList";
import ChildGeneralDataCard from "@/features/children/components/ChildGeneralDataCard";
import ChildPermissionList from "@/features/children/components/ChildPermissionList";
import ChildPinsList from "@/features/children/components/ChildPinsList";
import ClassroomBadge from "@/features/children/components/ClassroomBadge";
import { getChildResume } from "@/features/children/services/getChildResume";
import { Pencil } from "lucide-react";
import Link from "next/link";
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
    <main className="page">
      <Header className="justify-between">
        <ReturnButton href="/children" />

        <div className="flex gap-4 items-center">
          <Link href={`/children/${childId}/edit`}>
            <Button
              variant="ghost"
              size="icon"
              type="button"
              className="w-full"
            >
              <Pencil />
            </Button>
          </Link>

          {child.classroom && <ClassroomBadge classroom={child.classroom} />}
        </div>
      </Header>

      <Typography level="h1" variant="main-title">
        {child.fullName}
      </Typography>

      <section className="grid sm:grid-cols-2 grid-cols-1 gap-4 w-full sm:w-200 mx-auto">
        <div className="grid grid-cols-1 gap-4">
          <ChildGeneralDataCard child={child} />

          {child.contacts.length > 0 && (
            <ChildContactsList contacts={child.contacts} />
          )}
        </div>

        <div className="grid grid-cols-1 gap-4">
          <ChildPinsList
            pins={child.pins}
            firstClassDate={child.firstClassDate}
          />

          <ChildPermissionList permissions={child.permissions} />

          <ChildDiseasesList diseases={child.diseases} />
        </div>
      </section>
    </main>
  );
}
