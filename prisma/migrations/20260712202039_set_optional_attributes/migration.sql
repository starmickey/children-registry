-- DropForeignKey
ALTER TABLE "Class" DROP CONSTRAINT "Class_classRoomId_fkey";

-- AlterTable
ALTER TABLE "Child" ALTER COLUMN "identityCardNumber" DROP NOT NULL,
ALTER COLUMN "birthDate" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Class" ALTER COLUMN "classRoomId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ClassRoom" ADD COLUMN     "alias" TEXT;

-- AlterTable
ALTER TABLE "Contact" ALTER COLUMN "identityCardNumber" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_classRoomId_fkey" FOREIGN KEY ("classRoomId") REFERENCES "ClassRoom"("id") ON DELETE SET NULL ON UPDATE CASCADE;
