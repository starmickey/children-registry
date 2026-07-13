export interface ChildResumeDTO {
  id: number;
  firstName: string;
  lastName: string;
  identityCardNumber: string;
  birthDate: Date;
  class: {
    classId: string;
    year: number;
    classRoom: {
      id: number;
      name: string;
      alias: string;
    };
  } | null;
  contacts: {
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
  }[];
  pins: {
    pinId: number;
    pinName: string;
  }[];
}
