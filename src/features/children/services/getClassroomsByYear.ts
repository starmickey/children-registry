import { classroomRepository } from "../repositories/classroom.repository";
import { ClassroomDto } from "../types";

export async function getClassroomsByYear(year: number): Promise<ClassroomDto[]> {
  const classes = await classroomRepository.getClassesByYear(year);

  // 1. Extract, filter out nulls, and deduplicate by classroom ID
  const uniqueClassroomsMap = new Map<number, ClassroomDto>();

  for (const item of classes) {
    if (item.classroom && !uniqueClassroomsMap.has(item.classroom.id)) {
      uniqueClassroomsMap.set(item.classroom.id, {
        id: item.classroom.id,
        name: item.classroom.name,
      });
    }
  }

  // 2. Return as an array sorted by name
  return Array.from(uniqueClassroomsMap.values()).sort((a, b) =>
    a.name.localeCompare(b.name)
  );
}