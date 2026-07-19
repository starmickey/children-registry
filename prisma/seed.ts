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
  permissions,
  permissionTypes,
} from "./seed-data";

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// Helper to concurrently seed a table and return a Map of { originalId -> newDbId }
async function parallelSeedAndMap<T extends { id: number }>(
  items: T[],
  createFn: (item: Omit<T, "id">) => Promise<{ id: number }>
): Promise<Map<number, number>> {
  const results = await Promise.all(
    items.map(async (item) => {
      const { id, ...data } = item;
      const created = await createFn(data);
      return { originalId: id, newId: created.id };
    })
  );
  return new Map(results.map((r) => [r.originalId, r.newId]));
}

async function main() {
  console.log("Starting parallel database seed...");

  // ==========================================
  // TIER 1: INDEPENDENT TABLES
  // These tables have no foreign keys. 
  // We can seed all 5 tables in parallel.
  // ==========================================
  console.log("Seeding Tier 1 (Independent Models)...");
  const [childIdMap, classroomIdMap, contactIdMap, relTypeIdMap, pinIdMap, permissionTypeIdMap] = await Promise.all([
    parallelSeedAndMap(children, (data) => prisma.child.create({ data })),
    parallelSeedAndMap(classrooms, (data) => prisma.classroom.create({ data })),
    parallelSeedAndMap(contacts, (data) => prisma.contact.create({ data })),
    parallelSeedAndMap(relationshipTypes, (data) => prisma.relationshipType.create({ data })),
    parallelSeedAndMap(pins, (data) => prisma.pin.create({ data })),
    parallelSeedAndMap(permissionTypes, (data) => prisma.permissionType.create({ data })),
  ]);

  // ==========================================
  // TIER 2: FIRST-LEVEL DEPENDENCIES
  // Classes depend on Classrooms.
  // ==========================================
  console.log("Seeding Tier 2 (Classes)...");
  const classIdMap = await parallelSeedAndMap(classes, (data) => {
    // Note: data.classroomId is safely typed, but we need to map it
    const mappedClassroomId = data.classroomId ? classroomIdMap.get(data.classroomId) : null;
    if (data.classroomId && !mappedClassroomId) {
      throw new Error(`Missing mapped classroomId for a Class`);
    }
    return prisma.class.create({
      data: { ...data, classroomId: mappedClassroomId },
    });
  });

  // ==========================================
  // TIER 3: JOIN & LEAF TABLES (BULK INSERTS)
  // These tables depend on Tiers 1 & 2 but have no dependents of their own.
  // We run 4 highly-efficient bulk inserts in parallel.
  // ==========================================
  console.log("Seeding Tier 3 (Join Tables)...");
  
  await Promise.all([
    // Registrations
    (async () => {
      const validRegs = registrations.map((r) => {
        const childId = childIdMap.get(r.childId);
        const classId = classIdMap.get(r.classId);
        if (!childId || !classId) throw new Error("Invalid Registration relation");
        return { ...r, childId, classId };
      });
      await prisma.registration.createMany({ data: validRegs, skipDuplicates: true });
    })(),

    // Phones
    (async () => {
      const validPhones = phones.map(({ id, contactId, ...phone }) => {
        const mappedContactId = contactIdMap.get(contactId);
        if (!mappedContactId) throw new Error(`Missing contactId for Phone ${id}`);
        return { ...phone, contactId: mappedContactId };
      });
      await prisma.phone.createMany({ data: validPhones, skipDuplicates: true });
    })(),

    // Relationships
    (async () => {
      const validRels = relationships.map((r) => {
        const childId = childIdMap.get(r.childId);
        const contactId = contactIdMap.get(r.contactId);
        const relationshipTypeId = relTypeIdMap.get(r.relationshipTypeId);
        if (!childId || !contactId || !relationshipTypeId) throw new Error("Invalid Relationship relation");
        return { ...r, childId, contactId, relationshipTypeId };
      });
      await prisma.relationship.createMany({ data: validRels, skipDuplicates: true });
    })(),

    // Pin Grants
    (async () => {
      const validPinGrants = pinGrants.map((pg) => {
        const childId = childIdMap.get(pg.childId);
        const pinId = pinIdMap.get(pg.pinId);
        if (!childId || !pinId) throw new Error("Invalid PinGrant relation");
        return { ...pg, childId, pinId };
      });
      await prisma.pinGrant.createMany({ data: validPinGrants, skipDuplicates: true });
    })(),

    // Permissions
    (async () => {
      const validPermissions = permissions.map((p) => {
        const childId = childIdMap.get(p.childId);
        const permissionTypeId = permissionTypeIdMap.get(p.permissionTypeId);
        if (!childId || !permissionTypeId) throw new Error("Invalid PinGrant relation");
        return { ...p, childId, permissionTypeId };
      });
      await prisma.permission.createMany({ data: validPermissions, skipDuplicates: true });
    })(),
  ]);

  console.log("✅ Parallel seeding completed successfully.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async (e) => {
    console.error("❌ Seeding failed:", e);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });