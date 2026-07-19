import { Badge } from "@/components/ui/badge";
import { getChildClassroomService } from "../children.service";

export default async function ChildClassRoomBadge({
  childId,
}: {
  childId: number;
}) {
  const classroom = await getChildClassroomService(childId);

  if (!classroom) {
    return <></>;
  }
  
  return <Badge>{classroom.classRoomAlias ?? classroom.classRoomName}</Badge>;
}
