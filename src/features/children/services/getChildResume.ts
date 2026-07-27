import { ChildDto, ChildPermissionDto, ContactDto, PinDto } from "../types";
import {
  childRepository,
  GetChildByIdDbResult,
  GetChildLatestRegistrationDbResult,
  GetChildPermissionTypesDbResult,
  GetChildPinGrantsDbResult,
  GetChildRelationshipsDbResult,
} from "../repositories/child.repository";
import { calculateAge } from "@/lib/utils";

interface ChildResumeDto extends ChildDto {
  classroomName?: string;
  contacts: ContactDto[];
  pins: PinDto[];
  permissions: ChildPermissionDto[];
}

function mapToChildDto(
  rawChild: GetChildByIdDbResult,
  registration: GetChildLatestRegistrationDbResult,
  relationships: GetChildRelationshipsDbResult,
  pinGrants: GetChildPinGrantsDbResult,
  permissionTypes: GetChildPermissionTypesDbResult,
): ChildResumeDto | null {
  if (rawChild == null) return null;

  return {
    id: rawChild.id,
    firstName: rawChild.firstName,
    lastName: rawChild.lastName,
    fullName: `${rawChild.firstName} ${rawChild.lastName}`,
    age: rawChild.birthDate ? calculateAge(rawChild.birthDate) : undefined,
    birthDate: rawChild.birthDate ?? undefined,
    identityCardNumber: rawChild.identityCardNumber ?? undefined,
    classroomName: registration?.class.classroom?.name ?? undefined,
    contacts: relationships.map((r) => ({
      id: r.contact.id,
      firstName: r.contact.firstName,
      lastName: r.contact.lastName,
      fullName: `${r.contact.firstName} ${r.contact.lastName}`,
      identityCardNumber: r.contact.identityCardNumber ?? undefined,
      relationShip: r.relationshipType.name,
      phones: r.contact.phones.map((p) => ({
        id: p.id,
        number: p.number,
      })),
    })),
    pins: pinGrants.map((p) => ({
      id: p.pin.id,
      name: p.pin.name,
    })),
    permissions: permissionTypes.map((permissionType) => ({
      id: permissionType.id,
      name: permissionType.name,
      shortName: permissionType.shortName,
      hasIt: permissionType.permissions.length > 0,
    })),
  };
}

export async function getChildResume(
  childId: number,
): Promise<ChildResumeDto | null> {
  const [child, classroom, relationships, pinGrants, permissionTypes] =
    await Promise.all([
      childRepository.getChildById(childId),
      childRepository.getChildLatestRegistration(childId),
      childRepository.getChildRelationships(childId),
      childRepository.getChildPinGrants(childId),
      childRepository.getChildPermissionTypes(childId),
    ]);

  return mapToChildDto(
    child,
    classroom,
    relationships,
    pinGrants,
    permissionTypes,
  );
}
