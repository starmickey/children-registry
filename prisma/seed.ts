import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";
import {
  children,
  classes,
  classRooms,
  contacts,
  phones,
  pinOtorgations,
  pins,
  registrations,
  relationShips,
  relationShipTypes,
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
    classRooms.map(({ id, ...classRoom }) =>
      prisma.classRoom.upsert({
        where: { id },
        update: {},
        create: classRoom,
      }),
    ),
  ).then(() => console.log(`${classRooms.length} classRooms loaded`));

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
    relationShipTypes.map(({ id, ...relationShipType }) =>
      prisma.relationShipType.upsert({
        where: { id },
        update: {},
        create: relationShipType,
      }),
    ),
  ).then(() => console.log(`${relationShipTypes.length} relationShipTypes loaded`));

  await Promise.all(
    relationShips.map(({ childId, contactId, relationShipTypeId }) =>
      prisma.relationShip.upsert({
        where: {
          childId_contactId_relationShipTypeId: {
            childId,
            contactId,
            relationShipTypeId,
          },
        },
        update: {},
        create: {
          childId,
          contactId,
          relationShipTypeId,
        },
      }),
    ),
  ).then(() => console.log(`${relationShips.length} relationShips loaded`));

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
    pinOtorgations.map(({ childId, pinId, ...pinOtorgation }) =>
      prisma.pinOtorgation.upsert({
        where: { childId_pinId: { childId, pinId } },
        update: {},
        create: { childId, pinId, ...pinOtorgation },
      }),
    ),
  ).then(() => console.log(`${pinOtorgations.length} pinOtorgations loaded`));
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
