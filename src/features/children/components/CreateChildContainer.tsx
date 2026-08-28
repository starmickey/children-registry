import UpdateChildForm from "@/features/children/components/UpdateChildForm";
import { getClassroomsByYear } from "../services/getClassroomsByYear";
import { getRelationshipTypes } from "../services/getRelationshipTypes";
import { createChild } from "../services/createChild";
import { redirect } from "next/navigation";

export default async function CreateChildContainer() {
  const classrooms = await getClassroomsByYear(new Date().getFullYear());
  const relationshipTypes = await getRelationshipTypes();

  return (
    <>
      <UpdateChildForm
        mode="create"
        classrooms={classrooms}
        relationshipTypes={relationshipTypes}
        onSubmit={async (data) => {
          "use server";
          await createChild(data);
          redirect("/children/new/success");
        }}
      />
    </>
  );
}
