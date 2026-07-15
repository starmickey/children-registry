/*
  Warnings:

  - The primary key for the `children` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `children` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `pin_grants` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `registrations` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `relationships` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `child_id` on the `pin_grants` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `child_id` on the `registrations` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `child_id` on the `relationships` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "pin_grants" DROP CONSTRAINT "pin_grants_child_id_fkey";

-- DropForeignKey
ALTER TABLE "registrations" DROP CONSTRAINT "registrations_child_id_fkey";

-- DropForeignKey
ALTER TABLE "relationships" DROP CONSTRAINT "relationships_child_id_fkey";

-- AlterTable
ALTER TABLE "children" DROP CONSTRAINT "children_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "children_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "pin_grants" DROP CONSTRAINT "pin_grants_pkey",
DROP COLUMN "child_id",
ADD COLUMN     "child_id" INTEGER NOT NULL,
ADD CONSTRAINT "pin_grants_pkey" PRIMARY KEY ("child_id", "pin_id");

-- AlterTable
ALTER TABLE "registrations" DROP CONSTRAINT "registrations_pkey",
DROP COLUMN "child_id",
ADD COLUMN     "child_id" INTEGER NOT NULL,
ADD CONSTRAINT "registrations_pkey" PRIMARY KEY ("child_id", "class_id");

-- AlterTable
ALTER TABLE "relationships" DROP CONSTRAINT "relationships_pkey",
DROP COLUMN "child_id",
ADD COLUMN     "child_id" INTEGER NOT NULL,
ADD CONSTRAINT "relationships_pkey" PRIMARY KEY ("child_id", "contact_id", "relationship_type_id");

-- AddForeignKey
ALTER TABLE "registrations" ADD CONSTRAINT "registrations_child_id_fkey" FOREIGN KEY ("child_id") REFERENCES "children"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "relationships" ADD CONSTRAINT "relationships_child_id_fkey" FOREIGN KEY ("child_id") REFERENCES "children"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pin_grants" ADD CONSTRAINT "pin_grants_child_id_fkey" FOREIGN KEY ("child_id") REFERENCES "children"("id") ON DELETE CASCADE ON UPDATE CASCADE;
