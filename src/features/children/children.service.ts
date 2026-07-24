import {
  getChildById,
  getChildClassroom,
  getChildContacts,
  getChildPermissions,
  getChildPins,
  searchChildren,
} from "@/features/children/children.repository";
import {
  parseChildClassroomDTO,
  parseChildContactsDTO,
  parseChildDTO,
  parseChildPermissionDTOs,
  parseChildPinsDTO,
} from "./children.transform";

export async function searchChildrenService({
  search,
  classroomId,
}: {
  search?: string;
  classroomId?: number;
}) {
  return searchChildren({ search, classroomId }).then((res) =>
    res.map(parseChildDTO),
  );
}

export async function getChildByIdService(id: number) {
  return getChildById(id).then((res) => res && parseChildDTO(res));
}

export async function getChildContactsService(childId: number) {
  return getChildContacts(childId).then((res) => parseChildContactsDTO(res));
}

export async function getChildPinsService(childId: number) {
  return getChildPins(childId).then((res) => parseChildPinsDTO(res));
}

export async function getChildClassroomService(childId: number) {
  return getChildClassroom(childId).then(
    (res) => res && parseChildClassroomDTO(res),
  );
}

export async function getChildPermissionsService(childId: number) {
  return getChildPermissions(childId).then(
    (res) => res && parseChildPermissionDTOs(res),
  );
}
