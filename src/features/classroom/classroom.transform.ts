import { Classroom } from "../../../generated/prisma/client";
import { ClassroomDTO } from "./classroom.dto";

export function parseClassroomDTO(
  classroom: NonNullable<Classroom>,
): ClassroomDTO {
  return {
    id: classroom.id,
    name: classroom.name,
    alias: classroom.alias,
  };
}
