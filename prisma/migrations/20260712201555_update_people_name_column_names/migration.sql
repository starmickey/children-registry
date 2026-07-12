/*
  Warnings:

  - You are about to drop the column `name` on the `Child` table. All the data in the column will be lost.
  - You are about to drop the column `surname` on the `Child` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Contact` table. All the data in the column will be lost.
  - You are about to drop the column `surname` on the `Contact` table. All the data in the column will be lost.
  - Added the required column `firstName` to the `Child` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `Child` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `Contact` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `Contact` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Child" DROP COLUMN "name",
DROP COLUMN "surname",
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Contact" DROP COLUMN "name",
DROP COLUMN "surname",
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL;
