import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const child = await prisma.child.upsert({
    where: { id: 1 },
    update: {},
    create: {
      firstName: "John",
      lastName: "Doe",
      birthDate: new Date("2010-01-01"),
      identityCardNumber: "123456789",
    },
  });

  const parroquia = await prisma.classRoom.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: "Parroquia San José Obrero",
      alias: "Parroquia",
    },
  });

  const perpetuo = await prisma.classRoom.upsert({
    where: { id: 2 },
    update: {},
    create: {
      name: "Capilla Nuestra Señora del Perpetuo Socorro",
      alias: "Perpetuo",
    },
  });

  const parroquiaClass = await prisma.class.upsert({
    where: { id: 1 },
    update: {},
    create: {
      year: 2026,
      classRoomId: parroquia.id,
    },
  });

  const perpetuoClass = await prisma.class.upsert({
    where: { id: 2 },
    update: {},
    create: {
      year: 2026,
      classRoomId: perpetuo.id,
    },
  });

  const registration = await prisma.registration.upsert({
    where: {
      childId_classId: { childId: child.id, classId: parroquiaClass.id },
    },
    update: {},
    create: {
      childId: child.id,
      classId: parroquiaClass.id,
    },
  });

  const contact = await prisma.contact.upsert({
    where: { id: 1 },
    update: {},
    create: {
      firstName: "Jane",
      lastName: "Doe",
      identityCardNumber: "987654321",
    },
  });

  const phone = await prisma.phone.upsert({
    where: { id: 1 },
    update: {},
    create: {
      number: "555-1234",
      contactId: contact.id,
    },
  });

  const relationShipType = await prisma.relationShipType.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: "Mother",
    },
  });

  const relationShip = await prisma.relationShip.upsert({
    where: {
      childId_contactId_relationShipTypeId: {
        childId: child.id,
        contactId: contact.id,
        relationShipTypeId: relationShipType.id,
      },
    },
    update: {},
    create: {
      childId: child.id,
      contactId: contact.id,
      relationShipTypeId: relationShipType.id,
    },
  });

  const pin = await prisma.pin.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: "Carnet",
    },
  });

  const pinOtorgation = await prisma.pinOtorgation.upsert({
    where: { childId_pinId: { childId: child.id, pinId: pin.id } },
    update: {},
    create: {
      pinId: pin.id,
      childId: child.id,
      otorgationDate: new Date(),
    },
  });
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
