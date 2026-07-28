// src/features/children/services/getRegisteredChildrenByYear.ts
import { calculateAge } from "@/lib/utils";
import {
  childRepository,
  RegisteredChildDbResult,
} from "../repositories/child.repository";
import { ChildDto, ClassDto } from "../types";

export interface RegisteredChildDto extends ChildDto {
  /** Primary active classroom name for display (e.g., "3rd Grade - Room A") */
  classroomName: string;
  /** Full list of classrooms for this year if registered in multiple */
  classrooms: ClassDto[];
}

/**
 * Maps raw Prisma database output into UI-friendly DTOs
 */
function mapToChildDto(rawChild: RegisteredChildDbResult): RegisteredChildDto {
  const classrooms = rawChild.registrations.map((reg) => ({
    id: reg.class.classroom?.id ?? 0,
    name: reg.class.classroom?.name ?? "",
    year: reg.class.year,
  }));

  const classroomName =
    classrooms.length > 0
      ? classrooms.map((c) => c.name).join(", ")
      : "Unassigned";

  return {
    id: rawChild.id,
    firstName: rawChild.firstName,
    lastName: rawChild.lastName,
    fullName: `${rawChild.firstName} ${rawChild.lastName}`,
    classroomName,
    classrooms,
  };
}

/**
 * Filter parameters passed from the URL/Page to the Service & Repository
 */
export interface GetChildrenFilters {
  year: number;
  classroomId?: number;
  searchQuery?: string;
}

/**
 * FEATURE SERVICE: Retrieves unique children registered for a given academic year.
 * Applies default year rules, executes repository queries, and formats output.
 */
export async function getRegisteredChildrenByYear(
  filters: GetChildrenFilters,
): Promise<ChildDto[]> {
  // 1. Business Default: Enforce current academic year if unspecified
  const validatedFilters: GetChildrenFilters = {
    year: Number(filters.year),
    classroomId: Number(filters.classroomId) || undefined,
    searchQuery: filters.searchQuery?.trim() || undefined,
  };

  // 2. Fetch raw database data via Repository
  const dbChildren =
    await childRepository.findRegisteredByYear(validatedFilters);

  // 3. Transform database entities into clean DTOs for presentation
  return dbChildren.map(mapToChildDto);
}
