import Header, { ReturnButton } from "@/components/layout/header";
import EditChildContainer from "@/features/children/components/EditChildContainer";
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
      <main className="page-card">
        <Header>
          <ReturnButton href="/children" />
        </Header>
        <EditChildContainer child={child} />
      </main>
    </>
  );
}
