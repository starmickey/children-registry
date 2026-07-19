/*
  Warnings:

  - The primary key for the `permissions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `childId` on the `permissions` table. All the data in the column will be lost.
  - Added the required column `child_id` to the `permissions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "permissions" DROP CONSTRAINT "permissions_childId_fkey";

-- AlterTable
ALTER TABLE "permissions" DROP CONSTRAINT "permissions_pkey",
DROP COLUMN "childId",
ADD COLUMN     "child_id" INTEGER NOT NULL,
ADD CONSTRAINT "permissions_pkey" PRIMARY KEY ("child_id", "permission_type_id", "created_at");

-- AddForeignKey
ALTER TABLE "permissions" ADD CONSTRAINT "permissions_child_id_fkey" FOREIGN KEY ("child_id") REFERENCES "children"("id") ON DELETE CASCADE ON UPDATE CASCADE;
