import type {
  getChildClassroom,
  getChildContacts,
  getChildPermissions,
  getChildPins,
} from "@/features/children/children.repository";
import { Child } from "../../../generated/prisma/client";
import {
  ChildClassroomDTO,
  ChildContactDTO,
  ChildDTO,
  ChildPermissionDTO,
  ChildPinDTO,
} from "./children.dto";

export const parseChildDTO = (child: Child): ChildDTO => ({
  id: child.id,
  firstName: child.firstName,
  lastName: child.lastName,
  identityCardNumber: child.identityCardNumber ?? null,
  birthDate: child.birthDate ?? new Date(0),
});

export const parseChildContactsDTO = (
  relationships: NonNullable<Awaited<ReturnType<typeof getChildContacts>>>,
): ChildContactDTO[] =>
  relationships.map((relation) => ({
    contactId: relation.contactId,
    firstName: relation.contact.firstName,
    lastName: relation.contact.lastName,
    identityCardNumber: relation.contact.identityCardNumber,
    relationShipTypeId: relation.relationshipTypeId,
    relationShip: relation.relationshipType.name,
    phones: relation.contact.phones.map((phone) => ({
      id: phone.id,
      number: phone.number,
    })),
  }));

export const parseChildPinsDTO = (
  pinGrants: NonNullable<Awaited<ReturnType<typeof getChildPins>>>,
): ChildPinDTO[] =>
  pinGrants.map((pinGrant) => ({
    pinId: pinGrant.pinId,
    pinName: pinGrant.pin.name,
  }));

export function parseChildClassroomDTO(
  registration: NonNullable<Awaited<ReturnType<typeof getChildClassroom>>>,
): ChildClassroomDTO | null {
  if (!registration) return null;

  const latestClass = registration.class;
  const classRoom = latestClass.classroom;

  return latestClass && classRoom
    ? {
        classId: String(latestClass.id),
        year: latestClass.year,
        classRoomId: classRoom.id,
        classRoomName: classRoom.name,
        classRoomAlias: classRoom.alias ?? "",
      }
    : null;
}

export const parseChildPermissionDTOs = (
  permissionTypes: NonNullable<Awaited<ReturnType<typeof getChildPermissions>>>,
): ChildPermissionDTO[] =>
  permissionTypes.map((permissionType) => ({
    permissionId: permissionType.id,
    name: permissionType.name,
    shortName: permissionType.shortName,
    hasIt: permissionType.permissions.length > 0,
  }));
