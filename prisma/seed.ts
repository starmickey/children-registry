import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";
import {
  children,
  classes,
  classrooms,
  contacts,
  phones,
  pinGrants,
  pins,
  registrations,
  relationships,
  relationshipTypes,
} from "./seed-data";

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  await Promise.all(
    children.map(({ id, ...child }) =>
      prisma.child.upsert({
        where: { id },
        update: {},
        create: child,
      }),
    ),
  ).then(() => console.log(`${children.length} children loaded`));

  await Promise.all(
    classrooms.map(({ id, ...classroom }) =>
      prisma.classroom.upsert({
        where: { id },
        update: {},
        create: classroom,
      }),
    ),
  ).then(() => console.log(`${classrooms.length} classrooms loaded`));

  await Promise.all(
    classes.map(({ id, ...classItem }) =>
      prisma.class.upsert({
        where: { id },
        update: {},
        create: classItem,
      }),
    ),
  ).then(() => console.log(`${classes.length} classes loaded`));

  await Promise.all(
    registrations.map(({ childId, classId }) =>
      prisma.registration.upsert({
        where: {
          childId_classId: {
            childId,
            classId,
          },
        },
        update: {},
        create: {
          childId,
          classId,
        },
      }),
    ),
  ).then(() => console.log(`${registrations.length} registrations loaded`));

  await Promise.all(
    contacts.map(({ id, ...contact }) =>
      prisma.contact.upsert({
        where: { id },
        update: {},
        create: contact,
      }),
    ),
  ).then(() => console.log(`${contacts.length} contacts loaded`));

  await Promise.all(
    phones.map(({ id, ...phone }) =>
      prisma.phone.upsert({
        where: { id },
        update: {},
        create: phone,
      }),
    ),
  ).then(() => console.log(`${phones.length} phones loaded`));

  await Promise.all(
    relationshipTypes.map(({ id, ...relationshipType }) =>
      prisma.relationshipType.upsert({
        where: { id },
        update: {},
        create: relationshipType,
      }),
    ),
  ).then(() => console.log(`${relationshipTypes.length} relationshipTypes loaded`));

  await Promise.all(
    relationships.map(({ childId, contactId, relationshipTypeId }) =>
      prisma.relationship.upsert({
        where: {
          childId_contactId_relationshipTypeId: {
            childId,
            contactId,
            relationshipTypeId,
          },
        },
        update: {},
        create: {
          childId,
          contactId,
          relationshipTypeId,
        },
      }),
    ),
  ).then(() => console.log(`${relationships.length} relationships loaded`));

  await Promise.all(
    pins.map(({ id, ...pin }) =>
      prisma.pin.upsert({
        where: { id },
        update: {},
        create: pin,
      }),
    ),
  ).then(() => console.log(`${pins.length} pins loaded`));

  await Promise.all(
    pinGrants.map(({ childId, pinId, ...pinGrant }) =>
      prisma.pinGrant.upsert({
        where: { childId_pinId: { childId, pinId } },
        update: {},
        create: { childId, pinId, ...pinGrant },
      }),
    ),
  ).then(() => console.log(`${pinGrants.length} pinGrants loaded`));
}
main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });
