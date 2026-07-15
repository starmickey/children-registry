import type { ChildResumeDTO } from "@/features/children/dto/childResume";
import type { getChildResume } from "@/features/children/repository/childrenRepository";

type ChildResumeRepositoryOutput = NonNullable<
  Awaited<ReturnType<typeof getChildResume>>
>;

export function parseChildResumeDTO(
  child: ChildResumeRepositoryOutput,
): ChildResumeDTO {
  const registration = child.registrations[0];
  const latestClass = registration?.class;
  const classRoom = latestClass?.classroom;

  return {
    id: child.id,
    firstName: child.firstName,
    lastName: child.lastName,
    identityCardNumber: child.identityCardNumber ?? "",
    birthDate: child.birthDate ?? new Date(0),
    class:
      latestClass && classRoom
        ? {
            classId: String(latestClass.id),
            year: latestClass.year,
            classRoom: {
              id: classRoom.id,
              name: classRoom.name,
              alias: classRoom.alias ?? "",
            },
          }
        : null,
    contacts: child.childRelationships.map((relation) => ({
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
    })),
    pins: child.pinGrants.map((pinGrant) => ({
      pinId: pinGrant.pinId,
      pinName: pinGrant.pin.name,
    })),
  };
}
