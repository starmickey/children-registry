export interface ChildDTO {
  id: number;
  firstName: string;
  lastName: string;
  identityCardNumber: string | null;
  birthDate: Date | null;
}

export interface ChildContactDTO {
  contactId: number;
  firstName: string;
  lastName: string;
  identityCardNumber: string | null;
  relationShipTypeId: number;
  relationShip: string;
  phones: {
    id: number;
    number: string;
  }[];
}

export interface ChildPinDTO {
  pinId: number;
  pinName: string;
}

export interface ChildClassroomDTO {
  classId: string;
  year: number;
  classRoomId: number;
  classRoomName: string;
  classRoomAlias: string;
}

export interface ChildPermissionDTO {
  permissionId: number;
  name: string;
  shortName: string;
  hasIt: boolean;
}
