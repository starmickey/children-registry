import UpdateChildForm from "@/features/children/components/UpdateChildForm";
import { getClassroomsByYear } from "../services/getClassroomsByYear";
import { getRelationshipTypes } from "../services/getRelationshipTypes";
import { redirect } from "next/navigation";
import { ChildResumeDto } from "../services/getChildResume";
import { EditChildInput } from "../schemas/update-child-schema";
import { editChild } from "../services/editChild";

function mapChildToSchema(child: ChildResumeDto): EditChildInput {
  return {
    ...child,
    classId: child?.class?.id ?? 0,
    contacts: child.contacts.map((c) => ({
      ...c,
      relationShip: c.relationShipId,
      phones:
        c.phones.length > 0
          ? c.phones
          : [
              {
                number: "",
              },
            ],
    })),
  };
}

export default async function EditChildContainer({
  child,
}: {
  child: ChildResumeDto;
}) {
  const classrooms = await getClassroomsByYear(new Date().getFullYear());
  const relationshipTypes = await getRelationshipTypes();

  return (
    <>
      <UpdateChildForm
        mode="edit"
        classrooms={classrooms}
        relationshipTypes={relationshipTypes}
        defaultValues={mapChildToSchema(child)}
        onSubmit={async (data: EditChildInput) => {
          "use server";
          await editChild(data);
          redirect(`/children/${child.id}/edit/success`);
        }}
      />
    </>
  );
}
