import { getClassroomsService } from "@/features/classroom/classroom.service";
import { ChildrenClassroomFiltersClient } from "./ChildrenClassroomFiltersClient";

export default async function ChildrenClassroomFilters({ activeId }: { activeId?: number }) {
  const classrooms = await getClassroomsService();

  return (
    <ChildrenClassroomFiltersClient classrooms={classrooms} activeId={activeId} />
  );
}
