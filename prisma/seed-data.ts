export const children = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    birthDate: new Date("2010-01-01"),
    identityCardNumber: "123456789",
  },
  {
    id: 2,
    firstName: "EImmy",
    lastName: "Doe",
    birthDate: new Date("2010-01-01"),
    identityCardNumber: "123456790",
  },
];

export const classrooms = [
  {
    id: 1,
    name: "Parroquia San José Obrero",
    alias: "Parroquia",
  },
  {
    id: 2,
    name: "Capilla Nuestra Señora del Perpetuo Socorro",
    alias: "Perpetuo",
  },
];

export const classes = [
  {
    id: 1,
    year: 2026,
    classroomId: 1,
  },
  {
    id: 2,
    year: 2026,
    classroomId: 2,
  },
];

export const registrations = [
  {
    childId: 1,
    classId: 1,
  },
  {
    childId: 2,
    classId: 2,
  },
];

export const contacts = [
  {
    id: 1,
    firstName: "Jane",
    lastName: "Doe",
    identityCardNumber: "987654321",
  },
  {
    id: 2,
    firstName: "Susan",
    lastName: "Dawson",
    identityCardNumber: "987654321",
  },
  {
    id: 3,
    firstName: "George",
    lastName: "Bryan",
    identityCardNumber: "987654321",
  },
];

export const phones = [
  {
    id: 1,
    number: "555-1234",
    contactId: 1,
  },
  {
    id: 2,
    number: "555-1234",
    contactId: 2,
  },
  {
    id: 3,
    number: "555-1234",
    contactId: 3,
  },
  {
    id: 4,
    number: "555-1234",
    contactId: 3,
  },
];

export const relationshipTypes = [
  {
    id: 1,
    name: "Mother",
  },
  {
    id: 2,
    name: "Father",
  },
];

export const relationships = [
  {
    childId: 1,
    contactId: 1,
    relationshipTypeId: 1,
  },
  {
    childId: 2,
    contactId: 2,
    relationshipTypeId: 1,
  },
  {
    childId: 2,
    contactId: 3,
    relationshipTypeId: 2,
  },
];

export const pins = [
  {
    id: 1,
    name: "Carnet",
  },
  {
    id: 2,
    name: "Pin",
  },
];

export const pinGrants = [
  {
    pinId: 1,
    childId: 1,
    grantedAt: new Date(),
  },
  {
    pinId: 2,
    childId: 2,
    grantedAt: new Date(),
  },
];