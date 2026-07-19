export const children = [
  {
    id: 1,
    firstName: "Liam",
    lastName: "García",
    birthDate: new Date("2021-05-12"),
    identityCardNumber: "98765432",
  },
  {
    id: 2,
    firstName: "Emma",
    lastName: "Martínez",
    birthDate: new Date("2021-02-15"),
    identityCardNumber: "87654321",
  },
  {
    id: 3,
    firstName: "Noah",
    lastName: "López",
    birthDate: new Date("2020-11-20"),
    identityCardNumber: "76543210",
  },
  {
    id: 4,
    firstName: "Olivia",
    lastName: "González",
    birthDate: new Date("2019-08-05"),
    identityCardNumber: "65432109",
  },
  {
    id: 5,
    firstName: "Mateo",
    lastName: "Pérez",
    birthDate: new Date("2020-01-30"),
    identityCardNumber: "54321098",
  },
  {
    id: 6,
    firstName: "Isabella",
    lastName: "Gómez",
    birthDate: new Date("2021-06-10"),
    identityCardNumber: "43210987",
  },
  {
    id: 7,
    firstName: "Lucas",
    lastName: "Navarro",
    birthDate: new Date("2018-04-22"),
    identityCardNumber: "32109876",
  },
  {
    id: 8,
    firstName: "Mia",
    lastName: "Ruiz",
    birthDate: new Date("2019-09-14"),
    identityCardNumber: "21098765",
  },
  {
    id: 9,
    firstName: "Thiago",
    lastName: "Díaz",
    birthDate: new Date("2018-12-01"),
    identityCardNumber: null,
  },
  {
    id: 10,
    firstName: "Sofia",
    lastName: "Torres",
    birthDate: null,
    identityCardNumber: "09876543",
  },
];

