/*
  Warnings:

  - You are about to drop the `Child` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Class` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ClassRoom` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Contact` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Phone` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Pin` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PinOtorgation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Registration` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RelationShip` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RelationShipType` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Class" DROP CONSTRAINT "Class_classRoomId_fkey";

-- DropForeignKey
ALTER TABLE "Phone" DROP CONSTRAINT "Phone_contactId_fkey";

-- DropForeignKey
ALTER TABLE "PinOtorgation" DROP CONSTRAINT "PinOtorgation_childId_fkey";

-- DropForeignKey
ALTER TABLE "PinOtorgation" DROP CONSTRAINT "PinOtorgation_pinId_fkey";

-- DropForeignKey
ALTER TABLE "Registration" DROP CONSTRAINT "Registration_childId_fkey";

-- DropForeignKey
ALTER TABLE "Registration" DROP CONSTRAINT "Registration_classId_fkey";

-- DropForeignKey
ALTER TABLE "RelationShip" DROP CONSTRAINT "RelationShip_childId_fkey";

-- DropForeignKey
ALTER TABLE "RelationShip" DROP CONSTRAINT "RelationShip_contactId_fkey";

-- DropForeignKey
ALTER TABLE "RelationShip" DROP CONSTRAINT "RelationShip_relationShipTypeId_fkey";

-- DropTable
DROP TABLE "Child";

-- DropTable
DROP TABLE "Class";

-- DropTable
DROP TABLE "ClassRoom";

-- DropTable
DROP TABLE "Contact";

-- DropTable
DROP TABLE "Phone";

-- DropTable
DROP TABLE "Pin";

-- DropTable
DROP TABLE "PinOtorgation";

-- DropTable
DROP TABLE "Registration";

-- DropTable
DROP TABLE "RelationShip";

-- DropTable
DROP TABLE "RelationShipType";

-- CreateTable
CREATE TABLE "children" (
    "id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "identity_card_number" TEXT,
    "birth_date" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "removed_at" TIMESTAMP(3),

    CONSTRAINT "children_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "registrations" (
    "child_id" TEXT NOT NULL,
    "class_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "removed_at" TIMESTAMP(3),

    CONSTRAINT "registrations_pkey" PRIMARY KEY ("child_id","class_id")
);

-- CreateTable
CREATE TABLE "classes" (
    "id" SERIAL NOT NULL,
    "year" INTEGER NOT NULL,
    "classroom_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "removed_at" TIMESTAMP(3),

    CONSTRAINT "classes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "classrooms" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "alias" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "removed_at" TIMESTAMP(3),

    CONSTRAINT "classrooms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contacts" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "identity_card_number" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "removed_at" TIMESTAMP(3),

    CONSTRAINT "contacts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "phones" (
    "id" SERIAL NOT NULL,
    "number" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "removed_at" TIMESTAMP(3),
    "contact_id" INTEGER NOT NULL,

    CONSTRAINT "phones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "relationship_types" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "removed_at" TIMESTAMP(3),

    CONSTRAINT "relationship_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "relationships" (
    "child_id" TEXT NOT NULL,
    "contact_id" INTEGER NOT NULL,
    "relationship_type_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "removed_at" TIMESTAMP(3),

    CONSTRAINT "relationships_pkey" PRIMARY KEY ("child_id","contact_id","relationship_type_id")
);

-- CreateTable
CREATE TABLE "pin_grants" (
    "child_id" TEXT NOT NULL,
    "pin_id" INTEGER NOT NULL,
    "granted_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "removed_at" TIMESTAMP(3),

    CONSTRAINT "pin_grants_pkey" PRIMARY KEY ("child_id","pin_id")
);

-- CreateTable
CREATE TABLE "pins" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "removed_at" TIMESTAMP(3),

    CONSTRAINT "pins_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "children_removed_at_idx" ON "children"("removed_at");

-- CreateIndex
CREATE INDEX "registrations_class_id_idx" ON "registrations"("class_id");

-- CreateIndex
CREATE INDEX "classes_classroom_id_idx" ON "classes"("classroom_id");

-- CreateIndex
CREATE INDEX "classes_removed_at_idx" ON "classes"("removed_at");

-- CreateIndex
CREATE INDEX "classrooms_removed_at_idx" ON "classrooms"("removed_at");

-- CreateIndex
CREATE INDEX "contacts_removed_at_idx" ON "contacts"("removed_at");

-- CreateIndex
CREATE INDEX "phones_contact_id_idx" ON "phones"("contact_id");

-- CreateIndex
CREATE INDEX "phones_removed_at_idx" ON "phones"("removed_at");

-- CreateIndex
CREATE INDEX "relationship_types_removed_at_idx" ON "relationship_types"("removed_at");

-- CreateIndex
CREATE INDEX "relationships_contact_id_idx" ON "relationships"("contact_id");

-- CreateIndex
CREATE INDEX "relationships_relationship_type_id_idx" ON "relationships"("relationship_type_id");

-- CreateIndex
CREATE INDEX "relationships_removed_at_idx" ON "relationships"("removed_at");

-- CreateIndex
CREATE INDEX "pin_grants_pin_id_idx" ON "pin_grants"("pin_id");

-- CreateIndex
CREATE INDEX "pin_grants_removed_at_idx" ON "pin_grants"("removed_at");

-- CreateIndex
CREATE INDEX "pins_removed_at_idx" ON "pins"("removed_at");

-- AddForeignKey
ALTER TABLE "registrations" ADD CONSTRAINT "registrations_child_id_fkey" FOREIGN KEY ("child_id") REFERENCES "children"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "registrations" ADD CONSTRAINT "registrations_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "classes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "classes" ADD CONSTRAINT "classes_classroom_id_fkey" FOREIGN KEY ("classroom_id") REFERENCES "classrooms"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "phones" ADD CONSTRAINT "phones_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "contacts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "relationships" ADD CONSTRAINT "relationships_child_id_fkey" FOREIGN KEY ("child_id") REFERENCES "children"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "relationships" ADD CONSTRAINT "relationships_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "contacts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "relationships" ADD CONSTRAINT "relationships_relationship_type_id_fkey" FOREIGN KEY ("relationship_type_id") REFERENCES "relationship_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pin_grants" ADD CONSTRAINT "pin_grants_child_id_fkey" FOREIGN KEY ("child_id") REFERENCES "children"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pin_grants" ADD CONSTRAINT "pin_grants_pin_id_fkey" FOREIGN KEY ("pin_id") REFERENCES "pins"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
