import { getClassrooms } from "./classroom.repository";
import { parseClassroomDTO } from "./classroom.transform";

export async function getClassroomsService() {
  return getClassrooms().then(res => res.map(parseClassroomDTO))
}