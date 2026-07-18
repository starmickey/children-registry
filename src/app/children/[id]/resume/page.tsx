import { getChildResumeParamsSchema } from "@/features/children/schemas/childrenSchemas";
import { notFound } from "next/navigation";
import ChildResume from "@/features/children/components/ChildResume";
import ChildResumeSkeleton from "@/features/children/components/ChildResumeSkeleton";
import { Suspense } from "react";

export default async function ResumePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const parsing = getChildResumeParamsSchema.safeParse(await params);

  if (!parsing.success) {
    notFound();
  }

  const { id } = parsing.data;

  return (
    <Suspense fallback={<ChildResumeSkeleton />}>
      <ChildResume id={id} />
    </Suspense>
  );
}