export const classrooms = [
  {
    id: 1,
    name: "Sala Amarilla",
    alias: "Amarilla",
  },
  {
    id: 2,
    name: "Sala Roja",
    alias: "Roja",
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
  { childId: 1, classId: 1 },
  { childId: 2, classId: 1 },
  { childId: 3, classId: 1 },
  { childId: 4, classId: 1 },
  { childId: 5, classId: 1 },
  { childId: 6, classId: 2 },
  { childId: 7, classId: 2 },
  { childId: 8, classId: 2 },
  { childId: 9, classId: 2 },
  { childId: 10, classId: 2 },
];

export const contacts = [
  {
    id: 1,
    firstName: "Carlos",
    lastName: "García",
    identityCardNumber: "11223344",
  },
  {
    id: 2,
    firstName: "María",
    lastName: "Martínez",
    identityCardNumber: "22334455",
  },
  {
    id: 3,
    firstName: "Jorge",
    lastName: "López",
    identityCardNumber: "33445566",
  },
  {
    id: 4,
    firstName: "Ana",
    lastName: "González",
    identityCardNumber: "44556677",
  },
  {
    id: 5,
    firstName: "Diego",
    lastName: "Pérez",
    identityCardNumber: "",
  },
  {
    id: 6,
    firstName: "Laura",
    lastName: "Gómez",
    identityCardNumber: "66778899",
  },
  {
    id: 7,
    firstName: "Pablo",
    lastName: "Navarro",
    identityCardNumber: "77889900",
  },
  {
    id: 8,
    firstName: "Lucía",
    lastName: "Ruiz",
    identityCardNumber: "88990011",
  },
  {
    id: 9,
    firstName: "Marcos",
    lastName: "Díaz",
    identityCardNumber: "99001122",
  },
  {
    id: 10,
    firstName: "Elena",
    lastName: "Torres",
    identityCardNumber: "10111213",
  },
];

export const phones = [
  { id: 1, number: "1155550001", contactId: 1 },
  { id: 2, number: "1155550002", contactId: 2 },
  { id: 3, number: "1155550003", contactId: 3 },
  { id: 4, number: "1155550004", contactId: 4 },
  { id: 5, number: "1155550005", contactId: 5 },
  { id: 6, number: "1155550006", contactId: 6 },
  { id: 7, number: "1155550007", contactId: 7 },
  { id: 8, number: "1155550008", contactId: 8 },
  { id: 9, number: "1155550009", contactId: 9 },
  { id: 10, number: "1155550010", contactId: 10 },
];

export const relationshipTypes = [
  { id: 1, name: "Madre" },
  { id: 2, name: "Padre" },
  { id: 3, name: "Abuela" },
  { id: 4, name: "Abuelo" },
  { id: 5, name: "Tío/a" },
  { id: 6, name: "Tutor Legal" },
];

export const relationships = [
  { childId: 1, contactId: 1, relationshipTypeId: 2 },
  { childId: 2, contactId: 2, relationshipTypeId: 1 },
  { childId: 3, contactId: 3, relationshipTypeId: 2 },
  { childId: 4, contactId: 4, relationshipTypeId: 1 },
  { childId: 5, contactId: 5, relationshipTypeId: 2 },
  { childId: 6, contactId: 6, relationshipTypeId: 1 },
  { childId: 7, contactId: 7, relationshipTypeId: 2 },
  { childId: 8, contactId: 8, relationshipTypeId: 1 },
  { childId: 9, contactId: 9, relationshipTypeId: 2 },
  { childId: 10, contactId: 10, relationshipTypeId: 3 },
];

export const pins = [
  { id: 1, name: "Tarjeta de Acceso" },
  { id: 2, name: "Llavero RFID" },
];

export const pinGrants = [
  { pinId: 1, childId: 1, grantedAt: new Date("2026-02-01T08:00:00") },
  { pinId: 2, childId: 2, grantedAt: new Date("2026-02-02T08:15:00") },
  { pinId: 1, childId: 3, grantedAt: new Date("2026-02-03T08:30:00") },
  { pinId: 2, childId: 4, grantedAt: new Date("2026-02-04T08:45:00") },
  { pinId: 1, childId: 5, grantedAt: new Date("2026-02-05T09:00:00") },
  { pinId: 2, childId: 6, grantedAt: new Date("2026-02-06T09:15:00") },
  { pinId: 1, childId: 7, grantedAt: new Date("2026-02-07T09:30:00") },
  { pinId: 2, childId: 8, grantedAt: new Date("2026-02-08T09:45:00") },
  { pinId: 1, childId: 9, grantedAt: new Date("2026-02-09T10:00:00") },
  { pinId: 2, childId: 10, grantedAt: new Date("2026-02-10T10:15:00") },
];

export const permissionTypes = [
  {
    id: 1,
    shortName: "Fotos",
    name: "Toma de fotos",
  },
  {
    id: 2,
    shortName: "Misionar",
    name: "Salir a misionar",
  },
  {
    id: 3,
    shortName: "Retirarse solo",
    name: "Retirarse de las instalaciones sin la compañía de un adulto",
  },
];
export const permissions = [
  {
    childId: 1,
    permissionTypeId: 1,
  },
  {
    childId: 1,
    permissionTypeId: 2,
  },
  {
    childId: 1,
    permissionTypeId: 3,
  },
  {
    childId: 2,
    permissionTypeId: 1,
  },
  {
    childId: 2,
    permissionTypeId: 2,
  },
  {
    childId: 3,
    permissionTypeId: 1,
  },
  {
    childId: 3,
    permissionTypeId: 2,
  },
  {
    childId: 5,
    permissionTypeId: 2,
  },
  {
    childId: 5,
    permissionTypeId: 3,
  },
  {
    childId: 6,
    permissionTypeId: 1,
  },
  {
    childId: 6,
    permissionTypeId: 2,
  },
  {
    childId: 9,
    permissionTypeId: 2,
  },
  {
    childId: 9,
    permissionTypeId: 3,
  },
  {
    childId: 11,
    permissionTypeId: 1,
  },
  {
    childId: 11,
    permissionTypeId: 2,
  },
  {
    childId: 12,
    permissionTypeId: 2,
  },
  {
    childId: 12,
    permissionTypeId: 3,
  },
  {
    childId: 13,
    permissionTypeId: 1,
  },
  {
    childId: 13,
    permissionTypeId: 2,
  },
  {
    childId: 15,
    permissionTypeId: 1,
  },
  {
    childId: 15,
    permissionTypeId: 2,
  },
  {
    childId: 16,
    permissionTypeId: 2,
  },
  {
    childId: 16,
    permissionTypeId: 3,
  },
];
