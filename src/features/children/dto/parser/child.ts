import { Child } from "../../../../../generated/prisma/client";
import { ChildDTO } from "../child";

export function parseChildDTO(child: Child): ChildDTO {
  return {
    id: child.id,
    firstName: child.firstName,
    lastName: child.lastName,
    identityCardNumber: child.identityCardNumber ?? null,
    birthDate: child.birthDate ?? new Date(0),
  };
}